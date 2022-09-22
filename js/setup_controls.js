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

	setupMaxFrequencySlider();
	function setupMaxFrequencySlider() {
		const base_id = "maxFrequency";
		var slider = $(base_id+"Range");
		slider.value = storage.get_max_frequency();
		var sliderText = $(base_id);
		sliderText.innerHTML = "Max Freq: " + Number(slider.value).toFixed() + "Hz";
		slider.oninput = function() {
			var value = Number(this.value);
			storage.set_max_frequency(value);
			sliderText.innerHTML = "Max Freq: " + value.toFixed() + "Hz";
			audio_controller.updateMaxFrequency(value);
		}
	}

	setupIsColoredSwitch();
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

	setupSelectControls();
	function setupSelectControls(){
		setupFFTSizeSelect();
		function setupFFTSizeSelect() {
			const id = "fft_size_select";
			var select = $(id);
		
			$(id).addEventListener("change", function(e){
				var value = parseInt(this.value);
				log.i("on "+id+": " + value);
				model.note_type = value;
				storage.set_fft_size(value);
				audio_controller.updateFFTSize(value);
			});
			$(id).value = storage.get_fft_size();
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

