# This contains functions for use with a project *only* using Compass.

module Sass::Script::Functions
  module ImageUrl
    # Define image_path for Compass to allow use of sprites without url() wrapper.
    def image_path(asset)
      image_url(asset, Sass::Script::Bool.new(true))
    end
  end
end