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

  s.add_development_dependency 'compass'
  s.add_development_dependency 'term-ansicolor'
  s.add_development_dependency 'sass-rails', '>= 3.2'
  s.add_runtime_dependency 'sass', '~> 3.2'

  s.add_development_dependency 'capybara'
  s.add_development_dependency 'poltergeist'
  s.add_development_dependency 'tzinfo'
  s.add_development_dependency 'jquery-rails'
  s.add_development_dependency 'slim-rails'
  s.add_development_dependency 'uglifier'

  s.files      = `git ls-files`.split("\n")
  s.test_files = `git ls-files -- test/*`.split("\n")
end
