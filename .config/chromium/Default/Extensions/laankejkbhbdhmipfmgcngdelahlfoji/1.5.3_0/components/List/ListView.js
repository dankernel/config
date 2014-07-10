define(["core/Logger","core/CoreAPI","core/vendor/jquery.min","core/vendor/Brightline.min","core/vendor/text!components/List/list.tpl"],function(Logger,API,$,Brightline,listTpl){return API.Class.create({model:null,rendered:!1,init:function(){this.addListeners()},isRendered:function(){return this.rendered===!0},setJQuery:function(jQuery){$=jQuery||$},inject:function($container){$container=$container||$("body"),$container.html(this.render()),this.bindUIHandlers()},render:function(tpl){tpl=tpl||"";var template=new Brightline(tpl);return template.set("list",this.renderList()),this.rendered=!0,template.render()},renderList:function(imgClass){imgClass=imgClass||"";var template=new Brightline(listTpl),list=this.model.get();if(0===list.length)template.set("noSitesYet",API.Chrome.Translation.get("noSitesYet"));else for(var i=0;i<list.length;i++)template.set("id",this.getInstanceName()+"-"+i),template.set("imgClass",imgClass),template.set("removeFromList",API.Chrome.Translation.get("removeFromList")),template.set("domain",list[i]),template.parse("removeDomain");return template.render()},refreshList:function($listContainer,$listTextarea){$listContainer.html(this.renderList()),$listTextarea.val(""),this.bindListUIHandlers()},bindUIHandlers:function(){this.bindListUIHandlers()},bindListUIHandlers:function(){for(var list=this.model.get(),self=this,i=0;i<list.length;i++)!function(domain,id){$("#"+id+" img").click(function(){API.PubSub.publish(self.getClassName()+".domain.remove."+self.model.descriptor,{domain:domain})})}(list[i],this.getInstanceName()+"-"+i)},addListeners:function(){var self=this;API.PubSub.listen("*.list.loaded."+this.model.descriptor,function(){self.isRendered()&&self.refreshList()})},getNewDomains:function(newDomains){newDomains=newDomains||"";var finalList=[];if(""!==newDomains)for(var newDomainsArray=newDomains.split("\n"),i=0;i<newDomainsArray.length;i++){var domain=newDomainsArray[i];domain.length>0&&finalList.push(domain)}return finalList}})});