function setup_keyboard_listeners() {

	window.onkeydown = function(e) {
    	return e.keyCode !== 32 && e.key !== " ";
	};
	document.addEventListener('keyup', function(event){
		var code = event.code;
		if (code === 'Space') {
			//todo
		} else {
			event.preventDefault();
		}
	});
}