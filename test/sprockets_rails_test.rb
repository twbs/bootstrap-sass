require 'test_helper'
require 'fileutils'
require 'find'
require 'shellwords'

class SprocketsRailsTest < ActiveSupport::TestCase

  def test_sprockets_digest_asset_refs
    system "cd #{Shellwords.escape Rails.root.to_s} && bundle exec rake assets:precompile GEMFILE=#{Bootstrap.gem_path}/Gemfile RAILS_ENV=production"
    Dir.glob(Rails.root.join('public', 'assets', 'app*.*')) do |path|
      next unless path =~ /\.(css|js)$/
      File.open(path, 'r') do |f|
        f.read.scan /url\("?[^"]+\.(?:jpg|png|eot|woff|ttf|svg)[^"]*"?\)/ do |m|
          assert_match /-[0-9a-f]{12,}\./, m
        end
      end
    end
  ensure
    system "rm -rf #{Rails.root}/public/assets/ #{Rails.root}/tmp/cache/"
  end
end
