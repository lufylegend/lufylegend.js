/** @language chinese
 * @class 全局函数
 * @since 1.0.0
 * @public
 */
/** @language english
 * @class Global Functions
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * @class グローバル関数
 * @since 1.0.0
 * @public
 */
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (elt) {
		var len = this.length >>> 0;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0) {
			from += len;
		}
		for (; from < len; from++){
			if (from in this && this[from] === elt) {
				return from;
			}
		}
		return -1;
	};
}
if (!Array.isArray){
	Array.isArray = function(value){
		return Object.prototype.toString.apply(value) == '[object Array]';
	};
}
if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		if (typeof this !== "function") {
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}
		var aArgs = Array.prototype.slice.call(arguments, 1), 
			fToBind = this, 
			fNOP = function () {},
			fBound = function () {
			return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };
		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();
		return fBound;
	};
}
if (!Array.prototype.find) {
	Array.prototype.find = function (predicate) {
		if (this == null) {
			throw new TypeError('Array.prototype.find called on null or undefined');
		}
		if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}
		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;
		for (var i = 0; i < length; i++) {
			value = list[i];
			if (predicate.call(thisArg, value, i, list)) {
				return value;
			}
		}
		return undefined;
	};
}
if (!Array.prototype.findIndex) {
	Array.prototype.findIndex = function (predicate) {
		if (this == null) {
			throw new TypeError('Array.prototype.find called on null or undefined');
		}
		if ( typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}
		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;

		for (var i = 0; i < length; i++) {
			value = list[i];
			if (predicate.call(thisArg, value, i, list)) {
				return i;
			}
		}
		return -1;
	};
}
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function (callback, thisArg) {
		var T, k;
		if (this == null) {
			throw new TypeError(' this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if ( typeof callback !== "function") {
			throw new TypeError(callback + ' is not a function');
		}
		if (arguments.length > 1) {
			T = thisArg;
		}
		k = 0;
		while (k < len) {
			var kValue;
			if ( k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}
if (!Array.prototype.every) {
	Array.prototype.every = function(callbackfn, thisArg) {
		'use strict';
		var T, k;
		if (this == null) {
			throw new TypeError('this is null or not defined');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if ( typeof callbackfn !== 'function') {
			throw new TypeError();
		}
		if (arguments.length > 1) {
			T = thisArg;
		}
		k = 0;
		while (k < len) {
			var kValue;
			if ( k in O) {
				kValue = O[k];
				var testResult = callbackfn.call(T, kValue, k, O);
				if (!testResult) {
					return false;
				}
			}
			k++;
		}
		return true;
	};
}
if (!Array.prototype.some) {
	Array.prototype.some = function(fun) {
		'use strict';
		if (this == null) {
			throw new TypeError('Array.prototype.some called on null or undefined');
		}
		if ( typeof fun !== 'function') {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		var thisArg = arguments.length >= 2 ? arguments[1] :
		void 0;
		for (var i = 0; i < len; i++) {
			if ( i in t && fun.call(thisArg, t[i], i, t)) {
				return true;
			}
		}
		return false;
	};
}
if (!String.format) {
	String.format = function(format) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    return format.replace(/{(\d+)}/g, function(match, number) { 
	      return typeof args[number] != 'undefined'
	        ? args[number] 
	        : match
	      ;
	    });
	};
}
/** @language chinese
 * 您可以在测试环境下捕获来自 trace() 函数的输出并显示结果。如果 trace 语句中的任何参数包含 String 之外的数据类型，则 trace 函数将调用与该数据类型关联的 toString() 方法。例如，如果该参数是一个布尔值，则跟踪函数将调用 Boolean.toString() 并显示返回值。
 * @method trace
 * @param {Object} expression 要计算的表达式。expression 参数的值显示在"输出"面板中。
 * @example
 * 	trace("debug text 1", "debug text 2", "debug text 3");
 * @examplelink <p><a href="../../../api/GlobalFunctions/trace.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
*/
/** @language english
 * You can use Debug Mode to capture output from the trace() function and display the result. If any argument in a trace statement includes a data type other than a String, the trace function invokes the associated toString() method for that data type. For example, if the argument is a Boolean value the trace function invokes Boolean.toString() and displays the return value.
 * @method trace
 * @param {Object} expression An expression to evaluate. the value of the expression parameter is displayed in the Output panel.
 * @example
 * 	trace("debug text 1", "debug text 2", "debug text 3");
 * @examplelink <p><a href="../../../api/GlobalFunctions/trace.html" target="_blank">Try it »</a></p>
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * Debugモード を使用すると、trace() 関数の出力を取得し、その結果を表示できます。trace ステートメント内の引数に String 以外のデータ型が含まれる場合、trace 関数はそのデータ型に関連した toString() メソッドを呼び出します。たとえば、引数がブール値の場合、trace 関数は Boolean.toString() を呼び出して戻り値を表示します。
 * @method trace
 * @param {Object} expression 評価する式。expression パラメータの値が [出力] パネルに表示されます。
 * @example
 * 	trace("debug text 1", "debug text 2", "debug text 3");
 * @examplelink <p><a href="../../../api/GlobalFunctions/trace.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 */
function trace() {
	if (!LGlobal.traceDebug) return;
	var t = document.getElementById("traceObject"), i;
	if (trace.arguments.length > 0 && t == null) {
		t = document.createElement("TEXTAREA");
		t.id = "traceObject";
		t.style.position = "absolute";
		t.style.top = (LGlobal.height + 20) + "px";
		t.style.width = LGlobal.width + "px";
		t.style.height = "200px";
		document.body.appendChild(t);
	}
	for (i = 0; i < trace.arguments.length; i++) {
		t.value = t.value + trace.arguments[i] + "\r\n";
		t.scrollTop = t.scrollHeight;
	}
}
if (!window.console) {
	window.console = {
		log : trace,
		warn : trace
	};
}

/** @language chinese
 * 将一个 DisplayObject 子实例添加到Stage。
 * @method addChild
 * @param {LDisplayObject} child 要添加的 DisplayObject 实例。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * @since 1.0.0
 * @public
 */
/** @language english
 * Adds a child DisplayObject instance to the Stage.
 * @method addChild
 * @param {Object} expression The DisplayObject instance that you pass in the child parameter.
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * Stageに子 DisplayObject インスタンスを追加します。
 * @method addChild
 * @param {Object} expression 追加される DisplayObject インスタンスです。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * @since 1.0.0
 * @public
 */
function addChild (o) {
	LGlobal.stage.addChild(o);
}

/** @language chinese
 * 从 Stage 实例的子列表中删除指定的 child DisplayObject 实例。
 * @method removeChild
 * @param {LDisplayObject} child 要删除的 DisplayObject 实例。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
/** @language english
 * Removes the specified child DisplayObject instance from the child list of the Stage instance. 
 * @method removeChild
 * @param {Object} expression The DisplayObject instance to remove.
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * Stage インスタンスの子リストから指定の child DisplayObject インスタンスを削除します。
 * @method removeChild
 * @param {Object} expression 削除する DisplayObject インスタンスです。
 * @example
 * 	var backLayer = LSprite();
 * 	addChild(backLayer);
 * 	removeChild(backLayer);
 * @since 1.0.0
 * @public
 */
function removeChild (o) {
	LGlobal.stage.removeChild(o);
}

/** @language chinese
 * 引擎初始化函数。等同于 init。
 * @method LInit
 * @param {float} speed <p>游戏速度,每次页面刷新间隔（单位毫秒）, FPS = 1000 / speed。</p> <p style="color:#FF0000;">*也可以直接将此参数设定为requestAnimationFrame，引擎会切换到requestAnimationFrame来循环刷新。</p>
 * @param {String} divid 传入一个div的id，库件进行初始化的时候，会自动将canvas加入到此div内部。
 * @param {int} width 游戏界面宽。
 * @param {int} height 游戏界面高。
 * @param {Function} callback 游戏初始化后，调用此函数。
 * @param {String} type 当为null时，会先进行页面的onload操作，如果你的init函数调用是在onload之后，那么需要将此参数设为LEvent.INIT。
 * @example
 * 	<!DOCTYPE html>
 * 	<html>
 * 	<head>
 * 	<meta charset="UTF-8">
 * 	<title>demo</title>
 * 	</head>
 * 	<body>
 * 	<div id="mylegend">loading……</div>
 * 	<script type="text/javascript" src="../lufylegend-x.x.x.min.js"></script> 
 * 	<script>
 * 	LInit(50,"mylegend",800,480,main);
 * 	//window.onload = function(){LInit(50, "mylegend", 800, 480, main, LEvent.INIT);};
 * 	function main(){
 * 		alert("Hello lufylegend!");
 * 	}
 * 	</script>
 * 	</body>
 * 	</html>
 * @examplelink <p><a href="../../../api/GlobalFunctions/LInit.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
/** @language english
 * Engine initialization. Equivalent to init.
 * @method LInit
 * @param {float} speed <p>game speed(milliseconds), FPS = 1000 / speed.</p><p style="color:#FF0000;">*You can also set this parameter to requestAnimationFrame.</p>
 * @param {String} divid Specifies a unique id for a div tag.
 * @param {int} width Game Interface's width.
 * @param {int} height Game Interface's height.
 * @param {Function} callback Engine initialization's callback method.
 * @param {String} type If your init function call is after the onload, then you need to set this parameter to LEvent.INIT.
 * @example
 * 	<!DOCTYPE html>
 * 	<html>
 * 	<head>
 * 	<meta charset="UTF-8">
 * 	<title>demo</title>
 * 	</head>
 * 	<body>
 * 	<div id="mylegend">loading……</div>
 * 	<script type="text/javascript" src="../lufylegend-x.x.x.min.js"></script> 
 * 	<script>
 * 	LInit(50,"mylegend",800,480,main);
 * 	//window.onload = function(){LInit(50, "mylegend", 800, 480, main, LEvent.INIT);};
 * 	function main(){
 * 		alert("Hello lufylegend!");
 * 	}
 * 	</script>
 * 	</body>
 * 	</html>
 * @examplelink <p><a href="../../../api/GlobalFunctions/LInit.html" target="_blank">Try it »</a></p>
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * ライブラリの初期化。init と同等。
 * @method LInit
 * @param {float} speed <p>ゲームスピード（单位：ミリ秒）, FPS = 1000 / speed。</p><p style="color:#FF0000;">*このパラメータをrequestAnimationFrameに設定することも可能です，自動的にrequestAnimationFrameを使うようになります</p>
 * @param {String} divid divタブのid，ライブラリの初期化をする時，自動的にこのdivタブの中にcanvasを生成する。
 * @param {int} width ゲーム画面の幅。
 * @param {int} height ゲーム画面の高さ。
 * @param {Function} callback ライブラリの初期化が終わったら，この関数を呼び出す。
 * @param {String} type ライブラリの初期化がwindow.onloadの後にしたら，このパラメータをLEvent.INITに設定しなければなりません。
 * @example
 * 	<!DOCTYPE html>
 * 	<html>
 * 	<head>
 * 	<meta charset="UTF-8">
 * 	<script type="text/javascript" src="../lufylegend-x.x.x.min.js"></script> 
 * 	<title>demo</title>
 * 	</head>
 * 	<body>
 * 	<div id="mylegend">loading……</div>
 * 	<script>
 * 	LInit(50,"mylegend",800,480,main);
 * 	//window.onload = function(){LInit(50, "mylegend", 800, 480, main, LEvent.INIT);};
 * 	function main(){
 * 		alert("Hello lufylegend!");
 * 	}
 * 	</script>
 * 	</body>
 * 	</html>
 * @examplelink <p><a href="../../../api/GlobalFunctions/LInit.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 */
function init (s, c, w, h, f, t) {
	LGlobal.speed = s;
	var _f = function () {
		if (LGlobal.canTouch && LGlobal.aspectRatio == LANDSCAPE && window.innerWidth < window.innerHeight) {
			LGlobal.horizontalError();
		} else if (LGlobal.canTouch && LGlobal.aspectRatio == PORTRAIT && window.innerWidth > window.innerHeight) {
			LGlobal.verticalError();
		} else {
			setTimeout(f, 100);
		}
		LGlobal.startTimer = (new Date()).getTime();
	};
	var loop;
	if(typeof s == "function"){
		LGlobal.setCanvas(c, w, h);
		_f();
		loop = function(){
			s(loop);
			LGlobal.onShow();
		}
	}else{
		loop = function(){
			LGlobal.frameRate = setInterval(function () {
				LGlobal.onShow();
			}, s);
			LGlobal.setCanvas(c, w, h);
			_f();
		};
	}
	if (t != null && t == LEvent.INIT) {
		loop();
	}else{
		LEvent.addEventListener(window, "load", function () {
			loop();
		});
	}
}
var LInit = init;

/** @language chinese
 * 等同于 LExtends
 * @method base
 * @since 1.0.0
 * @public
 */
/** @language english
 * Equivalent to LExtends
 * @method base
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * LExtends と同等。
 * @method base
 * @since 1.0.0
 * @public
 */
function base (d, b, a) {
	var p = null, o = d.constructor.prototype, h = {};
	if(d.constructor.name == "Object"){
		console.warn( "When you use the extends. You must make a method like 'XX.prototype.xxx=function(){}'. but not 'XX.prototype={xxx:function(){}}'.");
	}
	if (typeof d.__ll__parent__ == UNDEFINED) {
		d.__ll__parent__ = [];
		d.__ll__parent__ = [];
	}
	d.__ll__parent__.push(b.prototype);
	for (p in o) {
		h[p] = 1;
	}
	for (p in b.prototype) {
		if (!h[p]) {
			o[p] = b.prototype[p];
		}
	}
	if (o.toString == Object.prototype.toString) {
		o.toString = LObject.prototype.toString;
	}
	b.apply(d, a);
}
/** @language chinese
 * 对象继承。等同于 base。
 * @method LExtends
 * @param {Object} child 子对象本身。
 * @param {Object} parent 父对象。
 * @param {Array} params 参数。
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function FatherClass(){
 * 		this.name = "Father";
 * 	}
 * 	FatherClass.prototype.getName = function(){
 * 		return this.name;
 * 	};
 * 	function ChildClass(){
 * 		LExtends(this,FatherClass,[]);
 * 		this.name = "Child";
 * 	}
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var father = new FatherClass();
 * 		var child = new ChildClass();
 * 		trace("father.getName() = " + father.getName()); //father.getName() = Father
 * 		trace("child.getName() = " + child.getName());//child.getName() = Child
 * 	}
 * @examplelink <p><a href="../../../api/GlobalFunctions/LExtends.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
/** @language english
 * Object Inheritance.Equivalent to base.
 * @method LExtends
 * @param {LDisplayObject} child The child。
 * @param {Object} parent The parent。
 * @param {Array} params params。
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function FatherClass(){
 * 		this.name = "Father";
 * 	}
 * 	FatherClass.prototype.getName = function(){
 * 		return this.name;
 * 	};
 * 	function ChildClass(){
 * 		LExtends(this,FatherClass,[]);
 * 		this.name = "Child";
 * 	}
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var father = new FatherClass();
 * 		var child = new ChildClass();
 * 		trace("father.getName() = " + father.getName()); //father.getName() = Father
 * 		trace("child.getName() = " + child.getName());//child.getName() = Child
 * 	}
 * @examplelink <p><a href="../../../api/GlobalFunctions/LExtends.html" target="_blank">Try it »</a></p>	
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * オブジェクトの継承。base と同等。
 * @method LExtends
 * @param {LDisplayObject} child 子供オブジェクト。
 * @param {Object} parent 親オブジェクト。
 * @param {Array} params パラメータ。
 * @example
 * 	LInit(50, "legend", 800, 480, main);
 * 	function FatherClass(){
 * 		this.name = "Father";
 * 	}
 * 	FatherClass.prototype.getName = function(){
 * 		return this.name;
 * 	};
 * 	function ChildClass(){
 * 		LExtends(this,FatherClass,[]);
 * 		this.name = "Child";
 * 	}
 * 	function main () {
 * 		LGlobal.setDebug(true);
 * 		var father = new FatherClass();
 * 		var child = new ChildClass();
 * 		trace("father.getName() = " + father.getName()); //father.getName() = Father
 * 		trace("child.getName() = " + child.getName());//child.getName() = Child
 * 	}
 * @examplelink <p><a href="../../../api/GlobalFunctions/LExtends.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 */
var LExtends = base;

/** @language chinese
 * 返回自引擎初始化开始播放时起已经过的毫秒数。
 * @method getTimer
 * @return {float} 自引擎初始化开始播放时起已经过的毫秒数。
 * @since 1.0.0
 * @public
 */
/** @language english
 * Returns the number of milliseconds that have elapsed since Engine initialization.
 * @method getTimer
 * @return {float} The number of milliseconds that have elapsed since Engine initialization.
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * ライブラリの初期化終わってからの経過時間をミリ秒単位で返します。
 * @method getTimer
 * @return {float} ライブラリの初期化終わってからの経過時間。
 * @since 1.0.0
 * @public
 */
function getTimer () {
	return (new Date()).getTime() - LGlobal.startTimer;
}
function getExtension (path) {
	var r, pattern = /([^#?]+\.)([^.#?]+)/;
	r = path.match(pattern);
	if (r.length >= 3) {
		return r[2].toLowerCase();
	}
	return null;
}