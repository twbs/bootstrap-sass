require 'test_helper'

class PagesTest < ActionDispatch::IntegrationTest
  include ::IntegrationTest

  def test_visit_root
    visit root_path
    # ^ will raise on JS errors

    assert_equal page.status_code, 200

    screenshot!
  end
end