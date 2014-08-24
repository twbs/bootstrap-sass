require 'capybara'
require 'fileutils'
module DummyRailsIntegration
  include Capybara::DSL

  def setup
    super
    FileUtils.rm_rf('test/dummy_rails/tmp/cache', secure: true)
  end

  def teardown
    super
    Capybara.reset_sessions!
    Capybara.use_default_driver
  end

  def screenshot!
    path = "tmp/#{name}.png"
    page.driver.render(File.join(GEM_PATH, path), full: true)
    STDERR.puts "Screenshot saved to #{path}"
  end
end
