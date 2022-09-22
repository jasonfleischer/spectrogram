
const audio_controller_state = Object.freeze({
	STOPPED: 0,
	RESUMED: 1,
	PAUSED: 2
});

audio_controller = {
	state: audio_controller_state.STOPPED,
	ctx: {},
	analyzerNode: {},
	audioElement: {},
	use_microphone: true
};

audio_controller.start = function(fftSize = storage.get_fft_size(), audioElement = undefined) {

	if(audio_controller.state == audio_controller_state.STOPPED){
		audio_controller.ctx = new AudioContext();
		audio_controller.analyzerNode = audio_controller.ctx.createAnalyser();
	   	audio_controller.analyzerNode.smoothingTimeConstant = 0;
	   	audio_controller.analyzerNode.fftSize = fftSize;

	   	audio_controller.use_microphone = (audioElement == undefined);

		if (audio_controller.use_microphone){

			navigator.mediaDevices.getUserMedia({ video: false, audio: true })
			  	.then( (mediaStreamObj) => {
					onStreamAquired(mediaStreamObj);
				})
				.catch( (err) => {
				 	log.e("getUserMedia: " + err);
				});

		} else {
			audio_controller.audioElement = audioElement;
			/*audio_controller.audioElement = document.createElement("AUDIO");
			audio_controller.audioElement.src = "audio/float.mp3";
			audio_controller.audioElement.autoplay = true;
			audio_controller.audioElement.loop = true;
			*/
			audio_controller.audioElement.oncanplay = function () { 
				var mediaStreamObj = audio_controller.audioElement.captureStream();
				onStreamAquired(mediaStreamObj);
			}
		}
	} else {
		log.e("already started");
	}

	function onStreamAquired(mediaStreamObj) {
		var sourceNode = audio_controller.ctx.createMediaStreamSource(mediaStreamObj);
		sourceNode.connect(audio_controller.analyzerNode);
		startVisualization();
		audio_controller.state = audio_controller_state.RESUMED;
		updateUI_buttons(audio_controller.state);
	}

	function startVisualization() {

		oscilloscope.draw(audio_controller.analyzerNode);
		frequency_view.draw(audio_controller.analyzerNode);
		spectrogram.draw(audio_controller.analyzerNode, audio_controller.ctx.sampleRate);
	}
}

audio_controller.resume = function() {
	if(audio_controller.state == audio_controller_state.PAUSED){
		oscilloscope.resume();
		frequency_view.resume();
		spectrogram.resume();
		audio_controller.state = audio_controller_state.RESUMED;
		updateUI_buttons(audio_controller.state);
	} else {
		log.e("not paused");
	}
}

audio_controller.pause = function() {

	if(audio_controller.state == audio_controller_state.RESUMED){
		oscilloscope.pause();
		frequency_view.pause();
		spectrogram.pause();
		if(!audio_controller.use_microphone){
			audio_controller.audioElement.pause();
		}
		audio_controller.state = audio_controller_state.PAUSED;
		updateUI_buttons(audio_controller.state);
	} else {
		log.e("not resumed");
	}
}

audio_controller.updateFFTSize = function(fftSize) {

	var savedState = audio_controller.state;
	audio_controller.pause();
	audio_controller.analyzerNode.fftSize = fftSize;
	spectrogram.refreshCanvasHeight();

	if(savedState == audio_controller_state.RESUMED){
		audio_controller.resume();
	}
}

audio_controller.updateMaxFrequency = function(maximumFrequency) {
	
	var savedState = audio_controller.state;
	audio_controller.pause();
	spectrogram.updateMaximumFrequency(maximumFrequency);
	spectrogram.refreshCanvasHeight();
		
	if(savedState == audio_controller_state.RESUMED){
		audio_controller.resume();
	}
}
