function showMaskPanel(onExit) {
  $.inner_showMaskPanel(this, onExit);
}

function hideMaskPanel() {
  $.inner_hideMaskPanel(this);
}



(function(window, $) {

  // showMaskPanel : Affiche un masque sur l'application
  $.inner_showMaskPanel = function(caller, onExit) {
    var maskPanel = $(".mask");
    maskPanel.addClass("visible");
    maskPanel.on("click", function(e) {
      onExit.call(caller);
    });
  };
  $.inner_hideMaskPanel = function(caller) {
    var maskPanel = $(".mask");
    maskPanel.html("");
    maskPanel.removeClass("visible");
    maskPanel.off("click");
  };
})(window, jQuery);
