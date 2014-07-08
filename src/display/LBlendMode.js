/** @language chinese
 * 提供混合模式可视效果的常量值的类。
 * @class LBlendMode
 * @constructor
 * @example
 * 	var imgLayer = new LSprite();
 * 	var back = new LBitmap(new LBitmapData(dataList["back"]));
 * 	imgLayer.addChild(back);
 * 	var img = new LBitmap(new LBitmapData(dataList["img"]));
 * 	imgLayer.addChild(img);
 * 	img.blendMode = LBlendMode.LIGHTER;
 * @examplelink <p><a href="../../../api/LBlendMode/index.html" target="_blank">测试链接</a></p>
 * @since 1.8.0
 * @public
 */
/** @language english
 * A class that provides constant values for visual blend mode effects.
 * @class LBlendMode
 * @constructor
 * @example
 * 	var imgLayer = new LSprite();
 * 	var back = new LBitmap(new LBitmapData(dataList["back"]));
 * 	imgLayer.addChild(back);
 * 	var img = new LBitmap(new LBitmapData(dataList["img"]));
 * 	imgLayer.addChild(img);
 * 	img.blendMode = LBlendMode.LIGHTER;
 * @examplelink <p><a href="../../../api/LBlendMode/index.html" target="_blank">Try it »</a></p>
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * ブレンドモードの視覚効果のために定数値を提供するクラスです。
 * @class LBlendMode
 * @constructor
 * @example
 * 	var imgLayer = new LSprite();
 * 	var back = new LBitmap(new LBitmapData(dataList["back"]));
 * 	imgLayer.addChild(back);
 * 	var img = new LBitmap(new LBitmapData(dataList["img"]));
 * 	imgLayer.addChild(img);
 * 	img.blendMode = LBlendMode.LIGHTER;
 * @examplelink <p><a href="../../../api/LBlendMode/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.8.0
 * @public
 */
