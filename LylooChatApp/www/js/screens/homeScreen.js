var homeScreen={

	loadGridTiles : function(){
		console.log("ici");


		var butt = document.createElement("button");
		butt.class="action";

		var titleText = document.createTextNode("Un bouton à cliquer");
		butt.appendChild(titleText);
		document.body.appendChild(butt);


		

    // //Ajout de la grille
    // minigrid('.grid', '.grid-item');
    // window.addEventListener('resize', function(){
    //   minigrid('.grid', '.grid-item');
    // });

	}
};