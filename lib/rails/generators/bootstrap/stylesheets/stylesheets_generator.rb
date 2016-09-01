require 'rails/generators/base'

module Bootstrap
  module Generators
    class StylesheetsGenerator < ::Rails::Generators::Base
      SOURCE_ROOT = File.expand_path('../../../../../../vendor/assets/stylesheets', __FILE__)
      source_root SOURCE_ROOT

      desc "Copy all bootstrap stylesheet files to app"

      def copy_all_stylesheets
        Dir[File.join(SOURCE_ROOT, "bootstrap", "*.css.scss")].each do |file|
          basename = File.basename(file) 
          copy_file "bootstrap/#{basename}", "app/assets/stylesheets/bootstrap/#{basename}"
        end
        generate("bootstrap:variables")
      end
    end
  end
end

