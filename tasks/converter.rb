# coding: utf-8
# Based on convert script from vwall/compass-twitter-bootstrap gem.
# https://github.com/vwall/compass-twitter-bootstrap/blob/master/build/convert.rb
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this work except in compliance with the License.
# You may obtain a copy of the License in the LICENSE file, or at:
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

require 'open-uri'
require 'json'
require 'strscan'
require 'forwardable'
require 'term/ansicolor'
require 'fileutils'

class Converter
  extend Forwardable

  GIT_DATA = 'https://api.github.com/repos'
  GIT_RAW  = 'https://raw.github.com'

  def initialize(branch)
    @repo       = 'twbs/bootstrap'
    @repo_url   = "https://github.com/#@repo"
    @branch     = branch || 'master'
    @branch_sha = get_branch_sha
    @save_at    = { js: 'vendor/assets/javascripts/bootstrap',
                    scss: 'vendor/assets/stylesheets/bootstrap',
                    fonts: 'vendor/assets/fonts/bootstrap' }
    @save_at.each { |_,v| FileUtils.mkdir_p(v) }
    @cache_path = 'tmp/converter-cache'
    @logger     = Logger.new(repo: @repo_url, branch: @branch, branch_sha: @branch_sha, save_at: @save_at, cache_path: @cache_path)
  end

  def_delegators :@logger, :log_status, :log_processing, :log_transform, :log_file_info, :log_processed, :log_http_get_file, :log_http_get_files, :silence_log

  def process
    process_stylesheet_assets
    process_javascript_assets
    process_font_assets
    store_version
  end

  def process_font_assets
    log_status "Processing fonts..."
    files = read_files('fonts', bootstrap_font_files)
    save_at = @save_at[:fonts]
    files.each do |name, content|
      save_file "#{save_at}/#{name}", content
    end
  end

  NESTED_MIXINS = {'#gradient' => 'gradient'}
  VARARG_MIXINS = %w(transition transition-transform box-shadow)
  def process_stylesheet_assets
    log_status "Processing stylesheets..."
    files = read_files('less', bootstrap_less_files)

    # read common mixin definitions (incl. nested mixins) from mixins.less
    read_shared_mixins! files['mixins.less']

    # convert each file
    files.each do |name, file|
      log_processing name
      # apply common conversions
      file = convert_to_scss(file)
      case name
      when 'mixins.less'
        NESTED_MIXINS.each do |selector, prefix|
          file = flatten_mixins(file, selector, prefix)
        end
        file = varargify_mixin_definitions(file, *VARARG_MIXINS)
        file = deinterpolate_vararg_mixins(file)
        file = parameterize_mixin_parent_selector file, 'responsive-(in)?visibility'
        file = parameterize_mixin_parent_selector file, 'input-size'
        file = replace_ms_filters(file)
        file = replace_all file, /\.\$state/, '.#{$state}'
        file = replace_all file, /,\s*\.open \.dropdown-toggle& \{(.*?)\}/m,
                           " {\\1}\n  .open & { &.dropdown-toggle {\\1} }"
      when 'responsive-utilities.less'
        file = apply_mixin_parent_selector(file, '&\.(visible|hidden)')
        file = apply_mixin_parent_selector(file, '(?<!&)\.(visible|hidden)')
        file = replace_rules(file, '  @media') { |r| unindent(r, 2) }
      when 'variables.less'
        file = insert_default_vars(file)
        file = replace_all file, /(\$icon-font-path:).*(!default)/, '\1 "bootstrap/" \2'
      when 'close.less'
        # extract .close { button& {...} } rule
        file = extract_nested_rule file, 'button&'
      when 'modals.less'
        file = replace_all file, /body&,(.*?)(\{.*?\})/m, "\\1\\2\nbody& \\2"
        file = extract_nested_rule file, 'body&'
      when 'dropdowns.less'
        file = replace_all file, /(\s*)@extend \.pull-right-dropdown-menu;/, "\\1right: 0;\\1left: auto;"
      when 'forms.less'
        file = extract_nested_rule file, 'textarea&'
        file = apply_mixin_parent_selector(file, '\.input-(?:sm|lg)')
      when 'navbar.less'
        file = replace_all file, /(\s*)\.navbar-(right|left)\s*\{\s*@extend\s*\.pull-(right|left);\s*/, "\\1.navbar-\\2 {\\1  float: \\2 !important;\\1"
      when 'tables.less'
        file = replace_all file, /(@include\s*table-row-variant\()(\w+)/, "\\1'\\2'"
      when 'list-group.less'
        file = extract_nested_rule file, 'a&'
      when 'glyphicons.less'
        file = replace_rules(file, '@font-face') { |rule|
          rule = replace_all rule, /(\$icon-font-\w+)/, '#{\1}'
          replace_all rule, /url\(/, 'font-url('
        }
      end

      name = name.sub(/\.less$/, '.scss')
      save_at = @save_at[:scss]
      path = "#{save_at}/#{'_' unless name == 'bootstrap.scss'}#{name}"
      save_file(path, file)
      log_processed File.basename(path)
    end
  end

  def store_version
    path = 'lib/bootstrap-sass/version.rb'
    content = File.read(path).sub(/BOOTSTRAP_SHA\s*=\s*['"][\w]+['"]/, "BOOTSTRAP_SHA = '#@branch_sha'")
    File.open(path, 'w') { |f| f.write(content) }
  end

  def process_javascript_assets
    log_status "Processing javascripts..."
    save_at = @save_at[:js]
    read_files('js', bootstrap_js_files).each do |name, file|
      save_file("#{save_at}/#{name}", file)
    end
    log_processed "#{bootstrap_js_files * ' '}"

    log_status "Updating javascript manifest"
    content = ''
    bootstrap_js_files.each do |name|
      name = name.gsub(/\.js$/, '')
      content << "//= require bootstrap/#{name}\n"
    end
    path = "vendor/assets/javascripts/bootstrap.js"
    save_file(path, content)
    log_processed path
  end

  private

  def read_files(path, files)
    full_path = "#{GIT_RAW}/#@repo/#@branch_sha/#{path}"
    if (contents = read_cached_files(path, files))
      log_http_get_files files, full_path, true
    else
      log_http_get_files files, full_path, false
      contents = {}
      files.map do |name|
        Thread.start {
          content = open("#{full_path}/#{name}").read
          Thread.exclusive { contents[name] = content }
        }
      end.each(&:join)
      write_cached_files path, contents
    end
    contents
  end

  def read_cached_files(path, files)
    full_path = "#@cache_path/#@branch_sha/#{path}"
    contents = {}
    if File.directory?(full_path)
      files.each do |name|
        contents[name] = File.read("#{full_path}/#{name}", mode: 'rb') || ''
      end
      contents
    end
  end

  def write_cached_files(path, files)
    full_path = "./#@cache_path/#@branch_sha/#{path}"
    FileUtils.mkdir_p full_path
    files.each do |name, content|
      File.open("#{full_path}/#{name}", 'wb') { |f| f.write content}
    end
  end


  def get_file(url)
    cache_path = "./#@cache_path#{URI(url).path}"
    FileUtils.mkdir_p File.dirname(cache_path)
    if File.exists?(cache_path)
      log_http_get_file url, true
      File.read(cache_path, mode: 'rb')
    else
      log_http_get_file url, false
      content = open(url).read
      File.open(cache_path, 'wb') { |f| f.write content }
      content
    end
  end

  # get sha of the branch (= the latest commit)
  def get_branch_sha
    cmd = "git ls-remote '#@repo_url' | awk '/#@branch/ {print $1}'"
    puts cmd
    @branch_sha ||= %x[#{cmd}].chomp
    raise 'Could not get branch sha!' unless $?.success?
    @branch_sha
  end

  # Get the sha of a dir
  def get_tree_sha(dir)
    get_trees['tree'].find { |t| t['path'] == dir }['sha']
  end

  def get_trees
    @trees ||= get_json("#{GIT_DATA}/#@repo/git/trees/#@branch_sha")
  end

  def bootstrap_font_files
    @bootstrap_font_files ||= begin
      files = get_json "#{GIT_DATA}/#@repo/git/trees/#{get_tree_sha('fonts')}"
      files['tree'].select { |f| f['type'] == 'blob' && f['path'] =~ /\.(eot|svg|ttf|woff)$/ }.map { |f| f['path'] }
    end
  end

  def bootstrap_less_files
    @bootstrap_less_files ||= begin
      files = get_json "#{GIT_DATA}/#@repo/git/trees/#{get_tree_sha('less')}"
      files['tree'].select { |f| f['type'] == 'blob' && f['path'] =~ /\.less$/ }.map { |f| f['path'] }
    end
  end

  def bootstrap_js_files
    @bootstrap_js_files ||= begin
      files = get_json "#{GIT_DATA}/#@repo/git/trees/#{get_tree_sha('js')}"
      files = files['tree'].select { |f| f['type'] == 'blob' && f['path'] =~ /\.js$/ }.map { |f| f['path'] }
      files.sort_by { |f|
        case f
          # tooltip depends on popover and must be loaded earlier
          when /tooltip/ then 1
          when /popover/ then 2
          else
            0
        end
      }
    end
  end

  # We need to keep a list of shared mixin names in order to convert the includes correctly
  # Before doing any processing we read shared mixins from a file
  # If a mixin is nested, it gets prefixed in the list (e.g. #gradient > .horizontal to 'gradient-horizontal')
  def read_shared_mixins!(mixins_file)
    log_status "  Reading shared mixins from mixins.less"
    @shared_mixins = get_mixin_names(mixins_file, silent: true)
    NESTED_MIXINS.each do |selector, prefix|
      # we use replace_rules without replacing anything just to use the parsing algorithm
      replace_rules(mixins_file, selector) { |rule|
        @shared_mixins += get_mixin_names(unindent(unwrap_rule_block(rule)), silent: true).map { |name| "#{prefix}-#{name}" }
        rule
      }
    end
    @shared_mixins.sort!
    log_file_info "shared mixins: #{@shared_mixins * ', '}"
    @shared_mixins
  end

  def get_mixin_names(file, opts = {})
    names = get_css_selectors(file).join("\n" * 2).scan(/^\.([\w-]+)\(#{LESS_MIXIN_DEF_ARGS_RE}\)[ ]*\{/).map(&:first).uniq.sort
    log_file_info "mixin defs: #{names * ', '}" unless opts[:silent] || names.empty?
    names
  end

  def convert_to_scss(file)
    # mixins may also be defined in the file. get mixin names before doing any processing
    mixin_names = (@shared_mixins + get_mixin_names(file)).uniq
    file = replace_vars(file)
    file = replace_file_imports(file)
    file = replace_mixin_definitions file
    file = replace_mixins file, mixin_names
    # replace_less_extend does not seem to do anything. @glebm
    file = replace_less_extend(file)
    file = replace_spin(file)
    file = replace_image_urls(file)
    file = replace_image_paths(file)
    file = replace_escaping(file)
    file = convert_less_ampersand(file)
    file = deinterpolate_vararg_mixins(file)
    file = replace_calculation_semantics(file)
    file
  end

  # margin: a -b
  # LESS: sets 2 values
  # SASS: sets 1 value (a-b)
  # This wraps a and -b so they evaluates to 2 values in SASS
  def replace_calculation_semantics(file)
    # split_prop_val.call('(@navbar-padding-vertical / 2) -@navbar-padding-horizontal')
    # #=> ["(navbar-padding-vertical / 2)", "-navbar-padding-horizontal"]
    split_prop_val = proc { |val|
      s = CharStringScanner.new(val)
      r = []
      buff = ''
      d = 0
      prop_char    = %r([\$\w\-/\*\+%!])
      while (token = s.scan_next(/([\)\(]|\s+|#{prop_char}+)/))
        buff << token
        case token
          when '('
            d += 1
          when ')'
            d -= 1
            if d == 0
              r << buff
              buff = ''
            end
          when /\s/
            if d == 0 && !buff.strip.empty?
              r << buff
              buff = ''
            end
        end
      end
      r << buff unless buff.empty?
      r.map(&:strip)
    }

    replace_rules file do |rule|
      replace_properties rule do |props|
        props.gsub /(?<!\w)([\w-]+):(.*?);/ do |m|
          prop, vals = $1, split_prop_val.call($2)
          next m unless vals.length >= 2 && vals.any? { |v| v =~ /^[\+\-]\$/ }
          transformed = vals.map { |v| v.strip =~ %r(^\(.*\)$) ? v : "(#{v})" }
          log_transform "property #{prop}: #{transformed * ' '}"
          "#{prop}: #{transformed * ' '};"
        end
      end
    end
  end

  def save_file(path, content, mode='w')
    File.open(path, mode) { |file| file.write(content) }
  end

  # @import "file.less" to "#{target_path}file;"
  def replace_file_imports(less, target_path = 'bootstrap/')
    less.gsub %r([@\$]import ["|']([\w-]+).less["|'];),
              %Q(@import "#{target_path}\\1";)
  end

  def replace_all(file, regex, replacement = nil, &block)
    log_transform regex, replacement
    new_file = file.gsub(regex, replacement, &block)
    raise "replace_all #{regex}, #{replacement} NO MATCH" if file == new_file
    new_file
  end

  # @mixin a() { tr& { color:white } }
  # to:
  # @mixin a($parent) { tr#{$parent} { color: white } }
  def parameterize_mixin_parent_selector(file, rule_sel)
    log_transform rule_sel
    param = '$parent'
    replace_rules(file, '^[ \t]*@mixin\s*' + rule_sel) do |mxn_css|
      mxn_css.sub! /(?=@mixin)/, "// [converter] $parent hack\n"
      # insert param into mixin def
      mxn_css.sub!(/(@mixin [\w-]+)\(([\$\w\-,\s]*)\)/) { "#{$1}(#{param}#{', ' if $2 && !$2.empty?}#{$2})" }
      # wrap properties in #{$parent} { ... }
      replace_properties(mxn_css) { |props| "  \#{#{param}} { #{props.strip} }\n  " }
      # change nested& rules to nested#{$parent}
      replace_rules(mxn_css, /.*[^\s ]&/) { |rule| replace_in_selector rule, /&/, "\#{#{param}}" }
    end
  end

  # extracts rule immediately after it's parent, and adjust the selector
  # .x { textarea& { ... }}
  # to:
  # .x { ... }
  # textarea.x { ... }
  def extract_nested_rule(file, selector, new_selector = nil)
    matches = []
    # first find the rules, and remove them
    file = replace_rules(file, "\s*#{selector}", comments: true) { |rule, pos, css|
      matches << [rule, pos]
      new_selector ||= "#{get_selector(rule).sub(/&$/, '')}#{selector_for_pos(css, pos.begin)}"
      indent "// [converter] extracted #{get_selector(rule)} to #{new_selector}", indent_width(rule)
    }
    log_transform selector, new_selector
    # replace rule selector with new_selector
    matches.each do |m|
      m[0].sub! /(#{COMMENT_RE}*)^(\s*).*?(\s*){/m, "\\1\\2#{new_selector}\\3{"
    end
    replace_substrings_at file,
                          matches.map { |_, pos| close_brace_pos(file, pos.begin, 1) + 1 },
                          matches.map { |rule, _| "\n\n" + unindent(rule) }
  end

  # .visible-sm { @include responsive-visibility() }
  # to:
  # @include responsive-visibility('.visible-sm')
  def apply_mixin_parent_selector(file, rule_sel)
    log_transform rule_sel
    replace_rules file, '\s*' + rule_sel, comments: false do |rule, rule_pos, css|
      body = unwrap_rule_block(rule.dup).strip
      next rule unless body =~ /^@include \w+/m || body =~ /^@media/ && body =~ /\{\s*@include/
      rule =~ /(#{COMMENT_RE}*)(#{SELECTOR_RE})\{/
      cmt, sel  = $1, $2.strip
      # take one up selector chain if this is an &. selector
      if sel.start_with?('&')
        parent_sel = selector_for_pos(css, rule_pos.begin)
        sel        = parent_sel + sel[1..-1]
      end
      # unwrap, and replace @include
      unindent unwrap_rule_block(rule).gsub(/(@include [\w-]+)\(([\$\w\-,\s]*)\)/) {
        "#{cmt}#{$1}('#{sel}'#{', ' if $2 && !$2.empty?}#{$2})"
      }
    end
  end

  # #gradient > { @mixin horizontal ... }
  # to:
  # @mixin gradient-horizontal
  def flatten_mixins(file, container, prefix)
    log_transform container, prefix
    replace_rules file, Regexp.escape(container) do |mixins_css|
      unindent unwrap_rule_block(mixins_css).gsub(/@mixin\s*([\w-]+)/, "@mixin #{prefix}-\\1")
    end
  end

  # Replaces the following:
  #  .mixin()          -> @include mixin()
  #  #scope > .mixin() -> @include scope-mixin()
  def replace_mixins(less, mixin_names)
    mixin_pattern = /(\s+)(([#|\.][\w-]+\s*>\s*)*)\.([\w-]+\(.*\))(?!\s\{)/

    less.gsub(mixin_pattern) do |match|
      matches = match.scan(mixin_pattern).flatten
      scope   = matches[1] || ''
      if scope != ''
        scope = scope.scan(/[\w-]+/).join('-') + '-'
      end
      mixin_name = match.scan(/\.([\w-]+)\(.*\)\s?\{?/).first
      if mixin_name && mixin_names.include?("#{scope}#{mixin_name.first}")
        "#{matches.first}@include #{scope}#{matches.last}".gsub(/; \$/, ", $").sub(/;\)$/, ')')
      else
        "#{matches.first}@extend .#{scope}#{matches.last.gsub(/\(\)/, '')}"
      end
    end
  end

  # change Microsoft filters to SASS calling convention
  def replace_ms_filters(file)
    log_transform 
    file.gsub(
      /filter: e\(%\("progid:DXImageTransform.Microsoft.gradient\(startColorstr='%d', endColorstr='%d', GradientType=(\d)\)",argb\(([\-$\w]+)\),argb\(([\-$\w]+)\)\)\);/,
      %Q(filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='\#{ie-hex-str(\\2)}', endColorstr='\#{ie-hex-str(\\3)}', GradientType=\\1);)
    )
  end

  # unwraps topmost rule block
  # #sel { a: b; }
  # to:
  # a: b;
  def unwrap_rule_block(css)
    css[(css =~ RULE_OPEN_BRACE_RE) + 1..-1].sub(/\n?}\s*\z/m, '')
  end

  def replace_mixin_definitions(less)
    less.gsub(/^(\s*)\.([\w-]+\(.*\))(\s*\{)/) { |match|
      "#{$1}@mixin #{$2.tr(';', ',')}#{$3}".sub(/,\)/, ')')
    }
  end

  def replace_vars(less)
    less = less.dup
    # skip header comment
    less =~ %r(\A/\*(.*?)\*/)m
    from = $~ ? $~.to_s.length : 0
    less[from..-1] = less[from..-1].
        gsub(/(?!@mixin|@media|@page|@keyframes|@font-face|@-\w)@/, '$').
        # variables that would be ignored by gsub above: e.g. @page-header-border-color
        gsub(/@(page[\w-]+)/, '$\1')
    less
  end

  # #gradient > .horizontal()
  # to:
  # @include .horizontal-gradient()
  def replace_less_extend(less)
    less.gsub(/\#(\w+) \> \.([\w-]*)(\(.*\));?/, '@include \1-\2\3;')
  end

  def replace_spin(less)
    less.gsub(/(?![\-$@.])spin(?!-)/, 'adjust-hue')
  end

  def replace_image_urls(less)
    less.gsub(/background-image: url\("?(.*?)"?\);/) {|s| "background-image: image-url(\"#{$1}\");" }
  end

  def replace_image_paths(less)
    less.gsub('../img/', '')
  end

  def replace_escaping(less)
    less = less.gsub(/\~"([^"]+)"/, '#{\1}') # Get rid of ~"" escape
    less.gsub!(/\$\{([^}]+)\}/, '$\1') # Get rid of @{} escape
    less.gsub!(/"([^"\n]*)(\$[\w\-]+)([^"\n]*)"/, '"\1#{\2}\3"') # interpolate variable in string, e.g. url("$file-1x") => url("#{$file-1x}")
    less.gsub(/(\W)e\(%\("?([^"]*)"?\)\)/, '\1\2') # Get rid of e(%("")) escape
  end

  def insert_default_vars(scss)
    log_transform
    scss.gsub(/^(\$.+);/, '\1 !default;')
  end

  # Converts &-
  def convert_less_ampersand(less)
    regx = /^\.badge\s*\{[\s\/\w\(\)]+(&{1}-{1})\w.*?^}$/m

    tmp = ''
    less.scan(/^(\s*&)(-[\w\[\]]+\s*{.+})$/) do |ampersand, css|
      tmp << ".badge#{css}\n"
    end

    less.gsub(regx, tmp)
  end

  # unindent by n spaces
  def unindent(txt, n = 2)
    txt.gsub /^[ ]{#{n}}/, ''
  end

  # indent by n spaces
  def indent(txt, n = 2)
    "#{' ' * n}#{txt}"
  end

  # get indent length from the first line of txt
  def indent_width(txt)
    txt.match(/\A\s*/).to_s.length
  end

  # @mixin transition($transition) {
  # to:
  # @mixin transition($transition...) {
  def varargify_mixin_definitions(scss, *mixins)
    log_transform *mixins
    scss = scss.dup
    mixins.each do |mixin|
      scss.gsub! /(@mixin\s*#{Regexp.quote(mixin)})\((#{SCSS_MIXIN_DEF_ARGS_RE})\)/, '\1(\2...)'
    end
    scss
  end

  # @include transition(#{border-color ease-in-out .15s, box-shadow ease-in-out .15s})
  # to
  # @include transition(border-color ease-in-out .15s, box-shadow ease-in-out .15s)
  def deinterpolate_vararg_mixins(scss)
    scss = scss.dup
    VARARG_MIXINS.each do |mixin|
      if scss.gsub! /(@include\s*#{Regexp.quote(mixin)})\(\s*\#\{([^}]+)\}\s*\)/, '\1(\2)'
        log_transform mixin
      end
    end
    scss
  end

  # get full selector for rule_block
  def get_selector(rule_block)
    /^\s*(#{SELECTOR_RE}?)\s*\{/.match(rule_block) && $1 && $1.strip
  end

  # replace CSS rule blocks matching rule_prefix with yield(rule_block, rule_pos)
  # will also include immediately preceding comments in rule_block
  #
  # option :comments -- include immediately preceding comments in rule_block
  #
  # replace_rules(".a{ \n .b{} }", '.b') { |rule, pos| ">#{rule}<"  } #=> ".a{ \n >.b{}< }"
  def replace_rules(less, rule_prefix = SELECTOR_RE, options = {}, &block)
    options = {comments: true}.merge(options || {})
    less    = less.dup
    s       = CharStringScanner.new(less)
    rule_re = /(?:#{rule_prefix}[^{]*#{RULE_OPEN_BRACE_RE})/
    if options[:comments]
      rule_start_re = /(?:#{COMMENT_RE}*)^#{rule_re}/
    else
      rule_start_re = /^#{rule_re}/
    end

    positions = []
    while (rule_start = s.scan_next(rule_start_re))
      pos = s.pos
      positions << (pos - rule_start.length..close_brace_pos(less, pos - 1))
    end
    replace_substrings_at(less, positions, &block)
    less
  end

  # Get a all top-level selectors (with {)
  def get_css_selectors(css, opts = {})
    s         = CharStringScanner.new(css)
    selectors = []
    while s.scan_next(RULE_OPEN_BRACE_RE)
      brace_pos = s.pos
      def_pos   = css_def_pos(css, brace_pos+1, -1)
      sel = css[def_pos.begin..brace_pos - 1].dup
      sel.strip! if opts[:strip]
      selectors << sel
      sel.dup.strip
      s.pos    = close_brace_pos(css, brace_pos, 1) + 1
    end
    selectors
  end

  # replace in the top-level selector
  # replace_in_selector('a {a: {a: a} } a {}', /a/, 'b') => 'b {a: {a: a} } b {}'
  def replace_in_selector(css, pattern, sub)
    # scan for selector positions in css
    s        = CharStringScanner.new(css)
    prev_pos = 0
    sel_pos  = []
    while (brace = s.scan_next(RULE_OPEN_BRACE_RE))
      pos = s.pos
      sel_pos << (prev_pos .. pos - 1)
      s.pos    = close_brace_pos(css, s.pos - 1) + 1
      prev_pos = pos
    end
    replace_substrings_at(css, sel_pos) { |s| s.gsub(pattern, sub) }
  end


  sel_chars = '\[\]$\w\-{}#,.:&>@'
  SELECTOR_RE = /[#{sel_chars}]+[#{sel_chars}\s]*/
  COMMENT_RE = %r((?:^[ \t]*//[^\n]*\n))
  RULE_OPEN_BRACE_RE         = /(?<![@#\$])\{/
  RULE_OPEN_BRACE_RE_REVERSE = /\{(?![@#\$])/
  RULE_CLOSE_BRACE_RE         = /(?<!\w)\}(?![.'"])/
  RULE_CLOSE_BRACE_RE_REVERSE = /(?<![.'"])\}(?!\w)/
  BRACE_RE         = /#{RULE_OPEN_BRACE_RE}|#{RULE_CLOSE_BRACE_RE}/m
  BRACE_RE_REVERSE = /#{RULE_OPEN_BRACE_RE_REVERSE}|#{RULE_CLOSE_BRACE_RE_REVERSE}/m
  SCSS_MIXIN_DEF_ARGS_RE = /[\w\-,\s$:#%]*/
  LESS_MIXIN_DEF_ARGS_RE = /[\w\-,;\s@:#%]*/

  # replace first level properties in the css with yields
  # replace_properties("a { color: white }") { |props| props.gsub 'white', 'red' }
  def replace_properties(css, &block)
    s = CharStringScanner.new(css)
    s.skip_until /#{RULE_OPEN_BRACE_RE}\n?/
    prev_pos = s.pos
    depth = 0
    pos = []
    while (b = s.scan_next(/#{SELECTOR_RE}#{RULE_OPEN_BRACE_RE}|#{RULE_CLOSE_BRACE_RE}/m))
      s_pos = s.pos
      depth += (b == '}' ? -1 : +1)
      if depth == 1
        if b == '}'
          prev_pos = s_pos
        else
          pos << (prev_pos .. s_pos - b.length - 1)
        end
      end
    end
    replace_substrings_at css, pos, &block
  end


  # immediate selector of css at pos
  def selector_for_pos(css, pos, depth = -1)
    css[css_def_pos(css, pos, depth)].dup.strip
  end

  # get the pos of css def at pos (search backwards)
  def css_def_pos(css, pos, depth = -1)
    to = open_brace_pos(css, pos, depth)
    prev_def = to - (css[0..to].reverse.index('}') || to) + 1
    from = prev_def + 1 + (css[prev_def + 1..-1] =~ %r(^\s*[^\s/]))
    (from..to - 1)
  end

  # next matching brace for brace at from
  def close_brace_pos(css, from, depth = 0)
    s     = CharStringScanner.new(css[from..-1])
    while (b = s.scan_next(BRACE_RE))
      depth += (b == '}' ? -1 : +1)
      break if depth.zero?
    end
    raise "match not found for {" unless depth.zero?
    from + s.pos - 1
  end

  # opening brace position from +from+ (search backwards)
  def open_brace_pos(css, from, depth = 0)
    s     = CharStringScanner.new(css[0..from].reverse)
    while (b = s.scan_next(BRACE_RE_REVERSE))
      depth += (b == '{' ? +1 : -1)
      break if depth.zero?
    end
    raise "matching { brace not found" unless depth.zero?
    from - s.pos + 1
  end

  # insert substitutions into text at positions (Range or Fixnum)
  # substitutions can be passed as array or as yields from the &block called with |substring, position, text|
  # position is a range (begin..end)
  def replace_substrings_at(text, positions, replacements = nil, &block)
    offset = 0
    positions.each_with_index do |p, i|
      p = (p...p) if p.is_a?(Fixnum)
      from    = p.begin + offset
      to      = p.end + offset
      p       = p.exclude_end? ? (from...to) : (from..to)
      # block returns the substitution, e.g.: { |text, pos| text[pos].upcase }
      r       = replacements ? replacements[i] : block.call(text[p], p, text)
      text[p] = r
      # add the change in length to offset
      offset  += r.size - (p.end - p.begin + (p.exclude_end? ? 0 : 1))
    end
    text
  end

  def get_json(url)
    JSON.parse get_file(url)
  end

  # regular string scanner works with bytes
  # this one works with chars and provides #scan_next
  class CharStringScanner
    extend Forwardable

    def initialize(*args)
      @s = StringScanner.new(*args)
    end

    def_delegators :@s, :scan_until, :skip_until, :string

    # advance scanner to pos after the next match of pattern and return the match
    def scan_next(pattern)
      return unless @s.scan_until(pattern)
      @s.matched
    end

    def pos
      byte_to_str_pos @s.pos
    end

    def pos=(i)
      @s.pos = str_to_byte_pos i
      i
    end

    private

    def byte_to_str_pos(pos)
      @s.string.byteslice(0, pos).length
    end

    def str_to_byte_pos(pos)
      @s.string.slice(0, pos).bytesize
    end
  end

  class Logger
    include Term::ANSIColor

    def initialize(env)
      @env = env
      puts bold "Convert Bootstrap LESS to SASS"
      puts " repo   : #{env[:repo]}"
      puts " branch : #{env[:branch]} #{dark "#{env[:repo]}/tree/#{env[:branch_sha]}"}"
      puts " save to: #{@env[:save_at].to_json}"
      puts " twbs cache: #{@env[:cache_path]}"
      puts dark "-" * 60
    end

    def log_status(status)
      puts bold status
    end

    def log_file_info(s)
      puts "    #{magenta s}"
    end

    def log_transform(*args)
      puts "#{cyan "    #{caller[1][/`.*'/][1..-2].sub(/^block in /, '')}"}#{cyan ": #{args * ', '}" unless args.empty?}"
    end

    def log_processing(name)
      puts yellow "  #{File.basename(name)}"
    end

    def log_processed(name)
      puts green "    #{name}"
    end

    def log_http_get_file(url, cached = false)
      s = "  #{'CACHED ' if cached}GET #{url}..."
      if cached
        puts dark green s
      else
        puts dark cyan s
      end
    end

    def log_http_get_files(files, from, cached = false)
      s = "  #{'CACHED ' if cached}GET #{files.length} files from #{from} #{files * ' '}..."
      if cached
        puts dark green s
      else
        puts dark cyan s
      end
    end

    def puts(*args)
      STDOUT.puts *args unless @silence
    end

    def silence_log
      @silence = true
      yield
    ensure
      @silence = false
    end
  end
end
