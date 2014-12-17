require 'test_helper'
require 'fileutils'
require 'find'
require 'shellwords'

class SprocketsRailsTest < Minitest::Test

  def test_sprockets_digest_asset_refs
    root     = 'test/dummy_rails'
    command  = "bundle exec rake assets:precompile GEMFILE=#{GEM_PATH}/Gemfile RAILS_ENV=production"
    compiled = Dir.chdir root do
      silence_stderr_if !ENV['VERBOSE'] do
        system(command)
      end
    end
    assert compiled, 'Could not precompile assets'
    Dir.glob(File.join(root, 'public', 'assets', 'app*.{css,js}')) do |path|
      File.open(path, 'r') do |f|
        f.read.scan /url\("?[^"]+\.(?:jpg|png|eot|woff2?|ttf|svg)[^"]*"?\)/ do |m|
          assert_match /-[0-9a-f]{12,}\./, m
        end
      end
    end
  ensure
    FileUtils.rm_rf %W(#{root}/public/assets/ #{root}/tmp/cache/), secure: true
  end
end
