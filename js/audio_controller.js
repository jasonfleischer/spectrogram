audio_controller = {
	setup: false,
	ctx: {},
	analyzerNode: {},
	compressorNode: {},
	masterGainNode: {}
};

audio_controller.startRecording = function() {

let audioIN = { audio: true };
    //  audio is true, for recording
 
    // Access the permission for use
    // the microphone
    navigator.mediaDevices.getUserMedia(audioIN)
 
      // 'then()' method returns a Promise
      .then(function (mediaStreamObj) {
 
        // Connect the media stream to the
        // first audio element
        //let audio = document.querySelector('audio');

        let audio = document.getElementById('audio');

        let audio1 = document.getElementById('audio1');

        //returns the recorded audio via 'audio' tag
 
        // 'srcObject' is a property which
        // takes the media object
        // This is supported in the newer browsers
        
        audio.srcObject = mediaStreamObj;


        audio_controller.ctx = new AudioContext();
        audio_controller.analyzerNode = audio_controller.ctx.createAnalyser();
        
    	audio_controller.analyzerNode.fftSize = 2048;



       // 
       
       log.e(mediaStreamObj);
       log.e(audio1);
       log.e(audio1.srcObject)
       log.e(audio1.duration)
       log.e(audio1.audioTracks)

		//var source = audio_controller.ctx.createMediaStreamSource(mediaStreamObj);
        
		const captureStream = audio1.captureStream();
        let audioTracks = captureStream.getAudioTracks();
  		let source = audioCtx.createMediaStreamTrackSource(audioTracks[0]);
        
        source.connect(audio_controller.analyzerNode);
        oscilloscope.draw(audio_controller.analyzerNode);
    });
}

audio_controller.stopRecording = function() {


}

audio_controller.playSound = function() {

	let audio1 = document.getElementById('audio1');

	audio1.play();
}