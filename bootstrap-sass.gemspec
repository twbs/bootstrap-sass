lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'bootstrap-sass/version'

Gem::Specification.new do |s|
  s.name     = "bootstrap-sass"
  s.version  = Bootstrap::VERSION
  s.authors  = ["Thomas McDonald"]
  s.email    = 'tom@conceptcoding.co.uk'
  s.summary  = "Twitter's Bootstrap, converted to Sass and ready to drop into Rails or Compass"
  s.homepage = "https://github.com/twbs/bootstrap-sass"
  s.license  = 'MIT'

  s.add_runtime_dependency 'sass', '~> 3.2'

  # Testing dependencies
  s.add_development_dependency 'test-unit', '~> 2.5.5'
  # Integration testing
  s.add_development_dependency 'capybara'
  s.add_development_dependency 'poltergeist'
  # Dummy Rails app dependencies
  s.add_development_dependency 'json', '>= 1.8.1'
  s.add_development_dependency 'sprockets-rails', '>= 2.0.1'
  s.add_development_dependency 'jquery-rails', '>= 3.1.0'
  s.add_development_dependency 'slim-rails'
  s.add_development_dependency 'uglifier'
  # Compass dummy app
  s.add_development_dependency 'compass'
  # Converter
  s.add_development_dependency 'term-ansicolor'

  s.files      = `git ls-files`.split("\n")
  s.test_files = `git ls-files -- test/*`.split("\n")
end
