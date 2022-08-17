class Spectrogram2 {

	constructor(id = "spectrogram", useHeatMapColors = true, doFundamentalFrequencyDetection = false){
		this.drawing = false;

		this.highlightThresholdPercent = 80;
		this.buildView(id);

		this.DECIBEL_MAX = 255.0;
		this.canvasCtx = this.canvas.getContext("2d");


		this.drawing = true;
		this.dof0Detection = doFundamentalFrequencyDetection;
		this.useHeatMapColors = useHeatMapColors;
		this.colors = useHeatMapColors ? this.generateHeatMapColors() : this.generateDefaultColors();

		this.i = 0;

		this.foo = false;

		this.frequenciesDetected = [];
	}

	buildView(id) {

		var root_view = $(id);
		root_view.style.border = '2px #494949 solid'

		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'absolute';
		this.canvas.style.background = '#000';
		this.canvas.width = root_view.clientWidth;
		//this.canvas.height = 512;//root_view.clientHeight;
		this.canvas.style.width = root_view.clientWidth+'px';
		this.canvas.style.height = root_view.clientHeight+'px';

		root_view.appendChild(this.canvas);
	}

	draw(analyserNode, sampleRate) {

		window.requestAnimationFrame(this.draw.bind(this, analyserNode, sampleRate))

		const bufferLength = analyserNode.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength); // size is half of fftSize 
		analyserNode.getByteFrequencyData(dataArray);

		if(!this.foo){
			this.canvas.height = dataArray.length;
			this.foo = true;
		}
		//log.e("mD; "+analyserNode.minDecibels+' '+analyserNode.maxDecibels)

		this.drawWithArray(dataArray, sampleRate, this.colors);
	}
	
	drawWithArray(array, sampleRate, colors) {
		if (this.drawing) {

			var canvas = this.canvas;
			var canvasContext = this.canvas.getContext("2d");
						
			var width = canvas.width;
			var height = array.length;
			var tempCanvas = canvas;
			var tempCanvasContext = canvasContext;

			tempCanvasContext.drawImage(canvas, 0, 0, width, height);

			var f0frequencyPecentagePair = [];
			var drawnf0Higlight=false;
			var drawingf0Higlight=false;

			var peakIndexes = [];

			

			for (var i = 0; i < array.length; i++) { // size is half of fftSize 
				var decibelValue = array[i]; // 0-255
				var decibelPercentValue = decibelValue/this.DECIBEL_MAX*100.0;

				//freq i=0->0 Hz  i=512->sample_rate/2 = 44100/2= 22050Hz
				// piano A0 27.5 - C8 4186Hz



				

				canvasContext.fillStyle = getColor(decibelPercentValue, colors);
				canvasContext.fillRect(width - 1, height - i, 1, 1);

				if (this.dof0Detection){

					var frequency = (i/this.DECIBEL_MAX)*(sampleRate/2.0);

					if(decibelPercentValue > this.highlightThresholdPercent) {

						if(isPeak(i, array)){

							peakIndexes.push(i);
							

							


							var alpha = (decibelPercentValue-this.highlightThresholdPercent)/(100-this.highlightThresholdPercent);
							canvasContext.fillStyle = this.useHeatMapColors?"#fff":'rgba(' + [255,0,0,alpha/2].toString() + ')';
							canvasContext.fillRect(width - 1, height - i - 1, 1, 1);
							canvasContext.fillRect(width - 1, height - i + 1, 1, 1);
							canvasContext.fillStyle = this.useHeatMapColors?"#eee":'rgba(' + [255,0,0,alpha].toString() + ')';
							canvasContext.fillRect(width - 1, height - i, 1, 1);
							i++;
						}



					}
					/*if (!drawnf0Higlight && drawingf0Higlight && decibelPercentValue <= this.highlightThresholdPercent ){
						drawnf0Higlight = true;
						//log.i("------");
					}

					if (!drawnf0Higlight && decibelPercentValue > this.highlightThresholdPercent){

						var alpha = (decibelPercentValue-this.highlightThresholdPercent)/(100-this.highlightThresholdPercent);
						canvasContext.fillStyle = this.useHeatMapColors?"#fff":'rgba(' + [255,0,0,alpha].toString() + ')';
						canvasContext.fillRect(width - 1, height - i, 1, 1);
						
						
						//log.i(i + " - " + frequency + "Hz - "+decibelPercentValue);

						f0frequencyPecentagePair.push(frequency, decibelPercentValue);
						drawingf0Higlight = true;
					}*/
					
				}

				// rm later draw extra
				if(i ==1){
					canvasContext.fillStyle = "#f67";
					canvasContext.fillRect(width - 1, height - i, 1, 1);

				}else if(i==array.length-1){
					canvasContext.fillStyle = getColor(this.i, colors);
					canvasContext.fillRect(width - 1, height - i, 1, 1);

					this.i =(this.i+1)%100;
				}
			}
			if(peakIndexes.length>0){
				var firstIndex = peakIndexes[0];
				var interpolatedFrequency = parabolicPeakInterpolation(firstIndex, array, sampleRate);
				log.i('f: '+interpolatedFrequency)

				this.frequenciesDetected.push(interpolatedFrequency);
				if(this.frequenciesDetected.length == 10){
					log.i('fs: '+this.frequenciesDetected);
					log.e('f avg: '+average(this.frequenciesDetected));
					this.frequenciesDetected = [];
				}
			} else {

				//log.e('f: '+interpolatedFrequency)
				this.frequenciesDetected = [];
			}
			
			canvasContext.translate(-1, 0);
			canvasContext.drawImage(tempCanvas, 0, 0, width, height, 0, 0, width, height);
			canvasContext.setTransform(1, 0, 0, 1, 0, 0);
		}

		function isPeak(i, array){
			if(i == 0 || i == array.length-1)
				return false;
			var previousDecibelValue = array[i-1];
			var decibelValue = array[i];
			var nextDecibelValue = array[i+1];
			return decibelValue>previousDecibelValue && decibelValue>nextDecibelValue;
		}

		function parabolicPeakInterpolation(i, array, sampleRate){
			if(i == 0 || i == array.length-1)
				return false;

			var previousDecibelValue = array[i-1];
			var decibelValue = array[i];
			var nextDecibelValue = array[i+1];

			var interpolatedIndex = i + 0.5*(previousDecibelValue-nextDecibelValue)/
											(previousDecibelValue-2*decibelValue+nextDecibelValue);
			var DECIBEL_MAX = 255.0;
			var frequency = (interpolatedIndex/DECIBEL_MAX)*(sampleRate/2.0);
			return frequency;

		}

		function getColor(decibelPercentValue, colors) {
			var index = parseInt(decibelPercentValue / 100.0 * (colors.length-1));
			var color = colors[index];
			return color;
		}

		function average(array){
			var sum = 0.0;
			for(var i = 0; i < array.length; i++){
				sum =+ array[i];
			}
			return sum / array.length;

		}
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

		const redDivisor = 4;
		const blueDivisor = 1;
		const greenDivisor = 1.5;

		var redValue = 0;
		var greenValue = 0;
		var blueValue = 0;

		var lastRedValue = redValue;
		var lastBlueValue = blueValue;

		const purpleStart = 1;
		const purpleEnd = 10;
		for (var i = purpleStart; i <= purpleEnd; i++) {
			redValue = (1.0-(purpleEnd-i)/(purpleEnd-purpleStart))*255.0/redDivisor;
			greenValue = 0;
			blueValue = redValue;
			colors.push('rgba(' + [redValue, greenValue, blueValue,1].toString() + ')');
		}

		lastRedValue = redValue
		lastBlueValue = blueValue

		const blueStart = 11;
		const blueEnd = 45;
		for (var i = blueStart; i <= blueEnd; i++) {
			redValue = lastRedValue - ((1-(blueEnd-i)/(blueEnd-blueStart))*lastRedValue);
			greenValue = 0;
			blueValue = lastBlueValue + ((1-(blueEnd-i)/(blueEnd-blueStart))*lastBlueValue);
			colors.push('rgba(' + [redValue, greenValue, blueValue, 1].toString() + ')');
		}

		lastBlueValue = blueValue

		const greenStart = 46;
		const greenEnd = 56;
		for (var i = greenStart; i <= greenEnd; i++) {
			redValue = 0;
			greenValue = (1.0-(greenEnd-i)/(greenEnd-greenStart))*255.0/greenDivisor;
			blueValue = lastBlueValue - ((1-(greenEnd-i)/(greenEnd-greenStart))*lastBlueValue);
			colors.push('rgba(' + [redValue, greenValue, blueValue,1].toString() + ')');
		}

		const yellowStart = 57;
		const yellowEnd = 74;
		for (var i = yellowStart; i <= yellowEnd; i++) {
			redValue = (1.0-(yellowEnd-i)/(yellowEnd-yellowStart))*255.0;
			greenValue = 255/greenDivisor;
			blueValue = 0;
			colors.push('rgba(' + [redValue, greenValue, blueValue,1].toString() + ')');
		}

		const redStart = 75;
		const redEnd = 100;
		for (var i = redStart; i <= redEnd; i++) {
			redValue = 255;
			greenValue = (redEnd-i)/(redEnd-redStart)*255.0/greenDivisor;
			blueValue = 0;
			colors.push('rgba(' + [redValue, greenValue, blueValue, 1].toString() + ')');
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