const audio_controller_state = Object.freeze({
	STOPPED: 0,
	RESUMED: 1,
	PAUSED: 2
});

class AudioController {

	constructor(onStateChange, startVisualization, hasMetronome = false, bpm = 120,fftSize = 1024, audioElement = undefined){
		this.fftSize = fftSize;
		this.audioElement = audioElement;
		this.use_microphone = (audioElement == undefined);
		this.onStateChange = onStateChange;
		this.startVisualization = startVisualization;
		this.hasMetronome = hasMetronome;
		this.state = audio_controller_state.STOPPED;
		this.ctx = {};
		this.analyzerNode = {};
		this.audio_controller_metronome = new AudioControllerMetronome(bpm);
	}

	start(){
		if(this.state == audio_controller_state.STOPPED){
			this.ctx = new AudioContext();

			if(this.hasMetronome)
				this.audio_controller_metronome.start(this.ctx);

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
				this.audioElement.src = this.audioElement.src; // to trigger oncanplay
				var thiz = this;
				this.audioElement.oncanplay = function () {
					var mediaStreamObj = this.captureStream();
					onStreamAquired(mediaStreamObj, thiz);
				}
			}
		} else {
			log.e("already started");
		}

		function onStreamAquired(mediaStreamObj, thiz) {
			if(thiz.hasMetronome)
				thiz.audio_controller_metronome.gain_node.connect(thiz.analyzerNode)
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
			this.audio_controller_metronome.start(this.ctx);
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
			this.audio_controller_metronome.stop();
			this.state = audio_controller_state.PAUSED;
			this.onStateChange(this.state);
		} else {
			log.e("not resumed");
		}
	}

	updateHasMetronome(hasMetronome) {
		this.hasMetronome = hasMetronome;
		if(hasMetronome && this.state == audio_controller_state.RESUMED){
			this.audio_controller_metronome.start(this.ctx);
		} else {
			this.audio_controller_metronome.stop();
		}
	}

	updateBPM(bpm) {
		this.audio_controller_metronome.updateBPM(bpm);
		this.audio_controller_metronome.stop();
		if(this.state == audio_controller_state.RESUMED){
			this.audio_controller_metronome.start(this.ctx);
		}
	}
}
