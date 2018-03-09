/** @language chinese
 * 用来读取各种文件。
 * @class LMvcLoader
 * @constructor
 * @since 1.8.4
 * @public
 */
var LMvcLoader = (function() {
	function LMvcLoader(controller) {
		this.controllerClass = controller;
	}
	LMvcLoader.prototype = {
		controller : function(names, callback) {
			var self = this;
			self.loadJs("Controllers", "Controller", names, callback);
		},
		/** @language chinese
		 * 读取一个或者多个模型。
		 * @method model
		 * @param {string|Array} names 一个或者多个模型.
		 * @param {Function} callback 回调函数
		 * @since 1.8.4
		 * @example
		 *	//下面代码用来读取MapModel.js，CharaModel.js两个模型
		 *	ExampleController.prototype.loadModel = function(){
		 *		this.load.model(["Map","Chara"],this.loadModelComplete);
		 *	}
		 *	ExampleController.prototype.loadModelComplete = function(){
		 *		var mapModel = new MapModel(this);
		 *	}
		 * @public
		 */
		model : function(names, callback) {
			var self = this;
			self.loadJs("Models", "Model", names, callback);
		},
		/** @language chinese
		 * 读取一个或者多个视图。
		 * @method view
		 * @param {string|Array} names 一个或者多个视图.
		 * @param {Function} callback 回调函数
		 * @since 1.8.4
		 * @example
		 *	//下面代码用来读取MapView.js，CharaView.js两个视图
		 *	this.load.view(["Map","Chara"],this.loadViewComplete);
		 * @public
		 */
		view : function(names, callback) {
			var self = this;
			self.loadJs("Views", "View", names, callback);
		},
		/** @language chinese
		 * 读取多张图片。
		 * @method image
		 * @param {Array} datas 参考LLoadManage的load函数的list参数.
		 * @param {Function} callback 回调函数
		 * @since 1.8.4
		 * @public
		 */
		image : function(datas, callback) {
			var self = this;
			LMvc.loading.visible = true;
			var loadData = [];
			var loadDataCheck = {};
			for (var i = 0; i < datas.length; i++) {
				if (loadDataCheck[datas[i]["name"]] || LMvc.datalist[datas[i]["name"]])
					continue;
				loadData.push(datas[i]);
				loadDataCheck[datas[i]["name"]] = 1;
			}
			LLoadManage.load(loadData, function(progress) {
				LMvc.loading.visible = true;
				LMvc.loading.setProgress(progress);
			}, function(result) {
				for (var k in result) {
					LMvc.datalist[k] = result[k];
				}
				callback.apply(self.controllerClass, []);
				if (!LMvc.loadingLock)
					LMvc.loading.visible = false;
			});
		},
		/** @language chinese
		 * 读取一个或者多个设置文件。设置文件的名字以Config结尾，读取设置文件的时候无需添加Config结尾。
		 * @method config
		 * @param {string | Array} names 一个或者多个设置文件.
		 * @param {Function} callback 回调函数
		 * @since 1.8.4
		 * @example
		 *	//下面代码用来读取mapConfig.js，charaConfig.js两个设置文件
		 *	this.load.config(["map","chara"],this.loadConfigComplete);
		 * @public
		 */
		config : function(names, callback) {
			var self = this;
			self.loadJs("config", "Config", names, callback);
		},
		/** @language chinese
		 * 读取一个或者多个外部类库。
		 * @method library
		 * @param {string | Array} names 一个或者多个外部类库.
		 * @param {Function} callback 回调函数
		 * @since 1.8.4
		 * @example
		 *	//下面代码用来读取Face.js，Card.js两个设置文件
		 *	this.load.library(["Face","Card"],this.loadLibraryComplete);
		 * @public
		 */
		library : function(names, callback) {
			var self = this;
			self.loadJs("Libraries", null, names, callback);
		},
		/** @language chinese
		 * 读取一个或者多个辅助函数文件。
		 * @method helper
		 * @param {string | Array} names 一个或者多个辅助函数文件.
		 * @param {Function} callback 回调函数
		 * @since 1.8.4
		 * @example
		 *	//下面代码用来读取Cost.js，UI.js两个辅助函数文件
		 *	this.load.helper(["Cost","UI"],this.loadHelperComplete);
		 * @public
		 */
		helper : function(names, callback) {
			var self = this;
			self.loadJs("Helpers", null, names, callback);
		},
		loadJs : function(type, classType, names, callback) {
			var self = this, list = [], i, l;
			if ( typeof names == "string")
				names = [names];
			for ( i = 0, l = names.length; i < l; i++) {
				var name = names[i] + ( classType ? classType : "");
				var patts = name.split("/");
				if(window[patts[patts.length - 1]]){
					continue;
				}
				list.push({
					path : LMvc.MVC_PATH + ( type ? (type + "/") : "") + name + ".js",
					type : "js"
				});
			}
			LMvc.loading.visible = true;
			LLoadManage.load(list, function(progress) {
				LMvc.loading.visible = true;
				LMvc.loading.setProgress(progress);
			}, function(result) {
				callback.apply(self.controllerClass, []);
				if (!LMvc.loadingLock)
					LMvc.loading.visible = false;
			});
		}
	};
	return LMvcLoader;
})();
