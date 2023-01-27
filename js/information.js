information = {}

information.showAlert = function(){

	let contents = `
		<p onclick="openMailToDeveloper()">Thank you for using this website. If you wish to submit feedback, comment or report an error click <strong>here</strong>.</p>
		<p onclick="openURL('https://jasonfleischer.github.io/website/');">Information about the developer can be found <strong>here</strong>.</p>
		<p onclick="openURL('https://jasonfleischer.github.io/music-apps/')">Other music apps created by this developer can be found <strong>here</strong>.</p>`;
	alert.show("Information", contents);
};

information.dismissAlert = function(){
	alert.dismiss();
};

openURL = function(url){
	window.open(url, '_blank');
};

openMailToDeveloper = function(){
	var subject = "Spectrogram Website Feedback";
	subject = subject.replaceAll(" ", "%20");
	openURL("mailto:jason_fleischer@hotmail.ca?Subject=" + subject);
};