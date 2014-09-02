require 'test_helper'
require 'json'

class NodeMincerTest < Minitest::Test
  DUMMY_PATH = 'test/dummy_node_mincer'

  def test_font_helper_without_suffix
    assert_match %r(url\(['"]?/assets/.*eot['"]?\)), @css
  end

  def test_font_helper_with_suffix_sharp
    assert_match %r(url\(['"]?/assets/.*svg#.+['"]?\)), @css
  end

  def test_font_helper_with_suffix_question
    assert_match %r(url\(['"]?/assets/.*eot\?.*['"]?\)), @css
  end

  def test_image_helper
    assert_match %r(url\(['"]?/assets/apple-touch-icon-144-precomposed.*png['"]?\)), @css
  end

  def setup
    tmp_dir = File.join GEM_PATH, 'tmp/node-mincer'
    command = "node manifest.js #{tmp_dir}"
    success = Dir.chdir DUMMY_PATH do
      silence_stdout_if !ENV['VERBOSE'] do
        system(command)
      end
    end
    assert success, 'Node.js Mincer compilation failed'
    manifest = JSON.parse(File.read("#{tmp_dir}/manifest.json"))
    css_name = manifest["assets"]["application.css"]
    @css = File.read("#{tmp_dir}/#{css_name}")
  end
end
