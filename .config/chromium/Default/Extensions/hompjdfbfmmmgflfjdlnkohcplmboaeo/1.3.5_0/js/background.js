
// This method is used to read options from the extension localStore.
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  var m = request.method;
  if (m) {
    if (m.substring(0,6) == "option") {
      var param = m.substring(6, m.length);
      retval = localStorage[param];
      sendResponse({value: retval});      
    }
    else {
      sendResponse({}); // snub them.
    }
  }
});


// add content script manually upon first run (just installed/enabled)
chrome.tabs.query({}, function (tabs) {
  tabs.forEach(runAllowRightClick);
});

function runAllowRightClick(tab) {
  if (/^chrome/.test(tab.url)) return;
  chrome.tabs.executeScript(tab.id, {
      file: "js/rightclick.js",
      allFrames: true
  });
}

// show thank you page upon first install
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == 'install') {
    chrome.tabs.create({
        url: chrome.extension.getURL('thank_you.html'),
        selected: true
     });
  }
});