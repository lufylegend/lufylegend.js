function share(sType){
	var sName = "GemGem";
	var  title='lufy\' legend',
    _wset = 800, 
    _hset = 480, 
    _w = 800, 
    _h = 480, 
    _strGamePic="http://lufylegend.com/lufylegend_blog_img/jpg/17.jpg";
    
	var en=encodeURIComponent;
	var l=document.location.href;
	l = l.replace(/_\d{1,}\.htm/,".htm",l);
	if (l.indexOf('#')>0){
		l = l.substring(0, l.indexOf('#'));
	}
	var i = l.indexOf("/",8);
	var strHost = l.substring(0,i);
	if (strHost!="http://lufylegend.com"){
		l = "http://lufylegend.com" + l.substr(i);
	}

	var t=sName;
	var s=screen;
	var sImgUrl=_strGamePic;
	var sContent=['这是一个类似对对碰的小游戏【',sName,'】,你能得多少分呢？现在就来挑战一下吧！'].join('');
	var sUrl='';
	var w=600;
	var h=500;
	var statFlag='';
	if (sType=='xlwb')
	{
		sUrl=['http://v.t.sina.com.cn/share/share.php?c=&url=',en(l),'&title=',en(sContent),'&content=utf8&pic=',en(sImgUrl)].join('');
		w=610;
		h=570;
		statFlag='tsina';
	}
	else if (sType=='txwb')
	{
		sUrl=['http://v.t.qq.com/share/share.php?site=',en('lufylegend.com'),'&url=',en(l),'&title=',en(sContent),'&pic=',en(sImgUrl)].join('');
		w=700;
		h=470;
		statFlag='tqq';
	}
	else if (sType=='twitter')
	{
		sUrl=['https://twitter.com/intent/tweet?original_referer=',en('lufylegend.com'),'&url=',en(l),'&text=',en(sContent),'&pic=',en(sImgUrl)].join('');
		w=700;
		h=470;
		statFlag='tqq';
	}
	else if (sType=='facebook')
	{
		sUrl=['http://www.facebook.com/share.php?u=',en(l),'&description=',en(sContent),'&pic=',en(sImgUrl)].join('');
		w=700;
		h=470;
		statFlag='tqq';
	}
	
	x=function()
	{
		if(!window.open(sUrl, sType, ['toolbar=0,resizable=1,status=0,width=',w,',height=',h,',left=',(s.width-w)/2,',top=',(s.height-h)/2].join('')))
		{
			location.href=sUrl;
		}
	}
	if(/Firefox/.test(navigator.userAgent)){setTimeout(x,0);}else{x();}

}