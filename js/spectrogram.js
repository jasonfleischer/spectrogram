
class Spectrogram {

  constructor(id = "spectrogram", 
              options = { audio: { enable: false }, canvas: { width: 400, height:400} },
              colors){

    //if (!(this instanceof Spectrogram)) {
      //return new Spectrogram(canvas, options);
    //}

    var root_view = $(id);
    this.root_view = root_view;
    root_view.style.border = '2px #494949 solid'

    var canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.background = '#000';


   /// this.canvas.width = root_view.clientWidth;
    //this.canvas.height = root_view.clientHeight;
    canvas.style.width = root_view.clientWidth+'px';
    canvas.style.height = root_view.clientHeight+'px';

    //canvas.style.width = root_view.clientWidth+'px';
    //canvas.style.height = root_view.clientHeight+'px';
    root_view.appendChild(canvas);


    var baseCanvasOptions = options.canvas || {};

    baseCanvasOptions.width = root_view.clientWidth;
    baseCanvasOptions.height = root_view.clientHeight;

    this._audioEnded = null;
    this._paused = null;
    this._pausedAt = null;
    this._startedAt = null;
    this._sources = {
      audioBufferStream: null,
      userMediaStream: null
    };
    this._baseCanvas = canvas;
    this._baseCanvasContext = this._baseCanvas.getContext('2d');

    root_view.width = _result(baseCanvasOptions.width) || this._baseCanvas.width;
    root_view.height = _result(baseCanvasOptions.height) || this._baseCanvas.height;
    this._baseCanvas.width = _result(baseCanvasOptions.width) || this._baseCanvas.width;
    this._baseCanvas.height = _result(baseCanvasOptions.height) || this._baseCanvas.height;

    window.onresize = function() {
      root_view.width = _result(baseCanvasOptions.width) || this._baseCanvas.width;
      root_view.height = _result(baseCanvasOptions.height) || this._baseCanvas.height;
      this._baseCanvas.width = _result(baseCanvasOptions.width) || this._baseCanvas.width;
      this._baseCanvas.height = _result(baseCanvasOptions.height) || this._baseCanvas.height;
    }.bind(this);

    var audioOptions = options.audio || {};
    this.audio = audioOptions;

    var colors = [];

    if (typeof options.colors === 'function') {
      colors = options.colors(275);
    } else {
      colors = this._generateDefaultColors(275);
    }

    this._colors = colors;

    this._baseCanvasContext.fillStyle = this._getColor(0);
    this._baseCanvasContext.fillRect(0, 0, this._baseCanvas.width, this._baseCanvas.height);
  }

  _init() {
    var source = this._sources.audioBufferStream;
    source.scriptNode = source.audioContext.createScriptProcessor(2048, 1, 1);
    source.scriptNode.connect(source.audioContext.destination);
    source.scriptNode.onaudioprocess = function(event) {
      var array = new Uint8Array(source.analyser.frequencyBinCount);
      source.analyser.getByteFrequencyData(array);

      this._draw(array, source.canvasContext);
    }.bind(this);

    source.sourceNode.onended = function() {
      this.stop();
    }.bind(this);

    source.analyser = source.audioContext.createAnalyser();
    source.analyser.smoothingTimeConstant = 0;
    source.analyser.fftSize = 1024;

    source.analyser.connect(source.scriptNode);
    source.sourceNode.connect(source.analyser);
    if (this.audio.enable) {
      source.sourceNode.connect(source.audioContext.destination);
    }
  };

  _draw(array, canvasContext) {
      if (this._paused) {
        return false;
      }

      var canvas = canvasContext.canvas;
      var width = canvas.width;
      var height = canvas.height;
      var tempCanvasContext = canvasContext._tempContext;
      var tempCanvas = tempCanvasContext.canvas;
      tempCanvasContext.drawImage(canvas, 0, 0, width, height);

      for (var i = 0; i < array.length; i++) {
        var value = array[i];
        canvasContext.fillStyle = this._getColor(value);
        if (this._audioEnded) {
          canvasContext.fillStyle = this._getColor(0);
        }
        canvasContext.fillRect(width - 1, height - i, 1, 1);
      }

      canvasContext.translate(-1, 0);
      // draw prev canvas before translation
      canvasContext.drawImage(tempCanvas, 0, 0, width, height, 0, 0, width, height);
      canvasContext.drawImage(tempCanvas, 0, 0, width, height, 0, 0, width, height);
      // reset transformation matrix
      canvasContext.setTransform(1, 0, 0, 1, 0, 0);

      this._baseCanvasContext.drawImage(canvas, 0, 0, width, height);
  };

