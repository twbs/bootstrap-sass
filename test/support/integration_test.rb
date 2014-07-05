require 'capybara'
module IntegrationTest
  include Capybara::DSL

  def setup
    super
    %x[rm -rf test/dummy_rails/tmp/cache]
  end

  def teardown
    super
    Capybara.reset_sessions!
    Capybara.use_default_driver
  end

  def screenshot!
    screenshot_dir = File.expand_path('../../tmp/', File.dirname(__FILE__))
    page.driver.render(File.join(screenshot_dir, "#{name}.png"), :full => true)
    source = page.evaluate_script("document.getElementsByTagName('html')[0].outerHTML") rescue nil
    File.open(File.join(screenshot_dir, "#{name}.html"), 'w') { |f| f.write(source) } if source
  end
end
