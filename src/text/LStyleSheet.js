/** @language chinese
 * <p>使用 StyleSheet 类可以创建包含文本格式设置规则（例如，字体大小、颜色和其他格式样式）的 StyleSheet 对象。然后，可以将样式表定义的样式应用到包含 HTML 或 XML 格式文本的 TextField 对象。根据 StyleSheet 对象定义的标签样式自动设置 TextField 对象中文本的格式。可以使用文本样式来定义新的格式标签，重新定义内置的 HTML 标签，或创建可应用到某些 HTML 标签的样式类。</p>
 * <p>要对一个 TextField 对象应用样式，请将该 StyleSheet 对象赋给 TextField 对象的 styleSheet 属性。</p>
 * <p>注意：具有样式表的文本字段不可编辑。</p>
 * <p>下表显示目前支持的层叠样式表 (CSS) 属性和值。</p>
 * <table>
 * <tr><th>CSS 属性</th><th>用法和支持的值</th></tr>
 * <tr><td>color</td><td>颜色。</td></tr>
 * <tr><td>font-family</td><td>字体名称。</td></tr>
 * <tr><td>font-size</td><td>文本大小。</td></tr>
 * <tr><td>font-style</td><td>可识别的值为 normal 和 italic。</td></tr>
 * <tr><td>font-weight</td><td>可识别的值为 normal 和 bold。</td></tr>
 * <tr><td>text-decoration</td><td>可识别的值为 none 和 underline。</td></tr>
 * </table>
 * @class LStyleSheet
 * @extends LObject
 * @constructor
 * @example
 * 	var styleSheet = new LStyleSheet();
 * 	styleSheet.setStyle(".test","{color:#FF0000;font-size:40}");
 * 	styleSheet.setStyle("myText","{color:#008800;font-size:30}");
 * 	var theTextField = new LTextField();
 * 	theTextField.htmlText = "ABC<span class='test'>ABC<myText><i>ABC</i>ABC</myText>ABC</span>ABC<b>ABC</b><u>ABC</u>";
 * 	theTextField.x = 10;
 * 	theTextField.y = 100;
 * 	theTextField.styleSheet = styleSheet;
 * 	addChild(theTextField);
 * @examplelink <p><a href="../../../api/LTextField/styleSheet.html" target="_blank">测试链接</a></p>
 * @since 1.9.8
 * @public
 */
/** @language english
 * ...
 * @class LStyleSheet
 * @extends LObject
 * @constructor
 * @since 1.9.8
 * @public
 */
/** @language japanese
 * ...
 * @class LStyleSheet
 * @extends LObject
 * @constructor
 * @since 1.9.8
 * @public
 */
LStyleSheet = (function() {
	function LStyleSheet() {
		var s = this;
		LExtends(s, LObject, []);
		s.styleNames  = {};
	}
	LStyleSheet.prototype.clone = function() {
		var s = this, a = new s.constructor();
		a.copyProperty(s);
		return a;
	};
	/** @language chinese
	 * 将具有指定名称的新样式添加到样式表对象中。如果该样式表中没有指定名称的样式，将添加该样式。如果该样式表中已经有指定名称的样式，将替换该样式。如果 styleObject 参数为 null，则删除指定名称的样式。
	 * @param {string} styleName 一个字符串，用于指定要添加到样式表中的样式的名称。
	 * @param {string} styleObject 一个说明样式的对象，或 null。
	 * @method setStyle
	 * @since 1.9.8
	 * @public
	 * @example
	 * 	var styleSheet = new LStyleSheet();
	 * 	styleSheet.setStyle(".test","{color:#FF0000;font-size:40}");
	 * 	styleSheet.setStyle("myText","{color:#008800;font-size:30}");
	 * 	var theTextField = new LTextField();
	 * 	theTextField.htmlText = "ABC<span class='test'>ABC<myText><i>ABC</i>ABC</myText>ABC</span>ABC<b>ABC</b><u>ABC</u>";
	 * 	theTextField.x = 10;
	 * 	theTextField.y = 100;
	 * 	theTextField.styleSheet = styleSheet;
	 * 	addChild(theTextField);
	 * @examplelink <p><a href="../../../api/LTextField/styleSheet.html" target="_blank">测试链接</a></p>
	 */
	/** @language english
	 * ......
	 * @method setStyle
	 * @since 1.9.8
	 * @public
	 */
	/** @language japanese
	 * ......
	 * @method setStyle
	 * @since 1.9.8
	 * @public
	 */
	LStyleSheet.prototype.setStyle = function(styleName, styleObject) {
		if (styleObject === null) {
			if (this.styleNames[styleName]) {
				delete this.styleNames[styleName];
			}
			return;
		}
		var arr = styleObject.replace(/(^\{)|(\}$)/g, "").split(";"), i, styleObjects;
		styleObject = {};
		for ( i = 0; i < arr.length; i++) {
			if (!arr[i]) {
				continue;
			}
			var styleObjects = arr[i].split(":");
			if (!styleObjects[0]) {
				continue;
			}
			styleObject[styleObjects[0]] = styleObjects[1];
		}
		this.styleNames[styleName] = styleObject;
	};
	/** @language chinese
	 * 返回与名为 styleName 的样式相关联的样式对象的一个副本。如果没有与 styleName 相关联的样式对象，则返回 null。
	 * @param {string} styleName 一个字符串，该字符串指定要检索的样式的名称。
	 * @method getStyle
	 * @return {Object} 一个对象。
	 * @since 1.9.8
	 * @public
	 */
	/** @language english
	 * ......
	 * @method getStyle
	 * @since 1.9.8
	 * @public
	 */
	/** @language japanese
	 * ......
	 * @method getStyle
	 * @since 1.9.8
	 * @public
	 */
	LStyleSheet.prototype.getStyle = function(styleName) {
		return this.styleNames[styleName];
	};
	return LStyleSheet;
})();
