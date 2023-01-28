const log = require("@jasonfleischer/log");
const Spectrogram = require("@jasonfleischer/spectrogram");

var audio_controller = {};
var oscilloscope = {};
var frequency_view = {};
var spectrogram = {};

init = function() {

	alert.init();

	audio_controller = new AudioController(onStateChange = onAudioStateChanged, startVisualization = startVisualization, hasMetronome = storage.has_metronome(), bpm = storage.get_bpm(), fftSize = storage.get_fft_size());

	oscilloscope = new Oscilloscope();
	frequency_view = new FrequencyView();
	spectrogram = new Spectrogram("spectrogram", 
									useHeatMapColors = storage.is_colored(), 
									highlightPeaks = !storage.is_colored(), 
									darkMode = true,
									minimumFrequency = 0, 
									maximumFrequency = storage.get_max_frequency());

	
	window_resized_end();
	setup_keyboard_listeners();
	setup_controls();
	updateUI_buttons(audio_controller.state);

	var isSafariMobile = window.mobileAndTabletCheck() && isSafari;
	if (isSafariMobile && !isFromHomeScreen()){
		install.showAlert();
	}
}

onAudioStateChanged = function(audio_state) {
	switch(audio_state){
		case audio_controller_state.STOPPED:
			break;
		case audio_controller_state.RESUMED:
			oscilloscope.resume();
			frequency_view.resume();
			spectrogram.resume();
			break;
		case audio_controller_state.PAUSED:
			oscilloscope.pause();
			frequency_view.pause();
			spectrogram.pause();
			break;
	}
	updateUI_buttons(audio_state);
}

updateUI_buttons = function(audio_state) {
	switch(audio_state){
		case audio_controller_state.STOPPED:
			$("start").disabled = false;
			$("start").style.display = 'block';
			$("resume").disabled = true;
			$("resume").style.display = 'none';
			$("pause").disabled = true;
			$("pause").style.display = 'none';
			break;
		case audio_controller_state.RESUMED:
			$("start").disabled = true;
			$("start").style.display = 'none';
			$("resume").disabled = true;
			$("resume").style.display = 'none';
			$("pause").disabled = false;
			$("pause").style.display = 'block';
			break;
		case audio_controller_state.PAUSED:
			$("start").disabled = true;
			$("start").style.display = 'none';
			$("resume").disabled = false;
			$("resume").style.display = 'block';
			$("pause").disabled = true;
			$("pause").style.display = 'none';
			break;
	}
}

function startVisualization(audio_controller) {
	var analyzerNode = audio_controller.analyzerNode;
	oscilloscope.draw(analyzerNode);
	frequency_view.draw(analyzerNode);
	spectrogram.draw(analyzerNode, audio_controller.ctx.sampleRate);
}
