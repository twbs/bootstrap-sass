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

class Converter
  def initialize(branch)
    @repo = 'twbs/bootstrap'
    @branch = branch || 'master'
  end

  def process
    process_stylesheet_assets
    process_javascript_assets
  end

  def process_stylesheet_assets
    puts "\nProcessing stylesheets..."
    read_files('less', bootstrap_less_files).each do |name, file|
      case name
      when 'bootstrap.less'
        file = replace_file_imports(file)
      when 'mixins.less'
        file = replace_vars(file)
        file = replace_escaping(file)
        file = replace_mixin_file(file)
        file = replace_mixins(file)
        file = flatten_mixins(file, '#gradient')
        file = parameterize_mixin_parent_selector(file, 'responsive-(in)?visibility')

      when 'utilities.less'
        file = replace_mixin_file(file)
        file = convert_to_scss(file)
      when 'variables.less'
        file = convert_to_scss(file)
        file = insert_default_vars(file)
      else
        file = convert_to_scss(file)
      end

      name = name.gsub(/\.less$/, '.scss')
      if name == 'bootstrap.scss'
        path = "vendor/assets/stylesheets/bootstrap/bootstrap.scss"
      else
        path = "vendor/assets/stylesheets/bootstrap/_#{name}"
      end
      save_file(path, file)
    end
  end

  def process_javascript_assets
    puts "\nProcessing javascripts..."
    read_files('js', bootstrap_js_files).each do |name, file|
      save_file("vendor/assets/javascripts/bootstrap/#{name}", file)
    end

    # Update javascript manifest
    content = ''
    bootstrap_js_files.each do |name|
      name = name.gsub(/\.js$/, '')
      content << "//= require bootstrap/#{name}\n"
    end
    path = "vendor/assets/javascripts/bootstrap.js"
    save_file(path, content)
  end

