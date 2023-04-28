var tabdropdown=
{
	disappeardelay:200,disablemenuclick:true,enableiframeshim:1,dropmenuobj:null,ie:document.all,firefox:document.getElementById&&!document.all,previousmenuitem:null,currentpageurl:window.location.href.replace("http://"+window.location.hostname,"").replace(/^\//,""),getposOffset:function(what,offsettype){var totaloffset=(offsettype=="left")?what.offsetLeft:what.offsetTop;var parentEl=what.offsetParent;while(parentEl!=null)
	{totaloffset=(offsettype=="left")?totaloffset+parentEl.offsetLeft:totaloffset+parentEl.offsetTop;parentEl=parentEl.offsetParent;}
return totaloffset;
},
showhide:function(obj,e,obj2){if(this.ie||this.firefox)
	this.dropmenuobj.style.left=this.dropmenuobj.style.top="-500px"
	if(e.type=="click"&&obj.visibility==hidden||e.type=="mouseover")
		{
			if(obj2.parentNode.className.indexOf("default")==-1)
			obj2.parentNode.className="selected"
			obj.visibility="visible"
		}
	else if(e.type=="click")
		obj.visibility="hidden"
	},
iecompattest:function()
{
	return(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body
},
clearbrowseredge:function(obj,whichedge)
{
	var edgeoffset=0
	if(whichedge=="rightedge")
	{
		var windowedge=this.ie&&!window.opera?this.standardbody.scrollLeft+this.standardbody.clientWidth-15:window.pageXOffset+window.innerWidth-15
		this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetWidth
		if(windowedge-this.dropmenuobj.x<this.dropmenuobj.contentmeasure)
		edgeoffset=this.dropmenuobj.contentmeasure-obj.offsetWidth
	}
	else
	{
		var topedge=this.ie&&!window.opera?this.standardbody.scrollTop:window.pageYOffset
		var windowedge=this.ie&&!window.opera?this.standardbody.scrollTop+this.standardbody.clientHeight-15:window.pageYOffset+window.innerHeight-18
		this.dropmenuobj.contentmeasure=this.dropmenuobj.offsetHeight
		if(windowedge-this.dropmenuobj.y<this.dropmenuobj.contentmeasure)
		{
			edgeoffset=this.dropmenuobj.contentmeasure+obj.offsetHeight
			if((this.dropmenuobj.y-topedge)<this.dropmenuobj.contentmeasure)
			edgeoffset=this.dropmenuobj.y+obj.offsetHeight-topedge
		}
		this.dropmenuobj.firstlink.style.borderTopWidth=(edgeoffset==0)?0:"1px"
	}
	return edgeoffset
},
dropit:function(obj,e,dropmenuID)
{
	if(this.dropmenuobj!=null)
	{
		this.dropmenuobj.style.visibility="hidden"
		if(this.previousmenuitem!=null&&this.previousmenuitem!=obj)
		{
			if(this.previousmenuitem.parentNode.className.indexOf("default")==-1)
			this.previousmenuitem.parentNode.className=""}
		}
		this.clearhidemenu()
		if(this.ie||this.firefox)
		{
			obj.onmouseout=function()
			{
				tabdropdown.delayhidemenu(obj)
			}
			obj.onclick=function()
			{
				return!tabdropdown.disablemenuclick
			}
			this.dropmenuobj=document.getElementById(dropmenuID)
			this.dropmenuobj.onmouseover=function(){tabdropdown.clearhidemenu()
		}
		this.dropmenuobj.onmouseout=function(e)
		{
			tabdropdown.dynamichide(e,obj)
		}
		this.dropmenuobj.onclick=function()
		{
			tabdropdown.delayhidemenu(obj)
		}
		this.showhide(this.dropmenuobj.style,e,obj)
		this.dropmenuobj.x=this.getposOffset(obj,"left")
		this.dropmenuobj.y=this.getposOffset(obj,"top")
		this.dropmenuobj.style.left=this.dropmenuobj.x-this.clearbrowseredge(obj,"rightedge")+"px"
		this.dropmenuobj.style.top=this.dropmenuobj.y-this.clearbrowseredge(obj,"bottomedge")+obj.offsetHeight+1+"px"
		this.previousmenuitem=obj
		this.positionshim()
	}
},
contains_firefox:function(a,b)
{
	while(b.parentNode)
		if((b=b.parentNode)==a)
		return true;return false;
},
dynamichide:function(e,obj2)
{
	var evtobj=window.event?window.event:e
	if(this.ie&&!this.dropmenuobj.contains(evtobj.toElement))
		this.delayhidemenu(obj2)
	else if(this.firefox&&e.currentTarget!=evtobj.relatedTarget&&!this.contains_firefox(evtobj.currentTarget,evtobj.relatedTarget))
	this.delayhidemenu(obj2)
},
delayhidemenu:function(obj2)
{
	this.delayhide=setTimeout(function()
	{
		tabdropdown.dropmenuobj.style.visibility='hidden';if(obj2.parentNode.className.indexOf('default')==-1)obj2.parentNode.className=''
	},
	this.disappeardelay)
},
clearhidemenu:function()
{
	if(this.delayhide!="undefined")
		clearTimeout(this.delayhide)
},
positionshim:function()
{
	if(this.enableiframeshim&&typeof this.shimobject!="undefined")
	{
		if(this.dropmenuobj.style.visibility=="visible")
		{
			this.shimobject.style.width=this.dropmenuobj.offsetWidth+"px"
			this.shimobject.style.height=this.dropmenuobj.offsetHeight+"px"
			this.shimobject.style.left=this.dropmenuobj.style.left
			this.shimobject.style.top=this.dropmenuobj.style.top
		}
		this.shimobject.style.display=(this.dropmenuobj.style.visibility=="visible")?"block":"none"
	}
},
hideshim:function()
{
	if(this.enableiframeshim&&typeof this.shimobject!="undefined")
		this.shimobject.style.display='none'
},
isSelected:function(menuurl)
{
	var menuurl=menuurl.replace("http://"+menuurl.hostname,"").replace(/^\//,"")
	return(tabdropdown.currentpageurl==menuurl)
},
init:function(menuid,dselected)
{
	this.standardbody=(document.compatMode=="CSS1Compat")?document.documentElement:document.body
	var menuitems=document.getElementById(menuid).getElementsByTagName("a")
	for(var i=0;i<menuitems.length;i++)
	{
		if(menuitems[i].getAttribute("rel"))
		{
			var relvalue=menuitems[i].getAttribute("rel")
			document.getElementById(relvalue).firstlink=document.getElementById(relvalue).getElementsByTagName("a")[0]
			menuitems[i].onmouseover=function(e)
			{
				var event=typeof e!="undefined"?e:window.event
				tabdropdown.dropit(this,event,this.getAttribute("rel"))
			}
		}
		if(dselected=="auto"&&typeof setalready=="undefined"&&this.isSelected(menuitems[i].href))
		{
			menuitems[i].parentNode.className+=" selected default"
			var setalready=true
		}
		else if(parseInt(dselected)==i)
			menuitems[i].parentNode.className+=" selected default"
		}
	}
}