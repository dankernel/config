(function(){function d(){return"OFF"!=localStorage.getItem("sensor")}function f(){var a=localStorage.getItem("guid");null==a&&(a="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)}),localStorage.setItem("guid",a),window.open("http://www.imideo.com/thanks","_blank"));return a}function g(a){a=a?"on":"off";chrome.browserAction.setIcon({path:"icons/toolbar_sensor_"+a+".png"});chrome.browserAction.setTitle({title:chrome.i18n.getMessage("toolbar_title_sensor_"+
a)})}chrome.browserAction.onClicked.addListener(function(){var a=!d();localStorage.setItem("sensor",a?"ON":"OFF");g(a);chrome.windows.getAll({populate:!0},function(c){for(var b=c.length,d={cmd:"sensorChanged",sensor:a},h=0;h<b;h++)for(var f=c[h].focused,i=c[h].tabs,g=i.length,e=0;e<g;e++)if(chrome.tabs.sendRequest(i[e].id,d),f&&i[e].active){var j=["page_url="+encodeURIComponent(i[e].url),"recognizer_mode="+(a?"ON":"OFF")];statistics("auto_recognize_toggle",j)}})});chrome.extension.onRequest.addListener(function(a,
c,b){switch(a.cmd){case "getGuid":b({guid:f()});break;case "getSensor":b({sensor:d()})}});chrome.contextMenus.create({title:chrome.i18n.getMessage("contextmenu_title"),contexts:["image"],onclick:function(a,c){chrome.tabs.sendRequest(c.id,{cmd:"doMatch",url:a.srcUrl||a.linkUrl})}});f();g(d())})();
