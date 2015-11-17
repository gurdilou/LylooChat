// Actif dès le début

(function(window, $) {

  $(function() {
    var self, ink, d, x, y;
    $(".ripple").click(function(e) {
      var app = phonegapHandler.app;
      if (app.loaded) {
        self = $(this);
        //create .ink element if it doesn't exist
        if (self.find(".ink").length === 0)
          self.prepend("<span class='ink'></span>");

        ink = self.find(".ink");
        //incase of quick double clicks stop the previous animation
        ink.removeClass("animate");

        //set size of .ink
        if (!ink.height() && !ink.width()) {
          //use self's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
          d = Math.max(self.outerWidth(), self.outerHeight());
          ink.css({
            height: d,
            width: d
          });
        }

        //get click coordinates
        //logic = click coordinates relative to page - self's position relative to page - half of self height/width to make it controllable from the center;
        x = e.pageX - self.offset().left - ink.width() / 2;
        y = e.pageY - self.offset().top - ink.height() / 2;

        //set the position and add class .animate
        ink.css({
          top: y + 'px',
          left: x + 'px'
        }).addClass("animate");
      }
    });
  });

})(window, jQuery);
