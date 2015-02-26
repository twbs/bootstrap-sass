#= require jquery_ujs
#= require select2
#= require picker
#= require ns
#= require forms_validation
#= require_self

$ document
.ready ->
  $ ".js-example-basic-multiple, .js-example-placeholder-single"
  .select2
    placeholder: 'Please Select'
    allowCenter: true