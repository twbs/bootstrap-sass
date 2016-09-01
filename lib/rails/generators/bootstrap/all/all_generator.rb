require 'rails/generators/base'

module Bootstrap
  module Generators
    class AllGenerator < ::Rails::Generators::Base
      desc "Copy all bootstrap assets to application"
      def copy_all
        generate("bootstrap:stylesheets")
        generate("bootstrap:javascripts")
      end
    end
  end
end

