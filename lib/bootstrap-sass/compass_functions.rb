# This contains functions for use with a project *only* using Compass.

module Sass::Script::Functions
  # Define image_path for Compass to allow use of sprites without url() wrapper.
  def image_path(asset)
    if defined?(::Compass)
      image_url(asset, Sass::Script::Bool.new(true))
    else
      # Revert to the old compass-agnostic path determination
      asset_sans_quotes = asset.value.gsub('"', '')
      Sass::Script::String.new("/images/#{asset_sans_quotes}", :string)
    end
  end
end