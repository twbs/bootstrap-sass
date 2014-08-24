require 'test_helper'
require 'fileutils'

class NodeSassTest < Minitest::Test
  def test_node_sass_compilation
    path = 'assets/stylesheets'
    %w(bootstrap bootstrap/_theme).each do |file|
      FileUtils.mkdir_p 'tmp/node-sass'
      command = "node-sass #{path}/#{file} -o tmp/node-sass/#{File.basename file}.css"
      success = silence_stderr_if !ENV['VERBOSE'] do
        system command
      end
      assert success, 'node-sass compilation failed'
    end
  end
end
