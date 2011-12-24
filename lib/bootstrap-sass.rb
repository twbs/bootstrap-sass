require 'sass-rails'

module Bootstrap
  module Rails
    class Engine < ::Rails::Engine
      # Rails, will you please look in our vendor? kthx

      paths["config/initializers"] << 'lib/bootstrap-sass/config'
    end
  end
end

