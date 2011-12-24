module Bootstrap
  module HTMLBuilders
    def navbar(options = {}, &block)
      content = capture(&block)
      if options[:fixed] == true
        barclass = "navbar navbar-fixed"
      else
        barclass = "navbar"
      end
      %(<div class="#{barclass}"><div class="navbar-inner"><div class="container">#{content}</div></div></div>).html_safe
    end
  end
end
