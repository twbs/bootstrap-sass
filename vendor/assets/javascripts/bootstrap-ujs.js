(function($, undefined) {
  $(function () {
    $('div.bootstrap-modal').modal();
    $('div.bootstrap-modal').modal('hide').addClass('fade');

    $("a.bootstrap-modal-cancel-button").click(function(event) {
      $(event.target).closest("div.modal").modal("hide");
    });
  });
})( jQuery );
