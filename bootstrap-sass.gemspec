lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'bootstrap-sass/version'

Gem::Specification.new do |s|
  s.name     = 'bootstrap-sass'
  s.version  = Bootstrap::VERSION
  s.authors  = ['Thomas McDonald']
  s.email    = 'tom@conceptcoding.co.uk'
  s.summary  = 'bootstrap-sass is a Sass-powered version of Bootstrap 3, ready to drop right into your Sass powered applications.'
  s.homepage = 'https://github.com/twbs/bootstrap-sass'
  s.license  = 'MIT'

  s.add_runtime_dependency 'sass', '>= 3.3.4'
  s.add_runtime_dependency 'autoprefixer-rails', '>= 5.2.1'

  # Testing dependencies
  s.add_development_dependency 'minitest', '~> 5.8'
  s.add_development_dependency 'minitest-reporters', '~> 1.1'
  # Integration testing
  s.add_development_dependency 'capybara', '>= 2.5.0'
  s.add_development_dependency 'poltergeist'
  # Dummy Rails app dependencies
  s.add_development_dependency 'actionpack', '>= 4.1.5'
  s.add_development_dependency 'activesupport', '>= 4.1.5'
  s.add_development_dependency 'json', '>= 1.8.1'
  s.add_development_dependency 'sprockets-rails', '>= 2.1.3'
  s.add_development_dependency 'jquery-rails', '>= 3.1.0'
  s.add_development_dependency 'slim-rails'
  s.add_development_dependency 'uglifier'
  # Converter
  s.add_development_dependency 'term-ansicolor'

  s.files      = `git ls-files`.split("\n")
  s.test_files = `git ls-files -- test/*`.split("\n")
end
