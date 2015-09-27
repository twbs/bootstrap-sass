lib_path = File.join(File.dirname(__FILE__), 'lib')
$:.unshift(lib_path) unless $:.include?(lib_path)

load './tasks/bower.rake'

require 'rake/testtask'
Rake::TestTask.new do |t|
  t.libs << 'test'
  t.test_files = FileList['test/**/*_test.rb']
  t.verbose = true
end

desc 'Test all Gemfiles from test/*.gemfile'
task :test_all_gemfiles do
  require 'term/ansicolor'
  require 'pty'
  require 'shellwords'
  cmd      = 'bundle install --quiet && bundle exec rake --trace'
  statuses = Dir.glob('./test/gemfiles/*{[!.lock]}').map do |gemfile|
    env = {'BUNDLE_GEMFILE' => gemfile}
    cmd_with_env = "  (#{env.map { |k, v| "export #{k}=#{Shellwords.escape v}" } * ' '}; #{cmd})"
    $stderr.puts Term::ANSIColor.cyan("Testing\n#{cmd_with_env}")
    PTY.spawn(env, cmd) do |r, _w, pid|
      begin
        r.each_line { |l| puts l }
      rescue Errno::EIO
        # Errno:EIO error means that the process has finished giving output.
      ensure
        ::Process.wait pid
      end
    end
    [$? && $?.exitstatus == 0, cmd_with_env]
  end
  failed_cmds = statuses.reject(&:first).map { |(_status, cmd_with_env)| cmd_with_env }
  if failed_cmds.empty?
    $stderr.puts Term::ANSIColor.green('Tests pass with all gemfiles')
  else
    $stderr.puts Term::ANSIColor.red("Failing (#{failed_cmds.size} / #{statuses.size})\n#{failed_cmds * "\n"}")
    exit 1
  end
end

desc 'Dumps output to a CSS file for testing'
task :debug do
  require 'sass'
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
  require 'sass'
  require 'term/ansicolor'

  path = 'assets/stylesheets'
  css_path = args.with_defaults(css_path: 'tmp')[:css_path]
  puts Term::ANSIColor.bold "Compiling SCSS in #{path}"
  Dir.mkdir(css_path) unless File.directory?(css_path)
  %w(_bootstrap bootstrap/_theme).each do |file|
    save_path = "#{css_path}/#{file.sub(/(^|\/)?_+/, '\1').sub('/', '-')}.css"
    puts Term::ANSIColor.cyan("  #{save_path}") + '...'
    engine    = Sass::Engine.for_file("#{path}/#{file}.scss", syntax: :scss, load_paths: [path])
    css       = engine.render
    File.open(save_path, 'w') { |f| f.write css }
  end
end

desc 'Start a dummy (test) Rails app server'
task :dummy_rails do
  require 'rack'
  require 'term/ansicolor'
  port = ENV['PORT'] || 9292
  puts %Q(Starting on #{Term::ANSIColor.cyan "http://localhost:#{port}"})
  Rack::Server.start(
    config: 'test/dummy_rails/config.ru',
    Port: port)
end

task default: :test
