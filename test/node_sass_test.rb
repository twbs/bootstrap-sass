require 'test_helper'
require 'fileutils'

class NodeSassTest < Test::Unit::TestCase
  def test_node_sass_compilation
    path = 'vendor/assets/stylesheets'
    %w(bootstrap bootstrap/_theme).each do |file|
      FileUtils.mkdir_p "tmp/node-sass"
      command = "node-sass #{path}/#{file} -o tmp/node-sass/#{File.basename file}.css"
      assert silence_stream(STDOUT) {
        system(command)
      }, 'node-sass compilation failed'
    end
  end
end
