require 'test_helper_rails'

class PagesTest < ActionDispatch::IntegrationTest
  include ::DummyRailsIntegration

  def test_visit_root
    visit root_path
    # ^ will raise on JS errors

    assert_equal 200, page.status_code

    screenshot!
  end
end
