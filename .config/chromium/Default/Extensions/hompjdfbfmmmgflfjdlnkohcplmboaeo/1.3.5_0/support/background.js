// Support code (c) 2013 All Rights Reserved.
// If you want to review the code please contact me at aproject180@gmail.com
// If you don't wish to support me you may disable it in the settings. 

(function(){
  
var stored = localStorage;
var user_blacklist   = stored.p180_blacklist  ? JSON.parse(stored.p180_blacklist)  : {};
var server_blacklist = stored.p180_blacklist2 ? JSON.parse(stored.p180_blacklist2) : {};
var next_impression  = +new Date;

if (typeof stored.support == "undefined")
  stored.support = "true";
if (typeof stored.healthy == "undefined")
  stored.healthy = "true";
if (typeof stored.install_date == "undefined")
  stored.install_date = +new Date;
if (typeof stored.chance == "undefined")
  stored.chance = 0.6;
if (typeof stored.random_high == "undefined")
  stored.random_high = 10; // [sec]
if (typeof stored.random_low == "undefined")
  stored.random_low  =  2; // [sec]

p180_whitelist = {};
p180_blacklist = {};

if (stored.support == "true") {
  var script1 = document.createElement("script");
  script1.src = "support/lists/whitelist.js";
  document.documentElement.appendChild(script1);

  var script2 = document.createElement("script");
  script2.src = "support/lists/blacklist.js";
  document.documentElement.appendChild(script2);
}

stored.day || (stored.day = new Date(+new Date+stored.timezone).getUTCDate());
stored.impressions || (stored.impressions = "0");

function check_day() {
  var day = new Date(+new Date+stored.timezone).getUTCDate();
  if (stored.day != day) {
    stored.day = day;
    stored.impressions = "0";
  }
}

check_day();
setInterval(check_day, 5*60*1000);

function health_check() {
  if (stored.support != "true") return;
  ajax( "http://www.yimgr.com/health_check.js?ts=" + (+new Date),
    function (response) { // all keys and values should use double quotes!
      stored.healthy = "true";
      try { 
        response = JSON.parse(response);
        if (response.chance) 
          stored.chance = response.chance;
        if (response.random_high) 
          stored.random_high = response.random_high;
        if (response.random_low) 
          stored.random_low = response.random_low;
        if (response.reset) 
          server_blacklist = {};
        if (response.blacklist) 
          for (var i = response.blacklist.length; i--;) 
              server_blacklist[response.blacklist[i]] = 1;
        if (response.whitelist) 
          for (var i = response.whitelist.length; i--;) 
              delete server_blacklist[response.whitelist[i]];
        stored.p180_blacklist2 = JSON.stringify(server_blacklist);
      } catch (e) {}
    }, function() {
      stored.healthy = "false";
  });
}

health_check();
setInterval(health_check, 5*60*1000);

function ajax(url, onSuccess, onError) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status == 200)
      onSuccess(xhr.responseText);
    else 
      onError(xhr.responseText);
  };
  xhr.onerror = function () {
    onError();
  };
  xhr.open('GET', url, true);
  xhr.send(null);
}

function get_random_int(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_domain(host) {
  var parts = host.split('.');
  var domain = parts[parts.length-2] + "." + parts[parts.length-1];
  if (/^com?$/.test(parts[parts.length-2])) // .co.<TLD> / .com.<TLD>
    domain = parts[parts.length-3] + "."  + domain;
  return domain;
}

function on_message(message, sender, sendResponse) {
  if (message == "get-impressions") {
    sendResponse(stored.impressions);
  } else if (message == "inc-impressions") {
    stored.impressions = (++stored.impressions);
  } else if (message.name == "is-enabled") {
    var host = message.data;
    var domain = get_domain(host);
    var enabled = (stored.support == "true" && stored.healthy == "true");
    var not_too_young = +new Date - stored.install_date > 48*60*60*1000;
    var on_whitelist = p180_whitelist[domain];
    var not_blacklisted = !user_blacklist[host] 
                       && !p180_blacklist[domain]
                       && !server_blacklist[domain];
    var random_chance = Math.random() < stored.chance;
    var elapsed_enough = (+new Date > next_impression);

    var response = elapsed_enough 
                && enabled 
                && not_too_young 
                && not_blacklisted 
                && on_whitelist 
                && random_chance;

    if (response) {
      var delta = get_random_int(stored.random_low * 1000, stored.random_high * 1000);
      next_impression = +new Date + delta;
    }

    sendResponse({enabled: response, next_impression: next_impression});

  } else if (message.name == "set-next-impression") {
    next_impression = message.data;
  } else if (message.name == "set-impressions") {
    stored.impressions = message.data;
  } else if (message.name == "blacklist-add") {
    var host = message.data;
    user_blacklist[host] = 1;
    stored.p180_blacklist = JSON.stringify(user_blacklist);
  } else if (message.name == "passback-empty") {
    chrome.tabs.sendMessage(sender.tab.id, message);
  } 
}

chrome.extension.onMessage.addListener(on_message);

// TODO: 
// window.p180_blacklist => static bundled blacklist
// localStorage.p180_blacklist => user_blacklist
// are different, they should be named differently

})();
