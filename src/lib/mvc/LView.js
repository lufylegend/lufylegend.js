/** @language chinese
 * <p>视图View</p>
 * <p>视图是一个LSprite的子对象。视图必须放到Views文件夹内，视图的名字以View结尾。</p>
 * <p>控制器Controller一共继承自两个类LMvcObject，LSprite，所以除了可以使用LMvcObject的函数之外，还拥有LSprite类addChild等所有属性和函数，所以LView是一个可视化的类。</p>
 * <p>※由于视图View的construct函数是在控制器Controller的construct函数之后执行，所以View中使用控制器的一些属性或者从控制器传来值的时候，是无法在construct中使用的，那么一般可以给控制器Controller添加LEvent.COMPLETE事件，像下面的demo一样这么做。</p>
 * @class LView
 * @extends LMvcObject
 * @constructor
 * @since 1.8.4
 * @example
 *	//控制器中代码
 *	ExampleController.prototype.construct = function(){
 *		//在控制器的construct中读取必要的素材和类，比如下面读取几个模型，然后回调modelLoadComplete
 *		this.load.model(["User/User","User/Character"],this.modelLoadComplete);
 *	}
 *	ExampleController.prototype.modelLoadComplete = function(){
 *		//通知视图，控制器准备工作已经结束
 *		this.dispatchEvent(LEvent.COMPLETE);
 *		//给控制器添加一个值，然后通知视图，这样视图中就可以使用它
 *		this.setValue("myname","testName");
 *		this.dispatchEvent(LController.NOTIFY);
 *	}
 *	//视图中代码
 *	ExampleView.prototype.construct = function(){
 *		//在视图的construct中给控制器添加LEvent.COMPLETE事件
 *		this.controller.addEventListener(LEvent.COMPLETE, this.init.bind(this));
 *	}
 *	ExampleView.prototype.init = function(){
 *		//等待控制器准备工作结束后执行
 *		this.txtName = new LTextField();
 *		this.x = 100;
 *		this.y = 100;
 *		this.addChild(this.txtName);
 *	}
 *	ExampleView.prototype.updateView = function(){
 *		//将控制器中添加的值赋给this.txtName
 *		this.txtName.text = this.controller.getValue("myname");
 *		trace(this.txtName.text);//out: testName
 *	}
 * @public
 */
var LView = (function() {
	function LView(controller){
		var self = this;
		base(self,LMvcObject,[]);
		base(self,LSprite,[]);
		self.mvcType = "view";
		if (controller) {
			/** @language chinese
			 * 视图的控制器。
			 * @property controller
			 * @type LController
			 * @since 1.8.4
			 * @public
			 */
			self.controller = controller;
			/** @language chinese
			 * 视图的模型。
			 * @property model
			 * @type LModel
			 * @since 1.8.4
			 * @public
			 */
			self.model = controller.model;
			self.controller.addView(self);
		}
	}
	LView.prototype.die = function(){
		var self = this;
		if (self.controller) {
			self.controller.removeView(self);
		}
		if(self.baseView){
			self.controller.ll_dispatcher = {};
			self.controller.ll_viewList = [];
		}
		self.callParent("die",arguments);
	};
	/** @language chinese
	 * 在自己控制器发送LController.NOTIFY消息的时候，则自动调用自己的updateView函数
	 * @method updateView
	 * @since 1.8.4
	 * @example
	 *	//控制器中代码
	 *	ExampleController.prototype.construct = function(){
	 *		this.setValue("myname","testName");
	 *		this.dispatchEvent(LController.NOTIFY);
	 *	}
	 *	//视图中代码
	 *	ExampleView.prototype.updateView = function(){
	 *		trace(this.controller.getValue("myname"));//out: testName
	 *	}
	 * @public
	 */
	LView.prototype.updateView = function(){};
	return LView;
})();
