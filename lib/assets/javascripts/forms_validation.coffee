class FormsValidation
  simpleValidation: ->
    _self = @
    $ 'form'
    .bind 'submit', ->
      ecount = 0
      $ '*[data-required="true"]:not("label")'
      .each (i,e) ->
        if $(e).val() == ""
          _self.inputInvalid e
          _self.clearErrorField e
          ecount++
      if ecount > 0
        ecount = 0
        false
      else
        true

  clearErrorField: (ui)->
    $ ui
    .bind 'keyup', ->
      if $(@).val() != ""
        $ @
        .removeClass 'error'
        .attr 'placeholder', ''

  inputInvalid: (ui)->
    $ ui
    .addClass 'error'
    .attr 'placeholder', 'Required'

Verve.FormsValidation = new FormsValidation()