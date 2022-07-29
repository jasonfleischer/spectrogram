function setup_controls(){

	setupOnClicks();
	function setupOnClicks(){
		$("page_name").onclick = function() { info(); };
		$("kofi_button").onclick = function() { kofi(); };
		$("info_button").onclick = function() { info(); };
	}

	//setupVolumeSlider();
	function setupVolumeSlider() {
		var slider = $("volumeRange");
		slider.value = model.master_volume_percent*10;
		var sliderText = $("volume");
		sliderText.innerHTML = "Volume: " + Number(model.master_volume_percent).toFixed() + "%";
		slider.oninput = function() {
			model.master_volume_percent = Math.max(0.00001, this.value / 10);
			storage.set_volume(model.master_volume_percent);
			sliderText.innerHTML = "Volume: " + Number(model.master_volume_percent).toFixed() + "%";
			audio_controller.updateVolume(model.master_volume_percent);
		}
	}

	//setupJustIntonationSwitch();
	function setupJustIntonationSwitch() {
		const base_id = "just_intonate" 
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
			model.is_just_intonation = value;
			storage.set_is_just_intonation(value);
			audio_controller.stop();
			pianoView.clear();
			updateUIFrequencyTable();
		});
		$(base_id+"_checkbox").checked = model.is_just_intonation;
	}

	//setupSelectControls();
	function setupSelectControls(){
		setupRootNoteSelect();
		function setupRootNoteSelect() {
			const id = "note_type_select";
			var select = $(id);
			var i;
			let noteTypes = musicKit.Note.ALL_NOTE_NAME_TYPES;
			var midi_value = 60;
			for (i = 0; i < noteTypes.length; i++) {
				let noteType = noteTypes[i];
				let value = noteType.type;
				var option = document.createElement('option');
				if(midi_value == model.selected_root_note) {
					option.setAttribute('selected','selected');
				}
				option.setAttribute('value', midi_value);
				midi_value++;
				option.innerHTML = value;
				select.appendChild(option);
			}

			$(id).addEventListener("change", function(e){
				var value = parseInt(this.value);
				log.i("on "+id+": " + value);
				model.note_type = value;
				storage.set_root_note(value);
				audio_controller.stop();
				pianoView.clear();
				buildMidiValueToJustIntonationFrequencyMap();
				updateUIFrequencyTable();
			});
			$(id).value = model.note_type;
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

