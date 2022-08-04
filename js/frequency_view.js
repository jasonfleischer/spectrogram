class FrequencyView {

	constructor(){
		this.drawing = false;
		this.buildView();
	}

	buildView(id = "frequency_view") {

		var root_view = $(id);
		root_view.style.border = '2px #494949 solid'

		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'absolute';
		this.canvas.style.background = '#000';
		this.canvas.style.width = root_view.clientWidth+'px';
		this.canvas.style.height = root_view.clientHeight+'px';

		this.canvasCtx = this.canvas.getContext("2d");
		this.drawing = true;

		root_view.appendChild(this.canvas);
	}

	draw(analyzerNode) {

		window.requestAnimationFrame(function() {
			frequency_view.draw(analyzerNode); // pass in self?
		});

        const bufferLength = analyzerNode.frequencyBinCount; //half the value of fftSize
		const dataArray = new Float32Array(bufferLength);

        if(this.drawing) {

			//Get spectrum data
			analyzerNode.getFloatFrequencyData(dataArray);

			//Draw black background
			this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
			this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);

			//Draw spectrum
			const barWidth = (this.canvas.width / bufferLength) * 2.5;
			let posX = 0;
			for (let i = 0; i < bufferLength; i++) {
				const barHeight = (dataArray[i] + 140) * 2;
				this.canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight + 100) + ', 50, 50)';
				this.canvasCtx.fillRect(posX, this.canvas.height - barHeight / 2, barWidth, barHeight / 2);
				posX += barWidth + 1;
			}
		}
	}

	pause(){
		this.drawing = false;
	}

	resume(){
		this.drawing = true;
	}
}