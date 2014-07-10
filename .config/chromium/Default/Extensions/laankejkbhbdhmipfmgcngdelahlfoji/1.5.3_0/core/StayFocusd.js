define(["core/Logger","core/DomainParser","core/NuclearOption","core/Notification","core/ReferrerMonitor","core/DateUtils","core/Message"],function(Logger,DomainParser,NuclearOption,Notification,ReferrerMonitor,DateUtils,Message){var API,StayFocusd={CHROME_STORAGE_SYNC_RATE:15,maxTimeAllowed:10,firstInstallAllowance:60,elapsedTime:0,interval:1,timer:null,maxTimeAllowedExceeded:!1,apiURL:"http://www.stayfocusd.com",redirectURL:"http://www.stayfocusd.com",currentURL:null,version:null,selectedTabID:null,active:null,popupPort:null,lastChromeStorageSync:0,initAPI:function(theAPI){API=theAPI,window.API=API;var self=this;API.mixin("StayFocusd",{getActiveDays:this.getActiveDays.bind(this),getActiveHours:this.getActiveHours.bind(this),getActiveHoursQueue:this.getActiveHoursQueue.bind(this),getAPIURL:function(){return self.apiURL},getCurrentURL:function(){return self.currentURL},getMaxTimeAllowed:this.getMaxTimeAllowed.bind(this),getResetTime:this.getResetTime.bind(this),getResetTimeQueue:this.getResetTimeQueue.bind(this),getTotalSecondsRemaining:this.getTotalSecondsRemaining.bind(this),isActive:this.isActive.bind(this),isFirstInstallAllowanceActive:this.isFirstInstallAllowanceActive.bind(this),isMaxTimeAllowedExceeded:this.isMaxTimeAllowedExceeded.bind(this),isOutgoingLinksOptionActive:this.isOutgoingLinksOptionActive.bind(this),isUpdatePopupDisabled:this.isUpdatePopupDisabled.bind(this),localizeHTML:this.localizeHTML.bind(this),setActiveDays:this.setActiveDays.bind(this),setActiveHoursQueue:this.setActiveHoursQueue.bind(this),setMaxTimeAllowed:this.setMaxTimeAllowed.bind(this),setResetTimeQueue:this.setResetTimeQueue.bind(this)})},init:function(){var self=this,steps=[self.initSettings.bind(self),self.initIcon.bind(self),self.initBlacklist.bind(self),self.initWhitelist.bind(self),self.initNuclearOption.bind(self),self.initNotification.bind(self),self.initListeners.bind(self),self.initUpdateCheck.bind(self)],options={onComplete:function(){self.getElapsedTime(function(elapsedTime){self.elapsedTime=elapsedTime}),self.maxTimeAllowed=self.getMaxTimeAllowed(),self.maxTimeAllowedExceeded=self.isMaxTimeAllowedExceeded()}},seq=new API.Sequencer(steps,options);seq.run()},initSettings:function(seq){var self=this;API.Settings.init(function(){API.Storage.setBucket(["backupKeys","disableUpdatePopup","isUpdated","previousVersion","outgoingLink","productivityBypass"],"HTML5"),API.Storage.addOnChangeListener(function(changes,areaName){API.Settings.refresh(function(){API.PubSub.publish("Settings.data.refreshed",{areaName:areaName,changes:changes})})}),self.isFirstInstall()&&self.setFirstInstallAllowance(),self.isNewDay()===!0&&self.resetElapsedTime(),seq.next()})},initIcon:function(seq){API.Component.load({name:"Icon",instance:"icon",onLoaded:function(component){component.controller.init(),seq.next()}})},initBlacklist:function(seq){API.Component.load({name:"Blacklist",instance:"blacklist",onLoaded:function(component){component.controller.init(),seq.next()}})},initWhitelist:function(seq){API.Component.load({name:"Whitelist",instance:"whitelist",onLoaded:function(component){component.controller.init(),seq.next()}})},initNuclearOption:function(seq){NuclearOption.init(function(){seq.next()})},initNotification:function(seq){Notification.init(function(){seq.next()})},initListeners:function(seq){var self=this;API.PubSub.subscribe({async:!0,handler:function(message,payload,callback){callback=callback||function(){},!payload||!payload.tabID||payload.sender&&payload.sender.tab||API.Chrome.Message.sendToTab(payload.tabID,{message:message.toString(),payload:payload},callback)}}),API.Chrome.Message.on.addListener(function(request,sender,callback){request.payload=request.payload||{},request.payload.sender=sender||{},sender.tab&&API.PubSub.publish({message:request.message,payload:request.payload,onPublish:"function"==typeof callback?callback:function(){}})}),API.PubSub.listen("Settings.data.refreshed",function(){self.checkURL()}),API.PubSub.listen("ReferrerMonitor.outgoingLink.clicked",function(message,payload){API.Storage.set({outgoingLink:payload.outgoingLink})}),API.PubSub.listen("ActivityMonitor.component.initialized",function(){API.Chrome.Tab.getSelected(null,function(tab){API.PubSub.publish("StayFocusd.tab.selected",{tab:tab,tabID:tab.id,blockable:self.isBlockable(tab.url)})})}),API.PubSub.listen({message:"ActivityMonitor.overlay.hidden",async:!0,handler:function(message,payload,callback){var response={countdownStarted:self.startCountdown()};"function"==typeof callback&&callback(response)}}),API.PubSub.listen({message:"ActivityMonitor.overlay.shown",async:!0,handler:function(message,payload,callback){var response={countdownStopped:self.stopCountdown()};"function"==typeof callback&&callback(response)}}),API.PubSub.listen({message:"StayFocusd.referrer.get",async:!0,handler:function(message,payload,callback){var response={referrer:document.referrer};"function"==typeof callback&&callback(response)}}),API.Chrome.Extension.addListener("onConnect",function(port){"popup"===port.name&&self.onPopupConnected(port)}),API.Chrome.Tab.getSelected(null,function(tab){self.onTabStateChange(tab)}),API.Chrome.Tab.addListener("onSelectionChanged",function(){API.Chrome.Tab.getSelected(null,function(tab){self.onTabStateChange(tab)})}),API.Chrome.Tab.addListener("onUpdated",function(){API.Chrome.Tab.getSelected(null,function(tab){self.onTabStateChange(tab)})}),API.Chrome.Tab.addListener("onRemoved",function(){API.Chrome.Tab.getSelected(null,function(tab){void 0===tab&&self.stopCountdown()})}),API.Chrome.Window.addListener("onRemoved",function(){self.stopCountdown()}),API.Chrome.Window.addListener("onFocusChanged",function(){API.Chrome.Tab.getSelected(null,function(tab){self.onTabStateChange(tab)}),API.Chrome.Window.getLastFocused(function(windowObj){void 0!==windowObj&&API.Chrome.Tab.getAllInWindow(windowObj.id,function(tabs){for(var wTab in tabs)tabs.hasOwnProperty(wTab)&&tabs[wTab].selected&&self.checkURL(tabs[wTab].url)})})}),API.Chrome.Window.addListener("onCreated",function(windowObj){API.Chrome.Tab.getAllInWindow(windowObj.id,function(tabs){for(var wTab in tabs)tabs.hasOwnProperty(wTab)&&tabs[wTab].selected&&self.checkURL(tabs[wTab].url)})}),seq.next()},initUpdateCheck:function(seq){if(window.onInstalledDetails){var details=window.onInstalledDetails;"update"===details.reason&&details.previousVersion&&API.Storage.get("previousVersion",function(prevVersion){API.Storage.get("disableUpdatePopup",function(disableUpdatePopup){prevVersion!==details.previousVersion&&("true"!==disableUpdatePopup&&disableUpdatePopup!==!0&&API.Icon.showBadge("NEW","GREEN"),API.Storage.set({isUpdated:!0,previousVersion:details.previousVersion}))})}),delete window.onInstalledDetails}seq.next()},onPopupConnected:function(port){this.popupPort=port;var self=this;port.onMessage.addListener(function(obj){var message=new Message(obj.message);(message.matches("*.domain.add.BLACKLIST")||message.matches("*.domain.add.WHITELIST"))&&API.PubSub.publish({message:obj.message,payload:obj.payload,onPublish:function(success){port.postMessage({message:"StayFocusd.domain.added."+message.getDescriptor(),payload:{success:success}})}})}),port.onDisconnect.addListener(function(){self.popupPort=null}),this.postTimerUpdatedMessage()},postTimerUpdatedMessage:function(){this.popupPort&&this.popupPort.postMessage({message:"StayFocusd.timer.updated",payload:{displayTimer:this.getDisplayTimer()}})},onTabStateChange:function(tab){if("undefined"==typeof tab)return!1;this.currentURL=tab.url,this.selectedTabID=tab.id,this.checkURL(tab.url);var whitelist=API.Component.get("Whitelist","whitelist"),self=this;API.PubSub.publish("StayFocusd.tab.selected",{tab:tab,tabID:tab.id,blockable:this.isBlockable(tab.url)}),this.isBlockable(tab.url)||whitelist.model.has(tab.url)||!this.isOutgoingLinksOptionActive()||API.Storage.get("outgoingLink",function(outgoingLink){ReferrerMonitor.isBlockable(tab.url,outgoingLink)||API.PubSub.publish({message:"StayFocusd.referrer.get",payload:{tabID:tab.id},onPublish:function(response){response=response||{},response.referrer="undefined"==typeof response.referrer?"":response.referrer,self.checkURL(response.referrer,!0)}})})},checkURL:function(url,isReferrer){url=void 0==url?this.currentURL:url;var self=this;this.isNewDay()===!0&&this.resetElapsedTime(),this.stopCountdown(),API.Storage.get("outgoingLink",function(outgoingLink){if(self.isBlockable(url,outgoingLink))API.Chrome.Tab.getSelected(null,function(tab){void 0!==tab&&(NuclearOption.isActive()?API.Icon.setIcon("NUCLEAR",tab.id):API.Icon.setIcon("BLOCKED",tab.id),API.PubSub.publish("StayFocusd.outgoingLinks.bind",{tabID:tab.id}))}),self.isKillable()?self.killPage():(self.startCountdown(),(!self.isBlockable(url)&&ReferrerMonitor.isBlockable(url,outgoingLink)||isReferrer)&&API.Chrome.Tab.getSelected(null,function(tab){void 0!==tab&&API.PubSub.publish("StayFocusd.countdown.started.BLOCKED_BY_REFERRER",{tabID:tab.id,url:tab.url})}));else{var whitelist=API.Component.get("Whitelist","whitelist");whitelist.model.has(url)?API.Chrome.Tab.getSelected(null,function(tab){void 0!==tab&&API.Icon.setIcon("ALLOWED",tab.id)}):API.Chrome.Tab.getSelected(null,function(tab){void 0!==tab&&(NuclearOption.isActive()?API.Icon.setIcon("NUCLEAR",tab.id):API.Icon.setIcon("DEFAULT",tab.id))})}})},startCountdown:function(){this.timer&&this.stopCountdown(),this.timer=setInterval(this.tick.bind(this),1e3*this.interval)},stopCountdown:function(){clearInterval(this.timer),this.timer=null},isOutgoingLinksOptionActive:function(){var countdownForOutgoingLinks=API.Settings.get("countdownForOutgoingLinks");return""===countdownForOutgoingLinks||void 0==countdownForOutgoingLinks||null==countdownForOutgoingLinks?!0:countdownForOutgoingLinks===!0},isKillable:function(){return this.isMaxTimeAllowedExceeded()||NuclearOption.isActive()},isProtectedURL:function(domain){return null===domain||void 0==domain||0==domain.length?!1:0===domain.indexOf(this.redirectURL)?!0:domain.indexOf("paypal")>=0?!0:domain.indexOf("rescueMe")>=0?!0:domain.indexOf("chrome")>=0&&domain.indexOf("chrome")<domain.indexOf("://")&&(domain.indexOf("sf")>-1||domain.indexOf("devtools")>-1)?!0:!1},isBlockable:function(domain,outgoingLink){if(this.isProtectedURL(domain))return!1;if(null==domain||void 0==domain||""===domain)return!1;if(this.isActive()===!1)return!1;var blacklist=API.Component.get("Blacklist","blacklist"),whitelist=API.Component.get("Whitelist","whitelist"),isBlacklisted=blacklist.model.has(domain),isWhitelisted=whitelist.model.has(domain),isBlockableByNuclearOption=NuclearOption.isBlockable(isBlacklisted,isWhitelisted);if(isBlockableByNuclearOption)return!0;if(isBlacklisted&&!isWhitelisted)return!0;if(isBlacklisted&&isWhitelisted){var blacklistMatch=blacklist.model.find(domain),whitelistMatch=whitelist.model.find(domain);return blacklistMatch===domain&&whitelistMatch!==domain?!0:blacklistMatch!==domain&&whitelistMatch===domain?!1:DomainParser.isMoreGeneralURL(whitelistMatch,blacklistMatch)}return isWhitelisted||NuclearOption.isActive()&&!isBlockableByNuclearOption?!1:this.isOutgoingLinksOptionActive()&&"string"==typeof outgoingLink&&outgoingLink.length>0?ReferrerMonitor.isBlockable(domain,outgoingLink)&&!whitelist.model.has(outgoingLink):!1},isNewDay:function(){var isNewDay=!1,todayDate=new Date,nowTimestamp=todayDate.getTime(),resetTimestamp=API.Settings.get("resetTimestamp"),resetTime=this.getResetTime();if(void 0==resetTimestamp||null==resetTimestamp||""===resetTimestamp){var resetArray=resetTime.split(":"),resetHour=parseInt(resetArray[0],10),resetMin=parseInt(resetArray[1],10),resetTimestampDate=new Date(todayDate.toDateString()+" "+resetHour+":"+resetMin);resetTimestamp=resetTimestampDate.getTime(),this.updateResetTimestamp(resetTime)}return resetTimestamp=parseInt(resetTimestamp),nowTimestamp=parseInt(nowTimestamp),nowTimestamp>resetTimestamp&&(isNewDay=!0,this.updateResetTimestamp(resetTime)),isNewDay},getElapsedTime:function(callback){var self=this;API.Storage.get("elapsedTime",function(elapsedTime){(isNaN(elapsedTime)||void 0==elapsedTime)&&(elapsedTime=0,self.resetElapsedTime()),"function"==typeof callback&&callback(elapsedTime)})},setElapsedTime:function(elapsedTime){API.Storage.setHTML5("elapsedTime",elapsedTime),(this.lastChromeStorageSync===this.CHROME_STORAGE_SYNC_RATE||this.getTotalSecondsRemaining()<this.CHROME_STORAGE_SYNC_RATE)&&(API.Storage.set({elapsedTime:elapsedTime}),this.lastChromeStorageSync=0),this.lastChromeStorageSync++},resetElapsedTime:function(){var todayDate=this.getDateString();API.Storage.set({lastReset:todayDate,elapsedTime:0}),this.maxTimeAllowedExceeded=!1,this.elapsedTime=0},updateBadge:function(){var totalSecondsRemaining=this.getTotalSecondsRemaining(),showBadge=!1,color=null;30>=totalSecondsRemaining?(showBadge=this.isBlockable(this.currentURL),color="RED"):60>=totalSecondsRemaining&&(showBadge=this.isBlockable(this.currentURL),color="YELLOW"),showBadge?API.Icon.showBadge(totalSecondsRemaining.toString(),color,this.selectedTabID):API.Icon.hideBadge(this.selectedTabID)},killPage:function(){var self=this;return this.stopCountdown(),API.Chrome.Window.getLastFocused(function(windowObj){void 0!==windowObj&&API.Chrome.Tab.getAllInWindow(windowObj.id,function(tabs){for(var wTab in tabs)tabs.hasOwnProperty(wTab)&&tabs[wTab].selected&&(self.isMaxTimeAllowedExceeded()||NuclearOption.isActive()&&!NuclearOption.hasSmartBomb()?tabs[wTab].pinned===!0?0===tabs[wTab].url.indexOf("chrome://")?API.Chrome.Tab.remove(tabs[wTab].id,function(){}):API.PubSub.publish("StayFocusd.page.killed",{tabID:tabs[wTab].id,redirectURL:self.redirectURL}):API.Chrome.Tab.update(tabs[wTab].id,{url:self.redirectURL+"?background"}):NuclearOption.isActive()&&NuclearOption.hasSmartBomb()&&API.PubSub.publish("StayFocusd.smartBomb.activate",{tabID:tabs[wTab].id,smartBomb:NuclearOption.getSmartBomb()}))})}),!1},getMaxTimeAllowed:function(){var maxTimeAllowed=API.Settings.get("maxTimeAllowed");return(void 0==maxTimeAllowed||null==maxTimeAllowed||""===maxTimeAllowed)&&(maxTimeAllowed=this.maxTimeAllowed),maxTimeAllowed=parseInt(maxTimeAllowed,10)},setMaxTimeAllowed:function(maxTimeAllowed){if(!maxTimeAllowed)return alert(API.Chrome.Translation.get("cannotSetTimeToZeroOrLess")),!1;maxTimeAllowed=parseInt(maxTimeAllowed,10);var totalSecondsRemaining=this.getTotalSecondsRemaining(),allow=!0;if(this.isMaxTimeAllowedExceeded())return alert(API.Chrome.Translation.get("cannotChangeTimeOnceTimeIsUp")),!1;if(maxTimeAllowed>=1440)return alert(API.Chrome.Translation.get("cannotSetMoreThan1440Mins")),!1;if(0>=maxTimeAllowed)return alert(API.Chrome.Translation.get("cannotSetTimeToZeroOrLess")),!1;if(this.elapsedTime/60>=maxTimeAllowed&&(alert(API.Chrome.Translation.get("allSitesBlockedImmediately")),allow===!1))return!1;if(maxTimeAllowed>this.maxTimeAllowed){if(this.isProductivityBypassActive())return alert(API.Chrome.Translation.get("completeChallengeBeforeIncreasingTime")),!1;180>totalSecondsRemaining?(allow=confirm(API.Chrome.Translation.get("lessThanThreeMins")),allow===!0&&(allow=confirm(API.Chrome.Translation.get("lessThanThreeMins2"))),allow===!0&&(allow=confirm(API.Chrome.Translation.get("lessThanThreeMins3"))),allow===!0&&(allow=confirm(API.Chrome.Translation.get("lessThanThreeMins4"))),allow===!0&&(allow=confirm(API.Chrome.Translation.get("lessThanThreeMins5"))),allow===!0&&(allow=confirm(API.Chrome.Translation.get("lessThanThreeMins6"))),allow===!0&&(allow=confirm(API.Chrome.Translation.get("lessThanThreeMins7"))),allow===!0&&(allow=confirm(API.Chrome.Translation.get("lessThanThreeMins8"))),allow===!0&&(alert(API.Chrome.Translation.get("tellingYourMom")),window.open("http://www.sas.calpoly.edu/asc/ssl/procrastination.html"))):(allow=confirm(API.Chrome.Translation.get("maybeYouShouldReconsider")),allow===!0&&(allow=confirm(API.Chrome.Translation.get("onlyHurtingYourself"))),allow===!0&&alert(API.Chrome.Translation.get("meow")))}if(allow===!0){var updatedMsg=API.Chrome.Translation.get("settingsUpdated");maxTimeAllowed<this.maxTimeAllowed&&(updatedMsg=API.Chrome.Translation.get("givingLessTime")+"\n\n"+updatedMsg),this.maxTimeAllowed=maxTimeAllowed,API.Settings.set({maxTimeAllowed:maxTimeAllowed}),alert(updatedMsg)}return allow},isMaxTimeAllowedExceeded:function(){return this.maxTimeAllowedExceeded===!0?!0:this.elapsedTime/60>this.maxTimeAllowed?(this.maxTimeAllowedExceeded=!0,!0):!1},getTotalSecondsRemaining:function(){var totalSecondsRemaining=60*this.maxTimeAllowed-this.elapsedTime;return totalSecondsRemaining>=0?Math.floor(totalSecondsRemaining):0},getDisplayTimer:function(){var totalSecondsRemaining=this.getTotalSecondsRemaining();if(0==totalSecondsRemaining)return"00:00:00";var hours=Math.floor(totalSecondsRemaining/3600),minutes=Math.floor((totalSecondsRemaining-3600*hours)/60),seconds=totalSecondsRemaining-(3600*hours+60*minutes);return hours=API.Date.toTwoDigits(hours),minutes=API.Date.toTwoDigits(minutes),seconds=API.Date.toTwoDigits(seconds),hours+":"+minutes+":"+seconds},getDateString:function(){var date=new Date,month=date.getMonth()+1,day=date.getDate(),year=date.getFullYear();return year+"-"+month+"-"+day},setActiveDays:function(activeDays){var activeDaysString=null;activeDaysString=0===activeDays.length?"none":activeDays.join("|"),API.Settings.set({activeDays:activeDaysString})},getActiveDays:function(){var activeDaysString=API.Settings.get("activeDays");return"none"==activeDaysString?[]:void 0==activeDaysString||null==activeDaysString||0===activeDaysString.length?(this.setActiveDays([0,1,2,3,4,5,6]),[0,1,2,3,4,5,6]):"string"!=typeof activeDaysString||-1===activeDaysString.indexOf("|")?[activeDaysString]:activeDaysString.split("|")},isActiveDay:function(){var date=new Date,todayDay=date.getDay(),activeDays=this.getActiveDays();return void 0==activeDays||null==activeDays||0===activeDays.length?!1:activeDays.inArray(todayDay)},setActiveHours:function(startTime,endTime){API.Settings.set({activeHours:startTime+"|"+endTime})},getActiveHours:function(){var startTime=!1,endTime=!1,activeHoursQueue=this.getActiveHoursQueue();if(activeHoursQueue!==!1){var todayDate=new Date,currentTimestamp=todayDate.getTime();(currentTimestamp>activeHoursQueue.timestamp||this.isFirstInstallAllowanceActive())&&(startTime=activeHoursQueue.startTime,endTime=activeHoursQueue.endTime,this.clearActiveHoursQueue(),this.setActiveHours(startTime,endTime))}if(startTime===!1&&endTime===!1){var activeHours=API.Settings.get("activeHours");(void 0==activeHours||null==activeHours||""===activeHours)&&(this.setActiveHours("00:00","23:59"),activeHours=API.Settings.get("activeHours"));var activeHoursArray=activeHours.split("|");startTime=activeHoursArray[0],endTime=activeHoursArray[1]}var startArray=startTime.split(":"),endArray=endTime.split(":");return{startTime:startTime,endTime:endTime,startHour:startArray[0],startMin:startArray[1],startHourInt:parseInt(startArray[0],10),startMinInt:parseInt(startArray[1],10),endHour:endArray[0],endMin:endArray[1],endHourInt:parseInt(endArray[0],10),endMinInt:parseInt(endArray[1],10)}},isActiveHour:function(){var activeHours=this.getActiveHours(),date=new Date,todayHour=date.getHours(),todayMin=date.getMinutes();return this.isStartTimeLater(activeHours)===!0?this.isBetween(todayHour,todayMin,activeHours.startHourInt,activeHours.startMinInt,23,59)||this.isBetween(todayHour,todayMin,0,0,activeHours.endHourInt,activeHours.endMinInt):this.isBetween(todayHour,todayMin,activeHours.startHourInt,activeHours.startMinInt,activeHours.endHourInt,activeHours.endMinInt)},isBetween:function(testHour,testMin,startHour,startMin,endHour,endMin){return testHour>startHour&&endHour>testHour?!0:testHour==startHour&&testHour==endHour?testMin>=startMin&&endMin>=testMin:testHour==startHour&&testMin>=startMin?!0:testHour==endHour&&endMin>=testMin?!0:!1},isStartTimeLater:function(activeHours){return activeHours.startHourInt==activeHours.endHourInt&&activeHours.startMinInt>=activeHours.endMinInt?!0:activeHours.startHourInt>activeHours.endHourInt?!0:!1},setActiveHoursQueue:function(startTime,endTime){var todayDate=new Date,queueDate=todayDate.getTime()+API.Date.hoursToMilliseconds(24),activeHoursQueue=queueDate+"|"+startTime+"|"+endTime;API.Settings.set({activeHoursQueue:activeHoursQueue})},getActiveHoursQueue:function(){var activeHoursQueue=API.Settings.get("activeHoursQueue");if(void 0==activeHoursQueue||null==activeHoursQueue||""===activeHoursQueue)return!1;var activeHoursQueueArray=activeHoursQueue.split("|"),queue={};return queue.timestamp=parseInt(activeHoursQueueArray[0]),queue.startTime=activeHoursQueueArray[1],queue.endTime=activeHoursQueueArray[2],queue},clearActiveHoursQueue:function(){API.Settings.remove("activeHoursQueue")},isActive:function(){return NuclearOption.isActive()===!0?!0:this.isActiveDay()===!0&&this.isActiveHour()===!0},updateResetTimestamp:function(resetTime){var resetArray=resetTime.split(":"),resetHour=parseInt(resetArray[0],10),resetMin=parseInt(resetArray[1],10),todayResetDate=new Date((new Date).toDateString()+" "+resetHour+":"+resetMin),newResetTimestamp=todayResetDate.getTime()+864e5;API.Settings.set({resetTimestamp:newResetTimestamp})},setResetTime:function(resetTime){API.Settings.set({resetTime:resetTime})},getResetTime:function(){var resetTime=API.Settings.get("resetTime"),resetTimeQueue=this.getResetTimeQueue(),defaultResetTime="00:00";if(resetTimeQueue!==!1){var todayDate=new Date,currentTimestamp=todayDate.getTime();(currentTimestamp>resetTimeQueue.timestamp||this.isFirstInstallAllowanceActive())&&(resetTime=resetTimeQueue.resetTime,this.clearResetTimeQueue(),this.setResetTime(resetTime),this.updateResetTimestamp(resetTime))}return(void 0==resetTime||null==resetTime||""===resetTime)&&(this.setResetTime(defaultResetTime),resetTime=defaultResetTime,this.updateResetTimestamp(resetTime)),resetTime},setResetTimeQueue:function(resetTime){var todayDate=new Date,queueDate=todayDate.getTime()+API.Date.hoursToMilliseconds(24),resetTimeQueue=queueDate+"|"+resetTime;API.Settings.set({resetTimeQueue:resetTimeQueue})},getResetTimeQueue:function(){var resetTimeQueue=API.Settings.get("resetTimeQueue");if(void 0==resetTimeQueue||null==resetTimeQueue||""===resetTimeQueue)return!1;var resetTimeQueueArray=resetTimeQueue.split("|"),queue={};return queue.timestamp=resetTimeQueueArray[0],queue.resetTime=resetTimeQueueArray[1],queue},clearResetTimeQueue:function(){API.Settings.remove("resetTimeQueue")},isProductivityBypassActive:function(){return API.Settings.get("productivityBypass")===!0},isFirstInstall:function(){return"string"!=typeof API.Settings.get("firstInstallDate")},isUpdatePopupDisabled:function(){var disableUpdatePopup=API.Settings.get("disableUpdatePopup");return disableUpdatePopup===!0||"true"===disableUpdatePopup},setFirstInstallAllowance:function(){var date=new Date;API.Settings.set({firstInstallDate:date.toDateString()}),date.setMinutes(date.getMinutes()+this.firstInstallAllowance),API.Settings.set({firstInstallAllowanceExpiration:date.getTime()})},isFirstInstallAllowanceActive:function(){var todayDate=new Date,expiration=API.Settings.get("firstInstallAllowanceExpiration");return expiration>todayDate.getTime()},localizeHTML:function(doc){for(var objects=doc.getElementsByTagName("*"),i=0;i<objects.length;i++)objects[i].dataset&&objects[i].dataset.i18n&&(objects[i].innerHTML=API.Chrome.Translation.get(objects[i].dataset.i18n))},tick:function(){this.isNewDay()===!0&&this.resetElapsedTime(),this.elapsedTime=parseInt(this.elapsedTime,10)+this.interval;var totalSecondsRemaining=this.getTotalSecondsRemaining();return this.postTimerUpdatedMessage(),Notification.isset(totalSecondsRemaining)&&Notification.show("block"),this.isMaxTimeAllowedExceeded()?(this.killPage(),!1):(this.updateBadge(),this.setElapsedTime(this.elapsedTime),!0)}};return window.Logger=Logger,StayFocusd}),Array.prototype.inArray=function(needle){for(var key in this)if(this.hasOwnProperty(key)&&this[key]==needle)return!0;return!1};