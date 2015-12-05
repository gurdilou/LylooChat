function showMaskPanel(onExit) {
  $.inner_showMaskPanel(this, onExit);
}

function hideMaskPanel() {
  $.inner_hideMaskPanel(this);
}

function showErrorPanel(msg) {
  $.inner_showErrorPanel(this, msg, hideErrorPanel);
}
function hideErrorPanel() {
  $.inner_hideErrorPanel(this);
}


(function(window, $) {

  // showMaskPanel : Affiche un masque sur l'application
  $.inner_showMaskPanel = function(caller, onExit) {
    var maskPanel = $(".mask");
    maskPanel.html("");
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
  $.inner_showErrorPanel = function(caller, msg) {
    $.inner_showMaskPanel(this, hideErrorPanel);

    var maskPanel = $(".mask");
    var context = {
      type: "error",
      header:{
        icon: "sad",
        message: "Onoz !"
      },
      messages:[msg],
      footer:{
        buttons: [ "ok"]
      }
    };
    maskPanel.html(Lyloochat.templates.widget_dialog(context));
  };


  $.inner_hideErrorPanel = function(caller) {
    $.inner_hideMaskPanel(caller);
  };
})(window, jQuery);
