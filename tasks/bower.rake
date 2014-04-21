require 'find'
require 'bootstrap-sass'
require 'json'
require 'pathname'

namespace :bower do

  find_files = ->(path) {
    Find.find(Pathname.new(path).relative_path_from(Pathname.new Dir.pwd).to_s).map do |path|
      path if File.file?(path)
    end.compact
  }

  desc 'update main and version in bower.json'
  task :spec do
    Dir.chdir Bootstrap.gem_path do
      spec       = JSON.parse(File.read 'bower.json')
      js_paths   = File.read(File.join Bootstrap.javascripts_path, 'bootstrap.js').lines.map do |line|
        line.strip if line.sub!(%r(//\s*=\s*require\s*(.*)\s*), 'vendor/assets/javascripts/\1.js')
      end.compact

      spec['main'] =
          find_files.(File.join(Bootstrap.stylesheets_path, 'bootstrap.scss')) +
          find_files.(Bootstrap.fonts_path) +
          js_paths

      spec['version'] = Bootstrap::VERSION[0..-3]

      File.open('bower.json', 'w') do |f|
        f.puts JSON.pretty_generate(spec)
      end
    end
  end
end
