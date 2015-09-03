

var platformStyler = {
    // Refresh the stylesheet of the app
    refreshStyle: function() {
    	console.log("choix du css");

    	document.body.className = device.platform.toLowerCase();
    	var platformCode = device.platform.toLowerCase();

		var cssId="bower_components/chocolatechip-ui/dist/chui-android-3.8.0.min.css";
		if(platformCode.indexOf("win") > -1){
			cssId="bower_components/chocolatechip-ui/dist/chui-win-3.8.0.min.css";
		}else if( (platformCode.indexOf("iphone") > -1) || (platformCode.indexOf("ipad") > -1)){
			cssId="bower_components/chocolatechip-ui/dist/chui-ios-3.8.0.min.css";	 
		}

		document.getElementById("platformcss").setAttribute("href", cssId); 

		console.log('css :'+cssId);
	}

};