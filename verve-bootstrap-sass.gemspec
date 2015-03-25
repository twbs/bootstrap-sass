lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'verve-bootstrap-sass/version'

Gem::Specification.new do |s|
  s.name     = "verve-bootstrap-sass"
  s.version  = Bootstrap::VERSION
  s.authors  = ["Myron Robertson", "Grace Blackburn"]
  s.email    = 'myron@vervewireless.com'
  s.summary  = "verve-bootstrap-sass is a fork of the bootstrap-sass project for Verve Wireless"
  s.homepage = "https://github.com/VerveWireless/verve-bootstrap-sass"
  s.license  = 'MIT'

  s.add_runtime_dependency 'sass', '>= 3.2.19'
  s.add_runtime_dependency 'autoprefixer-rails', '>= 5.0.0.1'

  # Verve

  s.add_runtime_dependency 'select2-rails', '~> 3.5.9.3'
  s.add_runtime_dependency 'jquery-ui-sass-rails', '~> 4.0.3.0'
  s.add_development_dependency 'bourbon', '~> 4.2.0'
  s.add_development_dependency 'rspec'
  s.add_development_dependency 'rspec-rails'
  s.add_development_dependency 'pry'
  s.add_development_dependency 'actionview', '~> 4.2.0'

  # Testing dependencies
  s.add_development_dependency 'minitest-reporters', '~> 1.0.5'
  # Integration testing
  s.add_development_dependency 'minitest', '~> 5.4.0'
  s.add_development_dependency 'capybara'
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
  s.test_files = `git ls-files -- test/*`.split("\n") + `git ls-files -- test/*`.split("\n")
end