  _startMediaStreamDraw(analyser, canvasContext) {
    window.requestAnimationFrame(this._startMediaStreamDraw.bind(this, analyser, canvasContext));
    var audioData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(audioData);
    this._draw(audioData, canvasContext);
  };

  connectSource(audioBuffer, audioContext) {

    log.e("connectSource")

    log.e(audioBuffer)
    var source = this._sources.audioBufferStream || {};

    // clear current audio process
    if (toString.call(source.scriptNode) === '[object ScriptProcessorNode]') {
      source.scriptNode.onaudioprocess = null;
    }

    if (toString.call(audioBuffer) === '[object AudioBuffer]') {
      audioContext = (!audioContext && source.audioBuffer.context) || (!audioContext && source.audioContext) || audioContext;

      var sourceNode = audioContext.createBufferSource();
      sourceNode.buffer = audioBuffer;

      var canvasContext = source.canvasContext;

      if (!source.canvasContext) {
        var canvas = document.createElement('canvas');
        this.root_view.width = this._baseCanvas.width;
        this.root_view.height = this._baseCanvas.height;
        canvas.width = this._baseCanvas.width;
        canvas.height = this._baseCanvas.height;
        canvasContext = canvas.getContext('2d');

        log.e('temp canvas init')
        var tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;

        canvasContext._tempContext = tempCanvas.getContext('2d');
      }

      source = {
        audioBuffer: audioBuffer,
        audioContext: audioContext,
        sourceNode: sourceNode,
        analyser: null,
        scriptNode: null,
        canvasContext: canvasContext
      };

      this._sources.audioBufferStream = source;
      this._init();
    }

    if (toString.call(audioBuffer) === '[object AnalyserNode]') {
      source = this._sources.userMediaStream || {};
      source.analyser = audioBuffer;
      this._sources.userMediaStream = source;
    }
  };

  start(offset) {
    log.e("start")
    var source = this._sources.audioBufferStream;
    var sourceMedia = this._sources.userMediaStream;

    if (source && source.sourceNode) {
      source.sourceNode.start(0, offset||0);
      this._audioEnded = false;
      this._paused = false;
      this._startedAt = Date.now();
    }

    // media stream uses an analyser for audio data
    if (sourceMedia && sourceMedia.analyser) {
      source = sourceMedia;
      var canvas = document.createElement('canvas');
      this.root_view.width = this._baseCanvas.width;
      this.root_view.height = this._baseCanvas.height;
      canvas.width = this._baseCanvas.width;
      canvas.height = this._baseCanvas.height;
      var canvasContext = canvas.getContext('2d');

      var tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;

      canvasContext._tempContext = tempCanvas.getContext('2d');

      this._startMediaStreamDraw(source.analyser, canvasContext);
    }
  };

  stop() {
    var source = this._sources[Object.keys(this._sources)[0]];
    if (source && source.sourceNode) {
      source.sourceNode.stop();
    }
    this._audioEnded = true;
  };

  pause() {
    this.stop();
    this._paused = true;
    this._pausedAt += Date.now() - this._startedAt;
  };

  resume(offset) {
     log.e("resume")
    log.e(offset)

    var source = this._sources;
    //var source = this._sources[Object.keys(this._sources)[0]];
     log.e(source)
    this._paused = false;
    if (this._pausedAt) {
      
      this.connectSource(source.audioBuffer, source.audioContext);
      this.start(offset || (this._pausedAt / 1000));
    }
  };

  clear(canvasContext) {
    var source = this._sources[Object.keys(this._sources)[0]];

    this.stop();

    if (toString.call(source.scriptNode) === '[object ScriptProcessorNode]') {
      source.scriptNode.onaudioprocess = null;
    }

    canvasContext = canvasContext || source.canvasContext;
    var canvas = canvasContext.canvas;
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext._tempContext.clearRect(0, 0, canvas.width, canvas.height);
    this._baseCanvasContext.clearRect(0, 0, canvas.width, canvas.height);
  };

  _generateDefaultColors(steps) {
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
  };

  _getColor(index) {
    var color = this._colors[index>>0];

    if (typeof color === 'undefined') {
      color = this._colors[0];
    }

    return color;
  };
}
  /*if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Spectrogram;
    }
    exports.Spectrogram = Spectrogram;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return Spectrogram;
    });
  } else {
    root.Spectrogram = Spectrogram;
  }*/

