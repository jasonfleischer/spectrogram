var window_resize_start_event_occured = false;
var resized_timer;
window.onresize = function(){
	clearTimeout(resized_timer);
	resized_timer = setTimeout(window_resized_end, 200);
	if(!window_resize_start_event_occured) {
		window_resized_start();
		window_resize_start_event_occured = true;
	}
};

function window_resized_start(){
	dismissInfo();	
}

function window_resized_end(){

	window_resize_start_event_occured = false;
	let contentWidth = document.body.clientWidth;
	
	audio_controller.stop();
}