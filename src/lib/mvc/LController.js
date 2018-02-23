/** @language chinese
 * <p>控制器Controller</p>
 * <p>简而言之，一个控制器就是一个类文件。控制器必须放到Controllers文件夹内，控制器的名字以Controller结尾。
在控制器中，可以使用 this.model 来调用它的模型，使用 this.view 来调用它的视图。</p>
 * <p>控制器Controller一共继承自两个类LMvcObject，LEventDispatcher，所以除了可以使用LMvcObject的函数之外，还拥有LEventDispatcher类所有属性和函数。</p>
 * @class LController
 * @extends LMvcObject
 * @constructor
 * @since 1.8.4
 * @public
 */
var LController = (function() {
	function LController(){
		var self = this;
		self.mvcType = "controller";
		base(self,LMvcObject,[]);
		base(self,LEventDispatcher,[]);
		self.ll_viewList = [];
		self.ll_dispatcher = {};
		self.addEventListener(LController.NOTIFY,self.notify);
		self.addEventListener(LController.NOTIFY_ALL,self.notifyAll);
		var conName = self.constructor.name,length = conName.length;name = conName.substr(0,length - 10);
		self.load = new LMvcLoader(self);
		var model = window[name+"Model"];
		var view = window[name+"View"];
		view.baseView = true;
		/** @language chinese
		 * 控制器的模型。
		 * @property model
		 * @type LModel
		 * @since 1.8.4
		 * @public
		 */
		self.model = new model();
		/** @language chinese
		 * 控制器的视图。
		 * @property view
		 * @type LView
		 * @since 1.8.4
		 * @public
		 */
		self.view = new view();
		self.model.controller = self;
		self.model.view = self.view;
		self.view.controller = self;
		self.view.model = self.model;
		self.addView(self.view);
		self.model.construct();
		self.view.construct();
		self.construct();
	}
	/** @language chinese
	 * <p>通知器，该消息发送之后，会直接运行控制器Controller同名视图View的updateView函数。</p>
	 * @event LController.NOTIFY
	 * @type String
	 * @static
	 * @since 1.8.4
	 * @public
	 */
	LController.NOTIFY = "notify";
	/** @language chinese
	 * <p>通知器，该消息发送之后，会直接运行控制器Controller关联的所有视图View的updateView函数。</p>
	 * @event LController.NOTIFY_ALL
	 * @type String
	 * @static
	 * @since 1.9.10
	 * @public
	 */
	LController.NOTIFY_ALL = "notify_all";
	LController.prototype.notify = function(event){
		var self = event.currentTarget;
		if(self.view){
			LController._notify(self.view);
		}
	};
	LController.prototype.notifyAll = function(event){
		var self = event.currentTarget;
		for(var i=0,l=self.ll_viewList.length;i<l;i++){
			LController._notify(self.ll_viewList[i]);
		}
	};
	LController._notify = function(view, depth){
		if(view && view.visible && view.mvcType == "view"){
			view.updateView();
		}
	};
	/** @language chinese
	 * 设定需要传给视图View的值。设定完之后，发送LController.NOTIFY消息，则自动调用所有相关联的视图的updateView函数
	 * @method setValue
	 * @param {string} key 一个或者多个设置文件.
	 * @param {Object} value 任意类型的值
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
	LController.prototype.setValue = function(key,value){
		var self = this;
		self.ll_dispatcher[key] = value;
	};
	/** @language chinese
	 * 获取在控制器中已经设定的值。
	 * @method getValue
	 * @param {string} key 一个或者多个设置文件.
	 * @return {Object} 获取到的在控制器中已经设定的值。
	 * @since 1.8.4
	 * @example
	 *	//控制器中代码
	 *	ExampleController.prototype.loadModel = function(){
	 *		this.setValue("myname","testName");
	 *		this.dispatchEvent(LController.NOTIFY);
	 *	}
	 *	//视图中代码
	 *	ExampleView.prototype.updateView = function(){
	 *		trace(this.controller.getValue("myname"));//out: testName
	 *	}
	 * @public
	 */
	LController.prototype.getValue = function(key){
		return this.ll_dispatcher[key];
	};
	/** @language chinese
	 * 清空所有在控制器中已经设定的值。
	 * @method clearValue
	 * @since 1.8.4
	 * @public
	 */
	LController.prototype.clearValue = function(){
		this.ll_dispatcher = {};
	};
	LController.prototype.addView = function(view){
		this.ll_viewList.push(view);
	};
	LController.prototype.removeView = function(v){
		var self = this;
		for(var i=0,l=self.ll_viewList.length;i<l;i++){
			var view = self.ll_viewList[i];
			if(view && view.objectIndex == v.objectIndex){
				self.ll_viewList.splice(i,1);
				break;
			}
		}
	};
	return LController;
})();
