chrome.extension.sendRequest({action:"blacklist",url:document.location.href},function(b){
                              if(b.ua_string&&b.ua_string!=""){
                                document.addEventListener("beforeload", function(e){
                                  var d=new function(){};
                                  var c;
                                  var old_navigator = window.navigator;
                                  for(c in navigator){
                                    if (typeof navigator[c] == "function")
                                      d[c] = function() { return old_navigator[c](); };
                                    else
                                      d[c]=navigator[c]
                                  }
                                  d.userAgent=(b.append_to_default_ua?navigator.userAgent+" "+b.ua_string:b.ua_string);
                                  d.vendor=b.vendor;
                                  if(b.platform){
                                    d.platform=b.platform;
                                  }
                                  window.navigator=d
                                },true);
                                var a=document.createElement("script");
                                a.type="text/javascript";
                                a.innerText+="var new_nav = new function() {};";
                                a.innerText+="var x;";
                                a.innerText+="var old_navigator = window.navigator;";
                                a.innerText+="for (x in navigator) {";
                                a.innerText+="if (typeof navigator[x] == 'function') {";
                                a.innerText+='eval("new_nav." + x + " = function() { return old_navigator." + x + "();};");';
                                a.innerText+="} else {"
                                a.innerText+='eval("new_nav." + x + " = navigator." + x + ";");';
                                a.innerText+="}}";  
                                a.innerText+='new_nav.userAgent = "'+(b.append_to_default_ua?navigator.userAgent+" "+b.ua_string:b.ua_string)+'";';
                                a.innerText+='new_nav.vendor = "'+b.vendor+'";';
                                if(b.platform){
                                  a.innerText+='new_nav.platform = "'+b.platform+'";'
                                }
                                a.innerText+="window.navigator = new_nav;";
                                document.documentElement.insertBefore(a)
                              }
                            });