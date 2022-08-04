const log = require("@jasonfleischer/log");

var oscilloscope = {};
var frequency_view = {};

//import chroma from "chroma-js";
var spectro = new Spectrogram(document.getElementById('spectoCanvas'), {
  audio: {
    enable: false
  }/*,

  colors: function(steps) {
    var baseColors = [[0,0,255,1], [0,255,255,1], [0,255,0,1], [255,255,0,1], [ 255,0,0,1]];
    var positions = [0, 0.15, 0.30, 0.50, 0.75];
 
    var scale = new chroma.scale(baseColors, positions)
    .domain([0, steps]);
 
    var colors = [];
 
    for (var i = 0; i < steps; ++i) {
      var color = scale(i);
      colors.push(color.hex());
    }
 
    return colors;
  }*/
});

init = function() {

	//storage.load();
	alert.init();

	oscilloscope = new Oscilloscope();
	frequency_view = new FrequencyView();
	
	window_resized_end();
	setup_keyboard_listeners();
	setup_controls()

	var isSafariMobile = window.mobileAndTabletCheck() && isSafari;
	if (isSafariMobile && !isFromHomeScreen()){
		install.showAlert();
	}
	
}

