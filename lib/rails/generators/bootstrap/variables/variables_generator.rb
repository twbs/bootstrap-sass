require 'rails/generators/base'

module Bootstrap
  module Generators
    class VariablesGenerator < ::Rails::Generators::Base
      source_root File.expand_path('../../../../../../vendor/assets/stylesheets/bootstrap', __FILE__)

      desc "Copy variables.css.scss to application for customization"

      def copy_variables
        copy_file "variables.css.scss", "app/assets/stylesheets/bootstrap/variables.css.scss"
      end
    end
  end
end

