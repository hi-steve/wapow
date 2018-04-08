var background = chrome.extension.getBackgroundPage();

document.getElementById("options-url-add").addEventListener("click", function() {

	if (background.isValidUrlInput(document.getElementById('options-url-input').value)) {
		var url = document.getElementById('options-url-input').value + ".com";
		if (background.addUrlToBlocked(url) == true) {
			addUrlToList("www." + url);
		}
	}
	document.getElementById('options-url-input').focus();
});

document.getElementById("options-url-remove").addEventListener("click", function() {

	if (background.isValidUrlInput(document.getElementById('options-url-input').value)) {
		var url = document.getElementById('options-url-input').value + ".com";
		if (background.removeUrlFromBlocked(url) == true) {
			removeUrlFromList("www." + url);
		}
	}
	document.getElementById('options-url-input').focus();
});

function addUrlToList(url_input) {
	background.console.log("addUrlToList(url_input)");
	var ul = document.getElementById("options-url-list-blocked");
  var li = document.createElement("li");
	li.setAttribute('id',url_input);
  li.appendChild(document.createTextNode(url_input));
  ul.appendChild(li);
}

function removeUrlFromList(url_input) {
	var ul = document.getElementById("options-url-list-blocked");
  var li = document.getElementById(url_input);
  ul.removeChild(li);
}

function displayList() {
	var blockedUrlsList = background.blockedUrls;
	for (var i=0; i<blockedUrlsList.length; i++) {
		addUrlToList("www." + blockedUrlsList[i]);
	}
}

window.addEventListener("load", function() {
	background.console.log("Options page load");
	background.addedFromPopup = [];
	background.removedFromPopup = [];
	displayList();
});

window.addEventListener("focus", function() {
	// Add to list on options.html if url was added from popup
	if (background.addedFromPopup.length > 0) {
		var addedUrls = background.addedFromPopup;
		for (var index=0; index<addedUrls.length; index++) {
			addUrlToList("www." + addedUrls[index]);
			background.addedFromPopup.splice(0, 1);
		}
	}
	// Remove from list on options.html if url was removed from popup
	if (background.removedFromPopup.length > 0) {
		var removedUrls = background.removedFromPopup;
		for (var index=0; index<removedUrls.length; index++) {
			removeUrlFromList("www." + removedUrls[index]);
			background.removedFromPopup.splice(0, 1);
		}
	}
});
