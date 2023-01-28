const audio_controller_metronome_state = Object.freeze({
	STOPPED: 0,
	RESUMED: 1
});

var timer_id = {}

class AudioControllerMetronome {

	constructor(bpm = 120, fftSize = 1024){
		
		this.fftSize = fftSize;
		this.state = audio_controller_metronome_state.STOPPED;
		this.ctx = {};
		this.oscillator = {};
		this.gain_node = {};
		this.bpm = bpm;
		this.beat_division = 4;
		this.start_time = 0;
	}

	start(ctx){
		if(this.state == audio_controller_metronome_state.STOPPED){

			this.ctx = ctx;

		   	this.oscillator = this.ctx.createOscillator()
			this.oscillator.type = "sine"
			this.oscillator.frequency.value = 2000.0;
			
			this.gain_node = this.ctx.createGain()
			this.gain_node.gain.setValueAtTime(0.0, this.ctx.currentTime);
			
			this.oscillator.connect(this.gain_node)
			this.gain_node.connect(this.ctx.destination)
			
			this.oscillator.start()

			this.state = audio_controller_metronome_state.RESUMED;

			this.startTimer();
			
		} else {
			log.i("already started");
		}
	}

	startTimer() {
		this.start_time = new Date();

		var audio_queue_index = 0;

		function BPMtoMilliSeconds(BPM) { return 1000 / (BPM / 60); }
		var time_division_milli_seconds = BPMtoMilliSeconds(this.bpm);
		
		//this.executeAudioTimer(audio_queue_index, this);

		var interval = time_division_milli_seconds;
		var expected = Date.now() + interval;

		timer_id = setTimeout(this.step.bind({
			beat_division: this.beat_division, 
			expected: expected, 
			interval: interval, 
			audio_queue_index: audio_queue_index, 
			executeAudioTimer: this.executeAudioTimer,
			oscillator: this.oscillator,
			gain_node: this.gain_node,
			ctx: this.ctx,
			step: this.step,
			timer_id: this.timer_id,
			state: this.state

		}), interval);
	}

	step() {

		var drift = Date.now() - this.expected; 
		if (drift > this.interval) {
		    	log.e("something really bad happened. Maybe the browser (tab) was inactive? possibly special handling to avoid futile 'catch up' run");
		        this.pause();
	    }
	    this.executeAudioTimer(this.audio_queue_index);
		this.audio_queue_index = (this.audio_queue_index + 1) % this.beat_division;
		this.expected += this.interval;
		timer_id = setTimeout(this.step.bind({
			beat_division: this.beat_division, 
			expected: this.expected, 
			interval: this.interval, 
			audio_queue_index: this.audio_queue_index, 
			executeAudioTimer: this.executeAudioTimer,
			oscillator: this.oscillator,
			gain_node: this.gain_node,
			ctx: this.ctx,
			step: this.step,
			timer_id: this.timer_id,
			state: this.state

		}), Math.max(0, this.interval - drift));
	}

	executeAudioTimer(index) {

		log.e(index)

		this.oscillator.frequency.value = (index == 0) ? 2000: 3000;
		var time = this.ctx.currentTime;
		var fade_time = 0.1;
		this.gain_node.gain.setValueAtTime(1.0, time);
		this.gain_node.gain.exponentialRampToValueAtTime(0.00001, time + fade_time);
	}

	stop() {

		if(this.state == audio_controller_metronome_state.RESUMED){
			this.state = audio_controller_metronome_state.STOPPED;
			clearInterval(timer_id);
		} else {
			log.i("not resumed");
		}
	}

	updateBPM(bpm) { this.bpm = bpm; }
}
