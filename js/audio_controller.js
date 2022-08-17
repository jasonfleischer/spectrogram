audio_controller = {
	setup: false,
	ctx: {},
	analyzerNode: {},
	compressorNode: {},
	masterGainNode: {},
	scriptNode: {},
	audioElement: {}
};

var use_microphone = true;

audio_controller.start = function() {

	if(!audio_controller.setup){
		audio_controller.ctx = new AudioContext();
		audio_controller.analyzerNode = audio_controller.ctx.createAnalyser();
	   	audio_controller.analyzerNode.smoothingTimeConstant = 0;
	   	audio_controller.analyzerNode.fftSize = 1024;
	   	//32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, and 32768

		if (use_microphone){

			navigator.mediaDevices.getUserMedia({ video: false, audio: true })
			  	.then( (mediaStreamObj) => {
					onStreamAquired(mediaStreamObj);
				})
				.catch( (err) => {
				 	log.e("getUserMedia: " + err);
				});

		} else {
			
			audio_controller.audioElement = document.createElement("AUDIO");
			audio_controller.audioElement.src = "audio/float.mp3";
			audio_controller.audioElement.autoplay = true;
			audio_controller.audioElement.loop = true;
			audio_controller.audioElement.oncanplay = function () { 
				var mediaStreamObj = audio_controller.audioElement.captureStream();
				onStreamAquired(mediaStreamObj);
			}
		}
	 	audio_controller.setup = true;
	} else {
		oscilloscope.resume();
		frequency_view.resume();
		spectrogram2.resume();
		spectrogram3.resume();
		//spectro.resume();
	}

	function onStreamAquired(mediaStreamObj) {

		var source = audio_controller.ctx.createMediaStreamSource(mediaStreamObj);
		source.connect(audio_controller.analyzerNode);
		//spectro.connectSource(audio_controller.analyzerNode, audio_controller.ctx);
		startVisualization();
	}

	function startVisualization() {

		oscilloscope.draw(audio_controller.analyzerNode);
		frequency_view.draw(audio_controller.analyzerNode);
		//spectro.start();
		spectrogram2.draw(audio_controller.analyzerNode, audio_controller.ctx.sampleRate);
		spectrogram3.draw(audio_controller.analyzerNode, audio_controller.ctx.sampleRate);
		
	}
}

audio_controller.stop = function() {

	oscilloscope.pause();
	frequency_view.pause();
	spectrogram2.pause();
	spectrogram3.pause();
	//spectro.pause();

	if(!use_microphone){
		audio_controller.audioElement.pause();
	}
}
