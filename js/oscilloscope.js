class Oscilloscope {
	constructor(){
		this.drawing = true;
		this.buildView();
	}

	buildView(id = "oscilloscope") {

		var root_view = $(id);
		root_view.style.border = '2px #494949 solid'

		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'absolute';
		this.canvas.style.background = '#000';
		this.canvas.style.width = root_view.clientWidth+'px';
		this.canvas.style.height = root_view.clientHeight+'px';

		this.canvasCtx = this.canvas.getContext("2d");
		var button = document.createElement('button')
		button.style.margin = "7px";
		button.style.position = 'absolute';
		button.style.width = '36px';
		button.style.height = '36px';
		button.innerHTML = 'S';
		button.onclick = function(){
			oscilloscope.toggleDrawing(button);
		}

		root_view.appendChild(this.canvas);
		root_view.appendChild(button);
	}

	draw(analyserNode) {

		window.requestAnimationFrame(function() {
	        oscilloscope.draw(analyserNode);
	    });

	    const bufferLength = analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

		if(this.drawing) {

			analyserNode.getByteTimeDomainData(dataArray);

			this.canvasCtx.fillStyle = "#000";
			this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			this.canvasCtx.lineWidth = 2;
			this.canvasCtx.strokeStyle = "#fff";
			this.canvasCtx.beginPath();

			var sliceWidth = this.canvas.width * 1.0 / bufferLength;
			var x = 0;

			for (var i = 0; i < bufferLength; i++) {

				var v = dataArray[i] / 128.0;
				var y = v * this.canvas.height / 2;

				if (i === 0) {
					this.canvasCtx.moveTo(x, y);
				} else {
					this.canvasCtx.lineTo(x, y);
				}
				x += sliceWidth;
			}

			this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
			this.canvasCtx.stroke();
		}
	}

	draw2(dataArray, bufferLength) {

		/*window.requestAnimationFrame(function() {
	        oscilloscope.draw(analyserNode);
	    });

	    const bufferLength = analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
*/
		if(this.drawing) {

			//analyserNode.getByteTimeDomainData(dataArray);

			this.canvasCtx.fillStyle = "#000";
			this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			this.canvasCtx.lineWidth = 2;
			this.canvasCtx.strokeStyle = "#fff";
			this.canvasCtx.beginPath();

			var sliceWidth = this.canvas.width * 1.0 / bufferLength;
			var x = 0;

			for (var i = 0; i < bufferLength; i++) {

				var v = dataArray[i] / 128.0;
				var y = v * this.canvas.height / 2;

				if (i === 0) {
					this.canvasCtx.moveTo(x, y);
				} else {
					this.canvasCtx.lineTo(x, y);
				}
				x += sliceWidth;
			}

			this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
			this.canvasCtx.stroke();
		}
	}

	toggleDrawing(elem){
		this.drawing = !this.drawing
		if (this.drawing) {
			removeClass(elem, "selected");
		} else {
			addClass(elem, "selected");
		}
	}
}