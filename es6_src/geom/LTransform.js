/** @language chinese
 * 利用 LTransform 类，可以访问可应用于显示对象的二维转换对象。
 * 要应用二维转换，请执行下列操作：创建一个 LMatrix 对象，并设置该矩阵的二维转换，然后将显示对象的 transform.matrix 属性分配给新的 LMatrix 对象。
 * @class LTransform
 * @extends LObject
 * @constructor
 * @since 1.9.8
 * @public
 */
/** @language english
 * ......
 * @class LTransform
 * @extends LObject
 * @constructor
 * @since 1.9.8
 * @public
 */
/** @language japanese
 * ......
 * @class LTransform
 * @extends LObject
 * @constructor
 * @since 1.9.8
 * @public
 */
var LTransform = (function () {
	function LTransform () {
		var s = this;
		LExtends (s, LObject, []);
		s.matrix = null;
	}
	return LTransform;
})();