require 'test_helper'

class CompassTest < Test::Unit::TestCase
  def test_create_project
    command = 'rm -rf tmp/new-compass-project; compass create tmp/new-compass-project -r bootstrap-sass --using bootstrap --trace --force'
    success = if ENV['VERBOSE']
                system command
              else
                silence_stream(STDOUT) { system(command) }
              end
    assert success, 'Compass project creation failed!'
  end
end
