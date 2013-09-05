require 'test_helper'
require 'bootstrap-sass/form_helper'

class FormHelperTest < ActionView::TestCase
  def test_viewport_meta_tag_no_arguments
    assert_equal %{<meta content="width=device-width,initial-scale=1.0" name="viewport" />}, viewport_meta_tag
  end

  def test_viewport_meta_tag_with_arguments
    assert_equal %{<meta content="width=device-width,initial-scale=2.0" name="viewport" />}, viewport_meta_tag(initial_scale: "2.0")
  end
end
