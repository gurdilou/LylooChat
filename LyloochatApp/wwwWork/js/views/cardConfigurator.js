function CardConfigurator(){
  // ========================================== VARIABLES =================================
  var busy = false;
  var elementSelect;

  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================


  // _exitConfig : Quitte l'écran
  function _exitConfig() {
    this.busy = false;
    this.elementSelect = undefined;
    hideMaskPanel();
  }

  // _displayMenusVertical : Affiche le menu vertical
  function _displayMenusVertical() {
    var maskPanel = $(".mask");
    maskPanel.html("<div class='cardConfigurator-button-ctn'></div>");
    var buttonsPanel = maskPanel.find(".cardConfigurator-button-ctn");

    var buttContext = {
      class: "butt-edit",
      title: "Editer l'item",
      icon: "edit",
      code: "Editer"
    };
    buttonsPanel.html(Lyloochat.templates.widget_badge_button(buttContext));
    var buttEdit = $(".badge-button.butt-edit");
    buttEdit.on("click", _on_editItem);

    buttContext = {
      class: "butt-delete",
      title: "Supprimer l'item",
      icon: "delete",
      code: "Supprimer"
    };
    buttonsPanel.append(Lyloochat.templates.widget_badge_button(buttContext));
    var buttDelete = $(".badge-button.butt-delete");
    buttDelete.on("click", _on_deleteItem);
  }

  // _on_deleteItem : Lorsqu'on supprime un item
  function _on_deleteItem(event){
    // TODO : dev _on_deleteItem
    console.log("_on_deleteItem");
    event.stopPropagation();
  }

  // _on_editItem : Lorsqu'on édite un item
  function _on_editItem(event){
    // TODO : dev _on_editItem
    console.log("_on_editItem");
    event.stopPropagation();
  }
  // ========================================== PRIVILEGED ================================
  this.onClick = function(element, event) {
    if(!this.busy){
      this.busy = true;
      this.elementSelect = element;

      showMaskPanel.call(this, _exitConfig);
      _displayMenusVertical.call(this);
    }
  };
}
