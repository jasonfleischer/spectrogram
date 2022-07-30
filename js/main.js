const log = require("@jasonfleischer/log");

var oscilloscope = {};

init = function() {

	//storage.load();
	alert.init();

	oscilloscope = new Oscilloscope();
	
	window_resized_end();
	setup_keyboard_listeners();
	setup_controls()

	var isSafariMobile = window.mobileAndTabletCheck() && isSafari;
	if (isSafariMobile && !isFromHomeScreen()){
		install.showAlert();
	}
	
}

