storage = {};

storage.SPECTROGRAM_MAX_FREQUENCY_KEY = "SPECTROGRAM_MAX_FREQUENCY_KEY";
storage.get_max_frequency = function(default_value = 2250){
	return storage.get(storage.SPECTROGRAM_MAX_FREQUENCY_KEY, default_value);
};
storage.set_max_frequency = function(value){
	localStorage.setItem(storage.SPECTROGRAM_MAX_FREQUENCY_KEY, value);
};

storage.SPECTROGRAM_BPM_KEY = "SPECTROGRAM_BPM_KEY";
storage.get_bpm = function(default_value = 120){
	return storage.get(storage.SPECTROGRAM_BPM_KEY, default_value);
};
storage.set_bpm = function(value){
	localStorage.setItem(storage.SPECTROGRAM_BPM_KEY, value);
};

storage.SPECTROGRAM_IS_COLORED = "SPECTROGRAM_IS_COLORED";
storage.is_colored = function(default_value = true){
	var value = storage.get(storage.SPECTROGRAM_IS_COLORED, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_is_colored = function(value){
	localStorage.setItem(storage.SPECTROGRAM_IS_COLORED, value);
};


storage.SPECTROGRAM_HAS_METRONOME = "SPECTROGRAM_HAS_METRONOME";
storage.has_metronome = function(default_value = false){
	var value = storage.get(storage.SPECTROGRAM_HAS_METRONOME, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_has_metronome = function(value){
	localStorage.setItem(storage.SPECTROGRAM_HAS_METRONOME, value);
};

storage.SPECTROGRAM_FFT_SIZE = "SPECTROGRAM_FFT_SIZE";
storage.get_fft_size = function(default_value = 4096){
	return storage.get(storage.SPECTROGRAM_FFT_SIZE, default_value);
};
storage.set_fft_size = function(value){
	localStorage.setItem(storage.SPECTROGRAM_FFT_SIZE, value);
};

storage.get = function(key, default_value) {
	let result = localStorage.getItem(key);
	return (result == undefined) ? default_value : result;
};
