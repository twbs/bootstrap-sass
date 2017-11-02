# regular string scanner works with bytes
# this one works with chars and provides #scan_next
class Converter
  class CharStringScanner
    extend Forwardable

    def initialize(*args)
      @s = StringScanner.new(*args)
    end

    def_delegators :@s, :scan_until, :skip_until, :string

    # advance scanner to pos after the next match of pattern and return the match
    def scan_next(pattern)
      return unless @s.scan_until(pattern)
      @s.matched
    end

    def pos
      byte_to_str_pos @s.pos
    end

    def pos=(i)
      @s.pos = str_to_byte_pos i
      i
    end

    private

    def byte_to_str_pos(pos)
      @s.string.byteslice(0, pos).length
    end

    def str_to_byte_pos(pos)
      @s.string.slice(0, pos).bytesize
    end
  end
end