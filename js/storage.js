storage = {};

storage.SPECTROGRAM_MAX_FREQUENCY_KEY = "SPECTROGRAM_MAX_FREQUENCY_KEY";
storage.get_max_frequency = function(default_value = 22050){
	return storage.get(storage.SPECTROGRAM_MAX_FREQUENCY_KEY, default_value);
};
storage.set_max_frequency = function(value){
	localStorage.setItem(storage.SPECTROGRAM_MAX_FREQUENCY_KEY, value);
};

storage.SPECTROGRAM_IS_COLORED = "SPECTROGRAM_IS_COLORED";
storage.is_colored = function(default_value = true){
	var value = storage.get(storage.SPECTROGRAM_IS_COLORED, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_is_colored = function(value){
	localStorage.setItem(storage.SPECTROGRAM_IS_COLORED, value);
};

storage.SPECTROGRAM_FFT_SIZE = "SPECTROGRAM_FFT_SIZE";
storage.get_fft_size = function(default_value = 1024){
	return storage.get(storage.SPECTROGRAM_FFT_SIZE, default_value);
};
storage.set_fft_size = function(value){
	localStorage.setItem(storage.SPECTROGRAM_FFT_SIZE, value);
};

storage.get = function(key, default_value) {
	let result = localStorage.getItem(key);
	return (result == undefined) ? default_value : result;
};
