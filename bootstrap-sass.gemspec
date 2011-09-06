Gem::Specification.new do |s|
  s.name = "bootstrap-sass"
  s.version = '1.2.1'
  s.authors = ["Thomas McDonald"]
  s.email = 'tom@conceptcoding.co.uk'
  s.summary = "Twitter's Bootstrap, converted to SASS and ready to drop into Rails"
  s.homepage = "http://github.com/thomas-mcdonald/bootstrap-sass"

  s.add_dependency 'sass-rails'

  s.files = Dir["vendor/**/*.css.scss"] + ["README.md", "LICENSE", "lib/bootstrap-sass.rb"]
end

