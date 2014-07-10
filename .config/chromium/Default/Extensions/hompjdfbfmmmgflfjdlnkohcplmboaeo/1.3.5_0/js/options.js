
    window.onload = init;

    function init() {
    	restore_options();
    	document.getElementById("save-button").onclick = save_options;

    	/* i18n */
    	setChildTextNode('title','option_page_title');    	
    }
    
    function setChildTextNode(elementId, messageId) {
        document.getElementById(elementId).innerText = chrome.i18n.getMessage(messageId);
    }
    
	/* Saves options to localStorage.
	 */
	function save_options() {
		var button = document.getElementById("save-button");
		var _textContent=button.textContent;
		button.textContent="Saving";
		button.disabled=true;
		
		var whitelist = document.getElementById("whitelist").value;
		localStorage["whitelist"] = whitelist;

		var aggressivelist = document.getElementById("aggressivelist").value;
		localStorage["aggressivelist"] = aggressivelist;
		localStorage.support = !(document.getElementById("dontsupport").checked);///

		// Update status to let user know options were saved.
		var status = document.getElementById("status");
		status.innerHTML = "Preverences saved";
		button.textContent=_textContent;
		button.disabled=false;
		setTimeout(function() {
			status.innerHTML = "";
		}, 1200);
	}

	/* Restores select box state to saved value from localStorage.
	 */
	function restore_options() {
		var whitelist = localStorage["whitelist"];
		if (!whitelist) {
			whitelist = "google|yahoo";
		}
		var whitelistInput = document.getElementById("whitelist");
		whitelistInput.value = whitelist;

		var aggressivelist = localStorage["aggressivelist"];
		if (!aggressivelist) {
			aggressivelist = "youtube";
		}
		var aggressivelistInput = document.getElementById("aggressivelist");
		aggressivelistInput.value = aggressivelist;
		document.getElementById("dontsupport").checked = (localStorage.support == "false");///
	}