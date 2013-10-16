require 'test_helper'

class CompassTest < Test::Unit::TestCase
  def test_create_project_with_boostrap
    command = 'compass create tmp/new-compass-project -r bootstrap-sass --using bootstrap --trace --force'
    assert silence_stream(STDOUT) { system(command) }, 'Compass project creation failed!'
  end
end
