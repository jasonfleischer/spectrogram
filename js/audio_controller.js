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
	   	audio_controller.analyzerNode.fftSize = 2048;// 256;//32;//2048;
	    audio_controller.analyzerNode.smoothingTimeConstant = 0;

		if (use_microphone){

			navigator.mediaDevices.getUserMedia({ video: false, audio: true })
		      	.then( (mediaStreamObj) => {
			        
					var source = audio_controller.ctx.createMediaStreamSource(mediaStreamObj);
			        source.connect(audio_controller.analyzerNode);
			        audio_controller.startVisualization();

			    })
			    .catch( (err) => {
			     	log.e("getUserMedia: " + err);
			    });

		} else {
				log.e('from file');

			var audio = document.createElement("AUDIO");
			audio.src = "audio/float.mp3";
			audio.autoplay = true;
			audio_controller.audioElement = audio;

			//let audio = document.getElementById('audio1');
			var source = audio_controller.ctx.createMediaStreamSource(audio.captureStream());
			//audio.play();

			source.connect(audio_controller.analyzerNode);
			audio_controller.startVisualization();
		}
	 	audio_controller.setup = true;
	} else {
		oscilloscope.resume();
		frequency_view.resume();
		spectro.resume();
	}
}

audio_controller.startVisualization = function() {
	log.e('startVisualization');
	oscilloscope.draw(audio_controller.analyzerNode);
	frequency_view.draw(audio_controller.analyzerNode);

	spectro.connectSource(audio_controller.analyzerNode, audio_controller.ctx);
	spectro.start();
}

audio_controller.stopRecording = function() {

	spectro.pause();
	oscilloscope.pause();
	frequency_view.pause();

	if(!use_microphone){
		//let audio1 = document.getElementById('audio1');
		audio_controller.audioElement.pause();
	}
}
