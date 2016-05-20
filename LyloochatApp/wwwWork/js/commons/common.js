function showMaskPanel(onExit) {
  $.inner_showMaskPanel(this, true, onExit);
}
function showModalMaskPanel() {
  $.inner_showMaskPanel(this, false, undefined);
}
function hideMaskPanel() {
  $.inner_hideMaskPanel(this);
}
function showPopupPanel() {
  $.inner_showPopupPanel(this); 
}
function hidePopupPanel() {
  $.inner_hidePopupPanel(this);
}
function showErrorPanel(msg) {
  $.inner_showErrorPanel(this, msg, hideErrorPanel);
}
function hideErrorPanel() {
  $.inner_hideErrorPanel(this);
}
function showLoadingPanel(msg) {
  $.inner_showLoadingPanel(this, msg, hideLoadingPanel);
}
function hideLoadingPanel() {
  $.inner_hideLoadingPanel(this);
}


(function(window, $) {

  // showMaskPanel : Affiche un masque sur l'application
  $.inner_showMaskPanel = function(caller, exitable, onExit) {
    var maskPanel = $(".mask");
    maskPanel.html("");
    maskPanel.addClass("visible");


    if(exitable){
      maskPanel.on("click", function(e) {
        onExit.call(caller);
      });
    }
  };
  $.inner_hideMaskPanel = function(caller) {
    var maskPanel = $(".mask");
    maskPanel.html("");
    maskPanel.removeClass("visible");
    maskPanel.off("click");
  };

  // showPopupPanel : Affiche un masque pour une popup
  $.inner_showPopupPanel = function(caller) {
    var maskPanel = $(".popup");
    maskPanel.html("");
    maskPanel.addClass("visible");
  };
  $.inner_hidePopupPanel = function(caller) {
    var maskPanel = $(".popup");
    maskPanel.html("");
    maskPanel.removeClass("visible");
  };
  
  $.inner_showErrorPanel = function(caller, msg) {
    $.inner_showMaskPanel(this, true, hideErrorPanel);

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

  // 
  $.inner_showLoadingPanel = function(caller, msg) {
    $.inner_showMaskPanel(this, false, hideLoadingPanel);

    var maskPanel = $(".mask");
    var context = {
      type: "loading",
      messages:[msg]
    };
    maskPanel.html(Lyloochat.templates.widget_dialog(context));
  };


  $.inner_hideLoadingPanel = function(caller) {
    $.inner_hideMaskPanel(caller);
  };


})(window, jQuery);
