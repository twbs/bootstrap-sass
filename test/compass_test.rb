require 'test_helper'

class CompassTest < Minitest::Test
  def test_create_project
    command = 'rm -rf tmp/new-compass-project; bundle exec compass create tmp/new-compass-project -r bootstrap-sass --using bootstrap --trace --force'
    success = silence_stdout_if(!ENV['VERBOSE']) { system(command) }
    assert success, 'Compass project creation failed!'
  end
end
