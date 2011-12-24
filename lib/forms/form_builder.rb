module Bootstrap
  class FormBuilder < ActionView::Helpers::FormBuilder
    def text_field(attr, *args, &block)
      options = args.extract_options!
      label = args.first.nil? ? '' : args.shift
      %(
      <div class="clearfix">
        #{self.label attr}
        <div class="input">
          #{super(attr)}
        </div>
      </div>
      ).html_safe
    end
  end
end
