require 'capybara'
module IntegrationTest
  include Capybara::DSL

  def setup
    super
    %x[rm -rf test/dummy/tmp/cache]
  end

  def teardown
    super
    Capybara.reset_sessions!
    Capybara.use_default_driver
  end

  def after_teardown
    if @passed.blank?
      screenshot!
      puts "Failed at: #{current_url}"
    end
  end

  def screenshot!
    screenshot_dir = File.expand_path('../../tmp/', File.dirname(__FILE__))
    page.driver.render(File.join(screenshot_dir, "#{@__name__}.png"), :full => true)
    source = page.evaluate_script("document.getElementsByTagName('html')[0].outerHTML") rescue nil
    File.open(File.join(screenshot_dir, "#{@__name__}.html"), 'w') { |f| f.write(source) } if source
  end
end