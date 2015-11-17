function CardConfigurator(){
  // ========================================== VARIABLES =================================
  var busy = false;
  var elementSelect;

  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================


  // _exitConfig : Quitte l'écran
  function _exitConfig() {
    console.log("exit");
    this.busy = false;
    this.elementSelect = undefined;
    this._displayMaskPanel(false);
  }

  // _displayMenusVertical : Affiche le menu vertical
  function _displayMenusVertical() {
    //TODO : dev _displayMenusVertical
    var maskPanel = $(".mask");

    var buttContext = {
      id: "butt-edit",
      title: "Editer l'item",
      icon: "edit",
      code: "Editer"
    };
    maskPanel.html(Lyloochat.templates.widget_rounded_button(buttContext));
    var buttEdit = $("#butt-edit").on("click", this._butt_editItem);

    buttContext = {
      id: "butt-delete",
      title: "Supprimer l'item",
      icon: "delete",
      code: "Supprimer"
    };
    maskPanel.append(Lyloochat.templates.widget_rounded_button(buttContext));
  }
  // _displayMenuRound : Affiche le menu en rond autour de la carte
  function _displayMenuRound(element, event) {
    //Calcul des positions des bulles
    var x = event.pageX - element.offset().left - element.width() / 2;
    var y = event.pageY - element.offset().top - element.height() / 2;
    //TODO : dev _displayMenuRound
  }

  // _on_deleteItem : Lorsqu'on supprime un item
  function _on_deleteItem(event){
    // TODO : dev _on_deleteItem
  }

  // _on_editItem : Lorsqu'on édite un item
  function _on_editItem(event){
    // TODO : dev _on_editItem
  }
  // ========================================== PRIVILEGED ================================
  this.onClick = function(element, event) {
    if(!this.busy){
      this.busy = true;
      this.elementSelect = element;

      showMaskPanel.call(this, this._exitConfig);
      var screenWidth = $(window).width();
      // console.log("screen width : "+screenWidth+"px");
      if (screenWidth <= 1024) {
        _displayMenusVertical.call(this);
      }else{
        _displayMenuRound.call(this, element, event);
      }
    }
  };
}
