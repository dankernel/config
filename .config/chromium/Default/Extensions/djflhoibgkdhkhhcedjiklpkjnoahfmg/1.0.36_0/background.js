// TODO: remove this, just for debugging.

chrome.storage.onChanged.addListener(function(changes, namespace) {
  updateCache(function() {});
	for (key in changes) {
	  var storageChange = changes[key];
	  console.log('Storage key "%s" in namespace "%s" changed. ' +
	              'Old value was "%s", new value is "%s".',
	              key,
	              namespace,
	              storageChange.oldValue,
	              storageChange.newValue);
	}
});

// Main control flow.  Directs requests from options page/user script.
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    // The request is asking for the User-agent.
    if (request.action == "blacklist") {
    	getSpoofValues(sender.tab.url, function(values) {
      	sendResponse(values);
    	});
    } else if (request.action == "add_ua") {
      // Add a new user-agent string to the options list.
      addCustomUAOption(request.name,
                                request.user_agent,
                                request.append_to_default_ua,
                                request.indicator);
      sendResponse({result:"success"});
    } else if (request.action == "options") {
      _getUserAgentList(function(user_agent_list) {
        sendResponse({options: JSON.stringify(user_agent_list)});
      });
    } else if (request.action == "update") {
      updateListeners();
      sendResponse({});
    /*
    } else if (request.action == "add_preset") {
      if (request.domain) {
        _addOption(request.domain, request.option_index);
        sendResponse({});
      } else {
        chrome.tabs.getSelected(null, function(tab) {
          if (tab) {
            _addOption(findHostname(tab.url), getHotlistIndex());
            chrome.tabs.update(tab.id, {selected:true});
            sendResponse({}); // Required for the requestor to update itself.
          }
        });
      }
    */
    } else if (request.action == "clear_presets") {
      clearPresets();
    } else if (request.action == "badge") {
      updateBadge(sender.tab);
    /*
    } else if (request.action == "show_permanent_option") {
      chrome.tabs.getSelected(function(tab) {
        if (tab) {
          getSpoofValuesForUrl(tab.url, function(spoof) {
            var show = "false";
            if (getHotlistIndex() > 0 &&
                (!spoof || !spoof.ua_string || spoof.ua_string == ""))
              show = "true";
            sendResponse({"show" : show}); 
          });
        } else
          sendResponse({"show" : "false"}); 
      });
    */
    } else {
      console.log("Got an invalid request:" + request.action);
      sendResponse({}); // Not a valid request.
    }
    return false;
  });

// Add listener to migrate any legacy settings.
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == "update" && _isUsingLocalStorage()) {
    console.log("On install: Attempting to migrate legacy items");
    _moveLocalStorageToSyncStorage();
  }
  
  _getUserAgentPointerList(function(pointer_list) {
    if (!pointer_list || pointer_list.length == 0) {
      console.log("Didn't find any existing UAs.  Attempting to populate some.");
      getBaseOptionsList(true);
    }
  });
});


// Given a UserAgent object, will replace the "User-Agent" header in the
// map provided as requestHeaders.
function replaceHeader(user_agent, requestHeaders) {
  if (!user_agent || !user_agent.ua_string)
    return requestHeaders;
  var newHeaders = [];
  for (var i = 0; i < requestHeaders.length; i++) {
    if (requestHeaders[i].name != "User-Agent") {
      newHeaders.push(requestHeaders[i]);
    } else {
      var new_value = requestHeaders[i].value;
      if (user_agent.ua_string != "")
        new_value = (user_agent.append_to_default_ua ? new_value + " " + user_agent.ua_string : user_agent.ua_string);
      newHeaders.push({"name"  : "User-Agent",
                       "value" : new_value});
    }
  }
  return newHeaders;
}

function updateListeners() {
  if (!listener) {
    listener = function(details) {
      if (details && details.url && details.requestHeaders && details.requestHeaders.length > 0) {
    	  var values = getCacheSpoofValues(details.url, details.tabId);
        return {requestHeaders : replaceHeader(values, details.requestHeaders)};
      }
      return { requestHeaders : details.requestHeaders };
    };
  }
  chrome.webRequest.onBeforeSendHeaders.addListener(listener,
    {"urls": ["http://*/*", "https://*/*"]},
    ["requestHeaders", "blocking"]);
}

var listener = null;
updateListeners();

_reportErrors();

// Method to make the badge update as the user changes tabs.
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    updateBadge(tab);
  });
});

// Method to make the badge update as the user changes tabs.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  updateBadge(tab);
});