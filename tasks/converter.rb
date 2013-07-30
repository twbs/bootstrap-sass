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
    bootstrap_less_files.each do |name|
      file = open("https://raw.github.com/#@repo/#@branch/less/#{name}").read

      case name
      when 'bootstrap.less'
        file = replace_file_imports(file)
      when 'mixins.less'
        file = replace_vars(file)
        file = replace_escaping(file)
        file = replace_mixin_file(file)
        file = replace_mixins(file)
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
    bootstrap_js_files.each do |name|
      file = open("https://raw.github.com/#@repo/#@branch/js/#{name}").read
      path = "vendor/assets/javascripts/bootstrap/#{name}"
      save_file(path, file)
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

  # Get the sha of a dir
  def get_tree_sha(dir)
    trees = open("https://api.github.com/repos/#@repo/git/trees/#@branch").read
    trees = JSON.parse trees
    trees['tree'].find{|t| t['path'] == dir}['sha']
  end

  def bootstrap_less_files
    files = open("https://api.github.com/repos/#@repo/git/trees/#{get_tree_sha('less')}").read
    files = JSON.parse files
    files['tree'].select{|f| f['type'] == 'blob' && f['path'] =~ /.less$/ }.map{|f| f['path'] }
  end

  def bootstrap_js_files
    files = open("https://api.github.com/repos/#@repo/git/trees/#{get_tree_sha('js')}").read
    files = JSON.parse files
    files['tree'].select{|f| f['type'] == 'blob' && f['path'] =~ /.js$/ }.map{|f| f['path'] }
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
      "#{matches.first}@include #{scope}#{matches.last}"
    end
  end

  def replace_mixin_file(less)
    less.gsub(/^(\s*)\.([\w-]+\(.*\))(\s*{)/, '\1@mixin \2\3')
  end

  def replace_vars(less)
    less = less.gsub(/(?!@media|@page|@keyframes|@font-face|@-\w)@/, '$')
    # variables that would be ignored by gsub above: e.g. @page-header-border-color
    less.gsub! /@(page-[\w-]+)/, '$\1'
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
end
