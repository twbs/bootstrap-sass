# frozen_string_literal: true

require 'sassc'
require 'bootstrap-sass'
require 'fileutils'

load_path = ARGV[0]
out_path = ARGV[1]

output = SassC::Engine.new(
  File.read(File.expand_path('./import_all.scss', __dir__)),
  syntax: :scss, load_paths: ['.', load_path]
).render

if out_path
  FileUtils.mkdir_p(File.dirname(out_path))
  File.write(out_path, output)
else
  puts output
end
