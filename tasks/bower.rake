require 'find'
require 'json'
require 'pathname'

namespace :bower do

  find_files = ->(path) {
    Find.find(Pathname.new(path).relative_path_from(Pathname.new Dir.pwd).to_s).map do |path|
      path if File.file?(path)
    end.compact
  }

  desc 'update main and version in bower.json'
  task :generate do
    require 'bootstrap-sass'
    Dir.chdir Bootstrap.gem_path do
      spec       = JSON.parse(File.read 'bower.json')

      spec['main'] =
          find_files.(File.join(Bootstrap.stylesheets_path, '_bootstrap.scss')) +
          find_files.(Bootstrap.fonts_path) +
          %w(assets/javascripts/bootstrap.js)

      spec['version'] = Bootstrap::VERSION

      File.open('bower.json', 'w') do |f|
        f.puts JSON.pretty_generate(spec)
      end
    end
  end
end
