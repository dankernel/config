try{
var g,aa=aa||{},k=this,ba="closure_uid_"+(1E9*Math.random()>>>0),m=Date.now||function(){return+new Date};
}catch(e){_DumpException(e)}
try{
k.ace_i18n={chrome_ext_short_name:{message:"Hangouts"},chrome_ext_description:{message:"Hangouts brings conversations to life with photos, emoji, and even group video calls for free."},quasar_chat_toast_info:{message:"Click to go to page..."},quasar_answer_button_text:{message:"Answer"},quasar_decline_button_text:{message:"Decline"},quasar_help:{message:"Help"},quasar_legend_startup_shutdown:{message:"Application"},chrome_ext_run_at_browser_start:{message:"Sign in to Hangouts when Chrome starts"},
chrome_ext_run_after_browser_close:{message:"Allow background mode"},chrome_ext_new_windows_topmost:{message:"Keep Hangouts on top of other windows"},quasar_label_tray_icon:{message:"Show system tray icon"},quasar_legend_notifications:{message:"Notifications"},quasar_label_all_notification:{message:"Disable notifications"},quasar_label_chat_notification:{message:"Disable chat notifications"},quasar_label_toast_timeout_chat:{message:"Allow chat notifications to timeout automatically"},quasar_label_toast_duration_chat:{message:"Timeout length (in seconds):"},
quasar_button_save:{message:"Ok"},quasar_button_apply:{message:"Apply"},quasar_button_cancel:{message:"Cancel"},chrome_ext_menutext_feedback:{message:"Send feedback"},quasar_feedback_server_uri:{message:"https://www.google.com/tools/feedback"},chrome_ext_feedback_subtitle:{message:"Send feedback"},chrome_ext_feedback_comments:{message:"Comments"},quasar_feedback_system_legend:{message:"System Information"},quasar_feedback_platform_label:{message:"Platform:"},quasar_feedback_user_agent_label:{message:"User Agent:"},
quasar_feedback_privacy_legend:{message:"Privacy Statement"},quasar_feedback_privacy_text:{message:"The description, product information, additional information and your email address will be sent to Google. See the Google Feedback Terms of Service. By submitting this content you are granting to Google the right to use it to improve our products and services. See our Privacy Policy."},quasar_feedback_submit_button:{message:"Send Feedback"},quasar_feedback_cancel_button:{message:"Cancel"},quasar_video_title:{message:"Video call from $1...",
placeholders:{1:{content:"$1"}}},quasar_voice_title:{message:"Voice call from $1...",placeholders:{1:{content:"$1"}}},quasar_group_chat_title:{message:"From group chat..."},quasar_chat_title:{message:"$1 says...",placeholders:{1:{content:"$1"}}},quasar_hangout_title:{message:"$1 is hanging out",placeholders:{1:{content:"$1"}}},chrome_ext_oneonone_plus_hangout_details:{message:"is video calling you via Hangouts"},chrome_ext_group_plus_hangout_details:{message:"has invited you to a group Hangout video call"},
quasar_video_details:{message:"is calling you with video chat"},quasar_voice_details:{message:"is calling you"},quasar_tip_connected:{message:"Status: Connected"},chrome_ext_tip_connected_missed_messages:{message:"Status: Connected\nMissed messages"},quasar_tip_connecting:{message:"Status: Connecting"},quasar_tip_reconnecting:{message:"Status: Reconnecting"},quasar_tip_disconnected:{message:"Status: Disconnected"},quasar_tip_not_login:{message:"Status: Not logged in"},quasar_tip_not_load:{message:"Status: Loading error"},
chrome_ext_menutext_unsigned_user:{message:"Not signed in"},quasar_menutext_unknown_user:{message:"Unknown"},quasar_menutext_feedback:{message:"Feedback"},quasar_menutext_settings:{message:"Options"},quasar_menutext_quit:{message:"Exit"},quasar_menutext_signout:{message:"Sign out"},chrome_ext_cannot_connect:{message:"Unable to connect to Google. Please check your internet connection."},quasar_try_now:{message:"Try now"},quasar_sign_in_to_start_talking:{message:"Sign in to start talking with friends"}, quasar_sign_in:{message:"Sign in"}};

}catch(e){_DumpException(e)}
try{
var p=function(a){return void 0!==a},ca=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},da=function(a,b,c){return a.call.apply(a.bind,arguments)},fa=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);
if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},q=function(a,b){function c(){}c.prototype=b.prototype;
a.q=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Jd=function(a,c,f){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}},ga=function(a,b){var c=a.split("."),d=k;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)!c.length&&p(b)?d[e]=b:d[e]?d=d[e]:d=d[e]={}},r=function(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?da:ca;return r.apply(null,arguments)},ha=function(a){var b=typeof a;
return"object"==b&&null!=a||"function"==b},s=function(a){return"function"==fa(a)},ia=function(a){return"number"==typeof a},t=function(a){return"string"==typeof a},ja=function(a){var b=fa(a);return"array"==b||"object"==b&&"number"==typeof a.length},u=function(a){return"array"==fa(a)},ka=function(){},ma=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,ma);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};q(ma,Error);ma.prototype.name="CustomError";
var oa=function(a,b){for(var c=0,d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=String(b).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),f=Math.max(d.length,e.length),h=0;0==c&&h<f;h++){var l=d[h]||"",n=e[h]||"",B=RegExp("(\\d*)(\\D*)","g"),K=RegExp("(\\d*)(\\D*)","g");do{var X=B.exec(l)||["","",""],R=K.exec(n)||["","",""];if(0==X[0].length&&0==R[0].length)break;c=na(0==X[1].length?0:parseInt(X[1],10),0==R[1].length?0:parseInt(R[1],10))||na(0==X[2].length,0==R[2].length)||na(X[2], R[2])}while(0==c)}return c},na=function(a,b){return a<b?-1:a>b?1:0};
var v=Array.prototype,pa=v.indexOf?function(a,b,c){return v.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(t(a))return t(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},qa=v.lastIndexOf?function(a,b,c){return v.lastIndexOf.call(a,b,null==c?a.length-1:c)}:function(a,b,c){c=null==c?a.length-1:c;0>c&&(c=Math.max(0,a.length+c));if(t(a))return t(b)&&1==b.length?a.lastIndexOf(b,c):-1;for(;0<=c;c--)if(c in a&&a[c]===b)return c;
return-1},w=v.forEach?function(a,b,c){v.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=t(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},ra=v.filter?function(a,b,c){return v.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=t(a)?a.split(""):a,l=0;l<d;l++)if(l in h){var n=h[l];b.call(c,n,l,a)&&(e[f++]=n)}return e},sa=v.map?function(a,b,c){return v.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=t(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,
f[h],h,a));return e},ta=v.reduce?function(a,b,c,d){d&&(b=r(b,d));return v.reduce.call(a,b,c)}:function(a,b,c,d){var e=c;w(a,function(c,h){e=b.call(d,e,c,h,a)});return e},ua=v.some?function(a,b,c){return v.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=t(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},va=function(a,b){var c=pa(a,b),d;(d=0<=c)&&v.splice.call(a,c,1);return d};
var wa=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;var xa=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)},ya=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},za=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b};var x=function(){},y=function(a,b,c,d){a.a={};b||(b=c?[c]:[]);a.n=c?String(c):void 0;a.b=0===c?-1:0;a.G=b;t:{if(a.G.length&&(b=a.G.length-1,(c=a.G[b])&&"object"==typeof c&&"number"!=typeof c.length)){a.e=b-a.b;a.c=c;break t}a.e=Number.MAX_VALUE}if(d)for(b=0;b<d.length;b++)c=d[b],c<a.e?(c+=a.b,a.G[c]=a.G[c]||[]):a.c[c]=a.c[c]||[]},z=function(a,b){return b<a.e?a.G[b+a.b]:a.c[b]};x.prototype.toString=function(){return this.G.toString()};var A=function(a,b){Aa[a]=b;b.messageId=a},Aa={};
var Ba="StopIteration"in k?k.StopIteration:Error("f"),Ca=function(){};Ca.prototype.next=function(){throw Ba;};Ca.prototype.ha=function(){return this};var Da;t:{var Ea=k.navigator;if(Ea){var Fa=Ea.userAgent;if(Fa){Da=Fa;break t}}Da=""}var Ga=function(a){return-1!=Da.indexOf(a)};var C=function(a,b){this.a={};this.b=[];this.e=this.c=0;var c=arguments.length;if(1<c){if(c%2)throw Error("h");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof C?(c=a.M(),d=a.A()):(c=za(a),d=ya(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}};g=C.prototype;g.V=function(){return this.c};g.A=function(){Ha(this);for(var a=[],b=0;b<this.b.length;b++)a.push(this.a[this.b[b]]);return a};g.M=function(){Ha(this);return this.b.concat()};g.P=function(){return 0==this.c};
g.clear=function(){this.a={};this.e=this.c=this.b.length=0};g.remove=function(a){return Ia(this.a,a)?(delete this.a[a],this.c--,this.e++,this.b.length>2*this.c&&Ha(this),!0):!1};var Ha=function(a){if(a.c!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Ia(a.a,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.c!=a.b.length){for(var e={},c=b=0;b<a.b.length;)d=a.b[b],Ia(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}};g=C.prototype;g.get=function(a,b){return Ia(this.a,a)?this.a[a]:b};
g.set=function(a,b){Ia(this.a,a)||(this.c++,this.b.push(a),this.e++);this.a[a]=b};g.forEach=function(a,b){for(var c=this.M(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};g.clone=function(){return new C(this)};g.ha=function(a){Ha(this);var b=0,c=this.b,d=this.a,e=this.e,f=this,h=new Ca;h.next=function(){for(;;){if(e!=f.e)throw Error("i");if(b>=c.length)throw Ba;var h=c[b++];return a?h:d[h]}};return h};var Ia=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};
var Ja=function(a){if("function"==typeof a.A)return a.A();if(t(a))return a.split("");if(ja(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return ya(a)},Ka=function(a,b,c){if("function"==typeof a.forEach)a.forEach(b,c);else if(ja(a)||t(a))w(a,b,c);else{var d;if("function"==typeof a.M)d=a.M();else if("function"!=typeof a.A)if(ja(a)||t(a)){d=[];for(var e=a.length,f=0;f<e;f++)d.push(f)}else d=za(a);else d=void 0;for(var e=Ja(a),f=e.length,h=0;h<f;h++)b.call(c,e[h],d&&d[h],a)}};
var La=Ga("Opera")||Ga("OPR"),D=Ga("Trident")||Ga("MSIE"),Ma=Ga("Gecko")&&-1==Da.toLowerCase().indexOf("webkit")&&!(Ga("Trident")||Ga("MSIE")),Na=-1!=Da.toLowerCase().indexOf("webkit"),Oa=k.navigator||null,Pa=Oa&&Oa.platform||"",Qa=function(){var a=k.document;return a?a.documentMode:void 0},Ra=function(){var a="",b;if(La&&k.opera)return a=k.opera.version,s(a)?a():a;Ma?b=/rv\:([^\);]+)(\)|;)/:D?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Na&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(Da))?a[1]:"");return D&&(b= Qa(),b>parseFloat(a))?String(b):a}(),Sa={},Ta=function(a){return Sa[a]||(Sa[a]=0<=oa(Ra,a))},Ua=k.document,Va=Ua&&D?Qa()||("CSS1Compat"==Ua.compatMode?parseInt(Ra,10):5):void 0;
var E=function(){};E.prototype.D=!1;E.prototype.Eb=function(){return this.D};E.prototype.B=function(){this.D||(this.D=!0,this.l())};E.prototype.l=function(){if(this.t)for(;this.t.length;)this.t.shift()()};var F=function(a){a&&"function"==typeof a.B&&a.B()};
var Wa=!D||D&&9<=Va;!Ma&&!D||D&&D&&9<=Va||Ma&&Ta("1.9.1");D&&Ta("9");var Xa=function(a){Xa[" "](a);return a};Xa[" "]=ka;var Ya=function(a,b){try{return Xa(a[b]),!0}catch(c){}return!1};var Za=!D||D&&9<=Va,$a=D&&!Ta("9");!Na||Ta("528");Ma&&Ta("1.9b")||D&&Ta("8")||La&&Ta("9.5")||Na&&Ta("528");Ma&&!Ta("8")||D&&Ta("9");var G=function(a,b){this.type=a;this.a=this.target=b;this.wc=!0};G.prototype.B=function(){};G.prototype.b=function(){this.wc=!1};var ab=function(a,b){G.call(this,a?a.type:"");this.a=this.target=null;this.clientY=this.clientX=0;this.c=this.state=null;if(a){this.type=a.type;this.target=a.target||a.srcElement;this.a=b;var c=a.relatedTarget;c&&Ma&&Ya(c,"nodeName");this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.state=a.state;this.c=a;a.defaultPrevented&&this.b()}};q(ab,G); ab.prototype.b=function(){ab.q.b.call(this);var a=this.c;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,$a)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};
var bb="closure_listenable_"+(1E6*Math.random()|0),cb=function(a){return!(!a||!a[bb])},db=0;var eb=function(a,b,c,d,e){this.qa=a;this.proxy=null;this.src=b;this.type=c;this.Ya=!!d;this.fb=e;this.key=++db;this.removed=this.Xa=!1},fb=function(a){a.removed=!0;a.qa=null;a.proxy=null;a.src=null;a.fb=null};var gb=function(a){this.src=a;this.a={};this.b=0};gb.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.a[f];a||(a=this.a[f]=[],this.b++);var h=hb(a,b,d,e);-1<h?(b=a[h],c||(b.Xa=!1)):(b=new eb(b,this.src,f,!!d,e),b.Xa=c,a.push(b));return b};gb.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.a))return!1;var e=this.a[a];b=hb(e,b,c,d);return-1<b?(fb(e[b]),v.splice.call(e,b,1),0==e.length&&(delete this.a[a],this.b--),!0):!1};
var ib=function(a,b){var c=b.type;if(!(c in a.a))return!1;var d=va(a.a[c],b);d&&(fb(b),0==a.a[c].length&&(delete a.a[c],a.b--));return d};gb.prototype.removeAll=function(a){a=a&&a.toString();var b=0,c;for(c in this.a)if(!a||c==a){for(var d=this.a[c],e=0;e<d.length;e++)++b,fb(d[e]);delete this.a[c];this.b--}return b}; var jb=function(a,b,c,d,e){a=a.a[b.toString()];b=-1;a&&(b=hb(a,c,d,e));return-1<b?a[b]:null},hb=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.removed&&f.qa==b&&f.Ya==!!c&&f.fb==d)return e}return-1};
var kb="closure_lm_"+(1E6*Math.random()|0),lb={},mb=0,nb=function(a,b,c,d,e){if(u(b)){for(var f=0;f<b.length;f++)nb(a,b[f],c,d,e);return null}c=ob(c);return cb(a)?a.listen(b,c,d,e):pb(a,b,c,!1,d,e)},pb=function(a,b,c,d,e,f){if(!b)throw Error("l");var h=!!e,l=qb(a);l||(a[kb]=l=new gb(a));c=l.add(b,c,d,e,f);if(c.proxy)return c;d=rb();c.proxy=d;d.src=a;d.qa=c;a.addEventListener?a.addEventListener(b.toString(),d,h):a.attachEvent(sb(b.toString()),d);mb++;return c},rb=function(){var a=tb,b=Za?function(c){return a.call(b.src,
b.qa,c)}:function(c){c=a.call(b.src,b.qa,c);if(!c)return c};return b},ub=function(a,b,c,d,e){if(u(b))for(var f=0;f<b.length;f++)ub(a,b[f],c,d,e);else c=ob(c),cb(a)?a.Mb(b,c,d,e):a&&(a=qb(a))&&(b=jb(a,b,c,!!d,e))&&vb(b)},vb=function(a){if(ia(a)||!a||a.removed)return!1;var b=a.src;if(cb(b))return ib(b.U,a);var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.Ya):b.detachEvent&&b.detachEvent(sb(c),d);mb--;(c=qb(b))?(ib(c,a),0==c.b&&(c.src=null,b[kb]=null)):fb(a);return!0},sb=function(a){return a in
lb?lb[a]:lb[a]="on"+a},xb=function(a,b,c,d){var e=1;if(a=qb(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.Ya==c&&!f.removed&&(e&=!1!==wb(f,d))}return Boolean(e)},wb=function(a,b){var c=a.qa,d=a.fb||a.src;a.Xa&&vb(a);return c.call(d,b)},tb=function(a,b){if(a.removed)return!0;if(!Za){var c;if(!(c=b))t:{c=["window","event"];for(var d=k,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break t}c=d}e=c;c=new ab(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){t:{var f=
!1;if(0==e.keyCode)try{e.keyCode=-1;break t}catch(h){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.a;f;f=f.parentNode)e.push(f);for(var f=a.type,l=e.length-1;0<=l;l--)c.a=e[l],d&=xb(e[l],f,!0,c);for(l=0;l<e.length;l++)c.a=e[l],d&=xb(e[l],f,!1,c)}return d}return wb(a,new ab(b,this))},qb=function(a){a=a[kb];return a instanceof gb?a:null},yb="__closure_events_fn_"+(1E9*Math.random()>>>0),ob=function(a){if(s(a))return a;a[yb]||(a[yb]=function(b){return a.handleEvent(b)});return a[yb]};
var zb=function(a){y(this,a,"h_cc",[])};q(zb,x);A("h_cc",zb);zb.prototype.Y=function(){return z(this,19)};var H=function(a){this.J=a;this.g={}};q(H,E);var Ab=[];H.prototype.listen=function(a,b,c,d){return Bb(this,a,b,c,d)};var Bb=function(a,b,c,d,e,f){u(c)||(c&&(Ab[0]=c.toString()),c=Ab);for(var h=0;h<c.length;h++){var l=nb(b,c[h],d||a.handleEvent,e||!1,f||a.J||a);if(!l)break;a.g[l.key]=l}return a};
H.prototype.Mb=function(a,b,c,d,e){if(u(b))for(var f=0;f<b.length;f++)this.Mb(a,b[f],c,d,e);else c=c||this.handleEvent,e=e||this.J||this,c=ob(c),d=!!d,b=cb(a)?jb(a.U,String(b),c,d,e):a?(a=qb(a))?jb(a,b,c,d,e):null:null,b&&(vb(b),delete this.g[b.key]);return this};H.prototype.removeAll=function(){xa(this.g,vb);this.g={}};H.prototype.l=function(){H.q.l.call(this);this.removeAll()};H.prototype.handleEvent=function(){throw Error("m");};
var I=function(){this.U=new gb(this);this.L=this;this.u=null};q(I,E);I.prototype[bb]=!0;g=I.prototype;g.addEventListener=function(a,b,c,d){nb(this,a,b,c,d)};g.removeEventListener=function(a,b,c,d){ub(this,a,b,c,d)};g.l=function(){I.q.l.call(this);this.U&&this.U.removeAll(void 0);this.u=null};g.listen=function(a,b,c,d){return this.U.add(String(a),b,!1,c,d)};g.Mb=function(a,b,c,d){return this.U.remove(String(a),b,c,d)}; g.da=function(a,b,c){a=this.U.a[String(a)];if(!a)return!0;a=a.concat();for(var d=!0,e=0;e<a.length;++e){var f=a[e];if(f&&!f.removed&&f.Ya==b){var h=f.qa,l=f.fb||f.src;f.Xa&&ib(this.U,f);d=!1!==h.call(l,c)&&d}}return d&&!1!=c.wc};
var Cb,Db,Eb,Fb,Gb,Hb,Ib;Ib=Hb=Gb=Fb=Eb=Db=Cb=!1;var Jb=Da;Jb&&(-1!=Jb.indexOf("Firefox")?Cb=!0:-1!=Jb.indexOf("Camino")?Db=!0:-1!=Jb.indexOf("iPhone")||-1!=Jb.indexOf("iPod")?Eb=!0:-1!=Jb.indexOf("iPad")?Fb=!0:-1!=Jb.indexOf("Chrome")?Hb=!0:-1!=Jb.indexOf("Android")?Gb=!0:-1!=Jb.indexOf("Safari")&&(Ib=!0));var Kb=Cb,Lb=Db,Ob=Eb,Pb=Fb,Qb=Gb,Rb=Hb,Sb=Ib;
var J=function(a){this.a=a};J.prototype.toString=function(){return this.a};var Tb=new J("b"),Ub=new J("c"),Vb=new J("h"),Wb=new J("k"),Xb=new J("G"),Yb=new J("M"),Zb=new J("N");var $b=new J("ea");var ac=function(a,b){for(var c=[],d=0;d<arguments.length;d++)c.push(arguments[d]||"");return c.join("_;_")},bc=function(){return 0<=navigator.userAgent.indexOf("CrOS")};var cc=function(a,b){this.e=a||"e";this.c=null!=a&&"p"==a?"e":"p";this.a=this.f=null;this.h=b||"u";this.b=this.t=null;this.g=[]};cc.prototype.message=function(){var a={};a.i=this.b;a.m=this.g;a.r=this.h;a.o=this.t;a.s=this.a;a.st=this.c;a.d=this.f;a.dt=this.e;return a};ga("ace.base.Message.prototype.message",cc.prototype.message);
var dc=function(a,b){for(var c in b)switch(c){case "r":a.h=b[c];break;case "i":a.b=b[c];break;case "m":a.g=b[c];break;case "o":a.t=b[c];break;case "s":a.a=b[c];break;case "d":a.f=b[c];break;case "st":a.c=b[c];break;case "dt":a.e=b[c]}return a},ec=function(a,b,c){null!=b&&(a.a=b,null!=c&&(a.c=c))},fc=function(a,b){null!=b&&(a.b=b)},gc=function(a,b){"object"==typeof b?a.g=b:a.g=[b]};cc.prototype.target=function(){return this.f};cc.prototype.content=function(){return this.g};
var hc=function(a,b,c,d,e){this.b=a;this.Ta=b;this.a=typeof b;this.Hb=c?c:!1;this.ba=!0;this.Cb=d?d:!1;this.vb=e?e:!1};q(hc,E);g=hc.prototype;g.l=function(){hc.q.l.call(this);this.b="";this.Ta=null;this.a=""};g.id=function(){return this.b};g.type=function(){return this.a};g.F=function(){return this.Ta};g.setEnabled=function(a){this.ba=a};
var ic=function(a){return(a=a.exec(Da))?a[1]:""},jc=function(){if(Kb)return ic(/Firefox\/([0-9.]+)/);if(D||La)return Ra;if(Rb)return ic(/Chrome\/([0-9.]+)/);if(Sb)return ic(/Version\/([0-9.]+)/);if(Ob||Pb){var a;if(a=/Version\/(\S+).*Mobile\/(\S+)/.exec(Da))return a[1]+"."+a[2]}else{if(Qb)return(a=ic(/Android\s+([0-9.]+)/))?a:ic(/Version\/([0-9.]+)/);if(Lb)return ic(/Camino\/([0-9.]+)/)}return""}();
var lc=function(a){this.a=new C;this.b=["https://talkgadget.google.com/talkgadget/notifier-js","","https://test.talkgadget.google.com/talkgadget/notifier-js?jsmode=debug_unobfuscated"];a&&kc(this,a)};q(lc,E);var mc=0<=oa(jc,"23.0.1262.0")&&!bc();lc.prototype.l=function(){lc.q.l.call(this);for(var a=this.a.M(),b=0;b<a.length;++b)F(this.a.get(a[b]));delete this.a};lc.prototype.getItem=function(a){return Ia(this.a.a,a)?this.a.get(a):null};lc.prototype.setItem=function(a){this.a.set(a.id(),a)}; var kc=function(a,b){for(var c in b){var d=b[c],e=null;Ia(a.a.a,c)?(e=a.a.get(c),e.Ta=d.value,d.changed&&(e.vb=d.changed)):(e=new hc(c,d.value,d.multiple,d.inverse,d.changed),e.setEnabled(!d.disabled));a.a.set(c,e)}};
var nc=function(a){k.setTimeout(function(){throw a;},0)},qc=function(a,b){var c=a;b&&(c=r(a,b));s(k.setImmediate)?k.setImmediate(c):(oc||(oc=pc()),oc(c))},oc,pc=function(){if(k.Promise&&k.Promise.resolve){var a=k.Promise.resolve();return function(b){a.then(function(){try{b()}catch(a){nc(a)}})}}var b=k.MessageChannel;"undefined"===typeof b&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&(b=function(){var a=document.createElement("iframe");a.style.display="none";a.src="";
document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d=b.location.protocol+"//"+b.location.host,a=r(function(a){if(a.origin==d||a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof b){var c=new b,d={},e=d;c.port1.onmessage=function(){d=d.next;var a=d.Yb;d.Yb=null;a()};return function(a){e.next=
{Yb:a};e=e.next;c.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("script")?function(a){var b=document.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){k.setTimeout(a,0)}};
var vc=function(a,b){rc||(qc(sc),rc=!0);tc.push(new uc(a,b))},rc=!1,tc=[],sc=function(){for(;tc.length;){var a=tc;tc=[];for(var b=0;b<a.length;b++){var c=a[b];try{c.a.call(c.b)}catch(d){nc(d)}}}rc=!1},uc=function(a,b){this.a=a;this.b=b};var wc=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0},xc=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};var zc=function(a,b){this.b=0;this.g=void 0;this.a=this.c=null;this.e=this.f=!1;try{var c=this;a.call(b,function(a){yc(c,2,a)},function(a){yc(c,3,a)})}catch(d){yc(this,3,d)}},Bc=function(){var a,b=new zc(function(b){a=b});return new Ac(b,a)};zc.prototype.then=function(a,b,c){return Cc(this,s(a)?a:null,s(b)?b:null,c)};wc(zc);
var Fc=function(a){0==a.b&&vc(function(){var a=new Dc(void 0);Ec(this,a)},a)},Ec=function(a,b){if(0==a.b)if(a.c){var c=a.c;if(c.a){for(var d=0,e=-1,f=0,h;h=c.a[f];f++)if(h=h.Za)if(d++,h==a&&(e=f),0<=e&&1<d)break;0<=e&&(0==c.b&&1==d?Ec(c,b):(d=c.a.splice(e,1)[0],Gc(c,d,3,b)))}}else yc(a,3,b)},Ic=function(a,b){a.a&&a.a.length||2!=a.b&&3!=a.b||Hc(a);a.a||(a.a=[]);a.a.push(b)},Cc=function(a,b,c,d){var e={Za:null,qc:null,sc:null};e.Za=new zc(function(a,h){e.qc=b?function(c){try{var e=b.call(d,c);a(e)}catch(B){h(B)}}:
a;e.sc=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof Dc?h(b):a(e)}catch(B){h(B)}}:h});e.Za.c=a;Ic(a,e);return e.Za};zc.prototype.t=function(a){this.b=0;yc(this,2,a)};zc.prototype.h=function(a){this.b=0;yc(this,3,a)};
var yc=function(a,b,c){if(0==a.b){if(a==c)b=3,c=new TypeError("Promise cannot resolve to itself");else{if(xc(c)){a.b=1;c.then(a.t,a.h,a);return}if(ha(c))try{var d=c.then;if(s(d)){Jc(a,c,d);return}}catch(e){b=3,c=e}}a.g=c;a.b=b;Hc(a);3!=b||c instanceof Dc||Kc(a,c)}},Jc=function(a,b,c){a.b=1;var d=!1,e=function(b){d||(d=!0,a.t(b))},f=function(b){d||(d=!0,a.h(b))};try{c.call(b,e,f)}catch(h){f(h)}},Hc=function(a){a.f||(a.f=!0,vc(a.j,a))};
zc.prototype.j=function(){for(;this.a&&this.a.length;){var a=this.a;this.a=[];for(var b=0;b<a.length;b++)Gc(this,a[b],this.b,this.g)}this.f=!1};var Gc=function(a,b,c,d){if(2==c)b.qc(d);else{for(;a&&a.e;a=a.c)a.e=!1;b.sc(d)}},Kc=function(a,b){a.e=!0;vc(function(){a.e&&Lc.call(null,b)})},Lc=nc,Dc=function(a){ma.call(this,a)};q(Dc,ma);Dc.prototype.name="cancel";var Ac=function(a,b){this.b=a;this.a=b};
var Oc=function(){this.c=new C;this.a=null;this.b=!1;this.a=new Mc;this.b=!0;Nc(this)};Oc.va=function(){return Oc.a?Oc.a:Oc.a=new Oc};var Nc=function(a,b){var c=b||ka;a.b?c():chrome.storage.local.get(r(function(a){if(!this.b){for(var b in a)this.c.set(b,a[b]);this.b=!0}c()},a))};Oc.prototype.get=function(a){return this.a.get(a)};Oc.prototype.set=function(a,b){var c=Bc();this.a.set(a,b);c.a(void 0);return c.b};Oc.prototype.remove=function(a){this.a.remove(a)};Oc.prototype.clear=function(){this.a.clear()};
var Mc=function(){this.a=window.localStorage};Mc.prototype.clear=function(){this.a.clear()};Mc.prototype.get=function(a){a=this.a.getItem(a);if(a){var b=JSON.parse(a);a=b.data;if("jspb"==b.type){b=Aa[a[0]];if(!b)throw Error("e`"+a[0]);a=new b(a)}}else a=null;return a};Mc.prototype.set=function(a,b){var c=null;b instanceof x&&(b=b.G,c="jspb");var d={};d.data=b;d.timestamp=m();c&&(d.type=c);c=JSON.stringify(d);try{this.a.setItem(a,c)}catch(e){}};Mc.prototype.remove=function(a){try{this.a.removeItem(a)}catch(b){}};
var Pc=function(a,b){this.b=a;this.a=b;this.constructor.Wb||(this.constructor.Wb={});this.constructor.Wb[this.toString()]=this};Pc.prototype.toString=function(){this.c||(this.c=this.b.a+":"+this.a);return this.c};var L=function(a,b){Pc.call(this,a,b)};q(L,Pc);var Qc=function(a){this.a=a},Rc=new Qc("lib");/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
var Sc=function(a,b){this.e=[];this.u=b||null;this.b=this.a=!1;this.c=void 0;this.k=this.n=this.g=!1;this.f=0;this.h=null;this.p=0};Sc.prototype.j=function(a,b){this.g=!1;Tc(this,a,b)};var Tc=function(a,b,c){a.a=!0;a.c=c;a.b=!b;Uc(a)},Wc=function(a){if(a.a){if(!a.k)throw new Vc;a.k=!1}};Sc.prototype.t=function(a){Wc(this);Tc(this,!0,a)};var Xc=function(a,b,c,d){a.e.push([b,c,d]);a.a&&Uc(a)};
Sc.prototype.then=function(a,b,c){var d,e,f=new zc(function(a,b){d=a;e=b});Xc(this,d,function(a){"undefined"!=typeof Yc&&a instanceof Yc?Fc(f):e(a)});return f.then(a,b,c)};wc(Sc);
var Zc=function(a){return ua(a.e,function(a){return s(a[1])})},Uc=function(a){if(a.f&&a.a&&Zc(a)){var b=a.f,c=$c[b];c&&(k.clearTimeout(c.ab),delete $c[b]);a.f=0}a.h&&(a.h.p--,delete a.h);for(var b=a.c,d=c=!1;a.e.length&&!a.g;){var e=a.e.shift(),f=e[0],h=e[1],e=e[2];if(f=a.b?h:f)try{var l=f.call(e||a.u,b);p(l)&&(a.b=a.b&&(l==b||l instanceof Error),a.c=b=l);xc(b)&&(d=!0,a.g=!0)}catch(n){b=n,a.b=!0,Zc(a)||(c=!0)}}a.c=b;d&&(l=r(a.j,a,!0),d=r(a.j,a,!1),b instanceof Sc?(Xc(b,l,d),b.n=!0):b.then(l,d));c&&
(b=new ad(b),$c[b.ab]=b,a.f=b.ab)},Vc=function(){ma.call(this)};q(Vc,ma);Vc.prototype.message="Deferred has already fired";Vc.prototype.name="AlreadyCalledError";var ad=function(a){this.ab=k.setTimeout(r(this.b,this),0);this.a=a};ad.prototype.b=function(){delete $c[this.ab];throw this.a;};var $c={};

}catch(e){_DumpException(e)}
try{
var bd=function(){return chrome.runtime.getURL("feedbackdialog.html")},cd=function(a,b){for(var c=t(a)?a.split(""):a,d=a.length-1;0<=d;--d)d in c&&b.call(void 0,c[d],d,a)};var ed=function(a){this.c={};this.h={};this.j={};this.e={};this.k={};this.p={};this.n=a?a.ua():new I;this.w=!a;this.f=null;a?(this.f=a,this.j=a.j,this.e=a.e,this.h=a.h,this.k=a.k):m();a=dd(this);this!=a&&(a.g?a.g.push(this):a.g=[this])};q(ed,E);var dd=function(a){for(;a.f;)a=a.f;return a};ed.prototype.get=function(a){var b=this.b(a);if(null==b)throw new fd(a);return b};
ed.prototype.b=function(a){for(var b=this;b;b=b.f){if(b.D)throw Error("o");if(b.c[a])return b.c[a][0];if(b.p[a])break}if(b=this.j[a]){b=b(this);if(null==b)throw Error("p`"+a);this.a(a,b);return b}return null};ed.prototype.a=function(a,b,c){if(this.D)c||F(b);else{this.c[a]=[b,!c];b=gd(this,this,a);for(c=0;c<b.length;c++)b[c].t(null);delete this.h[a]}};ed.prototype.u=function(){var a=hd;if(!this.c[a])throw Error("q`"+a);var b=this.c[a];delete this.c[a];b[1]&&F(b[0])};
var gd=function(a,b,c){var d=[],e=a.e[c];e&&(cd(e,function(a){var c;t:{for(c=a.Xb;c;){if(c==b){c=!0;break t}c=c.f}c=!1}c&&(d.push(a.Kd),va(e,a))}),0==e.length&&delete a.e[c]);return d},id=function(a,b){a.e&&Ka(a.e,function(a,d,e){cd(a,function(d){d.Xb==b&&va(a,d)});0==a.length&&delete e[d]})};
ed.prototype.l=function(){if(dd(this)==this){var a=this.g;if(a)for(;a.length;)a[0].B()}else for(var a=dd(this).g,b=0;b<a.length;b++)if(a[b]==this){a.splice(b,1);break}for(var c in this.c)a=this.c[c],a[1]&&"undefined"!=typeof a[0].B&&a[0].B();this.c=null;this.w&&this.n.B();id(this,this);this.e=null;F(this.v);this.p=this.v=null;ed.q.l.call(this)};ed.prototype.ua=function(){return this.n};var fd=function(a){ma.call(this);this.id=a;this.message='Service for "'+a+'" is not registered'};q(fd,ma); var jd=new Qc("fva");new L(jd,1);

}catch(e){_DumpException(e)}
try{
var Mg=function(a){for(var b=a.a.M(),c={},d=0;d<b.length;d++){var e=b[d],f=a.a.get(e);c[e]={value:f.F(),type:f.type(),multiple:f.Hb,disabled:!f.ba,inverse:f.Cb,changed:f.vb}}return c},Ng=function(a,b){return t(b)?a.getElementById(b):b},Q=function(a){return Ng(document,a)},S=function(a){var b;b=b||[];b.length||(b[0]="");var c=chrome.i18n.getMessage(a,b);if(c)return c;(c=(c=k.ace_i18n[a.toLowerCase()])?c.message:k.ace_i18n["MSG_"+a])&&(c=c.replace("$1",b[0]).replace("$2",b[1]).replace("$3",b[2]));return c};

}catch(e){_DumpException(e)}
try{
var zm=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},Am=function(){var a=Q("fieldsetDestPage");a&&a.parentNode&&a.parentNode.removeChild(a)},Bm=function(a){this.e=ac("setting",""+m());this.c=null;this.b=new H;this.a=new C;this.f=a.get($b);this.b.listen(window,"unload",this.B)};q(Bm,E);ga("ace.ui.SettingsDialog",Bm);ga("ace.ui.SettingsDialog",Bm);
Bm.prototype.h=function(){document.title=S("CHROME_EXT_SHORT_NAME");this.c=chrome.runtime.connect({name:this.e});var a=this;this.c.onMessage.addListener(function(b){switch(dc(new cc,b).b){case "focus":Cm(a);a.sendMessage("extensionLibrary",["selectTab",a.e,!0,!0]);window.focus();break;case "close":a.g()}});this.a.set("StartOnBrowserLaunch",["BrowserStartup",1]);this.a.set("StopOnBrowserClose",["Shutdown",1]);this.a.set("TopMost",["TopMost",1]);this.a.set("TrayIcon",["TrayIcon",1]);Am();Dm("legendApp",
S("QUASAR_LEGEND_STARTUP_SHUTDOWN"));Dm("legendNotice",S("QUASAR_LEGEND_NOTIFICATIONS"));Em(this,"StartOnBrowserLaunch",S("CHROME_EXT_RUN_AT_BROWSER_START"));Em(this,"StopOnBrowserClose",S("CHROME_EXT_RUN_AFTER_BROWSER_CLOSE"));Em(this,"TrayIcon",S("QUASAR_LABEL_TRAY_ICON"));mc?Em(this,"TopMost",S("CHROME_EXT_NEW_WINDOWS_TOPMOST")):Fm(this,"TopMost");bc()&&Fm(this,"TrayIcon");Cm(this);var b=Q("feedbackLink");b.innerText=S("CHROME_EXT_MENUTEXT_FEEDBACK");b.href=bd();b=Q("helpLink");b.innerText=S("QUASAR_HELP");
b.href=zm("https://support.google.com/hangouts?p=help&hl=%s",chrome.i18n.getMessage("@@ui_locale"));this.k=Q("buttonSave");this.k.innerText=S("QUASAR_BUTTON_SAVE");this.b.listen(this.k,"click",r(this.n,this),!1);this.j=Q("buttonCancel");this.j.innerText=S("QUASAR_BUTTON_CANCEL");this.b.listen(this.j,"click",r(this.g,this),!1)};Bm.prototype.init=Bm.prototype.h;Bm.prototype.l=function(){Bm.q.l.call(this);F(this.b)};
var Gm=function(a,b,c){var d=[];b=b+a.a.get(c)[0];a=a.a.get(c)[1];if(1<a)for(c=0;c<a;c++)d.push(Q(b+c));else d.push(Q(b));return d},Cm=function(a){for(var b=new lc(a.f.get("settings")),c=a.a.M(),d=0;d<c.length;d++){var e=b.getItem(c[d]);if(e){var f=Gm(a,"field",c[d]);if(e.Hb){var h=e.F();0<=h&&f[h]&&(f[h].checked=!0)}else f[0]&&("boolean"==e.a?e.Cb?f[0].checked=!e.F():f[0].checked=e.F():f[0].value=e.F());if(!e.ba)for(e=Gm(a,"label",c[d]),h=0;h<e.length;h++)e[h]&&(e[h].disabled=!0),f[h]&&(f[h].disabled=
!0)}}},Dm=function(a,b){var c=Q(a);c&&(c.innerText=b)},Em=function(a,b,c){var d=a.a.get(b)[0];a=a.a.get(b)[1];if(1<a)for(b=0;b<a;b++){var e=Q("label"+d+b);e&&c&&(e.innerText=c[b])}else(e=Q("label"+d))&&c&&(e.innerText=c)},Fm=function(a,b){var c=a.a.get(b)[0],d=Q("field"+c);(d=(c=(c=Q("label"+c)||d)&&c.parentNode)&&c.parentNode)&&d.removeChild(c)};
Bm.prototype.n=function(){for(var a=new lc(this.f.get("settings")),b=this.a.M(),c=0;c<b.length;c++){var d=a.getItem(b[c]);if(d){var e=Gm(this,"field",b[c]),f=d.F();if(d.Hb){for(var h=-1,l=0;l<e.length;l++)if(e[l]&&e[l].checked){h=l;break}-1==h&&(h=0);d.Ta=h}else e[0]&&(d.Ta="boolean"==d.a?d.Cb?!e[0].checked:e[0].checked:e[0].value);f!=d.F()&&(d.vb=!0,a.setItem(d))}}this.f.set("settings",Mg(a));this.g()};Bm.prototype.g=function(){this.sendMessage("settingsManager",["updateSettingsFromStorage"]);window.close()}; Bm.prototype.sendMessage=function(a,b,c){c=c?c:""+m();var d=new cc;ec(d,this.e,"p");null!=a&&(d.t=a);fc(d,c);gc(d,b);this.c&&this.c.postMessage(d.message())};
window.addEventListener("load",function(){Nc(Oc.va(),function(){var a=new ed;a.a($b,Oc.va());(new Bm(a)).h()})},!1);
}catch(e){_DumpException(e)}
// Google Inc.