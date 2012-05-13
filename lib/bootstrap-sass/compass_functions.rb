# This contains functions for use with a project *only* using Compass.

module Sass::Script::Functions
  # Define asset_url for Compass to allow use of sprites.
  def asset_url(asset, type)
    asset_sans_quotes = asset.value.gsub('"', '')
    path = Sass::Script::String.new("/#{type}s/#{asset_sans_quotes}", :string)
    Sass::Script::String.new("url(#{path})")
  end
end