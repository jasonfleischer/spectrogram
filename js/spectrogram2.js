class Spectrogram2 {

	constructor(id = "spectrogram"){
		this.drawing = false;
		this.buildView(id);
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

		this.canvasCtx = this.canvas.getContext("2d");
		this.drawing = true;
		this.colors = this.generateDefaultColors(275);

		root_view.appendChild(this.canvas);
	}

	draw(analyserNode) {

	    window.requestAnimationFrame(this.draw.bind(this, analyserNode))

	    const bufferLength = analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserNode.getByteFrequencyData(dataArray);

        this.drawWithArray(dataArray, this);
	}
	
	drawWithArray(array, self) {
		if (this.drawing) {

			var canvas = this.canvas;
			var canvasContext = this.canvas.getContext("2d");
			var width = canvas.width;
			var height = canvas.height;
			var tempCanvas = canvas;
			var tempCanvasContext = canvasContext;

			tempCanvasContext.drawImage(canvas, 0, 0, width, height);

			for (var i = 0; i < array.length; i++) {
				var value = array[i];
				canvasContext.fillStyle = getColor(value, self);
				canvasContext.fillRect(width - 1, height - i, 1, 1);
			}
			canvasContext.translate(-1, 0);
			canvasContext.drawImage(tempCanvas, 0, 0, width, height, 0, 0, width, height);
			canvasContext.setTransform(1, 0, 0, 1, 0, 0);

		}
      	function getColor(index, self) {

			var colors = self.colors;
		    var color = colors[index>>0];
		    if (typeof color === 'undefined') {
		    	color = colors[0];
		    }
		    return color;
	  	};
 	}
	
	generateDefaultColors(steps) {
	    var frequency = Math.PI / steps;
	    var amplitude = 127;
	    var center = 128;
	    var slice = (Math.PI / 2) * 3.1;
	    var colors = [];

	    function toRGBString(v) {
	      return 'rgba(' + [v,v,v,1].toString() + ')';
	    }

	    for (var i = 0; i < steps; i++) {
	      var v = (Math.sin((frequency * i) + slice) * amplitude + center) >> 0;

	      colors.push(toRGBString(v));
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