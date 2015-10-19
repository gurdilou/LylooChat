var app = {
  // Application Constructor
  initialisation: function() {
    console.log("initialisation");

    //Création des menus
    var menuSource = document.getElementById("appmenus");
    var menuContext = {name: "Lyloochat", icon: "app",
        links: [
          {longCode: "Afficher un texte", code:"Texte", icon: "keyboard"},
          {longCode: "Jouer un son", code:"Son", icon: "play"},
          {longCode: "Dessiner quelquechose", code:"Dessin", icon: "pen"},
        ]};
    menuSource.innerHTML = Lyloochat.templates.widget_menus(menuContext);

    //Création grille
    var gridSource   = document.getElementById("grid-cards");
    for(i = 0; i < 16; i++){
      var context = {title: "Card number "+i};
      gridSource.innerHTML += Lyloochat.templates.widget_card_text(context);
    }


  },

};
