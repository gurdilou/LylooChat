function showMaskPanel() {
    $.inner_showMaskPanel();
}
function hideMaskPanel() {
    $.inner_hideMaskPanel();
}



(function(window, $) {

  // showMaskPanel : Affiche un masque sur l'application
  $.inner_showMaskPanel = function(onExit) {
    var maskPanel = $(".mask");
      maskPanel.addClass("visible");
      maskPanel.on("click", function(e) {
        onExit.call(this);
      });
  };
  $.inner_hideMaskPanel = function() {
    var maskPanel = $(".mask");
    maskPanel.removeClass("visible");
    maskPanel.off("click");
  };
})(window, jQuery);
