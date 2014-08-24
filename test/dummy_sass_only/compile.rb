require 'sass'
require 'bootstrap-sass'
require 'fileutils'

scss_path = File.expand_path('./import_all.sass', File.dirname(__FILE__))
css = Sass.compile File.read(scss_path), syntax: 'sass'

if ARGV[0]
  FileUtils.mkdir_p File.dirname(ARGV[0])
  File.open(ARGV[0], 'w') { |f| f.write css }
else
  puts css
end
