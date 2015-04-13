class MenuController
  collapseSidebar: ->
    $ '.sidebar'
    .css 'width', 45

  expandSidebar: -> 
    $ '.sidebar'
    .css 'width', "auto"

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
    .removeClass 'fa-plus-square'
    .addClass 'fa-minus-square'

  iconClose: ->
    @menuController.find('i')
    .removeClass 'fa-minus-square'
    .addClass 'fa-plus-square'

  htmlbodyHeightUpdate: ->
    height3 = $(window).height()
    height1 = $('.nav').height() + 50
    height2 = $('.main').height()
    if height2 > height3
      $('html').height Math.max(height1, height3, height2) + 10
      $('body').height Math.max(height1, height3, height2) + 10
    else
      $('html').height Math.max(height1, height3, height2)
      $('body').height Math.max(height1, height3, height2)
  
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
    _self = @
    @htmlbodyHeightUpdate()
    $(window).resize ->
      _self.htmlbodyHeightUpdate()
    $(window).scroll ->
      height2 = $('.main').height()
      _self.htmlbodyHeightUpdate()
    @menuController = $ '#menu-controller'
    # if $('.sidebar').width() > 45
#       @menuController.addClass 'open'
#       @iconOpen()
#     else
#       @menuController.addClass 'closed'
#       @iconClose()
#     @handler()


Verve.MenuController = new MenuController()