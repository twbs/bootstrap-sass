require 'test_helper'

class PagesTest < ActionDispatch::IntegrationTest
  include ::IntegrationTest

  def test_visit_root
    visit root_path
    # ^ will raise on JS errors

    assert_equal 200, page.status_code

    screenshot!
  end
end