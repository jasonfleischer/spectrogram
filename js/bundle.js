(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){$=function(id){return document.getElementById(id)};var isSafari=navigator.vendor&&navigator.vendor.indexOf("Apple")>-1&&navigator.userAgent&&navigator.userAgent.indexOf("CriOS")==-1&&navigator.userAgent.indexOf("FxiOS")==-1;window.mobileCheck=function(){let check=false;(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check=true})(navigator.userAgent||navigator.vendor||window.opera);return check};window.mobileAndTabletCheck=function(){let check=false;(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check=true})(navigator.userAgent||navigator.vendor||window.opera);return check};function isFromHomeScreen(){const params=new URLSearchParams(window.location.search);return params.has("from")}function hasClass(ele,cls){return!!ele.className.match(new RegExp("(\\s|^)"+cls+"(\\s|$)"))}function addClass(ele,cls){if(!hasClass(ele,cls))ele.className+=" "+cls}function removeClass(ele,cls){if(hasClass(ele,cls)){var reg=new RegExp("(\\s|^)"+cls+"(\\s|$)");ele.className=ele.className.replace(reg," ")}}const removeChildren=parent=>{while(parent.lastChild){parent.removeChild(parent.lastChild)}};model={};storage={};storage.SPECTROGRAM_MAX_FREQUENCY_KEY="SPECTROGRAM_MAX_FREQUENCY_KEY";storage.get_max_frequency=function(default_value=2250){return storage.get(storage.SPECTROGRAM_MAX_FREQUENCY_KEY,default_value)};storage.set_max_frequency=function(value){localStorage.setItem(storage.SPECTROGRAM_MAX_FREQUENCY_KEY,value)};storage.SPECTROGRAM_IS_COLORED="SPECTROGRAM_IS_COLORED";storage.is_colored=function(default_value=true){var value=storage.get(storage.SPECTROGRAM_IS_COLORED,default_value);return Boolean(value==="true"||value===true)};storage.set_is_colored=function(value){localStorage.setItem(storage.SPECTROGRAM_IS_COLORED,value)};storage.SPECTROGRAM_FFT_SIZE="SPECTROGRAM_FFT_SIZE";storage.get_fft_size=function(default_value=4096){return storage.get(storage.SPECTROGRAM_FFT_SIZE,default_value)};storage.set_fft_size=function(value){localStorage.setItem(storage.SPECTROGRAM_FFT_SIZE,value)};storage.get=function(key,default_value){let result=localStorage.getItem(key);return result==undefined?default_value:result};class FrequencyView{constructor(){this.drawing=false;this.buildView()}buildView(id="frequency_view"){var root_view=$(id);this.canvas=document.createElement("canvas");this.canvas.style.position="absolute";this.canvas.style.background="#000";this.canvas.style.width=root_view.clientWidth+"px";this.canvas.style.height=root_view.clientHeight+"px";this.canvasCtx=this.canvas.getContext("2d");this.drawing=true;root_view.appendChild(this.canvas)}draw(analyzerNode){window.requestAnimationFrame(this.draw.bind(this,analyzerNode));const bufferLength=analyzerNode.frequencyBinCount;const dataArray=new Float32Array(bufferLength);if(this.drawing){analyzerNode.getFloatFrequencyData(dataArray);this.canvasCtx.fillStyle="rgb(0, 0, 0)";this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height);const barWidth=this.canvas.width/bufferLength*2.5;let posX=0;for(let i=0;i<bufferLength;i++){const barHeight=(dataArray[i]+140)*2;this.canvasCtx.fillStyle="rgb("+Math.floor(barHeight+100)+", 50, 50)";this.canvasCtx.fillRect(posX,this.canvas.height-barHeight/2,barWidth,barHeight/2);posX+=barWidth+1}}}pause(){this.drawing=false}resume(){this.drawing=true}}const audio_controller_state=Object.freeze({STOPPED:0,RESUMED:1,PAUSED:2});class AudioController{constructor(onStateChange,startVisualization,fftSize=1024,audioElement=undefined){this.fftSize=fftSize;this.audioElement=audioElement;this.use_microphone=audioElement==undefined;this.onStateChange=onStateChange;this.startVisualization=startVisualization;this.state=audio_controller_state.STOPPED;this.ctx={};this.analyzerNode={}}start(){if(this.state==audio_controller_state.STOPPED){this.ctx=new AudioContext;this.analyzerNode=this.ctx.createAnalyser();this.analyzerNode.smoothingTimeConstant=0;this.analyzerNode.fftSize=this.fftSize;if(this.use_microphone){navigator.mediaDevices.getUserMedia({video:false,audio:true}).then(mediaStreamObj=>{onStreamAquired(mediaStreamObj,this)}).catch(err=>{log.e("getUserMedia: "+err)})}else{this.audioElement.src=this.audioElement.src;var thiz=this;this.audioElement.oncanplay=function(){var mediaStreamObj=this.captureStream();onStreamAquired(mediaStreamObj,thiz)}}}else{log.e("already started")}function onStreamAquired(mediaStreamObj,thiz){var sourceNode=thiz.ctx.createMediaStreamSource(mediaStreamObj);sourceNode.connect(thiz.analyzerNode);thiz.startVisualization(thiz);thiz.state=audio_controller_state.RESUMED;thiz.onStateChange(thiz.state)}}resume(){if(this.state==audio_controller_state.PAUSED){this.state=audio_controller_state.RESUMED;this.onStateChange(this.state)}else{log.e("not paused")}}pause(){if(this.state==audio_controller_state.RESUMED){if(!this.use_microphone){this.audioElement.pause()}this.state=audio_controller_state.PAUSED;this.onStateChange(this.state)}else{log.e("not resumed")}}}alert={};alert.init=function(){$("alert_container").addEventListener("click",function(event){alert.dismiss()});$("dismiss_alert_button").addEventListener("click",function(event){alert.dismiss()});$("alert").addEventListener("click",function(event){event.stopPropagation();return false})};alert.show=function(title,contents){$("alert_title").innerHTML=title;$("alert_contents").innerHTML=contents;$("alert_container").style.display="block"};alert.dismiss=function(){$("alert_container").style.display="none"};information={};information.showAlert=function(){let contents=`
		<p onclick="openMailToDeveloper()">Thank you for using this website. If you wish to submit feedback, comment or report an error click <strong>here</strong>.</p>
		<p onclick="openURL('https://jasonfleischer.github.io/website/');">Information about the developer can be found <strong>here</strong>.</p>
		<p onclick="openURL('https://jasonfleischer.github.io/music-apps/')">Other music apps created by this developer can be found <strong>here</strong>.</p>`;alert.show("Information",contents)};information.dismissAlert=function(){alert.dismiss()};openURL=function(url){window.open(url,"_blank")};openMailToDeveloper=function(){var subject="Spectrogram Website Feedback";subject=subject.replaceAll(" ","%20");openURL("mailto:jason_fleischer@hotmail.ca?Subject="+subject)};function setup_controls(){setupOnClicks();function setupOnClicks(){$("page_name").onclick=function(){info()};$("kofi_button").onclick=function(){kofi()};$("info_button").onclick=function(){info()};$("start").onclick=function(){audio_controller.start()};$("resume").onclick=function(){audio_controller.resume()};$("pause").onclick=function(){audio_controller.pause()}}setupMaxFrequencySlider();function setupMaxFrequencySlider(){const base_id="maxFrequency";var slider=$(base_id+"Range");slider.value=storage.get_max_frequency();var sliderText=$(base_id);sliderText.innerHTML="Max Freq: "+Number(slider.value).toFixed()+"Hz";slider.oninput=function(){var value=Number(this.value);storage.set_max_frequency(value);sliderText.innerHTML="Max Freq: "+value.toFixed()+"Hz";updateMaxFrequency(value)};function updateMaxFrequency(maximumFrequency){var savedState=audio_controller.state;audio_controller.pause();spectrogram.updateMaximumFrequency(maximumFrequency);spectrogram.refreshCanvasHeight();if(savedState==audio_controller_state.RESUMED){audio_controller.resume()}}}setupIsColoredSwitch();function setupIsColoredSwitch(){const base_id="is_colored";$(base_id).addEventListener("click",function(e){$(base_id+"_checkbox").click()});$(base_id+"_label").addEventListener("click",function(e){$(base_id+"_checkbox").click()});$(base_id+"_checkbox_switch").addEventListener("keyup",function(e){if(event.code==="Space"||event.code==="Enter")$(base_id+"_checkbox").click()});$(base_id+"_checkbox").addEventListener("change",function(e){var value=this.checked;log.i("on "+base_id+" change: "+value);storage.set_is_colored(value);spectrogram.updateColors(value);spectrogram.updateHighlightPeaks(!value)});$(base_id+"_checkbox").checked=storage.is_colored()}setupSelectControls();function setupSelectControls(){setupFFTSizeSelect();function setupFFTSizeSelect(){const id="fft_size_select";var select=$(id);$(id).addEventListener("change",function(e){var value=parseInt(this.value);log.i("on "+id+": "+value);model.note_type=value;storage.set_fft_size(value);updateFFTSize(value)});$(id).value=storage.get_fft_size()}function updateFFTSize(fftSize){var savedState=audio_controller.state;audio_controller.pause();audio_controller.fftSize=fftSize;audio_controller.analyzerNode.fftSize=fftSize;spectrogram.refreshCanvasHeight();if(savedState==audio_controller_state.RESUMED){audio_controller.resume()}}}}kofi=function(){window.open("https://ko-fi.com/jasonfleischer","_blank")};info=function(){information.showAlert()};dismissInfo=function(){information.dismissAlert()};const log=require("@jasonfleischer/log");const Spectrogram=require("@jasonfleischer/spectrogram");var audio_controller={};var oscilloscope={};var frequency_view={};var spectrogram={};init=function(){alert.init();audio_controller=new AudioController(onStateChange=onAudioStateChanged,startVisualization=startVisualization,fftSize=storage.get_fft_size());oscilloscope=new Oscilloscope;frequency_view=new FrequencyView;spectrogram=new Spectrogram("spectrogram",useHeatMapColors=storage.is_colored(),highlightPeaks=!storage.is_colored(),darkMode=true,minimumFrequency=0,maximumFrequency=storage.get_max_frequency());window_resized_end();setup_keyboard_listeners();setup_controls();updateUI_buttons(audio_controller.state);var isSafariMobile=window.mobileAndTabletCheck()&&isSafari;if(isSafariMobile&&!isFromHomeScreen()){install.showAlert()}};onAudioStateChanged=function(audio_state){switch(audio_state){case audio_controller_state.STOPPED:break;case audio_controller_state.RESUMED:oscilloscope.resume();frequency_view.resume();spectrogram.resume();break;case audio_controller_state.PAUSED:oscilloscope.pause();frequency_view.pause();spectrogram.pause();break}updateUI_buttons(audio_state)};updateUI_buttons=function(audio_state){switch(audio_state){case audio_controller_state.STOPPED:$("start").disabled=false;$("start").style.display="block";$("resume").disabled=true;$("resume").style.display="none";$("pause").disabled=true;$("pause").style.display="none";break;case audio_controller_state.RESUMED:$("start").disabled=true;$("start").style.display="none";$("resume").disabled=true;$("resume").style.display="none";$("pause").disabled=false;$("pause").style.display="block";break;case audio_controller_state.PAUSED:$("start").disabled=true;$("start").style.display="none";$("resume").disabled=false;$("resume").style.display="block";$("pause").disabled=true;$("pause").style.display="none";break}};function startVisualization(audio_controller){var analyzerNode=audio_controller.analyzerNode;oscilloscope.draw(analyzerNode);frequency_view.draw(analyzerNode);spectrogram.draw(analyzerNode,audio_controller.ctx.sampleRate)}function setup_keyboard_listeners(){window.onkeydown=function(e){return e.keyCode!==32&&e.key!==" "};document.addEventListener("keyup",function(event){var code=event.code;if(code==="Space"){$("stop").disabled=false;audio_controller.start()}else{event.preventDefault()}})}var window_resize_start_event_occured=false;var resized_timer;window.onresize=function(){clearTimeout(resized_timer);resized_timer=setTimeout(window_resized_end,200);if(!window_resize_start_event_occured){window_resized_start();window_resize_start_event_occured=true}};function window_resized_start(){dismissInfo()}function window_resized_end(){window_resize_start_event_occured=false;let contentWidth=document.body.clientWidth;if(audio_controller.state==audio_controller_state.RESUMED)audio_controller.pause();let paddingLeftRight=30;spectrogram.resize(Math.min(contentWidth-paddingLeftRight,1e3));if(audio_controller.state==audio_controller_state.PAUSED)audio_controller.resume()}class Oscilloscope{constructor(){this.drawing=false;this.buildView()}buildView(id="oscilloscope"){var root_view=$(id);this.canvas=document.createElement("canvas");this.canvas.style.position="absolute";this.canvas.style.background="#000";this.canvas.style.width=root_view.clientWidth+"px";this.canvas.style.height=root_view.clientHeight+"px";this.canvasCtx=this.canvas.getContext("2d");this.drawing=true;root_view.appendChild(this.canvas)}draw(analyserNode){window.requestAnimationFrame(this.draw.bind(this,analyserNode));const bufferLength=analyserNode.frequencyBinCount;const dataArray=new Uint8Array(bufferLength);if(this.drawing){analyserNode.getByteTimeDomainData(dataArray);this.canvasCtx.fillStyle="#000";this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height);this.canvasCtx.lineWidth=2;this.canvasCtx.strokeStyle="#fff";this.canvasCtx.beginPath();var sliceWidth=this.canvas.width*1/bufferLength;var x=0;for(var i=0;i<bufferLength;i++){var v=dataArray[i]/128;var y=v*this.canvas.height/2;if(i===0){this.canvasCtx.moveTo(x,y)}else{this.canvasCtx.lineTo(x,y)}x+=sliceWidth}this.canvasCtx.lineTo(this.canvas.width,this.canvas.height/2);this.canvasCtx.stroke()}}pause(){this.drawing=false}resume(){this.drawing=true}}var install={};let prompt;const PROJECT_NAME="spectrogram";if("serviceWorker"in navigator){navigator.serviceWorker.register("/"+PROJECT_NAME+"/service_worker.js",{scope:"/"+PROJECT_NAME+"/"}).then(function(reg){if(reg.installing){console.log(PROJECT_NAME+": Service worker installing")}else if(reg.waiting){console.log(PROJECT_NAME+": Service worker installed")}else if(reg.active){console.log(PROJECT_NAME+": Service worker active")}}).catch(function(error){console.log("Registration failed with "+error)})}else{console.log("Service worker not available")}window.onload=function(){init()};window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();prompt=e;if(window.mobileAndTabletCheck()){install.showAlert(function(){prompt.prompt()})}});window.addEventListener("appinstalled",async function(e){alert.dismiss()});install.showAlert=function(install_action){let contents=`
		<p>Install this app on your device to easily access it anytime. Installing this app will result in better performance, improved fullscreen experience, and usage without an internet connection.</p>
		<br/>
	`;var isSafariMobile=window.mobileAndTabletCheck()&&isSafari;if(isSafariMobile){contents+=`
			<div id="ios_install_instructions">
				<p>1. Tap on <img src="img/export.png" alt="export"/></p>
				<p>2. Select 'Add to Home Screen'</p>
			</div>`}else{contents+='<button id="install">Install</button>'}alert.show("Install App",contents);if(!isSafariMobile){let installButton=document.getElementById("install");installButton.addEventListener("click",install_action)}};const CACHE_NAME="v7";const ROOT_DIRECTORY_NAME="spectrogram";const CACHE=["/"+ROOT_DIRECTORY_NAME+"/index.html","/"+ROOT_DIRECTORY_NAME+"/css/bundle.css","/"+ROOT_DIRECTORY_NAME+"/js/bundle.js"];self.addEventListener("install",function(event){console.log(ROOT_DIRECTORY_NAME+": install");event.waitUntil(caches.open(CACHE_NAME).then(function(cache){return cache.addAll(CACHE)}))});self.addEventListener("fetch",function(event){console.log(ROOT_DIRECTORY_NAME+": fetch");event.respondWith(caches.open(CACHE_NAME).then(function(cache){return cache.match(event.request).then(function(response){return response||fetch(event.request).then(function(response){cache.put(event.request,response.clone());return response})})}))});self.addEventListener("activate",function activator(event){console.log(ROOT_DIRECTORY_NAME+": activate");event.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(key){return key.indexOf(CACHE_NAME)!==0}).map(function(key){return caches.delete(key)}))}))})},{"@jasonfleischer/log":2,"@jasonfleischer/spectrogram":3}],2:[function(require,module,exports){var LOG_NON_ERROR_MESSAGES=true;const log={};log.i=function(msg){if(LOG_NON_ERROR_MESSAGES)console.log(msg)};log.e=function(msg){console.log("%c ERROR: "+msg,"background: red; color: white; display: block;")};log.turnOffNonErrorLogs=function(){LOG_NON_ERROR_MESSAGES=false};module.exports=log},{}],3:[function(require,module,exports){const Spectrogram=require("./lib/spectrogram.js");module.exports=Spectrogram},{"./lib/spectrogram.js":4}],4:[function(require,module,exports){class Spectrogram{constructor(id="spectrogram",useHeatMapColors=true,highlightPeaks=false,darkMode=true,minimumFrequency=0,maximumFrequency=22050,linear=true){this.id=id;this.darkMode=darkMode;this.buildView();this.DECIBEL_MAX=255;this.canvasCtx=this.canvas.getContext("2d");this.drawing=true;this.highlightThresholdPercent=75;this.highlightPeaks=highlightPeaks;this.useHeatMapColors=useHeatMapColors;this.colors=useHeatMapColors?this.generateHeatMapColors():this.generateDefaultColors();this.canvasHeightSetup=false;this.minimumFrequency=minimumFrequency;this.maximumFrequency=maximumFrequency;this.linear=linear}buildView(){var root_view=document.getElementById(this.id);this.canvas=document.createElement("canvas");this.canvas.style.position="absolute";this.canvas.style.background=this.darkMode?"#000":"#FFF";this.canvas.width=root_view.clientWidth;this.canvas.style.width=root_view.clientWidth+"px";this.canvas.style.height=root_view.clientHeight+"px";root_view.appendChild(this.canvas)}draw(analyserNode,sampleRate){window.requestAnimationFrame(this.draw.bind(this,analyserNode,sampleRate));const bufferLength=analyserNode.frequencyBinCount;var dataArray=new Uint8Array(bufferLength);analyserNode.getByteFrequencyData(dataArray);if(!this.canvasHeightSetup){this.canvas.height=this.getCanvasHeight(sampleRate,dataArray.length);this.canvasHeightSetup=true}if(!this.linear){function stretchDataArray(dataArray){var linearArray=[];var N=dataArray.length;for(var i=0;i<N;i++){var index=this.getNonLinearIndex(i,N);var floorDecibelValue=dataArray[Math.floor(index)];var ceilDecibelValue=dataArray[Math.ceil(index)];var diff=ceilDecibelValue-floorDecibelValue;var perc=index-Math.floor(index);var newValue=floorDecibelValue+diff*perc;linearArray.push(newValue)}return linearArray}dataArray=stretchDataArray(dataArray)}this.drawWithArray(dataArray,sampleRate,this.colors)}drawWithArray(array,sampleRate,colors){if(this.drawing){var canvas=this.canvas;var canvasContext=this.canvas.getContext("2d");var width=canvas.width;var height=this.getCanvasHeight(sampleRate,array.length);var tempCanvas=canvas;var tempCanvasContext=canvasContext;tempCanvasContext.drawImage(canvas,0,0,width,height);var minIndex=Math.max(Math.floor(this.minimumFrequency/(sampleRate/2)*array.length),0);if(!this.linear){minIndex=this.getNonLinearIndex(minIndex,array.length)}var maxIndex=Math.min(Math.ceil(this.maximumFrequency/(sampleRate/2)*array.length),22050);if(!this.linear){maxIndex=this.getNonLinearIndex(maxIndex,array.length)}for(var i=minIndex;i<=maxIndex;i++){var decibelValue=array[i];var decibelPercentValue=decibelValue/this.DECIBEL_MAX*100;var frequency=i/(array.length-1)*(sampleRate/2);canvasContext.fillStyle=getColor(decibelPercentValue,colors);canvasContext.fillRect(width-1,height-i+minIndex,1,1);if(this.highlightPeaks){if(decibelPercentValue>this.highlightThresholdPercent){if(isPeak(i,array)){var alpha=(decibelPercentValue-this.highlightThresholdPercent)/(100-this.highlightThresholdPercent);canvasContext.fillStyle="rgba("+[255,0,0,alpha].toString()+")";canvasContext.fillRect(width-1,height-i,1,1)}}}}canvasContext.translate(-1,0);canvasContext.drawImage(tempCanvas,0,0,width,height+minIndex,0,0,width,height+minIndex);canvasContext.setTransform(1,0,0,1,0,0)}function isPeak(i,array){if(i==0||i==array.length-1)return false;var previousDecibelValue=array[i-1];var decibelValue=array[i];var nextDecibelValue=array[i+1];return decibelValue>previousDecibelValue&&decibelValue>nextDecibelValue}function getColor(decibelPercentValue,colors){var index=parseInt(decibelPercentValue/100*(colors.length-1));return colors[index]}}getCanvasHeight(sampleRate,arrayLength){var maxIndex=Math.min(Math.ceil(this.maximumFrequency/(sampleRate/2)*arrayLength),22050);if(!this.linear){maxIndex=this.getNonLinearIndex(maxIndex,arrayLength)}var minIndex=Math.max(Math.floor(this.minimumFrequency/(sampleRate/2)*arrayLength),0);if(!this.linear){maxIndex=this.getNonLinearIndex(maxIndex,arrayLength)}return maxIndex-minIndex}generateDefaultColors(){var numberOfColors=50;var frequency=Math.PI/numberOfColors;var amplitude=127;var center=128;var slice=Math.PI/2*3.1;var colors=[];for(var i=0;i<numberOfColors;i++){var v=Math.sin(frequency*i+slice)*amplitude+center>>0;v=this.darkMode?v:255-v;colors.push("rgba("+[v,v,v,1].toString()+")")}return colors}generateHeatMapColors(){function getColors(fromColor=[0,0,0],toColor=[255,255,255],numberOfColors=100){function getColorValue(startValue,endValue,percent){if(startValue===endValue){return startValue}else if(startValue>endValue){return startValue-percent*(startValue-endValue)}else{return startValue+percent*(endValue-startValue)}}var colors=[];var startRedValue=fromColor[0];var startGreenValue=fromColor[1];var startBlueValue=fromColor[2];var endRedValue=toColor[0];var endGreenValue=toColor[1];var endBlueValue=toColor[2];for(var i=0;i<numberOfColors;i++){var percent=i/(numberOfColors-1);var redValue=getColorValue(startRedValue,endRedValue,percent);var greenValue=getColorValue(startGreenValue,endGreenValue,percent);var blueValue=getColorValue(startBlueValue,endBlueValue,percent);colors.push("rgba("+[redValue,greenValue,blueValue,1].toString()+")")}return colors}const black=[0,0,0];const white=[255,255,255];const background=this.darkMode?black:white;const purple=this.darkMode?[64,0,64]:[125,0,125];const blue=[0,0,255];const green=[0,170,0];const orange=[255,170,0];const red=[255,0,0];return[].concat(getColors(background,purple,15),getColors(purple,blue,35),getColors(blue,green,10),getColors(green,orange,20),getColors(orange,red,20))}resize(newWidth){var root_view=document.getElementById(this.id);root_view.style.width=newWidth+"px";this.canvasHeightSetup=false;this.buildView()}getNonLinearIndex(i,N){return Math.pow(i,2)/(N-1)}updateColors(useHeatMapColors){this.colors=useHeatMapColors?this.generateHeatMapColors():this.generateDefaultColors()}updateHighlightPeaks(highlightPeaks){this.highlightPeaks=highlightPeaks}updateMaximumFrequency(maximumFrequency){this.maximumFrequency=maximumFrequency}refreshCanvasHeight(){this.canvasHeightSetup=false}pause(){this.drawing=false}resume(){this.drawing=true}}module.exports=Spectrogram},{}]},{},[1]);