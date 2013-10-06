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

require_relative 'converter/fonts_conversion'
require_relative 'converter/less_conversion'
require_relative 'converter/js_conversion'
require_relative 'converter/logger'
require_relative 'converter/network'

class Converter
  extend Forwardable
  include Network
  include LessConversion
  include JsConversion
  include FontsConversion

  def initialize(branch)
    @git_data_api_host = 'https://api.github.com/repos'
    @git_raw_host  = 'https://raw.github.com'

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

  def save_file(path, content, mode='w')
    File.open(path, mode) { |file| file.write(content) }
  end

  # Update version.rb file with BOOTSTRAP_SHA
  def store_version
    path = 'lib/bootstrap-sass/version.rb'
    content = File.read(path).sub(/BOOTSTRAP_SHA\s*=\s*['"][\w]+['"]/, "BOOTSTRAP_SHA = '#@branch_sha'")
    File.open(path, 'w') { |f| f.write(content) }
  end
end
