function $Ajax(){}
$Ajax.prototype = {
	get:function(url, data, oncomplete,onerror){
		this.getRequest("GET",url, data, oncomplete,onerror);
	},
	post:function(url, data, oncomplete,onerror){
		this.getRequest("POST",url, data, oncomplete,onerror);
	},
	getRequest:function(t,url, d, oncomplete,err){
		var s = this,k,data="",a="";
		s.err = err;
		var ajax = s.getHttp();
		if (!ajax)return;
		if(d){
			for(k in d){
				data += (a+k+"="+d[k]);
				a="&";	
			}
		}
		if(t.toLowerCase() == "get"){
			url += ((url.indexOf('?')>=0?'&':'?')+data);
			data = null;
		}
		ajax.open(t, url, true);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.onreadystatechange = function(){
			if (ajax.readyState == 4){
				if(ajax.status >= 200 && ajax.status < 300 || ajax.status === 304){
					if (ajax.responseText.length > 0){
						oncomplete(ajax.responseText);
					}else{
						oncomplete(null);
					}
				}else{
					if(err)err(ajax);
				}
	 		}
		};
		ajax.send(data);
	},
	getHttp:function(){
		if (typeof XMLHttpRequest != UNDEFINED){
			return new XMLHttpRequest();
		}  
		try{
			return new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e){
			try{
				return new ActiveXObject("Microsoft.XMLHTTP");
			}catch (e) {
				if(!this.err)this.err(e);
			}
		}
		return false;
	}
};