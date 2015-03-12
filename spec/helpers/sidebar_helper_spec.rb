require 'spec_helper'
require_relative '../../app/helpers/sidebar_helper'

describe 'SidebarHelper' do
  context 'rendered template' do
    let(:menu_items){[
      {
        icon: 'dashboard',
        name: 'Reports',
        url: '#',
        sub_menu: [
          {
            name: 'VLM Programming Direct',
            url: '#'
          },
          {
            name: 'Geo-temporal',
            url: '#'
          }
        ]
      },
      {
        icon: 'reports',
        name: 'API',
        url: '#',
        active: true,
        sub_menu: [
          {
            name: 'VLM Programming Direct',
            url: '#',
            active: true
          },
          {
            name: 'Geo-temporal',
            url: '#'
          }
        ]
      }
    ]}
    let(:sidebar_helper){ SidebarHelper }
    let(:template){
      class Template
        require 'action_view/base'
        extend ActionView::Helpers::TagHelper
        extend ActionView::Helpers::UrlHelper
        extend ActionView::Helpers::TextHelper
        extend ActionView::Context
      end
    }
    before(:each) do
      sidebar_helper.render_menu template, menu_items
    end
    describe 'variables' do
      it 'sets local valiables' do
        expect(sidebar_helper.template).to eq(template)
        expect(sidebar_helper.menu_items).to match_array(menu_items)
      end
    end
    describe 'rendering methods' do
      describe '#render_accordion_group' do
        it 'returns a div with the accordion class' do
          expect(sidebar_helper.render_accordion_group).to eq('<div class="accordion_group"></div>')
        end
        it 'returns a div with the requested content included' do
          expect(sidebar_helper.render_accordion_group("inner content")).to eq('<div class="accordion_group">inner content</div>')
        end
      end

      describe '#render_accordion_heading' do
        it 'returns a div with the accodion heading class' do
          expect(sidebar_helper.render_accordion_heading).to eq('<div class="accordion-heading"></div>')
        end
        it 'returns a div with the requested content included' do
          expect(sidebar_helper.render_accordion_heading("inner content")).to eq('<div class="accordion-heading">inner content</div>')
        end
      end
      describe '#render_nav_ul' do
        it 'returns a ul with the nav classes' do
          expect(sidebar_helper.render_nav_ul).to eq('<ul class="nav nav-stacked nav-sidebar"></ul>')
        end
        it 'returns a ul with the nav classes with requested content' do
          expect(sidebar_helper.render_nav_ul("inner content")).to eq('<ul class="nav nav-stacked nav-sidebar">inner content</ul>')
        end
      end
      describe '#render_nav_link' do
        it 'returns a the link tag for the main nav item' do
          link = menu_items.first
          expect(sidebar_helper.render_nav_link(link, 1)).to include('href="#"')
          expect(sidebar_helper.render_nav_link(link, 1)).to include('Reports')
          expect(sidebar_helper.render_nav_link(link, 1)).to include('<i class="glyphicon glyphicon-dashboard"></i>')
          expect(sidebar_helper.render_nav_link(link, 1)).to include('data-parent="verve-sb-acd1"')
          expect(sidebar_helper.render_nav_link(link, 1)).to include('data-target="#sidebar-accordion-1"')
          expect(sidebar_helper.render_nav_link(link, 1)).to include('data-toggle="collapse"')
          expect(sidebar_helper.render_nav_link(link, 1)).to include('class="accordion-toggle collapsed"')
        end
        it 'does not print an icon tag if it is not required' do
          link = {name: 'Link', url: '#'}
          expect(sidebar_helper.render_nav_link(link)).not_to include('<i class="glyphicon glyphicon-reports"></i>')
        end
        it 'sets the list item as active if it is set' do
          link = {name: 'Link', url: '#', icon: 'reports', active: true}
          expect(sidebar_helper.render_nav_link(link)).to include('<li class="active">')
        end
        it 'defaults the link url to # if no url is provided' do
          link = {name: 'Link', icon: 'reports'}
          expect(sidebar_helper.render_nav_link(link)).to include('href="#"')
        end
      end
      describe '#render_link' do
        it 'returns a link tag' do
          link = {name: 'Link', url: '#', class: 'active'}
          expect(sidebar_helper.render_link(link)).to include('Link')
          expect(sidebar_helper.render_link(link)).to include('class="active"')
          expect(sidebar_helper.render_link(link)).to include('href="#"')
        end
        it 'defaults the link url to # if no url is provided' do
          link = {name: 'Link'}
          expect(sidebar_helper.render_link(link)).to include('href="#"')
        end
      end
      describe '#render_sub_menu_ul' do
        it 'returns a ul with attributes' do
          expect(sidebar_helper.render_sub_menu_ul(nil, 1)).to include('class="accordion-body collapse"')
          expect(sidebar_helper.render_sub_menu_ul(nil, 1)).to include('id="sidebar-accordion-1"')
        end
        it 'returns a ul with attributes and requested content included' do
          expect(sidebar_helper.render_sub_menu_ul("inner content", 1)).to include('class="accordion-body collapse"')
          expect(sidebar_helper.render_sub_menu_ul("inner content", 1)).to include('id="sidebar-accordion-1"')
          expect(sidebar_helper.render_sub_menu_ul("inner content", 1)).to include('inner content')
        end
      end
      describe '#render_sub_menu_items' do
        it 'returns a list of submenu items' do
          sub_menu = menu_items.first[:sub_menu]
          expect(sidebar_helper.render_sub_menu_items(sub_menu)).to include('<li class=""><a href="#">VLM Programming Direct</a></li>')
          expect(sidebar_helper.render_sub_menu_items(sub_menu)).to include('<li class=""><a href="#">Geo-temporal</a></li>')
        end
      end
      describe '#render_sub_menu' do
        it 'returns a ul with sub menu list items' do
          sub_menu = menu_items.first[:sub_menu]
          expect(sidebar_helper.render_sub_menu(sub_menu, 1)).to eq('<ul id="sidebar-accordion-1" class="accordion-body collapse"><li class=""><a href="#">VLM Programming Direct</a></li><li class=""><a href="#">Geo-temporal</a></li></ul>')
        end
        it 'adds an active class to the requested sub menu item' do
          sub_menu = [
            {
              name: 'VLM Programming Direct',
              url: '#',
              active: true
            },
            {
              name: 'Geo-temporal',
              url: '#'
            }
          ]
          expect(sidebar_helper.render_sub_menu(sub_menu, 1)).to eq('<ul id="sidebar-accordion-1" class="accordion-body collapse"><li class="active"><a href="#">VLM Programming Direct</a></li><li class=""><a href="#">Geo-temporal</a></li></ul>')
        end
      end
      describe '#render_menu' do
        it 'renders the left navigation menu content' do
          menu = sidebar_helper.render_menu template, menu_items
          expect(menu).to eq(
                            "<div class=\"accordion_group\">"+
                              "<div class=\"accordion-heading\">"+
                                "<ul class=\"nav nav-stacked nav-sidebar\">"+
                                  "<li class=\"\">"+
                                    "<a href=\"#\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"verve-sb-acd1\" data-target=\"#sidebar-accordion-\"><i class=\"glyphicon glyphicon-dashboard\"></i>Reports</a>"+
                                    "<ul id=\"sidebar-accordion-\" class=\"accordion-body collapse\">"+
                                      "<li class=\"\"><a href=\"#\">VLM Programming Direct</a></li>"+
                                      "<li class=\"\"><a href=\"#\">Geo-temporal</a></li>"+
                                    "</ul>"+
                                  "</li>"+
                                "</ul>"+
                              "</div>"+
                            "</div>"+
                            "<div class=\"accordion_group\">"+
                              "<div class=\"accordion-heading\">"+
                                "<ul class=\"nav nav-stacked nav-sidebar\">"+
                                  "<li class=\"active\">"+
                                    "<a href=\"#\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"verve-sb-acd1\" data-target=\"#sidebar-accordion-\"><i class=\"glyphicon glyphicon-reports\"></i>API</a>"+
                                    "<ul id=\"sidebar-accordion-\" class=\"accordion-body collapse\">"+
                                      "<li class=\"active\"><a href=\"#\">VLM Programming Direct</a></li>"+
                                      "<li class=\"\"><a href=\"#\">Geo-temporal</a></li>"+
                                    "</ul>"+
                                  "</li>"+
                                "</ul>"+
                              "</div>"+
                            "</div>")
        end
      end
    end
  end
end