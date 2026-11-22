var recording_timer = undefined;
var recording_start_time = 0;
var progress_frame = undefined;

function updatePlaybackProgress() {
	var p = audio_controller.getPlaybackProgress();
	var fraction = p.duration > 0 ? Math.min(p.current / p.duration, 1) : 0;
	$("playback_progress_bar").style.width = (fraction * 100) + "%";
	$("playback_progress_time").textContent =
		formatRecordingTime(p.current * 1000) + " / " + formatRecordingTime(p.duration * 1000);
	if (audio_controller.isPlayingBack()) {
		progress_frame = requestAnimationFrame(updatePlaybackProgress);
	} else {
		progress_frame = undefined;
	}
}

function setup_recording_controls() {

	audio_controller.onRecordingChange = updateUI_recording;

	$("record").onclick = function() {
		if (audio_controller.isRecording) {
			audio_controller.stopRecording();
		} else if (audio_controller.state == audio_controller_state.STOPPED) {
			// start the microphone first, then record
			audio_controller.start(function() { audio_controller.startRecording(); });
		} else {
			audio_controller.startRecording();
		}
	};
	$("play_recording").onclick = function() {
		if (audio_controller.isPlayingBack()) {
			audio_controller.stopPlayback();
		} else {
			audio_controller.playRecording();
		}
	};
	$("download_recording").onclick = function() { audio_controller.downloadRecording(); };

	if (typeof MediaRecorder === 'undefined') {
		$("record").title = "Recording is not supported in this browser";
	}
	updateUI_recording();
}

function formatRecordingTime(milliseconds) {
	var total = Math.floor(milliseconds / 1000);
	var minutes = Math.floor(total / 60);
	var seconds = total % 60;
	return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

updateUI_recording = function() {
	var c = audio_controller;
	var recording = c.isRecording;
	var playing = c.isPlayingBack();
	var supported = typeof MediaRecorder !== 'undefined' && c.use_microphone;

	// Record / Stop Recording
	var record = $("record");
	record.disabled = !supported || playing;
	if (recording) {
		addClass(record, "recording");
		if (recording_timer == undefined) {
			recording_start_time = Date.now();
			recording_timer = setInterval(function() {
				record.textContent = "Stop Recording " + formatRecordingTime(Date.now() - recording_start_time);
			}, 250);
		}
		record.textContent = "Stop Recording " + formatRecordingTime(Date.now() - recording_start_time);
	} else {
		removeClass(record, "recording");
		clearInterval(recording_timer);
		recording_timer = undefined;
		record.textContent = "Record";
	}

	// Playback progress bar
	$("playback_progress").style.display = playing ? "flex" : "none";
	if (playing && progress_frame == undefined) {
		progress_frame = requestAnimationFrame(updatePlaybackProgress);
	}

	// Play Recording / Stop Playback
	var play = $("play_recording");
	play.disabled = !c.hasRecording() || recording || c.isDecoding || c.state == audio_controller_state.STOPPED;
	play.textContent = playing ? "Stop Playback" : "Play Recording";

	$("download_recording").disabled = !c.hasRecording() || recording;
}
