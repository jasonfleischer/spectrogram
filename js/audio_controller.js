audio_controller = {
	setup: false,
	ctx: {},
	analyzerNode: {},
	compressorNode: {},
	masterGainNode: {},
	audioElement: {}
};

var use_microphone = false;

audio_controller.startRecording = function() {

	if(!audio_controller.setup){
		audio_controller.ctx = new AudioContext();
	    audio_controller.analyzerNode = audio_controller.ctx.createAnalyser();
	   	audio_controller.analyzerNode.fftSize = 2048;//256;//32;//2048;
	    audio_controller.analyzerNode.smoothingTimeConstant = 0;

		if (use_microphone){

			navigator.mediaDevices.getUserMedia({ video: false, audio: true })
		      	.then( (mediaStreamObj) => {
			        audio_controller.onStreamAquired(mediaStreamObj);
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
				audio_controller.onStreamAquired(mediaStreamObj);
			}
		}
	 	audio_controller.setup = true;
	} else {
		oscilloscope.resume();
		frequency_view.resume();
		spectro.resume();
	}
}

audio_controller.onStreamAquired = function(mediaStreamObj) {

	var source = audio_controller.ctx.createMediaStreamSource(mediaStreamObj);
	source.connect(audio_controller.analyzerNode);
	spectro.connectSource(audio_controller.analyzerNode, audio_controller.ctx);
	audio_controller.startVisualization();
}

audio_controller.startVisualization = function() {

	oscilloscope.draw(audio_controller.analyzerNode);
	frequency_view.draw(audio_controller.analyzerNode);
	spectro.start();
}

audio_controller.stopRecording = function() {

	oscilloscope.pause();
	frequency_view.pause();
	spectro.pause();

	if(!use_microphone){
		audio_controller.audioElement.pause();
	}
}
