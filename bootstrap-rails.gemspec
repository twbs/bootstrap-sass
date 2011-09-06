Gem::Specification.new do |s|
  s.name = "bootstrap-rails"
  s.version = '1.2.0'
  s.authors = ["Thomas McDonald"]
  s.email = 'tom@conceptcoding.co.uk'
  s.summary = "Twitter's Bootstrap, converted to SASS and ready to drop into Rails"
  s.homepage = "http://github.com/thomas-mcdonald/bootstrap-rails"

  s.add_dependency 'sass-rails'

  s.files = Dir["vendor/**/*.css.scss"] + ["README.md", "LICENSE", "lib/bootstrap-rails.rb"]
end