private

  def read_files(path, files)
    contents = {}
    files.map do |name|
      url = "https://raw.github.com/#@repo/#@branch/#{path}/#{name}"
      Thread.start {
        content = open(url).read
        Thread.exclusive {
          puts "GET #{url}"
          contents[name] = content
        }
      }
    end.each(&:join)
    contents
  end

  # Get the sha of a dir
  def get_tree_sha(dir)
    trees = open("https://api.github.com/repos/#@repo/git/trees/#@branch").read
    trees = JSON.parse trees
    trees['tree'].find{|t| t['path'] == dir}['sha']
  end

  def bootstrap_less_files
    @bootstrap_less_files ||= begin
      files = open("https://api.github.com/repos/#@repo/git/trees/#{get_tree_sha('less')}").read
      files = JSON.parse files
      files['tree'].select{|f| f['type'] == 'blob' && f['path'] =~ /.less$/ }.map{|f| f['path'] }
    end
  end

  def bootstrap_js_files
    @bootstrap_js_files ||= begin
      files = open("https://api.github.com/repos/#@repo/git/trees/#{get_tree_sha('js')}").read
      files = JSON.parse files
      files = files['tree'].select { |f| f['type'] == 'blob' && f['path'] =~ /.js$/ }.map { |f| f['path'] }
      files.sort_by { |f|
        case f
          # tooltip depends on popover and must be loaded earlier
          when /tooltip/ then
            1
          when /popover/ then
            2
          else
            0
        end
      }
    end
  end

  def get_mixins_name
    mixins      = []
    less_mixins = open("https://raw.github.com/#@repo/#@branch/less/mixins.less").read

    less_mixins.scan(/\.([\w-]+)\(.*\)\s?{?/) do |mixin|
      mixins << mixin
    end

    mixins
  end

  def convert_to_scss(file)
    file = replace_vars(file)
    file = replace_mixins(file)
    file = replace_less_extend(file)
    file = replace_spin(file)
    file = replace_image_urls(file)
    file = replace_image_paths(file)
    file = replace_escaping(file)
    file = convert_less_ampersand(file)
    file
  end

  def save_file(path, content, mode='w')
    File.open(path, mode) { |file| file.write(content) }
    puts "Saved #{path}\n"
  end

  def replace_file_imports(less)
    less.gsub(/@import ["|']([\w-]+).less["|'];/, '@import "bootstrap/\1";');
  end

  # @mixin a() { tr& { color:white } }
  # to:
  # @mixin a($parent) { tr#{$parent} { color: white } }
  def parameterize_mixin_parent_selector(file, rule_sel)
    param = '$parent'
    replace_rules(file, '\s*@mixin\s*' + rule_sel) do |mxn_css|
      mxn_css.sub! /(@mixin [\w-]+\()/, "\\1#{param}"
      replace_properties(mxn_css) { |props| "  \#{#{param}} { #{props.strip} }\n" }
      replace_rules(mxn_css) { |rule| replace_in_selector rule , /&/, "\#{#{param}}" }
    end
  end

  # #gradient > { @mixin horizontal ... }
  # to:
  # @mixin gradient-horizontal
  def flatten_mixins(file, container)
    replace_rules file, Regexp.escape(container) do |mixins_css|
      unwrapped = mixins_css.split("\n")[1..-2] * "\n"
      unindent(unwrapped.gsub /@mixin\s*([\w-]+)/, "@mixin #{container}-\\1")
    end
  end

  # Replaces the following:
  #  .mixin()          -> @import mixin()
  #  #scope > .mixin() -> @import scope-mixin()
  def replace_mixins(less)
    mixin_pattern = /(\s*)(([#|\.][\w-]+\s*>\s*)*)\.([\w-]+\(.*\))/
    less.gsub(mixin_pattern) do |match|
      matches = match.scan(mixin_pattern).flatten
      scope = matches[1] || ''
      if scope != ''
        scope = scope.scan(/[\w-]+/).join('-') + '-'
      end
      "#{matches.first}@include #{scope}#{matches.last.tr(';', ',')}"
    end
  end

  def replace_mixin_file(less)
    less.gsub(/^(\s*)\.([\w-]+\(.*\))(\s*\{)/) { |match|
      "#{$1}@mixin #{$2.tr(';', ',')}#{$3}"
    }
  end

  def replace_vars(less)
    less = less.gsub(/(?!@media|@page|@keyframes|@font-face|@-\w)@/, '$')
    # variables that would be ignored by gsub above: e.g. @page-header-border-color
    less.gsub! /@(page[\w-]+)/, '$\1'
    less
  end

  def replace_less_extend(less)
    less.gsub(/\#(\w+) \> \.([\w-]*)(\(.*\));?/, '@include \1-\2\3;')
  end

  def replace_spin(less)
    less.gsub(/spin/, 'adjust-hue')
  end

  def replace_image_urls(less)
    less.gsub(/background-image: url\("?(.*?)"?\);/) {|s| "background-image: image-url(\"#{$1}\");" }
  end

  def replace_image_paths(less)
    less.gsub('../img/', '')
  end

  def replace_escaping(less)
    less = less.gsub(/\~"([^"]+)"/, '#{\1}') # Get rid of ~"" escape
    #less.gsub(/(\W)e\("([^\)]+)"\)/) {|s| "#{$1 if $1 != /\s/}#{$2}"} # Get rid of e escape
    less.gsub(/(\W)e\(%\((.*)\)\)/, '\1\2') # Get rid of e(%("")) escape
  end

  def insert_default_vars(scss)
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
    txt.gsub /^\s{1,#{n}}/, ''
  end

  # replace CSS rule blocks matching rule_prefix with yields
  #
  # replace_rules(".a{ \n .b{} }", '.b') { |rule| ">#{rule}<"  } #=> ".a{ \n >.b{}< }"
  def replace_rules(less, rule_prefix = '\s*')
    less = less.dup
    s = StringScanner.new(less)
    rule_start_re = /^#{rule_prefix}[^{]*{/
    while (rule_start = scan_next(s, rule_start_re))
      rule_pos = (s.pos - rule_start.length..next_brace_pos(less, s.pos - 1))
      group = less[rule_pos]
      less[rule_pos] = yield(group)
    end
    less
  end

  # replace in the top-level selector
  # replace_in_selector('a {a: {a: a} } a {}', /a/, 'b') => 'b {a: {a: a} } b {}'
  def replace_in_selector(css, pattern, sub)
    # scan for selector positions in css
    s = StringScanner.new(css)
    prev_pos = 0
    sel_pos = []
    while (brace = scan_next(s, /\{/))
      sel_pos << (prev_pos .. s.pos - 1)
      s.pos = next_brace_pos(css, s.pos - 1) + 1
      prev_pos = s.pos
    end
    # insert replacements
    insert_sub(css, sel_pos) { |css, p| css[p].gsub(pattern, sub) }
  end


  SELECTOR_RE = /[$\w\-{}#\s,:&]+/
  BRACE_RE = /(?![#])[{}]/m

  # replace first level properties in the css with yields
  # replace_properties("a { color: white }") { |props| props.gsub 'white', 'red' }
  def replace_properties(css, &block)
    s = StringScanner.new(css)
    s.skip_until /{\n?/
    prev_pos = s.pos
    depth = 0
    pos = []
    while (b = scan_next(s, /#{SELECTOR_RE}(?![#])\{\n?|\}/))
      if depth.zero?
        if b == '}'
          prev_pos = s.pos
        else
          pos << (prev_pos .. s.pos - b.length )
        end
        depth += (b == '}' ?  -1 : +1)
      end
    end
    insert_sub(css, pos) { |css, p| yield(css[p]) }
  end


  # next matching brace for brace at brace_pos in css
  def next_brace_pos(css, brace_pos)
    depth = 0
    s = StringScanner.new(css[brace_pos..-1])
    while (b = scan_next(s, BRACE_RE))
      depth += (b == '}' ? -1 : +1)
      break if depth.zero?
    end
    raise "match not found for {" unless depth.zero?
    brace_pos + s.pos - 1
  end

  # advance scanner to pos after the next match of pattern and return the match
  def scan_next(scanner, pattern)
    return unless scanner.skip_until(pattern)
    scanner.pos -= scanner.matched_size
    scanner.scan pattern
  end

  # insert substitutions into css at positions
  # substitutions are yields from block called with (css, (begin..end))
  def insert_sub(css, positions, &block)
    offset = 0
    positions.each do |p|
      p = (p.begin + offset .. p.end + offset)
      r = block.call(css, p)
      offset += r.size - p.size
      css[p] = r
    end
    css
  end
end
