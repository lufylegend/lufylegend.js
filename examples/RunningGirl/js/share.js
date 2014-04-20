function share(sType){
	var sName = "Running Girl";
	var  title='lufy\' legend',
    _wset = 800, 
    _hset = 480, 
    _w = 800, 
    _h = 480, 
    _strGamePic="http://lufylegend.com/demo/RunningGirl/images/logo.png";
    
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
	l = "http://lufylegend.com/demo/RunningGirl/";
	var t=sName;
	var s=screen;
	var sImgUrl=_strGamePic;
	var sContent=['「',sName,'」走り、跳び、可愛子と一緒にチャレンジしましょう！'].join('');
	var sUrl='';
	var w=600;
	var h=500;
	if (sType=='xlwb')
	{
		sUrl=['http://v.t.sina.com.cn/share/share.php?c=&url=',en(l),'&title=',en(sContent),'&content=utf8&pic=',en(sImgUrl)].join('');
		w=610;
		h=570;
	}
	else if (sType=='txwb')
	{
		sUrl=['http://v.t.qq.com/share/share.php?site=',en('lufylegend.com'),'&url=',en(l),'&title=',en(sContent),'&pic=',en(sImgUrl)].join('');
		w=700;
		h=470;
	}
	else if (sType=='twitter')
	{
		sUrl=['https://twitter.com/intent/tweet?original_referer=',en('lufylegend.com'),'&url=',en(l),'&text=',en(sContent),'&pic=',en(sImgUrl)].join('');
		w=700;
		h=470;
	}
	else if (sType=='facebook')
	{
		sUrl=['http://www.facebook.com/share.php?u=',l,'&description=',en(sContent),'&pic=',en(sImgUrl)].join('');
		/*<a href="http://www.facebook.com/share.php?u=http://sp.hapitas.jp/items/view/49502" 
		 * onclick="window.open(this.href, 'facebookwindow', 'width=550', height=450', personalbar=0, toolbar=0, scrollbars=1, resizable=1); return false;" 
		 * class="contrary-link review-facebook ui-link" data-ajax="false">シェア</a>*/
		w=700;
		h=470;
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