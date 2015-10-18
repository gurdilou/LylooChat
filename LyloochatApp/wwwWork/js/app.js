var app = {
  // Application Constructor
  initialisation: function() {
    console.log("initialisation");


    var source   = document.getElementById("grid-cards");


    for(i = 0; i < 16; i++){
      var context = {title: "Card number "+i};
      source.innerHTML += Lyloochat.templates.widget_card_text(context);
    }


  },

};
