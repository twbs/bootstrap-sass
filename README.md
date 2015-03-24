# Verve Bootstrap with Sass

## Installation

Add `bootstrap-sass` to your Gemfile and point to the repo at git

    gem 'bootstrap-sass', git: 'git@github.com:VerveWireless/bootstrap-sass.git'
    
Add the following runtime dependency
    
    gem 'select2-rails', '~> 3.5.9.3'
    gem 'jquery-ui-sass-rails', '~> 4.0.3.0'

Run bundle install
    
## Rails Setup

Add the following to your application.scss

    ```scss
    // "bootstrap-sprockets" must be imported before "bootstrap" and "bootstrap/variables"
    @import "bootstrap-sprockets";
    @import "bootstrap";
    ```
    
Add the following to your application.js
    
    //= require bootstrap-sprockets
    //= require verve_all
    
Or if you would like to use coffeescript syntax
        
    #= require bootstrap-sprockets
    #= require verve_all

Restart your rails server...

   
## Views

### application.html

Update your `application.html.erb` to read the look like the following. This will give you a basic setup with a header, sidebar, and footer components.

    <!DOCTYPE html>
    <html>
    <head>
      <title>StyleGuide</title>
      <%= stylesheet_link_tag    'application', media: 'all' %>
      <%= javascript_include_tag 'application' %>
      <%= csrf_meta_tags %>
    </head>
    <body>
    <div class="wrap">
      <%= render 'layouts/navigation' %>
      <div class="container-fluid">
        <div class="row">
          <%= render 'layouts/sidebar' %>
          <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 col-xs-offset-2 main">
            <%= yield %>
          </div>
        </div>
      </div>
    </div>
    <%= render 'layouts/footer' %>
    </body>
    </html>

## Components

Download and run the sample rails app [here](https://github.com/VerveWireless/bootstrap-sass/compare/master...VerveWireless:development?expand=1) for a full list of components and sample page views.
Bellow are a few of the common components that you may use in your application.

## Helpers


### Namespace

By default the `Verve` namespace has been created and is available to you for use with your js.

### Form validation helper

    Verve.FormValidation
    
#### Usage
    
Add `data-required="true"` to your input field and label. Form validator will apply simple validation to check if the field is empty before your form is submitted.

#### Example

Add the following to your javascript file

    # coffeescript
    
      $ document
      .ready ->
        Verve.FormsValidation?.simpleValidation()
      
    // javascript
    
      $(document).ready(function(){
        if( Verve.FormsValidation !== null ){
          Verve.FormsValidation.simpleValidation()
        }      
      });

Add the following html to your page
    
    <from class="form-horizontal">
      <div class="form-group">
        <label for="inputOrderName" class="col-lg-2 control-label" data-required="true">Order Name</label>
        <div class="col-lg-10">
          <input type="text" class="form-control" id="inputOrderName" name="inputOrderName" data-required="true">
        </div>
      </div>
    </form>
        
### Sidebar helper

The sidebar helper provides a simple method to use for building out a left navigation. To use this method you will need to modify the `application.erb` code from above as follows.

    <div class="wrap">
      [remove] <%= render 'layouts/navigation' %> [/remove]
      [add]
      <div class="col-sm-3 col-md-2 accordion sidebar" id="acd1">
        <div class="accordion-group">
            <div class="accordion-heading" id="menu-controller">
              <ul class="nav nav-stacked nav-sidebar">
                <li>
                  <a class="accordion-toggle collapsed"><i class="glyphicon glyphicon-plus"></i></a>
                </li>
              </ul>
            </div>
        </div>
        <%= SidebarHelper.render_menu self, menu_items %>
      </div>
      [/add]
      <div class="container-fluid">
        <div class="row">
          <%= render 'layouts/sidebar' %>
          <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 col-xs-offset-2 main">
            <%= yield %>
          </div>
        </div>
      </div>
    </div>

#### Methods

    render_menu( Object, Array)
    
#### Params
    
    (type) Object: ActionView object is used for template helpers to write html tags
    
    (type) Array: An array of objects to use to generate links and sub-menu items
    
    \javascript
    Example: [
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
             ]

#### Description
    
| name      |  type    | description                                                                                                                                                                                                   | required  |  default value |
|-----------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|----------------|
| icon      |  string  | Name of icon will be appended to the glyphicon class name.<br/><br/><b>Example</b>: icon: 'reports'<br/><br/><b>Response with</b>: glyphicon-reports<br/><br/>CSS styleing is handled through bootstrap.      |  y        |                |
| name      |  string  | Name to be used in the link.                                                                                                                                                                                  |  y        |                |
| active    |  boolean | Ads an active class for the active url. This logic is not maintained within the gem, but can be set within the application.                                                                                   |  n        |  false         |
| url       |  string  | Url for the link.                                                                                                                                                                                             |  n        |  #             |
| sub_menu  |  array   | An array of link objects. Sub-menu links do not support icon usage.                                                                                                                                           |  n        |                |


Sample navigation.yml format. This is a template that can be used for setting up your yml file. Your application logic will have to set the default active states so that it is dynamic per page load.

    ---
    # Menu Items
    - icon: 'dashboard'
      name: 'Reports'
      url: '#'
      sub_menu:
        - name: 'VLM Programming Direct'
          url: '#'
        - name: 'Geo-temporal'
          url: '#'
    - icon: 'reports'
      name: 'API'
      url: '#'
      active: true
      sub_menu:
        - name: 'VLM Programming Direct'
          url: '#'
          active: true
        - name: 'Geo-temporal'
          url: '#'

## Plugins

### Datepicker

jQuery datepicker is available for use within your project. We've already included formatting to standardize the look across applications, however you can still customize the datepicker widgets within in your application if needed.
  
#### Usage
  
Add the following to your application.scss

    @import "jquery.ui.core";
    @import "jquery.ui.datepicker";
    
To use the standard date picker add the `picker` class to any input field
    
    <input type="text" class="picker" id="" />
    
Sample code for use in your forms.
    
    <form class="form-horizontal">
      <div class="form-group">
        <div class="input-group">
          <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
          <input type="text" class="form-control picker" id="">
        </div>
      </div>
    </form>
    
To use the date range picker add the `range-picker` class to any input field. Date range usage is provided through datePick.js which adds additional functionality to jQuery's DatePicker. 
View the datePick.js documentation [here](http://keith-wood.name/datepick.html) 

    <input type="text" class="range-picker" id="" />



This gem was forked from [bootstrap-sass](https://github.com/twbs/bootstrap-sass). View there documentation for more information on usage. 
