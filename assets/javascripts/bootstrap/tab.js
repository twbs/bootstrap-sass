/* ========================================================================
 * Bootstrap: tab.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.4.1'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(document).find(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
        .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
        .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
          .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

// Tab Extension
// ===============================

var $tablist = $('.nav-tabs, .nav-pills')
    , $lis = $tablist.children('li')
    , $tabs = $tablist.find('[data-toggle="tab"], [data-toggle="pill"]')

if($tabs){
  $tablist.attr('role', 'tablist')
  $lis.attr('role', 'presentation')
  $tabs.attr('role', 'tab')
}

$tabs.each(function( index ) {
  var tabpanel = $($(this).attr('href'))
    , tab = $(this)
    , tabid = tab.attr('id') || uniqueId('ui-tab')

    tab.attr('id', tabid)

  if(tab.parent().hasClass('active')){
    tab.attr( { 'tabIndex' : '0', 'aria-selected' : 'true', 'aria-controls': tab.attr('href').substr(1) } )
    tabpanel.attr({ 'role' : 'tabpanel', 'tabIndex' : '0', 'aria-hidden' : 'false', 'aria-labelledby':tabid })
  }else{
    tab.attr( { 'tabIndex' : '-1', 'aria-selected' : 'false', 'aria-controls': tab.attr('href').substr(1) } )
    tabpanel.attr( { 'role' : 'tabpanel', 'tabIndex' : '-1', 'aria-hidden' : 'true', 'aria-labelledby':tabid } )
  }
})

$.fn.tab.Constructor.prototype.keydown = function (e) {
  var $this = $(this)
  , $items
  , $ul = $this.closest('ul[role=tablist] ')
  , index
  , k = e.which || e.keyCode

  $this = $(this)
  if (!/(37|38|39|40)/.test(k)) return

  $items = $ul.find('[role=tab]:visible')
  index = $items.index($items.filter(':focus'))

  if (k == 38 || k == 37) index--                         // up & left
  if (k == 39 || k == 40) index++                        // down & right


  if(index < 0) index = $items.length -1
  if(index == $items.length) index = 0

  var nextTab = $items.eq(index)
  if(nextTab.attr('role') ==='tab'){

    nextTab.tab('show')      //Comment this line for dynamically loaded tabPabels, to save Ajax requests on arrow key navigation
    .focus()
  }
  // nextTab.focus()

  e.preventDefault()
  e.stopPropagation()
}

$(document).on('keydown.tab.data-api','[data-toggle="tab"], [data-toggle="pill"]' , $.fn.tab.Constructor.prototype.keydown)

var tabactivate =    $.fn.tab.Constructor.prototype.activate;
$.fn.tab.Constructor.prototype.activate = function (element, container, callback) {
  var $active = container.find('> .active')
  $active.find('[data-toggle=tab], [data-toggle=pill]').attr({ 'tabIndex' : '-1','aria-selected' : false })
  $active.filter('.tab-pane').attr({ 'aria-hidden' : true,'tabIndex' : '-1' })

  tabactivate.apply(this, arguments)

  element.addClass('active')
  element.find('[data-toggle=tab], [data-toggle=pill]').attr({ 'tabIndex' : '0','aria-selected' : true })
  element.filter('.tab-pane').attr({ 'aria-hidden' : false,'tabIndex' : '0' })
}
