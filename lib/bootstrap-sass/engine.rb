module Bootstrap
  module Rails
    class Engine < ::Rails::Engine
      # Rails, will you please look in our vendor? kthx
      initializer 'bootstrap-less.setup_helpers' do |app|
        app.config.to_prepare do
          ActionController::Base.send :helper, BootstrapFlashHelper
        end
      end
    end
  end
end