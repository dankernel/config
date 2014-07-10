(function(){


chrome.extension.sendMessage({method: "optionwhitelist"}, function(response) {
	// activate the extension if the domain doesn't match the whitelist
	whitelist=response.value;
	
	if (!whitelist) {
	    whitelist="google|yahoo";
	}

	// don't enable the extension on these sites (saves Yahoo! mail, etc)
	if (!document.domain.match(whitelist)) {
		  var timer = window.setInterval(function() {
			  if (/loaded|complete/.test(document.readyState)){
		       window.clearInterval(timer);
		       enableContextMenu();
			  }
		  }, 30);
	}
	else {
		//console.debug("allow right click not applied because the domain name matches "+whitelist);
	}
});


function enableContextMenu() {
  /*
  // this code was useless, because it only run in this extension's context
  // leaving it here for reference
  void(document.ondragstart=null);
  void(document.onselectstart=null);
  void(document.onclick=null);
  void(document.onmousedown=null);
  void(document.onmouseup=null);
  void(document.body.oncontextmenu=null);
	removeContextMenuOn(document);
	removeContextOnAll("body");
	removeContextOnAll("img");
	removeContextOnAll("td");
  */
  enableRightClickLight(document); 

  chrome.extension.sendMessage({method: "optionaggressivelist"}, function(response) {
	  aggressivelist = response.value || "youtube";
	  if (document.domain.match(aggressivelist)) {
		  enableRightClick(document);  
	  }
  });
}

function removeContextMenuOnAll(tagName) {
  var elements = document.getElementsByTagName(tagName);
  for (var i = 0; i < elements.length; i++) {
    enableRightClick(elements[i]);
  }
}

function enableRightClickLight(el) {
	el || (el = document);
	el.addEventListener("contextmenu", bringBackDefault, true);
}

function enableRightClick(el) {
	el || (el = document);
	el.addEventListener("contextmenu", bringBackDefault, true);
	el.addEventListener("dragstart", bringBackDefault, true);
	el.addEventListener("selectstart", bringBackDefault, true);
	el.addEventListener("click", bringBackDefault, true);
	el.addEventListener("mousedown", bringBackDefault, true);
	el.addEventListener("mouseup", bringBackDefault, true);
}

function restoreRightClick(el) {
	el || (el = document);
	el.removeEventListener("contextmenu", bringBackDefault, true);
	el.removeEventListener("dragstart", bringBackDefault, true);
	el.removeEventListener("selectstart", bringBackDefault, true);
	el.removeEventListener("click", bringBackDefault, true);
	el.removeEventListener("mousedown", bringBackDefault, true);
	el.removeEventListener("mouseup", bringBackDefault, true);
}

function bringBackDefault(event) {
	event.returnValue = true;	
	event.stopPropagation && event.stopPropagation(); 
	event.cancelBubble && event.cancelBubble();
}

})();