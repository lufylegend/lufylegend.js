/** @language chinese
 * <p>lufylegend.mvc框架的全局静态类。</p>
 * @class LMvc
 * @since 1.8.4
 * @public
*/
var LMvc = (function() {
	var LMvc = {
		/** @language chinese
		 * <p>图片文件的路径</p>
		 * @property LMvc.IMG_PATH
		 * @type String
		 * @static
		 * @default "./images/"
		 * @since 1.8.4
		 * @public
		 */
		IMG_PATH:"./images/",
		/** @language chinese
		 * <p>MVC框架的Controllers，Models，Views等文件夹的路径</p>
		 * @property LMvc.MVC_PATH
		 * @type String
		 * @static
		 * @default "./"
		 * @since 1.8.4
		 * @public
		 */
		MVC_PATH:"./",
		loadingLock:false,
		layer:null,
		loading:null,
		/** @language chinese
		 * <p>MVC框架的素材库，读取完的素材都会被保存到这个变量中。如果需要提前读取一些图片的话，需要将读取完的数据赋值给LMvc.datalist，在后面使用LMvc框架读取图片的时候，会自动对LMvc.datalist进行监测，重复的图片会不再次读取。</p>
		 * @property datalist
		 * @type Object
		 * @static
		 * @since 1.8.4
		 * @public
		 */
		datalist:{}
	};
	LMvc.loadClass = function(name,callback,lastClass){
		if(typeof window[name+"Controller"] == "function"){
			callback.apply(lastClass,[]);
			return;
		}
		LMvc.loading.visible = true;
		var loader = new LMvcLoader();
		var names = ["Controllers/"+name+"Controller","Models/"+name+"Model","Views/"+name+"View"];
		loader.loadJs("","",names,function(){
			callback.apply(lastClass,[]);
			if(!LMvc.loadingLock)LMvc.loading.visible = false;
		});
	};
	/** @language chinese
	 * <p>MVC框架的初始化。初始化之前需要提前配置好LMvc.IMG_PATH，LMvc.MVC_PATH两个路径。</p>
	 * @method init
	 * @static
	 * @public
	 * @since 1.8.4
	 */
	LMvc.init = function(){
		LMvc.layer = new LSprite();
		addChild(LMvc.layer);
		LMvc.loading = new LoadingSample5();
		LMvc.loading.alpha = 0.5;
		addChild(LMvc.loading);
		LMvc.loading.visible = false;
		LMvc.loadClass("Index",function(){
			LMvc.loading.visible = true;
			var controller = new IndexController();
			LMvc.loading.visible = false;
		});
	};
	/** @language chinese
	 * <p>设置MVC的Loading画面</p>
	 * @method changeLoading
	 * @static
	 * @param {class} loadingClass 一个含有setProgress函数的LSprite的子类，注意这个参数是一个类，而不是实例化后的对象。
	 * @example
	 * 	//自定义如下LSprite的子类
	 * 	function MyLoading(){
	 * 		LExtends(this, LSprite, []);
	 * 		......
	 * 	}
	 * 	MyLoading.prototype.setProgress = function(){...};
	 * 	//然后就可以使用下面代码可是将Loading画面替换成自定义的MyLoading
	 * 	LMvc.changeLoading(MyLoading);
	 * @public
	 * @since 1.8.4
	 */
	LMvc.changeLoading = function(loadingClass){
		LMvc.loading.remove();
		LMvc.loading = new loadingClass();
		addChild(LMvc.loading);
	};
	/** @language chinese
	 * <p>本MVC框架中每个读取动作都会自动显示Loading画面，读取完成后会将Loading画面隐藏，如果进行多次读取，可以使用此函数设置是否持续显示Loading画面</p>
	 * @method keepLoading
	 * @static
	 * @param {Boolean} value 是否持续显示Loading画面
	 * @public
	 * @since 1.8.4
	 */
	LMvc.keepLoading = function(value){
		LMvc.loadingLock = LMvc.loading.visible = value;
	};
	return LMvc;
})();
