/** @language chinese
 * 用指定的颜色通道值和 Alpha 值为显示对象创建 LColorTransform 对象。
 * 可使用 LColorTransform 类调整显示对象的颜色值。可以将颜色调整或颜色转换应用于所有四种通道：红色、绿色、蓝色和 Alpha 透明度。
 * 当 LColorTransform 对象应用于显示对象时，将按如下方法为每个颜色通道计算新值：
 * ・新红色值 = (旧红色值 * redMultiplier) + redOffset
 * ・新绿色值 = (旧绿色值 * greenMultiplier) + greenOffset
 * ・新蓝色值 = (旧蓝色值 * blueMultiplier) + blueOffset
 * ・新 Alpha 值 = (旧 Alpha 值 * alphaMultiplier) + alphaOffset
 * 如果计算后任何一个颜色通道值大于 255，则该值将被设置为 255。如果该值小于 0，它将被设置为 0。
 * 可以通过下列方式使用 LColorTransform 对象：
 * ・在 LBitmapData 类的 colorTransform() 方法的 colorTransform 参数中
 * @class LColorTransform
 * @extends LObject
 * @constructor
 * @param {float} redMultiplier 红色乘数的值，在 0 到 1 范围内。
 * @param {float} greenMultiplier 绿色乘数的值，在 0 到 1 范围内。
 * @param {float} blueMultiplier 蓝色乘数的值，在 0 到 1 范围内。
 * @param {float} alphaMultiplier Alpha 透明度乘数的值，在 0 到 1 范围内。
 * @param {float} redOffset 红色通道值的偏移量，在 -255 到 255 范围内。
 * @param {float} greenOffset 绿色通道值的偏移量，在 -255 到 255 范围内。
 * @param {float} blueOffset 蓝色通道值的偏移量，在 -255 到 255 范围内。
 * @param {float} alphaOffset Alpha 透明度通道值的偏移量，在 -255 到 255 范围内。
 * @since 1.9.4
 * @public
 */
/** @language english
 * Creates a LColorTransform object for a display object with the specified color channel values and alpha values.
 * The ColorTransform class lets you adjust the color values in a display object. The color adjustment or color transformation can be applied to all four channels: red, green, blue, and alpha transparency.
 * When a ColorTransform object is applied to a display object, a new value for each color channel is calculated like this:
 * ・New red value = (old red value * redMultiplier) + redOffset
 * ・New green value = (old green value * greenMultiplier) + greenOffset
 * ・New blue value = (old blue value * blueMultiplier) + blueOffset
 * ・New alpha value = (old alpha value * alphaMultiplier) + alphaOffset
 * If any of the color channel values is greater than 255 after the calculation, it is set to 255. If it is less than 0, it is set to 0.
 * You can use ColorTransform objects in the following ways:
 * ・In the colorTransform parameter of the colorTransform() method of the LBitmapData class
 * @class LColorTransform
 * @extends LObject
 * @constructor
 * @param {float} redMultiplier The value for the red multiplier, in the range from 0 to 1.
 * @param {float} greenMultiplier The value for the green multiplier, in the range from 0 to 1.
 * @param {float} blueMultiplier The value for the blue multiplier, in the range from 0 to 1.
 * @param {float} alphaMultiplier The value for the alpha transparency multiplier, in the range from 0 to 1.
 * @param {float} redOffset The offset value for the red color channel, in the range from -255 to 255.
 * @param {float} greenOffset The offset value for the green color channel, in the range from -255 to 255.
 * @param {float} blueOffset The offset for the blue color channel value, in the range from -255 to 255.
 * @param {float} alphaOffset The offset for alpha transparency channel value, in the range from -255 to 255.
 * @since 1.9.4
 * @public
 */
/** @language japanese
 * 指定されたカラーチャンネル値とアルファ値を持つ LColorTransform オブジェクトを作成します。
 * LColorTransform クラスを使用すると、表示オブジェクトのカラー値を調整することができます。カラー調整、つまり "カラー変換" は、赤、緑、青、アルファ透明度の 4 つのチャンネルすべてに適用できます。
 * LColorTransform オブジェクトを表示オブジェクトに適用するときに、各カラーチャンネルの新しい値を算出する方法は次のとおりです。
 * ・新しい red 値 = (古い red 値 * redMultiplier ) + redOffset
 * ・新しい green 値 = (古い green 値 * greenMultiplier ) + greenOffset
 * ・新しい blue 値 = (古い blue 値 * blueMultiplier ) + blueOffset
 * ・新しい alpha 値 = (古い alpha 値 * alphaMultiplier ) + alphaOffset
 * 算出後、カラーチャンネル値が 255 よりも大きい場合は 255 に設定されます。0 より小さい場合は 0 に設定されます。
 * LColorTransform オブジェクトは次のように使用できます。
 * ・colorTransform パラメーター（LBitmapData クラスの colorTransform() メソッド）に設定します。
 * @class LColorTransform
 * @extends LObject
 * @constructor
 * @param {float} redMultiplier 赤の乗数の値（0 ～ 1）です。
 * @param {float} greenMultiplier 緑の乗数の値（0 ～ 1）です。
 * @param {float} blueMultiplier 青の乗数の値（0 ～ 1）です。
 * @param {float} alphaMultiplier アルファ透明度の乗数の値（0 ～ 1）です。
 * @param {float} redOffset 赤のカラーチャンネルのオフセット値（-255 ～ 255）です。
 * @param {float} greenOffset 緑のカラーチャンネルのオフセット値（-255 ～ 255）です。
 * @param {float} blueOffset 青のカラーチャンネルのオフセット値（-255 ～ 255）です。
 * @param {float} alphaOffset アルファ透明度のチャンネル値のオフセット（-255 ～ 255）です。
 * @since 1.9.4
 * @public
 */
var LColorTransform = (function () {
	function LColorTransform (redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
		var s = this;
		LExtends (s, LObject, []);
		s.redMultiplier = redMultiplier;
		s.greenMultiplier = greenMultiplier;
		s.blueMultiplier = blueMultiplier;
		s.alphaMultiplier = alphaMultiplier;
		s.redOffset = redOffset;
		s.greenOffset = greenOffset;
		s.blueOffset = blueOffset;
		s.alphaOffset = alphaOffset;
	}
	return LColorTransform;
})();