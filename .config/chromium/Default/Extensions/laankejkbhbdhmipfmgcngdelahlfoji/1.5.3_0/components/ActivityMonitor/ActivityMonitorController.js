define(["core/Logger","core/CoreAPI","core/vendor/jquery.min"],function(Logger,API){return API.Class.create({view:null,model:null,timer:null,init:function(){this.model.init(),this.addListeners(),API.PubSub.publish("ActivityMonitor.component.initialized"),this.view.bindActivityDetectors()},activate:function(){this.view.bindActivityDetectors(),this.startTimer()},addListeners:function(){var self=this;API.PubSub.listen("ActivityMonitor.overlay.shown",function(){self.stopTimer()}),API.PubSub.listen("ActivityMonitor.overlay.hidden",function(){self.resetTimer(),self.startTimer()}),API.PubSub.listen("ActivityMonitor.activity.detected",function(){self.resetTimer()}),API.PubSub.listen("*.tab.selected",function(message,payload){self.onTabSelected(payload.tab,payload.blockable)}),API.PubSub.listen("*.page.killed",function(message,payload){self.killPage(payload.redirectURL)})},onTabSelected:function(selectedTab,blockable){null!==this.model.currentTabID&&this.stopTimer(),this.model.currentTabID=selectedTab.id,this.model.currentURL=selectedTab.url,this.model.blockable=blockable,this.resetTimer(),this.view.hide(),blockable&&!this.model.isDisabled()&&this.startTimer()},startTimer:function(){clearInterval(this.timer),this.timer=setInterval(this.tick.bind(this),1e3*this.model.interval)},stopTimer:function(){clearInterval(this.timer),this.timer=null},resetTimer:function(){this.model.elapsedTime=0},killPage:function(redirectURL){top.location.href=redirectURL+"?content"},tick:function(){this.model.elapsedTime+=this.model.interval,this.model.isMaxInactiveTimeExceeded()&&this.view.show()}})});