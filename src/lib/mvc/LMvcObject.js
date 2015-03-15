/** @language chinese
 * MVC框架的控制器，模型和视图的共通父类。
 * @class LMvcObject
 * @constructor
 * @since 1.8.4
 * @public
 */
var LMvcObject = (function() {
	function LMvcObject(){
	}
	/** @language chinese
	 * <p>控制器，模型，视图初始化结束后都会直接调用此函数，如果有想要在各个模块初期化结束后运行的代码，可以写在construct函数内</p>
	 * <p>本MVC框架中的construct函数运行顺序为，模型model的construct函数 > 视图view函数 > 控制器的construct。</p>
	 * @method construct
	 * @since 1.8.4
	 * @public
	 */
	LMvcObject.prototype.construct = function(){};
	/** @language chinese
	 * 读取一组MVC，包括控制器Controller，模型Model，视图View
	 * @method loadMvc
	 * @param {string} name 控制器的名称中去除Controller的部分.
	 * @param {Function} callback 回调函数，当MVC的三个文件读取完之后，会自动调用此函数
	 * @since 1.8.4
	 * @example
	 *	ExampleController.prototype.construct = function(){
	 *		this.loadMvc("Logo",self.logoLoad);  
	 *	}
	 *	ExampleController.prototype.logoLoad = function(){
	 *		var logo = new LogoController();
	 *		this.view.addChild(logo.view);
	 *	}
	 * @public
	 */
	LMvcObject.prototype.loadMvc = function(names,callback){
		var self = this;
		if(typeof names == "string"){
			names = [names];
		}
		self._loadMvcInit(names,callback);
		self._loadMvc();
	};
	LMvcObject.prototype._loadMvcInit = function(names,callback){
		var self = this;
		self._loadMvcIndex = 0;
		self._loadMvcNames = names;
		self._loadMvcCallback = callback;
	};
	LMvcObject.prototype._loadMvc = function(){
		var self = this;
		var name = self._loadMvcNames[self._loadMvcIndex];
		self._loadMvcIndex += 1;
		if(self._loadMvcIndex >=  self._loadMvcNames.length){
			var callback = self._loadMvcCallback;
			self._loadMvcInit(null,null);
			LMvc.loadClass.apply(self,[name,callback,self]);
		}else{
			LMvc.loadClass.apply(self,[name,self._loadMvc,self]);
		}
	};
	return LMvcObject;
})();
