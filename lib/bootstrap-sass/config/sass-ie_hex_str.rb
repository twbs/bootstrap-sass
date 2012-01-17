require 'sass'

module Sass::Script::Functions
  # LARS: Snatched from compass - 2011-11-29 - used for gradients in IE6-9
  # returns an IE hex string for a color with an alpha channel
  # suitable for passing to IE filters.
  def ie_hex_str(color)
    assert_type color, :Color
    alpha = (color.alpha * 255).round
    alphastr = alpha.to_s(16).rjust(2, '0')
    Sass::Script::String.new("##{alphastr}#{color.send(:hex_str)[1..-1]}".upcase)
  end
  declare :ie_hex_str, [:color]
end