require 'test_helper'
require 'json'

class NodeMincerTest < Minitest::Test
  DUMMY_PATH = 'test/dummy_node_mincer'

  def test_image_helper
    assert_match %r(url\(['"]?apple-touch-icon-144-precomposed.*png['"]?\)), @css
  end

  def setup
    tmp_dir = File.join GEM_PATH, 'tmp/node-mincer'
    success = Dir.chdir DUMMY_PATH do
      silence_stdout_if !ENV['VERBOSE'] do
        system 'node', 'manifest.js', tmp_dir
      end
    end
    assert success, 'Node.js Mincer compilation failed'
    manifest = JSON.parse(File.read("#{tmp_dir}/manifest.json"))
    css_name = manifest['assets']['application.css']
    @css = File.read("#{tmp_dir}/#{css_name}")
  end
end
