# frozen_string_literal: true

require 'test_helper'
require 'shellwords'
require 'fileutils'
require 'bootstrap-sass'

class SassTest < Minitest::Test
  DUMMY_PATH = 'test/dummy_sass_only'

  def test_font_helper
    assert_match %r{url\(['"]?.*eot['"]?\)}, @css
  end

  def setup
    FileUtils.rm_rf(File.join(DUMMY_PATH, '.sass-cache'), secure: true)
    css_path = File.join GEM_PATH, 'tmp/bootstrap-sass-only.css'
    success  = Dir.chdir DUMMY_PATH do
      silence_stdout_if !ENV['VERBOSE'] do
        Bundler.with_original_env do
          system('bundle') && system('bundle', 'exec', 'ruby', 'compile.rb',
                                     Bootstrap.stylesheets_path, css_path)
        end
      end
    end
    assert success, 'Sass-only compilation failed'
    @css = File.read(css_path)
  end
end
