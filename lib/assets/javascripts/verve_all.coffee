#= require jquery_ujs
#= require select2
#= require_self

$ document
.ready ->
  $ '.js-example-placeholder-single'
  .select2
    placeholder: 'Please Select'
    allowCenter: true

  $ 'form'
  .bind 'submit', ->
    alert 'wtf'
    ecount = 0
    $ 'form *[required="required"]'
    .each (i,e) ->
      if $(e).val() == ""
        $ e
        .addClass 'error'
        .attr 'placeholder', 'Required'
        ecount++
    false if ecount > 0
#
#$(document).ready(function(){
#  $('.js-example-placeholder-single').select2({
#    placeholder: "Please Select",
#    allowClear: true
#  });
#  $('form').bind('ajax:aborted:required', function(event, elements){
#    return ! confirm("Would you like to submit the form with missing info?");
#  });
#  $('form').bind('submit')
#});
