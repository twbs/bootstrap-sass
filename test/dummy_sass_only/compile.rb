require 'sass'
require 'bootstrap-sass'

css = Sass.compile(
    File.read(File.expand_path('./import_all.sass', File.dirname(__FILE__))),
    :syntax => 'sass'
)

if ARGV[0]
  File.open(ARGV[0], 'w') { |f| f.write css }
else
  puts css
end
