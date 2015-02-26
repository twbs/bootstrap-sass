class MenuController
  collapseSidebar: ->
    $ '.sidebar'
    .css 'width', 45

  expandSidebar: ->
    $ '.sidebar'
    .css 'width', 233

  collapseLabels: ->
    _self = @
    $ '.sidebar'
    .find 'a[data-toggle="collapse"] > span'
    .each (i,e)->
      $(e).hide()
      _self.openOnClick $(e).parent('a')

  expandLabels: ->
    $ '.sidebar'
    .find 'a[data-toggle="collapse"] > span'
    .each (i,e)->
      $(e).show()

  collapseDropDowns: ->
    $ 'ul.collapse'
    .each (i,e)->
      if $(e).hasClass 'in'
        $(e).prev('a').click()

  openOnClick: (ui)->
    _self = @
    $ ui
    .click ->
      _self.stateToOpen()
      _self.iconOpen()
      _self.open()

  open: ->
    @expandSidebar()
    @expandLabels()

  close: ->
    @collapseLabels()
    @collapseSidebar()

  stateToClose: ->
    @menuController
    .removeClass 'open'
    .addClass 'closed'

  stateToOpen: ->
    @menuController
    .removeClass 'closed'
    .addClass 'open'

  iconOpen: ->
    @menuController
    .find('i')
    .removeClass 'glyphicon-plus'
    .addClass 'glyphicon-minus'

  iconClose: ->
    @menuController.find('i')
    .removeClass 'glyphicon-minus'
    .addClass 'glyphicon-plus'

  handler: ->
    _self = @
    @menuController
    .bind 'click', ->
      if $(@).hasClass 'open'
        _self.collapseDropDowns()
        _self.stateToClose()
        _self.iconClose()
        _self.close()
      else if $(@).hasClass 'closed'
        _self.stateToOpen()
        _self.iconOpen()
        _self.open()

  init: ->
    @menuController = $ '#menu-controller'
    if $('.sidebar').width() > 45
      @menuController.addClass 'open'
      @iconOpen()
    else
      @menuController.addClass 'closed'
      @iconClose()
    @handler()


Verve.MenuController = new MenuController()