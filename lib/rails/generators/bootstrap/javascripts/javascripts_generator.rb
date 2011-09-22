require 'rails/generators/base'

module Bootstrap
  module Generators
    class JavascriptsGenerator < ::Rails::Generators::Base
      SOURCE_ROOT = File.expand_path('../../../../../../vendor/assets/javascripts', __FILE__)
      source_root SOURCE_ROOT

      desc "Copy all bootstrap javascript files to app"

      def copy_all_javascripts
        Dir[File.join(SOURCE_ROOT, "*.js")].each do |file|
          basename = File.basename(file) 
          copy_file basename, "app/assets/javascripts/#{basename}"
        end
      end
    end
  end
end

