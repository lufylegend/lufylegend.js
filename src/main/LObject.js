/** @language chinese
 * LObject 类位于 lufylegend.js 类层次结构的根处。
 * @class LObject
 * @constructor
 * @since 1.6.0
 * @public
 */
/** @language english
 * The LObject class is at the root of the lufylegend.js class hierarchy.
 * @class LObject
 * @constructor
 * @since 1.6.0
 * @public
 */
/** @language japanese
 * LObject クラスは、lufylegend.js クラス階層のルートにあります。
 * @class LObject
 * @constructor
 * @since 1.6.0
 * @public
 */
var LObject = (function () {
	function LObject () {
		this.type = "LObject";
		/** @language chinese
		 * 对象的ID
		 * @property objectIndex
		 * @type int
		 * @since 1.6.0
		 * @public
		 */
		/** @language english
		 * ID of the object
		 * @property objectIndex
		 * @type int
		 * @since 1.6.0
		 * @public
		 */
		/** @language japanese
		 * オブジェクトのID
		 * @property objectIndex
		 * @type int
		 * @since 1.6.0
		 * @public
		 */
		this.objectIndex = ++LGlobal.objectIndex;
		this.objectindex = this.objectIndex;
	}
	LObject.prototype = {
		/** @language chinese
		 * 调用父类的函数。
		 * @method callParent
		 * @param {String} functionName 函数名
		 * @param {Array} arguments 固定值arguments
		 * @example
		 * 	function funA(){
		 * 		LExtends(this,LObject,[]);
		 * 	}
		 * 	funA.prototype.myName = function(){
		 * 		return "AAA";
		 * 	}
		 * 	function funB(){
		 * 		LExtends(this,funA,[]);
		 * 	}
		 * 	funB.prototype.myName = function(){
		 * 		return "BBB";
		 * 	}
		 * 	function funC(){
		 * 		LExtends(this,funA,[]);
		 * 	}
		 * 	funC.prototype.myName = function(){
		 * 		return this.callParent("myName",arguments);
		 * 	}
		 * 	LInit(1000/50,"legend",800,150,main);
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		var objB = new funB();
		 * 		trace(objB.myName());//BBB
		 * 		var objC = new funC();
		 * 		trace(objC.myName());//AAA
		 * 	}
		 * @examplelink <p><a href="../../../api/LObject/callParent.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.6.0
		 */
		/** @language english
		 * call the method of parent。
		 * @method callParent
		 * @param {String} functionName function's name
		 * @param {Array} arguments Fixed value : arguments
		 * @example
		 * 	function funA(){
		 * 		LExtends(this,LObject,[]);
		 * 	}
		 * 	funA.prototype.myName = function(){
		 * 		return "AAA";
		 * 	}
		 * 	function funB(){
		 * 		LExtends(this,funA,[]);
		 * 	}
		 * 	funB.prototype.myName = function(){
		 * 		return "BBB";
		 * 	}
		 * 	function funC(){
		 * 		LExtends(this,funA,[]);
		 * 	}
		 * 	funC.prototype.myName = function(){
		 * 		return this.callParent("myName",arguments);
		 * 	}
		 * 	LInit(1000/50,"legend",800,150,main);
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		var objB = new funB();
		 * 		trace(objB.myName());//BBB
		 * 		var objC = new funC();
		 * 		trace(objC.myName());//AAA
		 * 	}
		 * @examplelink <p><a href="../../../api/LObject/callParent.html" target="_blank">Try it »</a></p>
		 * @public
		 * @since 1.6.0
		 */
		/** @language japanese
		 * 親クラスの関数を呼び出す。
		 * @method callParent
		 * @param {String} functionName 函数名
		 * @param {Array} arguments 固定値arguments
		 * @example
		 * 	function funA(){
		 * 		LExtends(this,LObject,[]);
		 * 	}
		 * 	funA.prototype.myName = function(){
		 * 		return "AAA";
		 * 	}
		 * 	function funB(){
		 * 		LExtends(this,funA,[]);
		 * 	}
		 * 	funB.prototype.myName = function(){
		 * 		return "BBB";
		 * 	}
		 * 	function funC(){
		 * 		LExtends(this,funA,[]);
		 * 	}
		 * 	funC.prototype.myName = function(){
		 * 		return this.callParent("myName",arguments);
		 * 	}
		 * 	LInit(1000/50,"legend",800,150,main);
		 * 	function main(){
		 * 		LGlobal.setDebug(true);
		 * 		var objB = new funB();
		 * 		trace(objB.myName());//BBB
		 * 		var objC = new funC();
		 * 		trace(objC.myName());//AAA
		 * 	}
		 * @examplelink <p><a href="../../../api/LObject/callParent.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 * @since 1.6.0
		 */
		callParent : function (f_n, args) {
			if (!f_n || !args) {
				return;
			}
			var s = this, init = false, r, k = "__ll__parent_call" + f_n;
			if (typeof s[k] == "undefined") {
				init = true;
				s[k] = 0;
			} else {
				s[k]++;
			}
			if (s[k] >= s.__ll__parent__.length) {
				return false;
			}
			if (!s.__ll__parent__[s[k]][f_n]) {
				r = s.callParent(f_n, args);
			} else {
				r = s.__ll__parent__[s[k]][f_n].apply(s, args);
			}
			if (init) {
				delete s[k];
			}
			return r;
		},
		copyProperty : function (a) {
			var s = this, k;
			for (k in a) {
				if (typeof a[k] == "number" || typeof a[k] == "string" || typeof a[k] == "boolean") {
					if (k == "objectindex" || k == "objectIndex") {
						continue;
					}
					s[k] = a[k];
				} else if (Array.isArray(a[k])) {
					s[k] = a[k].slice();
				} 
			}
			if (a.mask) {
				s.mask = a.mask.clone();
			}
		},
		toString : function () {
			return "[object " + this.constructor.name + "]";
		}
	};
	return LObject;
})();