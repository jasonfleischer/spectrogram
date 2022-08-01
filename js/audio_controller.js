audio_controller = {
	setup: false,
	ctx: {},
	analyzerNode: {},
	compressorNode: {},
	masterGainNode: {}
};

audio_controller.startRecording = function() {

	let audioIN = { audio: true };
    navigator.mediaDevices.getUserMedia(audioIN)
 
      .then(function (mediaStreamObj) {
 
        let audio = document.getElementById('audio');

        let audio1 = document.getElementById('audio1');
        
        audio.srcObject = mediaStreamObj;


        audio_controller.ctx = new AudioContext();
        audio_controller.analyzerNode = audio_controller.ctx.createAnalyser();
    	audio_controller.analyzerNode.fftSize = 2048;// 256;//32;//2048;
    	audio_controller.analyzerNode.smoothingTimeConstant = 0;

       log.e(mediaStreamObj);
       log.e(audio1);
       log.e(audio1.srcObject)//nil
       log.e(audio1.duration)
       log.e(audio1.audioTracks)//nil

		//var source = audio_controller.ctx.createMediaStreamSource(mediaStreamObj);
        
		/*const captureStream = audio1.captureStream();
		log.e('captureStream:'+captureStream);
        let audioTracks = captureStream.getAudioTracks();
        log.e('audioTracks:'+audioTracks);
  		let source = audio_controller.ctx.createMediaStreamTrackSource(audioTracks[0]);
  		log.e('source:'+source);*/


  		var source = audio_controller.ctx.createMediaStreamSource(audio1.captureStream());
  		/*

  		*/
        
        source.connect(audio_controller.analyzerNode);
        oscilloscope.draw(audio_controller.analyzerNode);

        const bufferLength = audio_controller.analyzerNode.frequencyBinCount; //half the value of fftSize
		const dataArray = new Float32Array(bufferLength);
        draw(audio_controller.analyzerNode, dataArray, bufferLength)
    });
}

const canvas = document.getElementById('frequency_canvas');
const canvasCtx = canvas.getContext('2d');
canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
function draw(analyzerNode, dataArray, bufferLength) {
  //Schedule next redraw
  //requestAnimationFrame(draw);

  //var analyzerNode = audio_controller.analyzerNode;
  //log.e('gg'+analyzerNode)
  window.requestAnimationFrame(function() {
	    draw(analyzerNode, dataArray, bufferLength);
  });

  //Get spectrum data
  analyzerNode.getFloatFrequencyData(dataArray);

  //Draw black background
  canvasCtx.fillStyle = 'rgb(0, 0, 0)';
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  //Draw spectrum
  const barWidth = (canvas.width / bufferLength) * 2.5;
  let posX = 0;
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = (dataArray[i] + 140) * 2;
    canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight + 100) + ', 50, 50)';
    canvasCtx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
    posX += barWidth + 1;
  }
};




//import chroma from "chroma-js";
var spectro = new Spectrogram(document.getElementById('spectoCanvas'), {
  audio: {
    enable: false
  }/*,

  colors: function(steps) {
    var baseColors = [[0,0,255,1], [0,255,255,1], [0,255,0,1], [255,255,0,1], [ 255,0,0,1]];
    var positions = [0, 0.15, 0.30, 0.50, 0.75];
 
    var scale = new chroma.scale(baseColors, positions)
    .domain([0, steps]);
 
    var colors = [];
 
    for (var i = 0; i < steps; ++i) {
      var color = scale(i);
      colors.push(color.hex());
    }
 
    return colors;
  }*/
});
audio_controller.stopRecording = function() {

	navigator.getUserMedia({
	  video: false,
	  audio: true
	},
	function(stream) {

		var audioContext = new AudioContext();
	  var input = audioContext.createMediaStreamSource(stream);
	  var analyser = audioContext.createAnalyser();
	 
	  analyser.smoothingTimeConstant = 0;
	  analyser.fftSize = 2048;
	 
	  input.connect(analyser);
	 
	  spectro.connectSource(analyser, audioContext);
	  spectro.start();
	}, function(error) {
	 
	});

}

audio_controller.playSound = function() {

	let audio1 = document.getElementById('audio1');

	audio1.play();
}