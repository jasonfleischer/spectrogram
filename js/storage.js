storage = {};

/*storage.VOLUME_KEY = "JUST_INTONATION_VOLUME_KEY";
storage.get_volume = function(default_value){
	return storage.get(storage.VOLUME_KEY, default_value);
};
storage.set_volume = function(value){
	localStorage.setItem(storage.VOLUME_KEY, value);
};

storage.JUST_INTONATION_PRESET_INDEX = "JUST_INTONATION_PRESET_INDEX";
storage.get_preset_index = function(default_value){
	return storage.get(storage.JUST_INTONATION_PRESET_INDEX, default_value);
};
storage.set_preset_index = function(value){
	localStorage.setItem(storage.JUST_INTONATION_PRESET_INDEX, value);
};

storage.JUST_INTONATION_ROOT_NOTE = "JUST_INTONATION_ROOT_NOTE";
storage.get_root_note = function(default_value){
	return storage.get(storage.JUST_INTONATION_ROOT_NOTE, default_value);
};
storage.set_root_note = function(value){
	localStorage.setItem(storage.JUST_INTONATION_ROOT_NOTE, value);
};

storage.JUST_INTONATION_IS_JUST_INTONATION = "JUST_INTONATION_IS_JUST_INTONATION";
storage.is_just_intonation = function(default_value){
	var value = storage.get(storage.JUST_INTONATION_IS_JUST_INTONATION, default_value);
	return Boolean(value === "true" || value === true);
};
storage.set_is_just_intonation = function(value){
	localStorage.setItem(storage.JUST_INTONATION_IS_JUST_INTONATION, value);
};*/

storage.get = function(key, default_value) {
	let result = localStorage.getItem(key);
	return (result == undefined) ? default_value : result;
};
