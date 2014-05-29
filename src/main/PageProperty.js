/*
* PageProperty.js
**/

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

/* @language chinese
 * 您可以在测试环境下捕获来自 trace() 函数的输出并显示结果。如果 trace 语句中的任何参数包含 String 之外的数据类型，则 trace 函数将调用与该数据类型关联的 toString() 方法。例如，如果该参数是一个布尔值，则跟踪函数将调用 Boolean.toString() 并显示返回值。
 * @method trace
 * @param {Object} [expression] 要计算的表达式。expression 参数的值显示在"输出"面板中。
 * @example
 * 	trace("debug text 1", "debug text 2", "debug text 3");
 * @since 1.0.0
 * @public
**/
/* @language english
 * You can use Debug Mode to capture output from the trace() function and display the result. If any argument in a trace statement includes a data type other than a String, the trace function invokes the associated toString() method for that data type. For example, if the argument is a Boolean value the trace function invokes Boolean.toString() and displays the return value.
 * @method trace
 * @param {Object} [expression] An expression to evaluate. the value of the expression parameter is displayed in the Output panel.
 * @example
 * 	trace("debug text 1", "debug text 2", "debug text 3");
 * @since 1.0.0
 * @public
**/
/* @language japanese
 * Debugモード を使用すると、trace() 関数の出力を取得し、その結果を表示できます。trace ステートメント内の引数に String 以外のデータ型が含まれる場合、trace 関数はそのデータ型に関連した toString() メソッドを呼び出します。たとえば、引数がブール値の場合、trace 関数は Boolean.toString() を呼び出して戻り値を表示します。
 * @method trace
 * @param {Object} [expression] 評価する式。expression パラメータの値が [出力] パネルに表示されます。
 * @example
 * 	trace("debug text 1", "debug text 2", "debug text 3");
 * @since 1.0.0
 * @public
**/
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
function addChild (o) {
	LGlobal.stage.addChild(o);
}
function removeChild (o) {
	LGlobal.stage.removeChild(o);
}
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
	if (t != null && t == LEvent.INIT) {
		LGlobal.frameRate = setInterval(function () {
			LGlobal.onShow();
		}, s);
		LGlobal.setCanvas(c, w, h);
		_f();
	}else{
		LEvent.addEventListener(window, "load", function () {
			LGlobal.frameRate = setInterval(function () {
				LGlobal.onShow();
			}, s);
			LGlobal.setCanvas(c, w, h);
			_f();
		});
	}
}
var Linit = init;

function base (d, b, a) {
	var p = null, o = d.constructor.prototype, h = {};
	if(d.constructor.name == "Object"){
		console.warn( "When you use the extends. You must make a method like 'XX.prototype.xxx=function(){}'. but not 'XX.prototype={xxx:function(){}}'.");
	}
	for (p in o) {
		h[p] = 1;
	}
	for (p in b.prototype) {
		if (!h[p]) {
			o[p] = b.prototype[p];
		}
		o[p][SUPER] = b.prototype;
	}
	b.apply(d, a);
}
var Lextends = base;
function getTimer () {
	return (new Date()).getTime() - LGlobal.startTimer;
}
