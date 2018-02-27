import BaseController from '../core/controllers/BaseController';
export default ll.LClass(BaseController, 'LogoController', {
	testName:"aabbcc",
	init:function(){
		console.error('LogoController init start');
		this.dispatcher = this.dispatcher || {};
		this.callParent("init",arguments);
		this.graphics.drawRect(2, "#ff0000", [10, 10, 50, 50], true, "#ff0000");
		this.dispatcher.username = 'abcdefghigklmn';
		console.error('LogoController init over', this.dispatcher);
	}
});