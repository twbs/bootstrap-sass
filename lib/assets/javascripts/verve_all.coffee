#= require jquery_ujs
#= require select2
#= require jquery.ui.datepicker
#= require picker
#= require ns
#= require forms_validation
#= require menu_controller
#= require_self

$ document
.ready ->
  Verve.MenuController.init()

  $ ".js-example-basic-multiple, .js-example-placeholder-single"
  .select2
    placeholder: 'Please Select'
    allowCenter: true