function LBlendMode () {throw "LBlendMode cannot be instantiated";}
/** @language chinese
 * [静态] 新图形绘制于已有图形的顶部。这是默认的行为。
 * @property SOURCE_OVER
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language english
 * [static] Default. Displays the source image over the destination image
 * @property SOURCE_OVER
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * [静的] A over B。描画元イメージのうち、描画元イメージが不透明な部分が表示されます。それ以外の部分では描画先イメージが表示されます。
 * @property SOURCE_OVER
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.SOURCE_OVER = "source-over";
/** @language chinese
 * [静态] 只有在新图形和已有内容重叠的地方，才绘制新图形。
 * @property SOURCE_ATOP
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language english
 * [static] Displays the source image on top of the destination image. The part of the source image that is outside the destination image is not shown
 * @property SOURCE_ATOP
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * [静的] A atop B。描画元イメージのうち、両方のイメージが不透明な部分が表示されます。描画先イメージのうち、描画先イメージが不透明で、描画元イメージが透明な部分が表示されます。それ以外の部分は透明となります。
 * @property SOURCE_ATOP
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.SOURCE_ATOP = "source-atop";
/** @language chinese
 * [静态] 在新图形以及已有内容重叠的地方，新图形才绘制。所有其他内容成为透明。
 * @property SOURCE_IN
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language english
 * [static] Displays the source image in to the destination image. Only the part of the source image that is INSIDE the destination image is shown, and the destination image is transparent
 * @property SOURCE_IN
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * [静的] A in B。描画元イメージのうち、描画元イメージと描画先イメージともに不透明な部分が表示されます。それ以外の部分は透明となります。
 * @property SOURCE_IN
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.SOURCE_IN = "source-in";
/** @language chinese
 * [静态] 只有在和已有图形不重叠的地方，才绘制新图形。
 * @property SOURCE_OUT
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language english
 * [static] Displays the source image out of the destination image. Only the part of the source image that is OUTSIDE the destination image is shown, and the destination image is transparent
 * @property SOURCE_OUT
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * [静的] A out B。描画元イメージのうち、描画元イメージが不透明で、描画先イメージが透明な部分が表示されます。それ以外の部分は透明となります。
 * @property SOURCE_OUT
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.SOURCE_OUT = "source-out";
/** @language chinese
 * [静态] 新图形绘制于已有内容的后面。
 * @property DESTINATION_OVER
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language english
 * [static] Displays the destination image over the source image
 * @property DESTINATION_OVER
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * [静的] B over A。source-over と同じですが、描画元イメージの代わりに描画先イメージを使います。
 * @property DESTINATION_OVER
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.DESTINATION_OVER = "destination-over";
/** @language chinese
 * [静态] 已有的内容只有在它和新的图形重叠的地方保留。新图形绘制于内容之后。
 * @property DESTINATION_ATOP
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language english
 * [static] Displays the destination image on top of the source image. The part of the destination image that is outside the source image is not shown
 * @property DESTINATION_ATOP
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * [静的] B atop A。source-atop と同じですが、描画元イメージの代わりに描画先イメージを使います。
 * @property DESTINATION_ATOP
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.DESTINATION_ATOP = "destination-atop";
/** @language chinese
 * [静态] 在新图形以及已有画布重叠的地方，已有内容都保留。所有其他内容成为透明的。
 * @property DESTINATION_IN
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language english
 * [static] Displays the destination image in to the source image. Only the part of the destination image that is INSIDE the source image is shown, and the source image is transparent
 * @property DESTINATION_IN
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * [静的] B in A。source-in と同じですが、描画元イメージの代わりに描画先イメージを使います。
 * @property DESTINATION_IN
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.DESTINATION_IN = "destination-in";
/** @language chinese
 * [静态] 在已有内容和新图形不重叠的地方，已有内容保留。所有其他内容成为透明。
 * @property DESTINATION_OUT
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language english
 * [static] Displays the destination image out of the source image. Only the part of the destination image that is OUTSIDE the source image is shown, and the source image is transparent
 * @property DESTINATION_OUT
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * [静的] B out A。source-out と同じですが、描画元イメージの代わりに描画先イメージを使います。
 * @property DESTINATION_OUT
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.DESTINATION_OUT = "destination-out";
/** @language chinese
 * [静态] 在图形重叠的地方，颜色由两种颜色值的加值来决定。
 * @property LIGHTER
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language english
 * [static] Displays the source image + the destination image
 * @property LIGHTER
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * [静的] A plus B。描画元イメージと描画先イメージの重なった部分は、limit として 1 に近づく色の値を使って表示されます。
 * @property LIGHTER
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.LIGHTER = "lighter";
/** @language chinese
 * [静态] 只绘制新图形，删除其他所有内容。
 * @property COPY
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language english
 * [static] Displays the source image. The destination image is ignored
 * @property COPY
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * [静的] A (B は無視されます)。描画先イメージの代わりに描画元イメージが表示されます。
 * @property COPY
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.COPY = "copy";
/** @language chinese
 * [静态] 在重叠和正常绘制的其他地方，图形都成为透明的。
 * @property XOR
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language english
 * [static] The source image is combined by using an exclusive OR with the destination image
 * @property XOR
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * [静的] A xor B。描画元イメージと描画先イメージの排他的論理和となります。
 * @property XOR
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.XOR = "xor";
/** @language chinese
 * [静态] 不使用混合模式。
 * @property NONE
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language english
 * [static] Do not use the blend mode
 * @property NONE
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * [静的] ブレンドモードの視覚効果を使わない。
 * @property NONE
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.NONE = null;
/** @language chinese
 * [静态] 等同于NONE。
 * @property NORMAL
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language english
 * [static] Equivalent to NONE.
 * @property NORMAL
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
/** @language japanese
 * [静的] NONEと同じです。
 * @property NORMAL
 * @type String
 * @static
 * @since 1.8.0
 * @public
 */
LBlendMode.NORMAL = null;