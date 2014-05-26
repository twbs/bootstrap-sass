require File.expand_path('../boot', __FILE__)

require 'rails/all'
require 'slim-rails'
require 'jquery-rails'
require 'bootstrap-sass'
require 'uglifier'

module Dummy
  class Application < Rails::Application
    config.assets.enabled = true if config.assets.respond_to?(:enabled)
  end
end

