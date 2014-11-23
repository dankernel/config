if (response && response.ua_string) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.innerText += 'var fakeUserAgentGetter = function(){return "' + (response.append_to_default_ua ? navigator.userAgent + " " + response.ua_string : response.ua_string) + '";}; if (Object.defineProperty) {Object.defineProperty(navigator, "userAgent", {get: fakeUserAgentGetter});} else if (Object.prototype.__defineGetter__) {navigator.__defineGetter__("userAgent", fakeUserAgentGetter);}';
  script.innerText += 'var fakeVendorGetter = function(){return "' + response.vendor + '";}; if (Object.defineProperty) {Object.defineProperty(navigator, "vendor", {get: fakeVendorGetter});} else if (Object.prototype.__defineGetter__) {navigator.__defineGetter__("vendor", fakeVendorGetter);}';
  if (response.appname)
    script.innerText += 'var fakeAppNameGetter = function(){return "' + response.appname + '";}; if (Object.defineProperty) {Object.defineProperty(navigator, "appName", {get: fakeAppNameGetter});} else if (Object.prototype.__defineGetter__) {navigator.__defineGetter__("appName", fakeAppNameGetter);}';
  if (response.platform)
     script.innerText += 'var fakePlatformGetter = function(){return "' + response.platform + '";}; if (Object.defineProperty) {Object.defineProperty(navigator, "platform", {get: fakePlatformGetter});} else if (Object.prototype.__defineGetter__) {navigator.__defineGetter__("platform", fakePlatformGetter);}';
  (document.head || document.documentElement).insertBefore(script, (document.head || document.documentElement).firstChild);
}