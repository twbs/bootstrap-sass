require 'sass'
require 'bootstrap-sass'

module Sass::Script::Functions
  def twbs_font_path(source)
    twbs_asset_path source, :font
  end
  declare :twbs_font_path, [:source]

  def twbs_image_path(source)
    twbs_asset_path source, :image
  end
  declare :twbs_image_path, [:source]

  def twbs_asset_path(source, type)
    url = if Bootstrap.asset_pipeline? && (context = sprockets_context)
            context.send(:"#{type}_path", source.value)
          elsif Bootstrap.compass?
            send(:"#{type}_url", source, Sass::Script::Bool.new(true)).value
          end

    # sass-only
    url ||= source.value.gsub('"', '')
    Sass::Script::String.new(url, :string)
  end
  declare :twbs_asset_path, [:source]
  
  # LARS: Snatched from compass - 2011-11-29 - used for gradients in IE6-9
  # returns an IE hex string for a color with an alpha channel
  # suitable for passing to IE filters.
  def twbs_ie_hex_str(color)
    assert_type color, :Color
    alpha = (color.alpha * 255).round
    alphastr = alpha.to_s(16).rjust(2, '0')
    Sass::Script::String.new("##{alphastr}#{color.send(:hex_str)[1..-1]}".upcase)
  end
  declare :twbs_ie_hex_str, [:color]

  protected

  def sprockets_context
    # Modern way to get context:
    if options.key?(:sprockets)
      options[:sprockets][:context]
    # Compatibility with sprockets pre 2.10.0:
    elsif (importer = options[:importer]) && importer.respond_to?(:context)
      importer.context
    end
  end
end