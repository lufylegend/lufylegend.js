import BaseController from '../core/controllers/BaseController';
export default ll.LClass(BaseController, 'LogoController', {
	testName:"aabbcc",
	onLoad(){
		this.graphics.drawRect(2, "#ff0000", [10, 10, 50, 50], true, "#ff0000");
		this.dispatcher.username = 'abcdefghigklmn';
		this.dispatcher.avatar = '12';
	}
});