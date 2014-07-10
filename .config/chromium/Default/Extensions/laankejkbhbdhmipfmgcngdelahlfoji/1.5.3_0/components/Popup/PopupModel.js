define(["core/Logger","core/CoreAPI","core/vendor/DropletJS.PubSub.min","core/DomainParser"],function(Logger,API,PubSub,DomainParser){return API.Class.create({url:null,timer:null,status:null,fullDomain:null,baseDomain:null,construct:function(){this.url=API.StayFocusd.getCurrentURL(),this.status="INACTIVE",this.fullDomain=DomainParser.extractFullDomain(this.url),this.baseDomain=DomainParser.extractBaseDomain(this.url)},init:function(){var port=chrome.runtime.connect({name:"popup"}),self=this;port.onMessage.addListener(function(data){"StayFocusd.timer.updated"===data.message&&self.updateTimer(data.payload.displayTimer)})},updateTimer:function(timer){this.timer=timer,this.updateStatus(),PubSub.publish("PopupModel.timer.updated",{timer:this.timer})},updateStatus:function(){this.status;this.status=API.NuclearOption.isActive()?"NUCLEAR":API.StayFocusd.isActive()===!1?"INACTIVE":"ACTIVE"},isActive:function(){return"ACTIVE"===this.status},isNuclear:function(){return"NUCLEAR"===this.status}})});