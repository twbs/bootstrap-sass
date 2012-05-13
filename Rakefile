require 'rake/testtask'
Rake::TestTask.new do |t|
  t.libs << "test"
  t.test_files = FileList['test/*_test.rb']
  t.verbose = true
end

desc 'Dumps output to a CSS file for testing'
task :debug do
  require 'sass'
  require './lib/bootstrap-sass/compass_functions'
  require './lib/bootstrap-sass/rails_functions'
  path = './vendor/assets/stylesheets'
  engine = Sass::Engine.for_file("#{path}/_bootstrap.scss", syntax: :scss, load_paths: [path])
  File.open('./debug.css', 'w') { |f| f.write(engine.render) }
end

task default: :test