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
  s.add_development_dependency 'minitest', '~> 5.4.0'
  s.add_development_dependency 'minitest-reporters', '~> 1.0.5'
  # Integration testing
  s.add_development_dependency 'capybara'
  s.add_development_dependency 'poltergeist'
  # Dummy Rails app dependencies
  s.add_development_dependency 'actionpack', '>= 4.1.5'
  s.add_development_dependency 'activesupport', '>= 4.1.5'
  s.add_development_dependency 'json', '>= 1.8.1'
  s.add_development_dependency 'sprockets-rails', '>= 2.1.3'
  s.add_development_dependency 'autoprefixer-rails', '~> 1.1'
  s.add_development_dependency 'jquery-rails', '>= 3.1.0'
  s.add_development_dependency 'slim-rails'
  s.add_development_dependency 'uglifier'
  # Converter
  s.add_development_dependency 'term-ansicolor'

  s.files      = `git ls-files`.split("\n")
  s.test_files = `git ls-files -- test/*`.split("\n")
end
