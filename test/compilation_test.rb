require 'test_helper'
require 'fileutils'

class CompilationTest < Test::Unit::TestCase
  def test_compilation
    path = 'vendor/assets/stylesheets'
    %w(bootstrap bootstrap/_theme).each do |file|
      engine = Sass::Engine.for_file("#{path}/#{file}.scss", syntax: :scss, load_paths: [path])
      assert_nothing_raised do
        FileUtils.mkdir_p("tmp/#{File.dirname(file)}")
        File.open("tmp/#{file}.css", 'w') { |f|
          f.write engine.render
        }
      end
    end
  end
end
