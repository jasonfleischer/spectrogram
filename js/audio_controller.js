const audio_controller_state = Object.freeze({
	STOPPED: 0,
	RESUMED: 1,
	PAUSED: 2
});

class AudioController {

	constructor(onStateChange, startVisualization, hasMetronome = false, bpm = 120, metronomeVolume = 1.0, metronomeBeatDivision = 4, fftSize = 1024, audioElement = undefined){
		this.fftSize = fftSize;
		this.audioElement = audioElement;
		this.use_microphone = (audioElement == undefined);
		this.onStateChange = onStateChange;
		this.startVisualization = startVisualization;
		this.hasMetronome = hasMetronome;
		this.state = audio_controller_state.STOPPED;
		this.ctx = {};
		this.analyzerNode = {};
		this.mediaStream = undefined;
		this.sourceNode = undefined;
		this.mode = 'live'; // 'live' (microphone) or 'playback' (recording)
		this.isRecording = false;
		this.recorder = undefined;
		this.recordedChunks = [];
		this.recordingBlob = undefined;
		this.recordingMimeType = '';
		this.recordingDuration = 0; // seconds
		this.recordingStartTime = 0;
		this.playbackBuffer = undefined;   // decoded recording
		this.playbackSource = undefined;   // current AudioBufferSourceNode
		this.playbackOffset = 0;           // seconds into the recording
		this.playbackStartCtxTime = 0;
		this.isDecoding = false;
		this.onRecordingChange = function(){};
		this.audio_controller_metronome = new AudioControllerMetronome(bpm, metronomeVolume, metronomeBeatDivision, fftSize);
	}

	start(onStarted){
		if(this.state == audio_controller_state.STOPPED){
			this.ctx = new AudioContext();

			this.audio_controller_metronome.setup(this.ctx);
			if(this.hasMetronome) {
				this.audio_controller_metronome.resume();
			} else {
				this.audio_controller_metronome.pause();
			}

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
			
			thiz.audio_controller_metronome.gain_node.connect(thiz.analyzerNode)
			var sourceNode = thiz.ctx.createMediaStreamSource(mediaStreamObj);
			sourceNode.connect(thiz.analyzerNode);
			thiz.mediaStream = mediaStreamObj;
			thiz.sourceNode = sourceNode;
			thiz.startVisualization(thiz);
			thiz.state = audio_controller_state.RESUMED;
			thiz.onStateChange(thiz.state);
			if (typeof onStarted === 'function') onStarted();
		}
	}

	resume() {
		if(this.state == audio_controller_state.PAUSED){
			this.state = audio_controller_state.RESUMED;
			if(this.hasMetronome)
				this.audio_controller_metronome.resume();
			if(this.mode == 'playback' && !this.playbackSource){
				this.startPlaybackSource(this.playbackOffset);
			}
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
			if(this.mode == 'playback'){
				this.pausePlaybackSource();
			}
			this.audio_controller_metronome.pause();
			this.state = audio_controller_state.PAUSED;
			this.onStateChange(this.state);
		} else {
			log.e("not resumed");
		}
	}

	updateHasMetronome(hasMetronome) {

		this.hasMetronome = hasMetronome;
		if(hasMetronome && this.state == audio_controller_state.RESUMED){
			this.audio_controller_metronome.resume();
		} else {
			this.audio_controller_metronome.pause();
		}
	}

	updateBPM(bpm) {
		this.audio_controller_metronome.updateBPM(bpm);
		this.audio_controller_metronome.pause();
		if(this.state == audio_controller_state.RESUMED){
			this.audio_controller_metronome.resume();
		}
	}

	updateMetronomeVolume(volume) {
		this.audio_controller_metronome.updateVolume(volume);
		this.audio_controller_metronome.pause();
		if(this.state == audio_controller_state.RESUMED){
			this.audio_controller_metronome.resume();
		}
	}

	updateMetronomeBeatDivision(value) {
		this.audio_controller_metronome.updateBeatDivision(value);
		this.audio_controller_metronome.pause();
		if(this.state == audio_controller_state.RESUMED){
			this.audio_controller_metronome.resume();
		}
	}

	// ---- recording & playback ----

	canRecord() {
		return this.state != audio_controller_state.STOPPED && this.mode == 'live' &&
			this.use_microphone && typeof MediaRecorder !== 'undefined' && this.mediaStream != undefined;
	}

	hasRecording() {
		return this.recordingBlob != undefined;
	}

	isPlayingBack() {
		return this.mode == 'playback';
	}

