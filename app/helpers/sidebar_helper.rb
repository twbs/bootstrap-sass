module SidebarHelper
  class << self
    attr_reader :menu_items, :template, :sidebar

    def render_menu template, menu_items=[]
      @template ||= template
      unless menu_items.empty?
        @menu_items = menu_items
        @sidebar = ""
        render_menu_items
      end
    end

    def render_menu_items
      menu = menu_items.map do |item, index|
        render_accordion_group render_accordion_heading render_nav_ul render_nav_link(item, index)
      end.join.html_safe
      menu
    end

    def render_accordion_group args=nil
      template.content_tag(:div, class: 'accordion_group') { args }
    end

    def render_accordion_heading args=nil
      template.content_tag(:div, class: 'accordion-heading'){ args }
    end

    def render_nav_ul args=nil
      template.content_tag(:ul, class: 'nav nav-stacked nav-sidebar') { args }
    end

    def render_nav_link link, index=nil
      url = link[:url] || '#'
      nav_link =  template.link_to link[:name], href: url, class: 'accordion-toggle collapsed', data: {toggle: 'collapse', parent: 'verve-sb-acd1', target: "#sidebar-accordion-#{index}" } do
                    render_icon(link[:icon]) + "#{link[:name]}"
      end
      sub_menu = render_sub_menu(link[:sub_menu], index) unless link[:sub_menu].nil?
      template.content_tag :li, class: "#{"active" if link[:active]}" do
        nav_link + sub_menu
      end
    end

    def render_link link
      url = link[:url] || '#'
      template.link_to link[:name], url, class: link[:class]
    end

    def render_icon icon
      icon ? template.content_tag(:i, nil, class: "glyphicon glyphicon-#{icon}") : ""
    end

    def render_sub_menu sub_menu, index
      render_sub_menu_ul render_sub_menu_items(sub_menu), index
    end

    def render_sub_menu_ul args, index
      template.content_tag(:ul, id: "sidebar-accordion-#{index}", class: 'accordion-body collapse') { args }
    end

    def render_sub_menu_items sub_menu
      sub_menu.map {|item| template.content_tag(:li, render_link(item), class: "#{"active" if item[:active]}" ) }.join.html_safe
    end
  end
end