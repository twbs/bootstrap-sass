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
    return Sass::Script::String.new('', :string) if source.to_s.empty?
    url = if Bootstrap.asset_pipeline? && (context = sprockets_context)
            context.send(:"#{type}_path", source.value)
          elsif Bootstrap.compass?
            send(:"#{type}_url", source, Sass::Script::Bool.new(true)).value.sub /url\((.*)\)$/, '\1'
          end

    # sass-only
    url ||= source.value.gsub('"', '')
    Sass::Script::String.new(url, :string)
  end
  declare :twbs_asset_path, [:source, :type]

  unless Sass::Script::Functions.instance_methods.include?(:ie_hex_str)
    # polyfill sass < 3.2.6 (taken from sass 3.2.12):
    def ie_hex_str(color)
      assert_type color, :Color, :color
      alpha = (color.alpha * 255).round.to_s(16).rjust(2, '0')
      Sass::Script::String.new("##{alpha}#{color.send(:hex_str)[1..-1]}".upcase)
    end
    declare :ie_hex_str, [:color]
  end

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
