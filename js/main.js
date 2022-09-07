const log = require("@jasonfleischer/log");

var oscilloscope = {};
var frequency_view = {};
var spectrogram2 = {};
var spectrogram3 = {};

//var spectro = new Spectrogram();

init = function() {

	//storage.load();
	alert.init();

	oscilloscope = new Oscilloscope();
	frequency_view = new FrequencyView();
	spectrogram2 = new Spectrogram2("spectrogram2", true, false, minimumFrequency = 0, maximumFrequency = 4200);
	spectrogram3 = new Spectrogram2("spectrogram3", false, true);

	window_resized_end();
	setup_keyboard_listeners();
	setup_controls()

	var isSafariMobile = window.mobileAndTabletCheck() && isSafari;
	if (isSafariMobile && !isFromHomeScreen()){
		install.showAlert();
	}
}

