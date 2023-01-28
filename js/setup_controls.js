function setup_controls(){

	setupOnClicks();
	function setupOnClicks(){
		$("page_name").onclick = function() { info(); };
		$("kofi_button").onclick = function() { kofi(); };
		$("info_button").onclick = function() { info(); };

		$("start").onclick = function() { audio_controller.start(); };
		$("resume").onclick = function() { audio_controller.resume(); };
		$("pause").onclick = function() { audio_controller.pause(); };
	}

	setupSliderControls();

	function setupSliderControls(){
		setupMaxFrequencySlider();
		setupBPMSlider();
		setupMetronomeVolumeSlider();

		function setupMaxFrequencySlider() {
			const base_id = "max_frequency";
			var slider = $(base_id+"_range");
			slider.value = storage.get_max_frequency();
			var sliderText = $(base_id);
			sliderText.innerHTML = "Max Freq: " + Number(slider.value).toFixed() + "Hz";
			slider.oninput = function() {
				var value = Number(this.value);
				storage.set_max_frequency(value);
				sliderText.innerHTML = "Max Freq: " + value.toFixed() + "Hz";
				updateMaxFrequency(value);
			}

			function updateMaxFrequency(maximumFrequency) {
				
				var savedState = audio_controller.state;
				audio_controller.pause();
				spectrogram.updateMaximumFrequency(maximumFrequency);
				spectrogram.refreshCanvasHeight();
					
				if(savedState == audio_controller_state.RESUMED){
					audio_controller.resume();
				}
			}
		}
		function setupBPMSlider() {
			const base_id = "bpm";
			var slider = $(base_id+"_range");
			slider.value = storage.get_bpm();
			var sliderText = $(base_id);
			sliderText.innerHTML = "BPM: " + Number(slider.value).toFixed();
			slider.oninput = function() {
				var value = Number(this.value);
				storage.set_bpm(value);
				sliderText.innerHTML = "BPM: " + value.toFixed();
			}
			slider.addEventListener("mouseup", function(){
				var value = Number(this.value);
				storage.set_bpm(value);
				sliderText.innerHTML = "BPM: " + value.toFixed();
				audio_controller.updateBPM(value);
			});
		}

		function setupMetronomeVolumeSlider() {
			const base_id = "metronome_volume";
			var slider = $(base_id+"_range");
			slider.value = storage.get_metronome_volume();
			var sliderText = $(base_id);
			sliderText.innerHTML = "Volume: " + Number(slider.value*100).toFixed() + "%";
			slider.oninput = function() {
				var value = Number(this.value);
				storage.set_metronome_volume(value);
				sliderText.innerHTML = "Volume: " + (value*100).toFixed() + "%";
			}
			slider.addEventListener("mouseup", function(){
				var value = Number(this.value);
				storage.set_metronome_volume(value);
				sliderText.innerHTML = "Volume: " + (value*100).toFixed() + "%";
				audio_controller.updateMetronomeVolume(value);
			});
		}
	}

	setupSwitchControls();
	function setupSwitchControls(){
		
		setupIsColoredSwitch();
		setupHasMetronomeSwitch();
		function setupIsColoredSwitch() {
			const base_id = "is_colored" 
			$(base_id).addEventListener("click", function(e){
				$(base_id+"_checkbox").click();
			});
			$(base_id+"_label").addEventListener("click", function(e){
				$(base_id+"_checkbox").click();
			});
			$(base_id+"_checkbox_switch").addEventListener('keyup', function(e) {
				if (event.code === 'Space' || event.code === 'Enter') $(base_id+"_checkbox").click();
			});
			$(base_id+"_checkbox").addEventListener("change", function(e){
				var value = this.checked;
				log.i("on "+base_id+" change: " + value);
				storage.set_is_colored(value);
				spectrogram.updateColors(value);
				spectrogram.updateHighlightPeaks(!value);			
			});
			$(base_id+"_checkbox").checked = storage.is_colored();
		}

		function setupHasMetronomeSwitch() {
			const base_id = "has_metronome" 
			$(base_id).addEventListener("click", function(e){
				$(base_id+"_checkbox").click();
			});
			$(base_id+"_label").addEventListener("click", function(e){
				$(base_id+"_checkbox").click();
			});
			$(base_id+"_checkbox_switch").addEventListener('keyup', function(e) {
				if (event.code === 'Space' || event.code === 'Enter') $(base_id+"_checkbox").click();
			});
			$(base_id+"_checkbox").addEventListener("change", function(e){
				var value = this.checked;
				log.i("on "+base_id+" change: " + value);
				storage.set_has_metronome(value);
				audio_controller.updateHasMetronome(value);	
				hideShowMetronomeControls(value)
			});
			var has_metronome = storage.has_metronome();
			$(base_id+"_checkbox").checked = has_metronome;
			hideShowMetronomeControls(has_metronome);
			function hideShowMetronomeControls(has_metronome) {
				var value = has_metronome ? "table-row": "none";
				$("bpm_row").style.display = value;
				$("metronome_volume_row").style.display = value;
				$("metronome_beat_division_row").style.display = value;
			}
		}
	}

	setupSelectControls();
	function setupSelectControls(){
		setupFFTSizeSelect();
		setupTimeSignatureSelect();

		function setupFFTSizeSelect() {
			const id = "fft_size_select";
			var select = $(id);
		
			$(id).addEventListener("change", function(e){
				var value = parseInt(this.value);
				log.i("on "+id+": " + value);
				storage.set_fft_size(value);
				updateFFTSize(value);
			});
			$(id).value = storage.get_fft_size();

			function updateFFTSize(fftSize) {

				var savedState = audio_controller.state;
				audio_controller.pause();
				audio_controller.fftSize = fftSize;
				audio_controller.analyzerNode.fftSize = fftSize;
				spectrogram.refreshCanvasHeight();

				if(savedState == audio_controller_state.RESUMED){
					audio_controller.resume();
				}
			}
		}

		function setupTimeSignatureSelect() {
			const id = "metronome_beat_division_select";
			var select = $(id);
		
			$(id).addEventListener("change", function(e){
				var value = parseInt(this.value);
				log.i("on "+id+": " + value);
				storage.set_metronome_beat_division(value);
				audio_controller.updateMetronomeBeatDivision(value);
			});
			$(id).value = storage.get_metronome_beat_division();
		}
	}
}

kofi = function(){
	window.open("https://ko-fi.com/jasonfleischer", "_blank");
}
info = function(){
	information.showAlert();
}
dismissInfo = function (){
	information.dismissAlert();
}

