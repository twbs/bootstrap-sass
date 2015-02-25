;(function($) {

  $.fn.picker = function() {

    var parseDate = function(string) {
      var parts = string.split('-');
      return new Date(parts[0], parts[1] - 1, parts[2]);
    };

    return this.each(function() {

      var options  = { dateFormat: 'yy-mm-dd', changeMonth: true, changeYear: true },
        original = $(this),
        picker   = $('<input type=text id=' + original.attr('id') + '_local>'),
        marker   = $('<span />'),
        hidden   = $('<input>').attr({
          type: 'hidden',
          id:    original.attr('id'),
          name:  original.attr('name'),
          value: original.val()
        });

      if (original.hasClass('hasDatepicker'))
        return;

      options.altField  = '#' + hidden.attr('id');
      options.altFormat = "yy-mm-dd";

      if (original.attr('min'))
        options.minDate = parseDate(original.attr('min'));
      if (original.attr('max'))
        options.maxDate = parseDate(original.attr('max'));
      if (original.attr('min') && original.attr('max'))
        options.yearRange = options.minDate.getFullYear().toString() + ':' +  options.maxDate.getFullYear().toString();
      if (original.attr('readonly') == 'readonly') {
        picker.attr('readonly', 'readonly').attr('disabled', 'disabled');
      }

      options.onSelect = function(_, inst) { $(options.altField).change(); };
      var resetAltField    = function() { if(!$(this).val().length) $(options.altField).val("").change(); }

      original.before(marker).remove();
      picker
        .insertAfter(marker)
        .after(hidden)
        .datepicker(options)
        .datepicker('setDate', hidden.val()) // refresh date in alt-field
        .datepicker('option', 'dateFormat', 'M d, yy')
        .change(resetAltField);
      marker.remove();
    });
  };
})(jQuery);

!function ( $ ) {
  $(function () {
    $('input.picker').picker();
  })
}( window.jQuery || window.ender );