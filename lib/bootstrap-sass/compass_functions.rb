# This contains functions for use with a project *only* using Compass.
module Sass::Script::Functions
  def image_path(source, options = {})
    if defined?(::Sprockets)
      ::Sass::Script::String.new sprockets_context.image_path(source.value).to_s, :string
    elsif defined?(::Compass)
      image_url(source, Sass::Script::Bool.new(true))
    else
      # Revert to the old compass-agnostic path determination
      asset_sans_quotes = source.value.gsub('"', '')
      Sass::Script::String.new("/images/#{asset_sans_quotes}", :string)
    end
  end

  protected
  def sprockets_context # :nodoc:
    if options.key?(:sprockets)
      options[:sprockets][:context]
    else
      # Compatibility with sprockets pre 2.10.0
      options[:importer].context
    end
  end
end
