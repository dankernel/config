define(["core/Logger","core/vendor/DropletJS.Class.min"],function(Logger,Class){return Class.create({DEFAULT_NS:"__default",msgArray:null,msgString:null,namespace:null,construct:function(msgString){if(this.namespace=this.DEFAULT_NS,msgString.indexOf(":")>-1&&(this.namespace=msgString.substr(0,msgString.indexOf(":")),msgString=msgString.substr(msgString.indexOf(":")+1,msgString.length)),msgString.indexOf(".")>-1){var msgArray=msgString.split(".");this.msgArray=[msgArray[0]||"*",msgArray[1]||"*",msgArray[2]||"*",msgArray[3]||"*"],this.msgString=this.msgArray.join(".")}else this.msgArray=[msgString],this.msgString=msgString},matches:function(msgString){if(this.msgString===msgString)return!0;var msg1Array=this.msgArray,msg2Array=msgString.split(".");if(msg1Array.length!==msg2Array.length)return!1;for(var msg1Bitmask="",msg2Bitmask="",longerMessageLength=msg1Array.length>=msg2Array.length?msg1Array.length:msg2Array.length,i=0;longerMessageLength>i;i++){if("*"!==msg1Array[i]&&"*"!==msg2Array[i]&&msg1Array[i]!==msg2Array[i])return!1;msg1Bitmask+="*"===msg1Array[i]?"0":"1",msg2Bitmask+="*"===msg2Array[i]?"0":"1"}return msg1Bitmask>=msg2Bitmask},toString:function(){return this.msgString},getOriginator:function(){return"*"===this.msgArray[0]?null:this.msgArray[0]},getDescriptor:function(){return"*"===this.msgArray[3]?null:this.msgArray[3]}})});