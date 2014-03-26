require File.expand_path('../boot', __FILE__)

require 'rails/all'
Bundler.require(*Rails.groups)
require 'bootstrap-sass'
require 'slim-rails'
require 'jquery-rails'

module Dummy
  class Application < Rails::Application
    config.assets.enabled = true if config.assets.respond_to?(:enabled)
  end
end