	startRecording() {
		if (this.isRecording || !this.canRecord()) {
			log.e("cannot start recording");
			return false;
		}
		const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
		const mimeType = types.find((t) => MediaRecorder.isTypeSupported(t));
		try {
			this.recorder = mimeType ? new MediaRecorder(this.mediaStream, {mimeType: mimeType}) : new MediaRecorder(this.mediaStream);
		} catch (err) {
			log.e("MediaRecorder: " + err);
			return false;
		}
		var thiz = this;
		var recorder = this.recorder;
		this.recordedChunks = [];
		recorder.ondataavailable = function(e) {
			if (e.data && e.data.size > 0) thiz.recordedChunks.push(e.data);
		};
		recorder.onstop = function() {
			var type = recorder.mimeType || mimeType || 'audio/webm';
			if (thiz.recordedChunks.length > 0) {
				thiz.recordingBlob = new Blob(thiz.recordedChunks, {type: type});
				thiz.playbackBuffer = undefined;
				thiz.recordingMimeType = type;
				thiz.recordingDuration = (Date.now() - thiz.recordingStartTime) / 1000;
			}
			thiz.recordedChunks = [];
			thiz.isRecording = false;
			thiz.onRecordingChange();
		};
		recorder.start(250);
		this.recordingStartTime = Date.now();
		this.isRecording = true;
		this.onRecordingChange();
		return true;
	}

	stopRecording() {
		if (this.isRecording && this.recorder && this.recorder.state != 'inactive') {
			this.recorder.stop(); // onstop updates state
		}
	}

	// Playback decodes the recording and plays it through an AudioBufferSourceNode.
	// (A media element source is unreliable on mobile Safari, which left the spectrogram empty.)
	playRecording() {
		if (!this.hasRecording() || this.isRecording || this.isDecoding || this.mode == 'playback' || this.state == audio_controller_state.STOPPED) {
			log.e("cannot play recording");
			return;
		}
		var thiz = this;
		// resume inside the user gesture; mobile browsers may have suspended the context
		if (this.ctx.state != 'running') this.ctx.resume();

		this.decodeRecording().then(function(buffer) {
			thiz.playbackBuffer = buffer;
			thiz.sourceNode.disconnect(thiz.analyzerNode); // swap the microphone for the recording
			thiz.mode = 'playback';
			thiz.playbackOffset = 0;
			if (thiz.state == audio_controller_state.PAUSED) {
				thiz.resume(); // starts the source
			} else {
				thiz.startPlaybackSource(0);
			}
			thiz.onRecordingChange();
		}).catch(function(err) {
			log.e("decode recording: " + err);
			thiz.isDecoding = false;
			thiz.onRecordingChange();
		});
		this.isDecoding = true;
		this.onRecordingChange();
		$("record").style.setProperty("--record-icon-color", "#444");
	}

	decodeRecording() {
		var thiz = this;
		if (this.playbackBuffer) return Promise.resolve(this.playbackBuffer).then(done);
		return new Promise(function(resolve, reject) {
			var reader = new FileReader();
			reader.onerror = function() { reject(reader.error); };
			reader.onload = function() {
				// callback form too, for older Safari that has no promise-based decodeAudioData
				var p = thiz.ctx.decodeAudioData(reader.result, resolve, reject);
				if (p && p.catch) p.catch(reject);
			};
			reader.readAsArrayBuffer(thiz.recordingBlob);
		}).then(done);
		function done(buffer) { thiz.isDecoding = false; return buffer; }
	}

	startPlaybackSource(offset) {
		var thiz = this;
		var source = this.ctx.createBufferSource();
		source.buffer = this.playbackBuffer;
		source.connect(this.analyzerNode);
		source.connect(this.ctx.destination); // audible
		source.onended = function() {
			if (thiz.playbackSource === source) thiz.stopPlayback(); // finished on its own
		};
		this.playbackSource = source;
		this.playbackOffset = offset;
		this.playbackStartCtxTime = this.ctx.currentTime;
		source.start(0, offset);
	}

	pausePlaybackSource() {
		if (!this.playbackSource) return;
		this.playbackOffset = this.currentPlaybackTime();
		this.releasePlaybackSource();
	}

	releasePlaybackSource() {
		var source = this.playbackSource;
		this.playbackSource = undefined;
		if (source) {
			source.onended = null;
			try { source.stop(); } catch (e) {}
			source.disconnect();
		}
	}

	currentPlaybackTime() {
		if (!this.playbackBuffer) return 0;
		var t = this.playbackSource ? this.playbackOffset + (this.ctx.currentTime - this.playbackStartCtxTime) : this.playbackOffset;
		return Math.min(t, this.playbackBuffer.duration);
	}

	// seconds
	getPlaybackProgress() {
		if (this.mode != 'playback' || !this.playbackBuffer) return {current: 0, duration: this.recordingDuration};
		return {current: this.currentPlaybackTime(), duration: this.playbackBuffer.duration};
	}

	stopPlayback() {
		if (this.mode != 'playback') return;
		this.releasePlaybackSource();
		this.sourceNode.connect(this.analyzerNode); // back to the microphone
		this.playbackOffset = 0;
		this.mode = 'live';
		this.onRecordingChange();
		$("record").style.setProperty("--record-icon-color", "#ff4d4d");
	}

	downloadRecording() {
		if (!this.hasRecording()) return;
		var type = this.recordingMimeType;
		var ext = type.indexOf('mp4') > -1 ? 'm4a' : (type.indexOf('ogg') > -1 ? 'ogg' : 'webm');
		var url = URL.createObjectURL(this.recordingBlob);
		var a = document.createElement('a');
		a.href = url;
		a.download = 'recording.' + ext;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
	}
}
