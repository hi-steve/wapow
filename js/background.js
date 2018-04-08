var blockedUrls = [];				  // website.com
var blockedUrlsPattern = [];	// *://www.website.com/*
var blockedUrlsPsuedoLen = 0; // Updated to handle removeListener()
var addedFromPopup = [];			// Same format as blockedUrls[]
var removedFromPopup = [];

function addUrlToBlocked(url_input) {
	
	blockedUrlsPsuedoLen = blockedUrls.length;

	for (var index=0; index<blockedUrls.length; index++) {
		if (url_input == blockedUrls[index]) {
			console.log("Url is already blocked: " + blockedUrls[index]);
			return false;
		}
	}
	// Add, url input blocked for first time
	console.log("New url added: " + url_input);
	blockedUrls.push(url_input);
	blockedUrlsPattern.push("*://www." + url_input + "/*");

	updateWebRequestListener();
	console.log("Patterns: " + blockedUrlsPattern);
	return true;
}

function removeUrlFromBlocked(url_input) {

	blockedUrlsPsuedoLen = blockedUrls.length;

	for (var index=0; index<blockedUrls.length; index++) {
		if (url_input == blockedUrls[index]) {
			blockedUrls.splice(index, 1);
			blockedUrlsPattern.splice(index, 1);

			updateWebRequestListener();
			console.log("Url removed: " + url_input);
			return true;
		}
	}
	// No remove, url input hasn't been blocked
	console.log("Throw warning that url hasn't been blocked");
	return false;
}

function checkUrlkHandler(details) {

	console.log("Requested url: " + details.url);

	var urlBlocked = false;
	for (var i=0; i<blockedUrls.length; i++) {
		if (details.url.indexOf(blockedUrls[i]) != -1) {
			urlBlocked = true;
			break;
		}
	}
	return {cancel: urlBlocked};
}

// Updates which url patterns to filter and checks if url (not) blocked
function updateWebRequestListener() {

	// Only remove listener if url exists in blockedUrls
	if (blockedUrlsPsuedoLen > 0) {
		chrome.webRequest.onBeforeRequest.removeListener(checkUrlkHandler);
	}
	// Only add listener if url exists in blockedUrls
	if (blockedUrls.length > 0) {
		chrome.webRequest.onBeforeRequest.addListener(
			checkUrlkHandler,
			{
				urls: blockedUrlsPattern
			},
			["blocking"]
		);
	}
	chrome.webRequest.handlerBehaviorChanged();
}

// Checks if url input is valid
function isValidUrlInput(url_input) {

	if (url_input.length == 0) {
		return false;
	}
	if (url_input.indexOf(" ") != -1) {
		return false;
	}
	return true;
}
