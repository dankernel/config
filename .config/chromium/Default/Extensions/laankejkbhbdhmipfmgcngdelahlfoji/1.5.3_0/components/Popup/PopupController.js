define(["core/Logger","core/CoreAPI","core/Message","core/vendor/DropletJS.PubSub.min","components/Popup/PopupView","components/Popup/PopupModel"],function(Logger,API,Message,PubSub,View,Model){return API.Class.create({view:null,model:null,construct:function(){this.model=new Model,this.view=new View(this.model)},init:function(){if(this.addListeners(),this.model.init(),this.view.init(),"true"===API.Storage.getHTML5("isUpdated")){var disableUpdatePopup=API.Storage.getHTML5("disableUpdatePopup");"true"!==disableUpdatePopup&&disableUpdatePopup!==!0&&API.Chrome.Tab.create({url:API.Chrome.Extension.getURL("update.html")}),API.Storage.remove("isUpdated")}API.Icon.hideBadge()},addListeners:function(){var self=this;PubSub.listen("PopupView.button.clicked",function(message,payload){switch(payload.button){case"help":case"options":self.openPage(payload.button);break;case"nuclearOption":case"blockedSites":self.openPage("options",payload.button);break;case"close":window.close();break;case"addToList":self.addToList(payload.domain,payload.listType)}})},openPage:function(page,hash){var url=API.Chrome.Extension.getURL(page+".html")+(hash?"#"+hash:"");API.Chrome.Tab.create({url:url})},addToList:function(domain,listType){if(""!==domain){var port=chrome.runtime.connect({name:"popup"}),descriptor="black"===listType?"BLACKLIST":"WHITELIST";port.postMessage({message:"PopupController.domain.add."+descriptor,payload:{domain:domain}}),port.onMessage.addListener(function(obj){var message=new Message(obj.message);message.matches("*.domain.added.*")&&PubSub.publish("PopupController.domain.added",{success:obj.payload.success})})}}})});