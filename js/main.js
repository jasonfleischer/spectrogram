const log = require("@jasonfleischer/log");


init = function() {

	//storage.load();
	alert.init();
	
	window_resized_end();
	setup_keyboard_listeners();
	setup_controls()

	var isSafariMobile = window.mobileAndTabletCheck() && isSafari;
	if (isSafariMobile && !isFromHomeScreen()){
		install.showAlert();
	}
	
}

