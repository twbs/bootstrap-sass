require 'rake/testtask'
Rake::TestTask.new do |t|
  t.libs << "test"
  t.test_files = FileList['test/*_test.rb']
  t.verbose    = true
end

desc 'Dumps output to a CSS file for testing'
task :debug do
  require 'sass'
  require './lib/bootstrap-sass/sass_functions'
  path = Bootstrap.stylesheets_path
  %w(bootstrap).each do |file|
    engine = Sass::Engine.for_file("#{path}/#{file}.scss", syntax: :scss, load_paths: [path])
    File.open("./#{file}.css", 'w') { |f| f.write(engine.render) }
  end
end

desc 'Convert bootstrap to bootstrap-sass'
task :convert, :branch do |t, args|
  require './tasks/converter'
  Converter.new(branch: args[:branch]).process_bootstrap
end

desc 'LESS to stdin -> Sass to stdout'
task :less_to_scss, :branch do |t, args|
  require './tasks/converter'
  puts Converter.new(branch: args[:branch]).convert_less(STDIN.read)
end

desc 'Compile bootstrap-sass to tmp/ (or first arg)'
task :compile, :css_path do |t, args|
  lib_path = File.join(File.dirname(__FILE__), 'lib')
  $:.unshift(lib_path) unless $:.include?(lib_path)
  require 'sass'
  require 'bootstrap-sass/sass_functions'
  require 'term/ansicolor'

  path = 'vendor/assets/stylesheets'
  puts Term::ANSIColor.bold "Compiling SCSS in #{path}"
  %w(bootstrap bootstrap/_theme).each do |file|
    save_path = "#{args.with_defaults(css_path: 'tmp')[:css_path]}/#{file.sub(/(^|\/)?_+/, '\1').sub('/', '-')}.css"
    puts Term::ANSIColor.cyan("  #{save_path}") + '...'
    engine    = Sass::Engine.for_file("#{path}/#{file}.scss", syntax: :scss, load_paths: [path])
    css       = engine.render
    Dir.mkdir('tmp') unless File.directory?('tmp')
    File.open(save_path, 'w') { |f| f.write css }
  end
end

task default: :test
