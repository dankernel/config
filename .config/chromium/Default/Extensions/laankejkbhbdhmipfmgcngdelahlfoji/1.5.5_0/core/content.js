requirejs.config({baseUrl:chrome.extension.getURL("/"),waitSeconds:60}),requirejs(["core/Logger","core/vendor/jquery.min","core/SmartBomb","core/ReferrerMonitor"],function(o,n,e,i){API.Settings.init(function(){var o=API.Chrome.Extension.getID();API.Chrome.Message.on.addListener(function(o,n,e){o.payload=o.payload||{},o.payload.sender=n||{},n.tab||API.PubSub.publish({message:o.message,payload:o.payload,onPublish:"function"==typeof e?e:function(){}})}),API.PubSub.subscribe({async:!0,handler:function(n,e,i){e=e||{},i=i||function(){},e.sender&&e.sender.id===o||API.Chrome.Message.send(null,{message:n.toString(),payload:e},null,i)}}),n(window).scroll(function(){n("#StayFocusd-still-there").css("top",n(this).scrollTop()+"px"),n("#StayFocusd-infobar").css("top",n(this).scrollTop()+"px")}),n(document).ready(function(){i.init(),e.init(),API.Component.load({name:"ActivityMonitor",instance:"activityMonitor",view:"overlay",onLoaded:function(o){o.controller.init()}}),API.Component.load({name:"InfoBar",instance:"infoBar",onLoaded:function(o){o.controller.init()}})})})});