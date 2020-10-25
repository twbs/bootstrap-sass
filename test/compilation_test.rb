require 'test_helper'
require 'fileutils'
require 'sassc'

class CompilationTest < Minitest::Test
  def test_compilation_bootstrap
    compile 'bootstrap'
    assert true # nothing was raised
  end

  def test_compilation_bootstrap_theme
    compile 'bootstrap/theme'
    assert true # nothing was raised
  end

  private

  def compile(file)
    path = File.expand_path('../assets/stylesheets', __dir__)
    FileUtils.rm_rf('.sass-cache', secure: true)
    engine = SassC::Engine.new(
      %Q{@import "#{path}/#{file}"},
      syntax: :scss, load_paths: ['.']
    )
    FileUtils.mkdir_p("tmp/#{File.dirname(file)}")
    File.open("tmp/#{file}.css", 'w') { |f|
      f.write engine.render
    }
  end
end
