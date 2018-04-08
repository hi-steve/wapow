var background = chrome.extension.getBackgroundPage();
var intervalTimers = [];

document.getElementById("url-add").addEventListener("click", function() {

	clearIntervalTimers();
	if(background.isValidUrlInput(document.getElementById('url-input').value)) {
		var url = document.getElementById('url-input').value + ".com";
		if (background.addUrlToBlocked(url) == true) {
			background.addedFromPopup.push(url);
			fadeOut("Website successfully slapped", "url-status", 0.2);
		}
		else {
			fadeOut("Website already slapped", "url-status", 0.2);
		}
	}
	else {
		fadeOut("Please re-enter the website", "url-status", 0.2);
	}
	document.getElementById('url-input').focus();
});

document.getElementById("url-remove").addEventListener("click", function() {

	clearIntervalTimers();
	if(background.isValidUrlInput(document.getElementById('url-input').value)) {
		var url = document.getElementById('url-input').value + ".com";
		if (background.removeUrlFromBlocked(url) == true) {
			background.removedFromPopup.push(url);
			fadeOut("Website successfully back-slapped", "url-status", 0.2);
		}
		else {
			fadeOut("Website not slapped", "url-status", 0.2);
		}
	}
	else {
		fadeOut("Please re-enter the website", "url-status", 0.2);
	}
	document.getElementById('url-input').focus();
});

function clearIntervalTimers() {

	background.console.log("clearIntervalTimers()");

	for (var i=0; i<intervalTimers.length; i++) {
		clearInterval(intervalTimers[i]);
		intervalTimers.splice(0, 1);
	}
}

function fadeOut(text, id, delay_ms) {

	background.console.log("fadeOut()");

	var el = document.getElementById(id);
	el.innerHTML = text;
	el.style.opacity = 1;
	var elInterval = setInterval(function() {
		if (el.style.opacity > 0) {
			el.style.opacity -= 0.1;
			background.console.log("Opacity: " + el.style.opacity);
		}
		else {
			el.innerHTML = "What would you like to do next?";
			el.style.opacity = 1;
			clearInterval(elInterval);
		}
	}, delay_ms * 1000);
	intervalTimers.push(elInterval);
}
