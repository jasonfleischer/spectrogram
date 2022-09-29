const audio_controller_state = Object.freeze({
	STOPPED: 0,
	RESUMED: 1,
	PAUSED: 2
});

class AudioController {

	constructor(onStateChange, startVisualization, fftSize = 1024, audioElement = undefined){
		this.fftSize = fftSize;
		this.audioElement = audioElement;
		this.use_microphone = (audioElement == undefined);
		this.onStateChange = onStateChange;
		this.startVisualization = startVisualization;
		this.state = audio_controller_state.STOPPED;
		this.ctx = {};
		this.analyzerNode = {};
	}

	start(){
		if(this.state == audio_controller_state.STOPPED){
			this.ctx = new AudioContext();
			this.analyzerNode = this.ctx.createAnalyser();
		   	this.analyzerNode.smoothingTimeConstant = 0;
		   	this.analyzerNode.fftSize = this.fftSize;

			if (this.use_microphone){
				navigator.mediaDevices.getUserMedia({ video: false, audio: true })
				  	.then( (mediaStreamObj) => {
						onStreamAquired(mediaStreamObj, this);
					})
					.catch( (err) => {
					 	log.e("getUserMedia: " + err);
					});

			} else {
				this.audioElement.oncanplay = function () { 
					var mediaStreamObj = this.audioElement.captureStream();
					onStreamAquired(mediaStreamObj, this);
				}
			}
		} else {
			log.e("already started");
		}

		function onStreamAquired(mediaStreamObj, thiz) {
			var sourceNode = thiz.ctx.createMediaStreamSource(mediaStreamObj);
			sourceNode.connect(thiz.analyzerNode);
			thiz.startVisualization(thiz);
			thiz.state = audio_controller_state.RESUMED;
			thiz.onStateChange(thiz.state);
		}
	}

	resume() {
		if(this.state == audio_controller_state.PAUSED){
			this.state = audio_controller_state.RESUMED;
			this.onStateChange(this.state);
		} else {
			log.e("not paused");
		}
	}

	pause() {

		if(this.state == audio_controller_state.RESUMED){
			if(!this.use_microphone){
				this.audioElement.pause();
			}
			this.state = audio_controller_state.PAUSED;
			this.onStateChange(this.state);
		} else {
			log.e("not resumed");
		}
	}
}
