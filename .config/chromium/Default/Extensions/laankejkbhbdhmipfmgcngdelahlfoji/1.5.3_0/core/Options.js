define(["core/Logger","core/CoreAPI","core/Layout","core/vendor/jquery.min","core/vendor/jquery.simplemodal.min"],function(Logger,API,Layout,$){var Options={init:function(callback){var self=this;API.Settings.init(function(){$("a.close").click(function(){API.Chrome.Tab.getSelected(function(tab){API.Chrome.Tab.remove(tab.id)})}),self.initNav(),self.initChallenge(),self.initMaxTimeAllowed(),self.initActiveDays(),self.initActiveHours(!0),self.initResetTime(!0),self.initBlockedSites(),self.initAllowedSites(),self.initNuclearOption(!0),self.initCustomizeInterface(),self.initImportExport(),self.initRescue(),"function"==typeof callback&&callback()})},initNav:function(){var self=this;if($("#nav li").click(function(){var classes=$(this).attr("class"),classesArray=classes.split(" ");self.selectNav(classesArray[0])}),window.location.hash){var hash=window.location.hash.replace("#","");hash=hash.replace("Tab",""),this.selectNav(hash)}else this.selectNav("maxTimeAllowed");return!1},selectNav:function(navItem){$("#nav li").removeClass("active"),$(".option.active").hide(),$("#body ."+navItem).show(),$("."+navItem).addClass("active"),window.location.hash="#"+navItem+"Tab"},initMaxTimeAllowed:function(){var self=this;$("#maxTimeAllowed").keydown(function(event){self.allowOnlyNumbers(event)}),API.StayFocusd.isMaxTimeAllowedExceeded()&&($("#maxTimeAllowed").prop("disabled",!0),$("#maxTimeAllowedButton").prop("disabled",!0),$("#maxTimeAllowedMsg").html(API.Chrome.Translation.get("timeExpiredCannotChangeUntilTomorrow")),$("#maxTimeAllowedMsg").show())},setMaxTimeAllowed:function(maxTimeAllowed){var success=API.StayFocusd.setMaxTimeAllowed(maxTimeAllowed);success===!1&&$("#maxTimeAllowed").val(API.StayFocusd.getMaxTimeAllowed())},initActiveDays:function(){var activeDays=API.StayFocusd.getActiveDays(),date=new Date,todayDay=date.getDay(),self=this;$(".activeDay").each(function(){var checkbox=$(this),day=checkbox.val();activeDays.inArray(day)===!0&&checkbox.prop("checked",!0),day==todayDay&&(checkbox.prop("checked")?checkbox.prop("disabled",!0):checkbox.click(function(){checkbox.prop("disabled",!0)}))}),$(".activeDay").click(function(){self.setActiveDays()})},setActiveDays:function(){var activeDays=[],date=new Date,todayDay=date.getDay();$(".activeDay:checked").each(function(){var day=parseInt($(this).val(),10);day==todayDay&&$(this).prop("disabled",!0),activeDays.push(day)}),API.StayFocusd.setActiveDays(activeDays)},initActiveHours:function(initClick){var self=this;initClick===!0&&$("#setActiveHours").click(function(){self.setActiveHours()});var activeHours=API.StayFocusd.getActiveHours(),startTime=API.Date.parseMilitaryTime(activeHours.startTime),endTime=API.Date.parseMilitaryTime(activeHours.endTime);$(".start .hour option[value="+startTime.hour+"]").prop("selected",!0),$(".start .min option[value="+startTime.min+"]").prop("selected",!0),$(".start .ampm option[value="+startTime.ampm+"]").prop("selected",!0),$(".end .hour option[value="+endTime.hour+"]").prop("selected",!0),$(".end .min option[value="+endTime.min+"]").prop("selected",!0),$(".end .ampm option[value="+endTime.ampm+"]").prop("selected",!0);var activeHoursQueue=API.StayFocusd.getActiveHoursQueue();if(0!=activeHoursQueue){var timestamp=parseInt(activeHoursQueue.timestamp,10);startTime=activeHoursQueue.startTime,endTime=activeHoursQueue.endTime;var queueDate=new Date(timestamp),queueMonth=queueDate.getMonth(),queueDay=queueDate.getDate(),queueYear=queueDate.getFullYear(),queueHour=queueDate.getHours(),queueMin=queueDate.getMinutes(),queueAmpm=API.Chrome.Translation.get("timeAM");0==queueHour&&(queueHour=12,queueAmpm=API.Chrome.Translation.get("timeAM")),queueHour>12&&(queueHour=12==queueHour?12:queueHour-12,queueAmpm=API.Chrome.Translation.get("timePM")),queueMin=API.Date.toTwoDigits(queueMin);var months=[API.Chrome.Translation.get("january"),API.Chrome.Translation.get("february"),API.Chrome.Translation.get("march"),API.Chrome.Translation.get("april"),API.Chrome.Translation.get("may"),API.Chrome.Translation.get("june"),API.Chrome.Translation.get("july"),API.Chrome.Translation.get("august"),API.Chrome.Translation.get("september"),API.Chrome.Translation.get("october"),API.Chrome.Translation.get("november"),API.Chrome.Translation.get("december")],parsedStart=API.Date.parseMilitaryTime(startTime),parsedEnd=API.Date.parseMilitaryTime(endTime),msgDate=months[queueMonth]+" "+queueDay+", "+queueYear,msgTime=queueHour+":"+queueMin+" "+queueAmpm,queueString=API.Chrome.Translation.get("initActiveHoursMsg",[msgDate,msgTime,parsedStart.display,parsedEnd.display]);$("#activeHoursMsg").html(queueString),$("#activeHoursMsg").show()}},setActiveHours:function(){var months=[API.Chrome.Translation.get("january"),API.Chrome.Translation.get("february"),API.Chrome.Translation.get("march"),API.Chrome.Translation.get("april"),API.Chrome.Translation.get("may"),API.Chrome.Translation.get("june"),API.Chrome.Translation.get("july"),API.Chrome.Translation.get("august"),API.Chrome.Translation.get("september"),API.Chrome.Translation.get("october"),API.Chrome.Translation.get("november"),API.Chrome.Translation.get("december")],todayDate=new Date,todayMonth=todayDate.getMonth(),todayDay=todayDate.getDate(),todayYear=todayDate.getFullYear();todayDay=API.Date.toTwoDigits(todayDay);var todayString=months[todayMonth]+" "+todayDay+", "+todayYear,startHour=$(".start .hour").val(),startMin=$(".start .min").val(),startAmpm=$(".start .ampm").val(),startDisplayHour=0==startHour?12:startHour;"pm"==startAmpm&&(startHour=parseInt(startHour,10)+12);var startTime=startHour+":"+startMin,startDate=new Date(todayString+" "+startTime+":00"),startTimestamp=startDate.getTime(),endHour=$(".end .hour").val(),endMin=$(".end .min").val(),endAmpm=$(".end .ampm").val(),endDisplayHour=0==endHour?12:endHour;"pm"==endAmpm&&(endHour=parseInt(endHour,10)+12);var endTime=endHour+":"+endMin,endDate=new Date(todayString+" "+endTime+":00"),endTimestamp=endDate.getTime(),confirmed=!0;if(startTimestamp>=endTimestamp){var startString=startDisplayHour+":"+startMin+" "+startAmpm.toUpperCase(),endString=endDisplayHour+":"+endMin+" "+endAmpm.toUpperCase();confirmed=confirm(API.Chrome.Translation.get("activeOverMidnight",[startString,endString]))}confirmed&&(API.StayFocusd.setActiveHoursQueue(startTime,endTime),alert(API.StayFocusd.isFirstInstallAllowanceActive()===!1?API.Chrome.Translation.get("activeHoursQueued"):API.Chrome.Translation.get("activeHoursSet"))),this.initActiveHours()},initResetTime:function(initClick){var self=this;initClick===!0&&$("#setResetTime").click(function(){self.setResetTime()});var resetTime=API.StayFocusd.getResetTime(),parsedTime=API.Date.parseMilitaryTime(resetTime);$(".reset .hour option[value="+parsedTime.hour+"]").prop("selected",!0),$(".reset .min option[value="+parsedTime.min+"]").prop("selected",!0),$(".reset .ampm option[value="+parsedTime.ampm+"]").prop("selected",!0);var resetTimeQueue=API.StayFocusd.getResetTimeQueue();if(resetTimeQueue!==!1){var timestamp=parseInt(resetTimeQueue.timestamp,10);resetTime=resetTimeQueue.resetTime;var queueDate=new Date(timestamp),queueMonth=queueDate.getMonth(),queueDay=queueDate.getDate(),queueYear=queueDate.getFullYear(),queueHour=queueDate.getHours(),queueMin=queueDate.getMinutes(),queueAmpm=API.Chrome.Translation.get("timeAM");0==queueHour&&(queueHour=12,queueAmpm=API.Chrome.Translation.get("timeAM")),queueHour>12&&(queueHour=12==queueHour?12:queueHour-12,queueAmpm=API.Chrome.Translation.get("timePM")),queueMin=API.Date.toTwoDigits(queueMin);var months=[API.Chrome.Translation.get("january"),API.Chrome.Translation.get("february"),API.Chrome.Translation.get("march"),API.Chrome.Translation.get("april"),API.Chrome.Translation.get("may"),API.Chrome.Translation.get("june"),API.Chrome.Translation.get("july"),API.Chrome.Translation.get("august"),API.Chrome.Translation.get("september"),API.Chrome.Translation.get("october"),API.Chrome.Translation.get("november"),API.Chrome.Translation.get("december")];parsedTime=API.Date.parseMilitaryTime(resetTime);var msgDate=months[queueMonth]+" "+queueDay+", "+queueYear,msgTime=queueHour+":"+queueMin+" "+queueAmpm,queueString=API.Chrome.Translation.get("initResetTimeMsg",[msgDate,msgTime,parsedTime.display]);$("#resetTimeMsg").html(queueString),$("#resetTimeMsg").show()}},setResetTime:function(){var resetHour=$(".reset .hour").val(),resetMin=$(".reset .min").val(),resetAmpm=$(".reset .ampm").val();"pm"==resetAmpm&&(resetHour=parseInt(resetHour,10)+12);var resetTime=resetHour+":"+resetMin;API.StayFocusd.setResetTimeQueue(resetTime),alert(API.StayFocusd.isFirstInstallAllowanceActive()===!1?API.Chrome.Translation.get("dailyResetQueued"):API.Chrome.Translation.get("dailyResetSet")),this.initResetTime()},initBlockedSites:function(){API.Component.load({name:"Blacklist",instance:"blacklist",onLoaded:function(component){component.view.setJQuery($),component.model.load(function(){component.view.inject($("#blockedSites"))})}})},initAllowedSites:function(){API.Component.load({name:"Whitelist",instance:"whitelist",onLoaded:function(component){component.view.setJQuery($),component.model.load(function(){component.view.inject($("#allowedSites"))})}})},setNuclearOption:function(){if("0"==$("#nuclearOptionForm input[name=blockLength]").val())return alert(API.Chrome.Translation.get("greaterThanZero")),!1;var confirmed=confirm(this.getNuclearOptionConfirmationMsg());if(confirmed){var settings={};settings.blockType=$("#nuclearOptionForm input[name=blockType]:checked").val(),settings.contentType=$("#nuclearOptionForm input[name=contentType]:checked").val(),settings.smartBomb={multimedia:$("#nuclearOptionForm input[name=multimedia]").prop("checked"),forms:$("#nuclearOptionForm input[name=forms]").prop("checked"),logins:$("#nuclearOptionForm input[name=logins]").prop("checked"),images:$("#nuclearOptionForm input[name=images]").prop("checked")},settings.blockLength=parseFloat($("#nuclearOptionForm input[name=blockLength]").val()),settings.startType=$("#nuclearOptionForm input[name=startType]:checked").val(),settings.frequency=$("#nuclearOptionForm input[name=frequency]:checked").val(),settings.startHour=null,settings.startMin=null,settings.startAmPm=null,"atScheduledTime"==settings.startType&&(settings.startHour=$("#nuclearOptionForm select[name=startHour]").val(),settings.startMin=$("#nuclearOptionForm select[name=startMin]").val(),settings.startAmPm=$("#nuclearOptionForm select[name=startAmPm]").val()),API.NuclearOption.saveSettings(settings),"now"==settings.startType&&API.NuclearOption.activate(),this.initNuclearOption(),this.initAllowedSites(),alert(API.Chrome.Translation.get("commencingNuclearOption"))}},getNuclearOptionConfirmationMsg:function(){var startHour=$("#nuclearOptionForm select[name=startHour]").val(),startMin=$("#nuclearOptionForm select[name=startMin]").val(),startAmPm=$("#nuclearOptionForm select[name=startAmPm]").val(),contentType=$("#nuclearOptionForm input[name=contentType]:checked").val(),confirmMsg=API.Chrome.Translation.get("stayFocusdWillBlock")+" ";if("smartBomb"==contentType){var multimedia=$("#nuclearOptionForm input[name=multimedia]").prop("checked"),forms=$("#nuclearOptionForm input[name=forms]").prop("checked"),images=$("#nuclearOptionForm input[name=images]").prop("checked"),logins=$("#nuclearOptionForm input[name=logins]").prop("checked"),contentTypes=[];multimedia&&contentTypes.push(API.Chrome.Translation.get("multimedia")),forms&&contentTypes.push(API.Chrome.Translation.get("forms")),logins&&contentTypes.push(API.Chrome.Translation.get("logins")),images&&contentTypes.push(API.Chrome.Translation.get("images")),confirmMsg+=contentTypes.join("/")+" "+API.Chrome.Translation.get("for")+" "}confirmMsg+=$("#nuclearOptionForm input[name=blockType]:checked + label").text(),confirmMsg+=" "+API.Chrome.Translation.get("forTime")+" "+$("#nuclearOptionForm input[name=blockLength]").val()+" "+API.Chrome.Translation.get("hourOrMore"),confirmMsg+=" "+API.Chrome.Translation.get("startingTime")+" ";var startType=$("#nuclearOptionForm input[name=startType]:checked").val();switch(startType){case"now":confirmMsg+=API.Chrome.Translation.get("rightNow");break;case"whenMaxTimeAllowedExceeded":confirmMsg+=API.Chrome.Translation.get("whenMaxTimeExceeded");break;case"atScheduledTime":confirmMsg+=API.Chrome.Translation.get("atTime")+" ",confirmMsg+="00"==startHour?"12":startHour,confirmMsg+=":"+startMin,confirmMsg+=" "+startAmPm.toUpperCase()}var frequency=$("#nuclearOptionForm input[name=frequency]:checked").val(),day=(new Date).getDay(),isActiveNow="everyWeekday"!=frequency||day>0&&6>day;return confirmMsg+="now"==startType?".":isActiveNow?" "+API.Chrome.Translation.get("today")+".":" "+API.Chrome.Translation.get("onMonday")+".","atScheduledTime"==startType&&API.Date.hasTimePassed(startHour,startMin,startAmPm)&&isActiveNow?confirmMsg+="\n\n"+API.Chrome.Translation.get("selectedTimeHasPassed")+" "+API.Chrome.Translation.get("nuclearOptionImmediately"):"whenMaxTimeAllowedExceeded"==startType&&API.StayFocusd.isMaxTimeAllowedExceeded()&&(confirmMsg+="\n\n"+API.Chrome.Translation.get("maxTimeHasBeenExceeded")+" "+API.Chrome.Translation.get("nuclearOptionImmediately")),confirmMsg+="\n\n"+API.Chrome.Translation.get("areYouSure")},initNuclearOption:function(initClick){var self=this;if(initClick===!0&&($("#activateNuclearOptionButton").click(function(){self.setNuclearOption()}),$("#nuclearOptionForm input[name=blockLength]").keydown(function(event){self.allowOnlyNumbers(event,!0)}),$("#nuclearOptionForm input[name=startType]").click(function(){"atScheduledTime"==$(this).val()?$("#nuclearOptionScheduledTime").show():$("#nuclearOptionScheduledTime").hide(),"now"==$(this).val()?$("#nuclearOptionFrequency").hide():$("#nuclearOptionFrequency").show()}),$("#nuclearOptionForm input[name=contentType]").click(function(){"smartBomb"==$(this).val()?$("#smartBombOptions").show():$("#smartBombOptions").hide()})),this.setNuclearOptionDefaults(),API.NuclearOption.isActive()){this.restrictNuclearOptionSettings();var expiration=API.NuclearOption.getExpiration();expiration=API.Date.timestampToDisplayDate(expiration);var displayDate=expiration.hours+":"+expiration.minutes+" "+expiration.ampm+" on "+expiration.month+"/"+expiration.day+"/"+expiration.year;$("#nuclearOptionMsg").html(API.Chrome.Translation.get("nuclearOptionActiveUntil")+" "+displayDate+"."),$("#nuclearOptionMsg").show()}},restrictNuclearOptionSettings:function(){this.disallowMoreLenientNuclearOption("blockType","all","allExceptAllowed","blocked"),this.disallowMoreLenientNuclearOption("contentType","wholeSite","smartBomb",null),this.disallowMoreLenientNuclearOption("startType","now","whenMaxTimeAllowedExceeded","atScheduledTime"),this.disallowMoreLenientNuclearOption("frequency","everyDay","everyWeekday","todayOnly"),$("#nuclearOptionForm input[name=blockLength]").change(function(){var currentBlockLength=API.NuclearOption.getBlockLength();return void 0!==currentBlockLength&&$(this).val()<currentBlockLength?(alert(API.Chrome.Translation.get("cannotChooseMoreLenientSetting")),$(this).val(currentBlockLength),!1):void 0}),$("#nuclearOptionForm input[value=atScheduledTime]").prop("checked")&&$("#nuclearOptionScheduledTime select").prop("disabled",!0)},disallowMoreLenientNuclearOption:function(inputName,high,medium,low){var alertFunction=function(){return alert(API.Chrome.Translation.get("cannotChooseMoreLenientSetting")),!1},inputValue=$("#nuclearOptionForm input[name="+inputName+"]:checked").val();null!==low&&inputValue!==low&&$("#nuclearOptionForm input[value="+low+"]").click(alertFunction),inputValue===high&&$("#nuclearOptionForm input[value="+medium+"]").click(alertFunction)},setNuclearOptionDefaults:function(){var nuclearOption=API.NuclearOption,blockType=nuclearOption.getBlockType();$("#nuclearOptionForm input[value="+blockType+"]").prop("checked",!0);var contentType=nuclearOption.getContentType();$("#nuclearOptionForm input[value="+contentType+"]").prop("checked",!0),"smartBomb"==contentType?$("#smartBombOptions").show():$(".smartBombOption").prop("checked",!0);var smartBomb=nuclearOption.getSmartBomb();for(var type in smartBomb)smartBomb.hasOwnProperty(type)&&smartBomb[type]&&$("#nuclearOptionForm input[name="+type+"]").prop("checked",!0);var blockLength=nuclearOption.getBlockLength();$("#nuclearOptionForm input[name=blockLength]").val(blockLength);var startType=nuclearOption.getStartType();$("#nuclearOptionForm input[value="+startType+"]").prop("checked",!0);var frequency=nuclearOption.getFrequency();if($("#nuclearOptionForm input[value="+frequency+"]").prop("checked",!0),"atScheduledTime"==startType){var startHour=nuclearOption.getStartHour(),startMin=nuclearOption.getStartMin(),startAmPm=nuclearOption.getStartAmPm();$("#nuclearOptionForm select[name=startHour]").val(startHour),$("#nuclearOptionForm select[name=startMin]").val(startMin),$("#nuclearOptionForm select[name=startAmPm]").val(startAmPm),$("#nuclearOptionScheduledTime").show()}"now"==startType?$("#nuclearOptionFrequency").hide():$("#nuclearOptionFrequency").show()},allowOnlyNumbers:function(event,allowDecimal){allowDecimal===!0&&(190==event.keyCode||110==event.keyCode)||46==event.keyCode||8==event.keyCode||(event.keyCode<48||event.keyCode>57&&(event.keyCode<96||event.keyCode>105))&&event.preventDefault()},initChallenge:function(){var self=this;API.Component.load({name:"Challenge",instance:"challengeOverlay",view:"overlay",onLoaded:function(component){component.view.setJQuery($),component.model.load(function(){component.view.inject($("#challengeContainer")),$("#productivityBypass").click(function(){self.initProductivityBypass()})})}}),API.Component.load({name:"Challenge",instance:"challengeOptions",view:"options",onLoaded:function(component){component.view.setJQuery($),component.model.load(function(){component.view.inject($("#requireChallenge")),component.model.isRequired()&&!self.isRescueMode()&&self.showChallenge(),$("#showChallenge").click(function(){self.showChallenge()})})}})},showChallenge:function(){return $("#challengeContainer").modal({opacity:80,overlayId:"overlay",escClose:!1}),!1},initProductivityBypass:function(){$("li.option:not(li.option.bypass)").hide(),$("li.option:not(li.option.bypass)").html(""),$("#blockWholeSite").prop("checked",!0),$("#nav li:not(li.bypass)").hide(),$(".hideOnBypass").hide(),this.selectNav("maxTimeAllowed"),$.modal.close()},initCustomizeInterface:function(){var self=this,$disableSync=$("#disableSync"),$hideAllowSiteLink=$("#hideAllowSiteLink"),$hideInfoBar=$("#hideInfoBar"),$disableUpdatePopup=$("#disableUpdatePopup"),$saveNotificationsButton=$("#saveNotificationsButton"),$customNotificationsInput=$("#customNotifications input");this.initActivityMonitor(),$disableSync.click(function(){self.toggleDisableSync()}),this.isSyncDisabled()&&$disableSync.prop("checked",!0),$hideAllowSiteLink.click(function(){self.toggleAllowSiteLink()}),this.isAllowSiteLinkHidden()===!0&&$hideAllowSiteLink.prop("checked",!0),$hideInfoBar.click(function(){self.toggleInfoBar()}),this.isInfoBarHidden()&&$hideInfoBar.prop("checked",!0),$disableUpdatePopup.click(function(){self.toggleUpdatePopup()}),API.StayFocusd.isUpdatePopupDisabled()&&$disableUpdatePopup.prop("checked",!0),API.StayFocusd.isUpdatePopupDisabled()&&$disableUpdatePopup.prop("checked",!0);var notifications=API.Notification.get();this.setNotificationOptionDefaults(notifications),$customNotificationsInput.keydown(function(event){self.allowOnlyNumbers(event)}),$customNotificationsInput.keydown(function(event){self.allowOnlyNumbers(event)}),$saveNotificationsButton.click(function(){self.saveNotifications()})},initActivityMonitor:function(){API.Component.load({name:"ActivityMonitor",instance:"activityMonitor",view:"options",onLoaded:function(component){var layout=new Layout("Options");component.model.init(),component.view.setJQuery($),layout.connect(component.view,$("#activityMonitorOptions")),layout.inject(component.model,component.view)}})},saveNotifications:function(){for(var notifications=[],i=0;5>i;i++){var value=$("#customNotifications input[name=value"+i+"]").val();if(0!=value.length){var unit=$("#customNotifications select[name=unit"+i+"]").val();value=parseFloat(value),value="min"==unit?60*value:value,notifications.push(value)}}API.Notification.saveSettings(notifications),alert(API.Chrome.Translation.get("notificationSettingsSaved"))},setNotificationOptionDefaults:function(notifications){for(var i in notifications)if(notifications.hasOwnProperty(i)){var seconds=parseInt(notifications[i]);if(isNaN(seconds))continue;var value=seconds>59?seconds/60:seconds,unit=seconds>59?"min":"sec";$("#customNotifications input[name=value"+i+"]").val(value),$("#customNotifications select[name=unit"+i+"]").val(unit)}},toggleDisableSync:function(){this.isSyncDisabled()?(API.Settings.set({disableSync:!1}),API.PubSub.publish("Options.checkbox.toggle.DISABLE_SYNC",{disableSync:!1})):(API.PubSub.publish("Options.checkbox.toggle.DISABLE_SYNC",{disableSync:!0}),API.Settings.set({disableSync:!0}))},isSyncDisabled:function(){return API.Settings.get("disableSync")===!0},toggleAllowSiteLink:function(){var isAllowSiteLinkHidden=this.isAllowSiteLinkHidden();API.Settings.set({hideAllowSiteLink:!isAllowSiteLinkHidden})},isAllowSiteLinkHidden:function(){return API.Settings.get("hideAllowSiteLink")},toggleInfoBar:function(){var isInfoBarHidden=this.isInfoBarHidden();API.Settings.set({hideInfoBar:!isInfoBarHidden})},isInfoBarHidden:function(){return API.Settings.get("hideInfoBar")===!0},toggleUpdatePopup:function(){var isUpdatePopupDisabled=API.StayFocusd.isUpdatePopupDisabled();API.Settings.set({disableUpdatePopup:!isUpdatePopupDisabled})},initImportExport:function(){var self=this;$("#exportSettings").click(function(){self.exportSettings()}),API.StayFocusd.isMaxTimeAllowedExceeded()?($("#importSettings").prop("disabled",!0),$("#importSettingsMsg").html(API.Chrome.Translation.get("cannotImportAfterTimeExpired")),$("#importSettingsMsg").show()):$("#importSettings").click(function(){self.importSettings()})},exportSettings:function(){API.Storage.getAll(null,function(settings){var form=document.createElement("form"),field=document.createElement("input");form.setAttribute("method","POST"),form.setAttribute("action",API.StayFocusd.getAPIURL()+"/export.php"),field.setAttribute("type","hidden"),field.setAttribute("name","settings"),field.setAttribute("value",encodeURIComponent(JSON.stringify(settings))),form.appendChild(field),form.submit()})},importSettings:function(){var fileList=document.getElementById("settingsFile").files,self=this;if(!(fileList instanceof FileList)||0===fileList.length)return alert(API.Chrome.Translation.get("mustSelectSettingsFile")),!1;var fileReader=new FileReader;fileReader.onloadend=function(){return function(e){self.saveImportedSettings(e.target.result)}}(fileList[0]),fileReader.readAsText(fileList[0])},saveImportedSettings:function(settingsJSON){var $importedSettings=$("#importedSettings");$("#importedSettings ul").html(""),$importedSettings.show();try{var settings=JSON.parse(decodeURIComponent(settingsJSON));"SYNC"in settings||"LOCAL"in settings||"HTML5"in settings?this.saveBucketedSettings(settings):this.saveLegacySettings(settings)}catch(e){$importedSettings.html('<h4 class="error">'+API.Chrome.Translation.get("problemImportingSettings")+"</h4>"),$importedSettings.append("<p>"+API.Chrome.Translation.get("canOnlyImportExportedFile")+"</p>"),$importedSettings.append("<p>"+API.Chrome.Translation.get("importEmailSupport")+"<p>")}},saveBucketedSettings:function(settings){var self=this,$importedSettings=$("#importedSettings"),$importResults=$("#importResults");for(var bucket in settings)settings.hasOwnProperty(bucket)&&!function(bckt){API.Settings.set(settings[bckt],function(){var ulID=bckt.toLowerCase()+"ImportResults";$importResults.append("<h3>"+bckt+':</h3><ul id="'+ulID+'"></ul>'),self.outputImportedSettingsToHTML(settings[bckt],$("#"+ulID))},bckt,!0)}(bucket);$importedSettings.append('<h4 class="success">'+API.Chrome.Translation.get("done").toUpperCase()+"!</h4>"),$importedSettings.append("<p>"+API.Chrome.Translation.get("refreshToSeeImportedSettings")+"</p>")},saveLegacySettings:function(settings){var self=this,$importedSettings=$("#importedSettings"),adjustedSettings=this.coerceImportedSettingsValues(settings);adjustedSettings=this.convertSyncValues(adjustedSettings),$("#importResults").append('<ul id="legacyImportResults"></ul>'),API.Settings.set(adjustedSettings,function(){self.outputImportedSettingsToHTML(adjustedSettings,$("#legacyImportResults")),$importedSettings.append('<h4 class="success">'+API.Chrome.Translation.get("done").toUpperCase()+"!</h4>"),$importedSettings.append("<p>"+API.Chrome.Translation.get("refreshToSeeImportedSettings")+"</p>")},null,!0)},outputImportedSettingsToHTML:function(settings,$outputTo){for(var key in settings)if(settings.hasOwnProperty(key)){var value=API.Object.isObjLiteral(settings[key])?JSON.stringify(settings[key]):settings[key];$outputTo.append("<li><b>"+key+":</b><br />"+value+"</li>")}},coerceImportedSettingsValues:function(settings){var adjustedSettings={};for(var key in settings)if(settings.hasOwnProperty(key)){var value=settings[key];"true"===value||"false"===value?value="true"===value:"null"===value?value=null:API.Object.isJSON(value)?value=JSON.parse(value):!isNaN(parseInt(value))&&isFinite(value)&&(value=parseInt(value)),adjustedSettings[key]=value}return adjustedSettings},convertSyncValues:function(settings){if("undefined"!=typeof settings.disableSync&&settings.disableSync!==!0)for(var key in settings)if(settings.hasOwnProperty(key)&&0===key.indexOf("sync_")){var newKey=key.substring(5);settings[newKey]=settings[key],delete settings[key]}return settings},initRescue:function(){if(this.isRescueMode()){$("#nav li").hide(),$(".rescueMe").show(),this.selectNav("rescueMe");var self=this,disclaimer=" The extension will now reload. This page will close once you click OK.";window.guc=this.generateUnlockCode.bind(this),$("#killNuclearOption").click(function(){self.isValidUnlockCode()&&(API.Settings.remove("nuclearOptionSettings"),alert("The Nuclear Option has been killed."+disclaimer),API.Chrome.Extension.reload())}),$("#killStalkerOption").click(function(){self.isValidUnlockCode()&&(API.Settings.remove("outgoingLink"),alert("The Stalker Option has been killed."+disclaimer),API.Chrome.Extension.reload())}),$("#killChallenge").click(function(){self.isValidUnlockCode()&&API.Component.load({name:"Challenge",onLoaded:function(component){component.model.setRequired(!1),alert("The Challenge has been killed."+disclaimer),API.Chrome.Extension.reload()}})})}},isRescueMode:function(){return"#rescueMeTab"===window.location.hash},isValidUnlockCode:function(){var code=prompt("Please enter your unlock code");if(!code)return alert("You must enter a valid unlock code"),!1;var codeArray=code.split("-"),codeNum=codeArray[0]||null,codeStr=codeArray[1]||null;if(!codeNum||!codeStr||code!==this.generateUnlockCode(codeNum))return alert("You must enter a valid unlock code"),!1;var codeNumInt=parseInt(codeNum),nowTime=(new Date).getTime(),endTime=codeNumInt+216e5;return endTime>=nowTime},generateUnlockCode:function(ts){for(var num=ts||(new Date).getTime(),numStr=num.toString(),len=numStr.length,str="",i=0;len>i;i++)str+=String.fromCharCode(99+parseInt(numStr[i]));return num+"-"+str}};return Options}),Array.prototype.inArray=function(needle){for(var key in this)if(this.hasOwnProperty(key)&&this[key]==needle)return!0;return!1};