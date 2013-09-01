require 'action_controller/railtie'

module Bootstrap
  class Application < ::Rails::Application ; end
end

Bootstrap::Application.routes.draw do
  get '/:controller(/:action(/:id))'
end

Bootstrap::Application.config.secret_key_base = 'c0ccb'
ActionController::Base.send :include, Bootstrap::Application.routes.url_helpers
