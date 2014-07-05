require 'test_helper'

class SassTest < Test::Unit::TestCase
  DUMMY_PATH = 'test/dummy_sass_only'

  def test_font_helper
    assert_match %r(url\(['"]?.*eot['"]?\)), @css
  end

  def setup
    Dir.chdir DUMMY_PATH do
      %x[rm -rf .sass-cache/]
      %x[bundle]
    end
    css_path = File.join Bootstrap.gem_path, 'tmp/bootstrap-sass-only.css'
    command = "bundle exec ruby compile.rb #{css_path}"
    Dir.chdir DUMMY_PATH do
      assert silence_stream(STDOUT) {
        system(command)
      }, 'Sass-only compilation failed'
    end
    @css = File.read(css_path)
  end
end
