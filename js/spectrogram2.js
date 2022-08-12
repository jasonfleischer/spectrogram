class Spectrogram2 {

	constructor(id = "spectrogram", useHeatMapColors = true, doFundamentalFrequencyDetection = false){
		this.drawing = false;

		this.highlightThresholdPercent = 90;//0-255
		this.buildView(id);

		this.DECIBEL_MAX = 255.0;
		this.canvasCtx = this.canvas.getContext("2d");
		this.drawing = true;
		this.dof0Detection = doFundamentalFrequencyDetection;
		this.useHeatMapColors = useHeatMapColors;
		this.colors = useHeatMapColors ? this.generateHeatMapColors() : this.generateDefaultColors();

		this.i = 0;
	}

	buildView(id) {

		var root_view = $(id);
		root_view.style.border = '2px #494949 solid'

		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'absolute';
		this.canvas.style.background = '#000';
		this.canvas.width = root_view.clientWidth;
		this.canvas.height = root_view.clientHeight;
		this.canvas.style.width = root_view.clientWidth+'px';
		this.canvas.style.height = root_view.clientHeight+'px';

		root_view.appendChild(this.canvas);
	}

	draw(analyserNode, sampleRate) {

		window.requestAnimationFrame(this.draw.bind(this, analyserNode, sampleRate))

		const bufferLength = analyserNode.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength); // 512
		analyserNode.getByteFrequencyData(dataArray);


		//log.e("mD; "+analyserNode.minDecibels+' '+analyserNode.maxDecibels)

		this.drawWithArray(dataArray, sampleRate, this.colors);
	}
	
	drawWithArray(array, sampleRate, colors) {
		if (this.drawing) {

			var canvas = this.canvas;
			var canvasContext = this.canvas.getContext("2d");
			var width = canvas.width;
			var height = canvas.height;
			var tempCanvas = canvas;
			var tempCanvasContext = canvasContext;

			tempCanvasContext.drawImage(canvas, 0, 0, width, height);

			var f0frequencyPecentagePair = [];
			var drawnf0Higlight=false;
			var drawingf0Higlight=false;

			

			for (var i = 0; i < array.length; i++) { //512
				var decibelValue = array[i]; // 0-255
				var decibelPercentValue = decibelValue/this.DECIBEL_MAX*100.0;

				//freq i=0->0 Hz  i=512->sample_rate/2 = 44100/2= 22050Hz
				// piano A0 27.5 - C8 4186Hz



				

				canvasContext.fillStyle = getColor(decibelPercentValue, colors);
				canvasContext.fillRect(width - 1, height - i, 1, 1);

				if (this.dof0Detection){
					if (!drawnf0Higlight && drawingf0Higlight && decibelPercentValue <= this.highlightThresholdPercent ){
						drawnf0Higlight = true;
						//log.i("------");
					}

					if (!drawnf0Higlight && decibelPercentValue > this.highlightThresholdPercent){

						var alpha = (decibelPercentValue-this.highlightThresholdPercent)/(100-this.highlightThresholdPercent);
						canvasContext.fillStyle = this.useHeatMapColors?"#fff":'rgba(' + [255,0,0,alpha].toString() + ')';
						canvasContext.fillRect(width - 1, height - i, 1, 1);
						var frequency = (i/this.DECIBEL_MAX)*(sampleRate/2.0);
						
						//log.i(i + " - " + frequency + "Hz - "+decibelPercentValue);

						f0frequencyPecentagePair.push(frequency, decibelPercentValue);
						drawingf0Higlight = true;
					}
				}

				if(i==array.length-1){
					canvasContext.fillStyle = getColor(this.i, colors);
					canvasContext.fillRect(width - 1, height - i, 1, 1);

					this.i =(this.i+1)%100;
				}
			}

			canvasContext.translate(-1, 0);
			canvasContext.drawImage(tempCanvas, 0, 0, width, height, 0, 0, width, height);
			canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		}

		function highlightLogic(){

		}

		function getColor(decibelPercentValue, colors) {
			var index = parseInt(decibelPercentValue / 100.0 * (colors.length-1));
			var color = colors[index];
			return color;
		};
	}
	
	generateDefaultColors() {

		var numberOfColors = 50;
		var frequency = Math.PI / numberOfColors;
		var amplitude = 127;
		var center = 128;
		var slice = (Math.PI / 2) * 3.1;
		var colors = [];

		for (var i = 0; i < numberOfColors; i++) {
			var v = (Math.sin((frequency * i) + slice) * amplitude + center) >> 0;
			colors.push('rgba(' + [v,v,v,1].toString() + ')');
		}

		return colors;
	}

	generateHeatMapColors() {
		
		var colors = [];

		const blueDivisor = 2.5;
		const blueStart = 1;
		const blueEnd = 44;
		for (var i = blueStart; i <= blueEnd; i++) {
			var blueValue = (1.0-(blueEnd-i)/(blueEnd-blueStart))*255.0/blueDivisor;
			colors.push('rgba(' + [0,0,blueValue,1].toString() + ')');
		}

		const greenStart = 45;
		const greenEnd = 52;
		for (var i = greenStart; i <= greenEnd; i++) {
			var greenValue = (1.0-(greenEnd-i)/(greenEnd-greenStart))*255.0;
			var blueValue = (greenEnd-i)/(greenEnd-greenStart)*255.0/blueDivisor;
			colors.push('rgba(' + [0,greenValue,blueValue,1].toString() + ')');
		}

		const yellowStart = 53;
		const yellowEnd = 84;
		for (var i = yellowStart; i <= yellowEnd; i++) {
			var redValue = (1.0-(yellowEnd-i)/(yellowEnd-yellowStart))*255.0;
			colors.push('rgba(' + [redValue,255,0,1].toString() + ')');
		}

		const redStart = 85;
		const redEnd = 100;
		for (var i = redStart; i <= redEnd; i++) {
			var greenValue = (redEnd-i)/(redEnd-redStart)*255.0;
			colors.push('rgba(' + [255,greenValue,0,1].toString() + ')');
		}		

		return colors;
	}

	pause(){
		this.drawing = false;
	}

	resume(){
		this.drawing = true;
	}
}