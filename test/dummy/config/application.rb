require File.expand_path('../boot', __FILE__)

require 'action_controller/railtie'
require 'sprockets/railtie'

Bundler.require(*Rails.groups)
require 'sass-rails'
require 'jquery-rails'
require 'slim-rails'
require 'bootstrap-sass'

module Dummy
  class Application < Rails::Application
    config.assets.enabled = true if config.assets.respond_to?(:enabled)
  end
end

