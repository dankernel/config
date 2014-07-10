console.debug("allow right click initializing for "+window.location)
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
		console.debug("allow right click not applied because the domain name matches "+whitelist);
	}
});


function enableContextMenu() {
  console.log("allow right click processing "+window.location);
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
  chrome.extension.sendMessage({method: "optionaggressivelist"}, function(response) {
	  aggressivelist=response.value;
	  if (!aggressivelist) {
		  aggressivelist="youtube";
	  }
	  if (document.domain.match(aggressivelist)) {
		  removeContextOnAll("div");  
	  }
  });
}

function removeContextOnAll(eltName) {
  var elements=document.getElementsByTagName(eltName);
  //for (var e in elements) {
  for (var i=0;i<elements.length;i++) {
    removeContextMenuOn(elements[i]);
  }
}

function removeContextMenuOn(elt) {
	//hope I won't break the extension anywhere
	//void(elt.oncontextmenu=null);
    //more general than elt.oncontextmenu	
    elt.addEventListener("contextmenu", bringBackDefault, false);
}
//reduces memory footprint with a single named function
function bringBackDefault(event) {
	event.returnValue = true;	
}