define([],function(){return{firstToLower:function(str){return"string"==typeof str?str.toLowerCase()[0]+str.slice(1):str},firstToUpper:function(str){return"string"==typeof str?str.toUpperCase()[0]+str.slice(1):str},isEmpty:function(value){return null===value||""===value||"undefined"==typeof value},initAPI:function(API){API.mixin("Utils",{firstToLower:this.firstToLower.bind(this),firstToUpper:this.firstToUpper.bind(this),isEmpty:this.isEmpty.bind(this)})}}});