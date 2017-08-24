/** @language chinese
 * 创建新的 LTextField 实例。在创建 LTextField 实例后，调用父 LSprite 对象的 addChild() 或 addChildAt() 方法可将 LTextField 实例添加到显示列表中。
 * LTextField 类的方法允许您设置、选择并操作在创作过程中或运行时创建的动态或输入文本字段中的文本。
 * @class LTextField
 * @extends LInteractiveObject
 * @constructor
 * @example
 * 	var theTextField = new LTextField();
 * 	theTextField.setType(LTextFieldType.INPUT);
 * 	theTextField.x = 10;
 * 	theTextField.y = 10;
 * 	addChild(theTextField);
 * @examplelink <p><a href="../../../api/LTextField/index.html" target="_blank">测试链接</a></p>
 * @since 1.0.0
 * @public
 */
/** @language english
 * Creates a new LTextField instance. After you create the LTextField instance, call the addChild() or addChildAt() method of the parent LSprite object to add the LTextField instance to the display list.
 * The methods of the LTextField class let you set, select, and manipulate text in a dynamic or input text field that you create during authoring or at runtime.
 * @class LTextField
 * @extends LInteractiveObject
 * @constructor
 * @example
 * 	var theTextField = new LTextField();
 * 	theTextField.setType(LTextFieldType.INPUT);
 * 	theTextField.x = 10;
 * 	theTextField.y = 10;
 * 	addChild(theTextField);
 * @examplelink <p><a href="../../../api/LTextField/index.html" target="_blank">Try it »</a></p>
 * @since 1.0.0
 * @public
 */
/** @language japanese
 * 新しい LTextField インスタンスを作成します。LTextField インスタンスの作成後、親 LSprite オブジェクトの addChild() メソッドまたは addChildAt() メソッドを呼び出し、LTextField インスタンスを表示リストに追加します。
 * LTextField クラスのメソッドを使用すると、オーサリング時または実行時に作成したダイナミックテキストフィールドやテキスト入力フィールドにテキストを設定、選択、および操作できます。
 * @class LTextField
 * @extends LInteractiveObject
 * @constructor
 * @example
 * 	var theTextField = new LTextField();
 * 	theTextField.setType(LTextFieldType.INPUT);
 * 	theTextField.x = 10;
 * 	theTextField.y = 10;
 * 	addChild(theTextField);
 * @examplelink <p><a href="../../../api/LTextField/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 */
var LTextField = (function () {
	function LTextField () {
		var s = this;
		LExtends(s, LInteractiveObject, []);
		/** @language chinese
		 * 对象的类型
		 * @property type
		 * @type String
		 * @default LTextField
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * type of the object
		 * @property type
		 * @type String
		 * @default LTextField
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * オブジェクトのタイプ
		 * @property type
		 * @type String
		 * @default LTextField
		 * @since 1.0.0
		 * @public
		 */
		s.type = "LTextField";
		s.texttype = null;
		/** @language chinese
		 * 作为文本字段中当前文本的字符串。各行之间用回车符（'\n'）分隔。
		 * @property text
		 * @type String
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * A string that is the current text in the text field. Lines are separated by the carriage return character ('\n').
		 * @property text
		 * @type String
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * テキストフィールド内の現在のテキストであるストリングです。行は復帰文字（'\n'）で区切られます。
		 * @property text
		 * @type String
		 * @since 1.0.0
		 * @public
		 */
		s.text = "";
		/** @language chinese
		 * 包含文本字段内容的 HTML 表示形式。
		 * 目前支持以下 HTML 标签：
		 * <table>
		 * <tr><th>标签</th><th>说明</th></tr>
		 * <tr><td>粗体标签</td><td>&lt;b> 标签以粗体形式呈现文本。粗体必须可用于所使用的字体。</td></tr>
		 * <tr><td>字体标签</td><td>&lt;font> 标签指定一种字体或一个字体列表来显示文本。字体标签支持以下属性：
		 *  <p>・color：字体的颜色。</p>
		 *  <p>・face：指定要使用的字体的名称。</p>
		 *  <p>・size：指定字体的大小。</p>
		 * 	</td></tr>
		 * <tr><td>斜体标签</td><td>&lt;i> 标签以斜体形式显示标签中的文本。斜体必须可用于所使用的字体。</td></tr>
		 * <tr><td>段落标签</td><td>&lt;p> 标签创建一个新段落。必须将文本字段设置为多行文本字段才能使用此标签。</td></tr>
		 * <tr><td>span 标签</td><td>&lt;span> 标签只可用于 CSS 文本样式。它支持以下属性：<p>・class：指定 LStyleSheet 对象定义的 CSS 样式类。</p></td></tr>
		 * <tr><td>下划线标签</td><td>&lt;u> 标签为标签文本添加下划线。</td></tr>
		 * </table>
		 * @property htmlText
		 * @type String
		 * @since 1.9.8
		 * @public
		 * @example
		 *	var theTextField = new LTextField();
		 *	theTextField.setWordWrap(true,30);
		 *	theTextField.htmlText = "ABC<font face='Book Antiqua' color=\"#FF0000\" size='20'>A<p>B</p>C<font color='#008800' size='24'><i>ABC</i><font size='15'>ABC</font></font>ABC</font>ABC<b>ABC</b><u>ABC</u>";
		 *	theTextField.x = 10;
		 *	theTextField.y = 100;
		 *	theTextField.textBaseline = "alphabetic";
		 *	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/htmlText.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * ......
		 * @property htmlText
		 * @type String
		 * @since 1.9.8
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @property htmlText
		 * @type String
		 * @since 1.9.8
		 * @public
		 */
		s.htmlText = "";
		/** @language chinese
		 * 将样式表附加到文本字段。有关创建样式表的信息，请参阅 <a href="LStyleSheet.html">LStyleSheet</a> 类
		 * @property styleSheet
		 * @type LStyleSheet
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
		 * @property styleSheet
		 * @type LStyleSheet
		 * @since 1.9.8
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @property styleSheet
		 * @type LStyleSheet
		 * @since 1.9.8
		 * @public
		 */
		s.styleSheet = "";
		/** @language chinese
		 * 使用此文本格式的文本的字体名称，以字符串形式表示。
		 * @property font
		 * @type String
		 * @since 1.0.0
		 * @default Arial
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "font test";
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.font = "Georgia";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/font.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * The name of the font for text in this text format, as a string. The default value is null, which means that Flash Player uses Times New Roman font for the text.
		 * @property font
		 * @type String
		 * @since 1.0.0
		 * @default Arial
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "font test";
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.font = "Georgia";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/font.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * このテキストフォーマットでのテキストフォント名を示すストリングです。デフォルト値は null で、Flash Player ではテキストに Times New Roman フォントが使用されます。
		 * @property font
		 * @type String
		 * @since 1.0.0
		 * @default Arial
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "font test";
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.font = "Georgia";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/font.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.font = "Arial";
		/** @language chinese
		 * 使用此文本格式的文本的大小（以像素为单位）。
		 * @property size
		 * @type int
		 * @since 1.0.0
		 * @default 11
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "size test";
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.size = 20;
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/size.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * The size in pixels of text in this text format. 
		 * @property size
		 * @type int
		 * @since 1.0.0
		 * @default 11
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "size test";
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.size = 20;
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/size.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * このテキストフォーマットのテキストのサイズ（ピクセル単位）です。
		 * @property size
		 * @type int
		 * @since 1.0.0
		 * @default 11
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "size test";
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.size = 20;
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/size.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.size = 15;
		/** @language chinese
		 * 表示文本的颜色。
		 * @property color
		 * @type String
		 * @since 1.0.0
		 * @default "#000000"
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "color test";
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.color = "#FF0000";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/color.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * Indicates the color of the text. 
		 * @property color
		 * @type String
		 * @since 1.0.0
		 * @default "#000000"
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "color test";
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.color = "#FF0000";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/color.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * テキストの色を示します。
		 * @property color
		 * @type String
		 * @since 1.0.0
		 * @default "#000000"
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "color test";
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.color = "#FF0000";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/color.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.color = "#000000";
		/** @language chinese
		 * 规定字体的粗细。
		 * @property weight
		 * @type String
		 * @since 1.0.0
		 * @default normal
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "weight test";
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.weight = "bolder";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/weight.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * Specifies whether the text is boldface.
		 * @property weight
		 * @type String
		 * @since 1.0.0
		 * @default normal
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "weight test";
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.weight = "bolder";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/weight.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * テキストをボールドにするかどうかを指定します。
		 * @property weight
		 * @type String
		 * @since 1.0.0
		 * @default normal
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "weight test";
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.weight = "bolder";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/weight.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.weight = "normal";
		/** @language chinese
		 * 表示段落的对齐方式(水平)。
		 * @property textAlign
		 * @type String
		 * @since 1.0.0
		 * @default left
		 * @public
		 */
		/** @language english
		 * Indicates the alignment of the paragraph(horizontal).
		 * @property textAlign
		 * @type String
		 * @since 1.0.0
		 * @default left
		 * @public
		 */
		/** @language japanese
		 * 段落の行揃えの設定を示します(水平)。
		 * @property textAlign
		 * @type String
		 * @since 1.0.0
		 * @default left
		 * @public
		 */
		s.textAlign = "left";
		/** @language chinese
		 * 表示段落的对齐方式(竖直)。
		 * @property textBaseline
		 * @type String
		 * @since 1.0.0
		 * @default top
		 * @public
		 */
		/** @language english
		 * Indicates the alignment of the paragraph(vertical).
		 * @property textBaseline
		 * @type String
		 * @since 1.0.0
		 * @default top
		 * @public
		 */
		/** @language japanese
		 * 段落の行揃えの設定を示します(垂直)。
		 * @property textBaseline
		 * @type String
		 * @since 1.0.0
		 * @default top
		 * @public
		 */
		s.textBaseline = "top";
		/** @language chinese
		 * <p>获取文字高度的时候，是否以［gjpqy］为标准。</p>
		 * <p>可以设定的值有下面两种：</p>
		 * <p>LTextField.HEIGHT_MODE_BOTTOM：获取文字高度时，不考虑［gjpqy］的下半部。</p>
		 * <p>LTextField.HEIGHT_MODE_BASELINE：获取文字高度时，考虑［gjpqy］的下半部。</p>
		 * <p>也就是说使用LTextField.HEIGHT_MODE_BASELINE获取高度，比LTextField.HEIGHT_MODE_BOTTOM要略大。</p>
		 * <p>注意：HTML5中没有直接获取文字高度的方法，所以这两种方式无论使用哪一种获取的高度都无法绝对准确。</p>
		 * @property heightMode
		 * @type float
		 * @since 1.9.1
		 * @default LTextField.HEIGHT_MODE_BOTTOM
		 * @public
		 */
		s.heightMode = LTextField.HEIGHT_MODE_BOTTOM;
		/** @language chinese
		 * 文字描边效果。
		 * @property stroke
		 * @type String
		 * @since 1.0.0
		 * @default false
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "stroke test";
		 * 	theTextField.size = 50;
		 * 	theTextField.stroke = true;
		 * 	theTextField.lineWidth = 2;
		 * 	theTextField.lineColor = "#FF0000";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/stroke.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * Text effects of stroke.
		 * @property stroke
		 * @type String
		 * @since 1.0.0
		 * @default false
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "stroke test";
		 * 	theTextField.size = 50;
		 * 	theTextField.stroke = true;
		 * 	theTextField.lineWidth = 2;
		 * 	theTextField.lineColor = "#FF0000";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/stroke.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * テキストエフェクト。
		 * @property stroke
		 * @type String
		 * @since 1.0.0
		 * @default false
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "stroke test";
		 * 	theTextField.size = 50;
		 * 	theTextField.stroke = true;
		 * 	theTextField.lineWidth = 2;
		 * 	theTextField.lineColor = "#FF0000";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/stroke.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.stroke = false;
		/** @language chinese
		 * 文字描边效果的线宽。
		 * @property lineWidth
		 * @type int
		 * @since 1.0.0
		 * @default 1
		 * @public
		 */
		/** @language english
		 * The line's size of stroke.
		 * @property lineWidth
		 * @type int
		 * @since 1.0.0
		 * @default 1
		 * @public
		 */
		/** @language japanese
		 * テキストエフェクトの線のサイズ。
		 * @property lineWidth
		 * @type int
		 * @since 1.0.0
		 * @default 1
		 * @public
		 */
		s.lineWidth = 1;
		/** @language chinese
		 * 文字描边效果的线的颜色。
		 * @property lineColor
		 * @type String
		 * @since 1.0.0
		 * @default "#000000"
		 * @public
		 */
		/** @language english
		 * The line's color of stroke.
		 * @property lineColor
		 * @type String
		 * @since 1.0.0
		 * @default "#000000"
		 * @public
		 */
		/** @language japanese
		 * テキストエフェクトの線の色。
		 * @property lineColor
		 * @type String
		 * @since 1.0.0
		 * @default "#000000"
		 * @public
		 */
		s.lineColor = "#000000";
		/** @language chinese
		 * 当设置换行有效(setWordWrap(true))的时候，可以通过它来设置文字宽度。
		 * @property width
		 * @type int
		 * @since 1.0.0
		 * @default 150
		 * @public
		 */
		/** @language english
		 * When  the text field has word wrap , you can set the width of the display object, in pixels.
		 * @property width
		 * @type int
		 * @since 1.0.0
		 * @default 150
		 * @public
		 */
		/** @language japanese
		 * 折り返す時、表示オブジェクトの幅を設定することができます。
		 * @property width
		 * @type int
		 * @since 1.0.0
		 * @default 150
		 * @public
		 */
		s.width = 150;
		s.height = s.size;
		/** @language chinese
		 * 指定文本字段是否是密码文本字段。如果此属性的值为 true，则文本字段被视为密码文本字段，并使用星号而不是实际字符来隐藏输入的字符。如果为 false，则不会将文本字段视为密码文本字段。
		 * @property displayAsPassword
		 * @type Boolean
		 * @since 1.0.0
		 * @default false
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.setType(LTextFieldType.INPUT);
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.displayAsPassword = true;
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/displayAsPassword.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * Specifies whether the text field is a password text field. If the value of this property is true, the text field is treated as a password text field and hides the input characters using asterisks instead of the actual characters. If false, the text field is not treated as a password text field. 
		 * @property displayAsPassword
		 * @type Boolean
		 * @since 1.0.0
		 * @default false
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.setType(LTextFieldType.INPUT);
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.displayAsPassword = true;
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/displayAsPassword.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * テキストフィールドがパスワードテキストフィールドであるかどうかを指定します。このプロパティの値が true である場合、テキストフィールドはパスワードテキストフィールドとして扱われ、入力された文字は実際の文字の代わりにアスタリスクで隠されます。false である場合、テキストフィールドはパスワードテキストフィールドとして扱われません。
		 * @property displayAsPassword
		 * @type Boolean
		 * @since 1.0.0
		 * @default false
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.setType(LTextFieldType.INPUT);
		 * 	theTextField.x = 10;
		 * 	theTextField.y = 10;
		 * 	theTextField.displayAsPassword = true;
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/displayAsPassword.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.displayAsPassword = false;
		s.wordWrap = false;
		s.multiline = false;
		/** @language chinese
		 * [只读]定义多行文本字段中的文本行数。如果 setWordWrap(true)，则在文本自动换行时会增加行数。
		 * @property numLines
		 * @type int
		 * @since 1.9.0
		 * @public
		 */
		/** @language english
		 * Defines the number of text lines in a multiline text field. If setWordWrap(true), the number of lines increases when text wraps.
		 * @property numLines
		 * @type int
		 * @since 1.9.0
		 * @public
		 */
		/** @language japanese
		 * 複数行テキストフィールド内のテキスト行の数を定義します。setWordWrap(true)の場合、テキストが折り返されると行数は増えます。
		 * @property numLines
		 * @type int
		 * @since 1.9.0
		 * @public
		 */
		s.numLines = 1;
		/** @language chinese
		 * 文本逐字显示的速度
		 * @property speed
		 * @type int
		 * @default 0
		 * @since 1.0.0
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var theTextField = new LTextField();
		 * 		theTextField.text = "wait click";
		 * 		theTextField.x = 10;
		 * 		theTextField.y = 10;
		 * 		theTextField.size = 20;
		 * 		addChild(theTextField);
		 * 		var button = new LButtonSample1("wind test start");
		 * 		button.textField = theTextField;
		 * 		button.x = 10;
		 * 		button.y = 100;
		 * 		addChild(button);
		 * 		button.addEventListener(LMouseEvent.MOUSE_DOWN, onclick);
		 * 	}
		 * 	function windOver(event){
		 * 		var theTextField = event.target;
		 * 		theTextField.removeEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 		theTextField.text = "wind over";
		 * 	}
		 * 	function onclick(event){
		 * 	var theTextField = event.currentTarget.textField;
		 * 		if (theTextField.hasEventListener(LTextEvent.WIND_COMPLETE)) {
		 * 			theTextField.removeEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 		}
		 * 		theTextField.text = "TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT";
		 * 		theTextField.speed = 3;
		 * 		theTextField.wind();
		 * 		theTextField.addEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 	}
		 * @examplelink <p><a href="../../../api/LTextField/wind.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * The Text animation's speed.
		 * @property speed
		 * @type int
		 * @default 0
		 * @since 1.0.0
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var theTextField = new LTextField();
		 * 		theTextField.text = "wait click";
		 * 		theTextField.x = 10;
		 * 		theTextField.y = 10;
		 * 		theTextField.size = 20;
		 * 		addChild(theTextField);
		 * 		var button = new LButtonSample1("wind test start");
		 * 		button.textField = theTextField;
		 * 		button.x = 10;
		 * 		button.y = 100;
		 * 		addChild(button);
		 * 		button.addEventListener(LMouseEvent.MOUSE_DOWN, onclick);
		 * 	}
		 * 	function windOver(event){
		 * 		var theTextField = event.target;
		 * 		theTextField.removeEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 		theTextField.text = "wind over";
		 * 	}
		 * 	function onclick(event){
		 * 	var theTextField = event.currentTarget.textField;
		 * 		if (theTextField.hasEventListener(LTextEvent.WIND_COMPLETE)) {
		 * 			theTextField.removeEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 		}
		 * 		theTextField.text = "TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT";
		 * 		theTextField.speed = 3;
		 * 		theTextField.wind();
		 * 		theTextField.addEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 	}
		 * @examplelink <p><a href="../../../api/LTextField/wind.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * テキストを1文字ずつ画面に表示させるスピード。
		 * @property speed
		 * @type int
		 * @default 0
		 * @since 1.0.0
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var theTextField = new LTextField();
		 * 		theTextField.text = "wait click";
		 * 		theTextField.x = 10;
		 * 		theTextField.y = 10;
		 * 		theTextField.size = 20;
		 * 		addChild(theTextField);
		 * 		var button = new LButtonSample1("wind test start");
		 * 		button.textField = theTextField;
		 * 		button.x = 10;
		 * 		button.y = 100;
		 * 		addChild(button);
		 * 		button.addEventListener(LMouseEvent.MOUSE_DOWN, onclick);
		 * 	}
		 * 	function windOver(event){
		 * 		var theTextField = event.target;
		 * 		theTextField.removeEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 		theTextField.text = "wind over";
		 * 	}
		 * 	function onclick(event){
		 * 	var theTextField = event.currentTarget.textField;
		 * 		if (theTextField.hasEventListener(LTextEvent.WIND_COMPLETE)) {
		 * 			theTextField.removeEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 		}
		 * 		theTextField.text = "TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT";
		 * 		theTextField.speed = 3;
		 * 		theTextField.wind();
		 * 		theTextField.addEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 	}
		 * @examplelink <p><a href="../../../api/LTextField/wind.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.speed = 0;
		s._speedIndex = 100;
	}
	LTextField.HEIGHT_MODE_BOTTOM = "bottom";
	LTextField.HEIGHT_MODE_BASELINE = "baseline";
	var p = {
		_showReady : function (c) {
			var s = this;
			c.font = s.weight + " " + s.size + "px " + s.font;  
			c.textAlign = s.textAlign;
			c.textBaseline = s.textBaseline;
		},
		ll_getStyleSheet : function (textFormat, tabName, attribute, text) {
			var s = this, pattern, tf = textFormat.clone();
			if (tabName == "font") {
				var i = 0;
				while (attribute) {
					if (i++ > 4)
						break;
					pattern = /(([^\s]*?)(\s*)=(\s*)("|')(.*?)\5)*/g;
					var arr = pattern.exec(attribute);
					if (!arr || !arr[0]) {
						break;
					}
					switch(arr[2]) {
						case "face":
							tf.font = arr[6];
							break;
						case "color":
							tf.color = arr[6];
							break;
						case "size":
							tf.size = arr[6];
							break;
					}
					attribute = attribute.replace(arr[0], "").replace(/(^\s*)|(\s*$)|(\n)/g, "");
				}
			} else if (tabName == "b") {
				tf.bold = true;
			} else if (tabName == "u") {
				tf.underline = true;
			} else if (tabName == "i") {
				tf.italic = true;
			} else if (tabName == "p" && s.wordWrap) {
				text = "\n" + text + "\n";
			} else if(s.styleSheet){
				var sheetObj;
				if (tabName == "span"){
					pattern = /(([^\s]*?)(\s*)=(\s*)("|')(.*?)\5)*/g;
					var arr = pattern.exec(attribute);
					if (arr && arr[0]) {
						switch(arr[2]) {
							case "class":
								sheetObj = s.styleSheet.getStyle("." + arr[6]);
								break;
						}
					}
				}else if(s.styleSheet.getStyle(tabName)){
					sheetObj = s.styleSheet.getStyle(tabName);
				}
				if(sheetObj){
					tf.setCss(sheetObj);
				}
			}
			s.ll_getHtmlText(tf, text); 
		},
		ll_getHtmlText : function (tf, text) {
			if (!text) {
				return;
			}
			var s = this, tabName, content, start, end, pattern = /<(.*?)(\s*)(.*?)>(.*?)<\/\1>/g, arr = pattern.exec(text);
			if (!arr || !arr[0]) {
				s.ll_htmlTexts.push({
					textFormat : tf.clone(),
					text : text
				});
				return;
			}
			if (arr.index > 0) {
				s.ll_htmlTexts.push({
					textFormat : tf.clone(),
					text : text.substring(0, arr.index)
				});
			}
			tabName = arr[1];
			start = arr.index;
			end = start;
			do {
				end = text.indexOf("</" + tabName, end + 1);
				start = text.indexOf("<" + tabName, start + 1);
			} while(start > 0 && start < end);

			content = text.substring(text.indexOf(">", arr.index) + 1, end);
			s.ll_getStyleSheet(tf, tabName, arr[3], content);
			s.ll_getHtmlText(tf, text.substring(end + tabName.length + 3));
		},
		_ll_show : function (c) {
			var s = this, d, lbl, i, rc, j, l, k, m, b, h, enter, tf, underlineY;
			if (s.texttype == LTextFieldType.INPUT) {
				s.inputBackLayer.ll_show();
				rc = s.getRootCoordinate();
				if (LGlobal.inputBox.name == "input" + s.objectIndex) {
					LGlobal.inputBox.style.marginTop = (parseInt(LGlobal.canvasObj.style.marginTop) + (((rc.y + s.inputBackLayer.startY()) * parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height) >>> 0)) + "px";
					LGlobal.inputBox.style.marginLeft = (parseInt(LGlobal.canvasObj.style.marginLeft) + (((rc.x + s.inputBackLayer.startX()) * parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width) >>> 0)) + "px";
				}
				if (LGlobal.inputTextField && LGlobal.inputTextField.objectIndex == s.objectIndex) {
					return;
				}else{
					c.clip();
				}
			}
			if (LGlobal.fpsStatus) {
				LGlobal.fpsStatus.text++;
			}
			c.fillStyle = s.color;
			if (s.stroke) {
				c.strokeStyle = s.lineColor;
				c.lineWidth = s.lineWidth + 1;  
			}
			if (s.htmlText) {
				if (s.ll_htmlText != s.htmlText || (s.styleSheet && (s.ll_style_objectIndex != s.styleSheet.objectIndex || s.ll_styleIndex == s.styleSheet.styleIndex))) {
					tf = new LTextFormat();
					s.ll_htmlTexts = [];
					s.ll_htmlText = s.htmlText;
					if(s.styleSheet){
						s.ll_style_objectIndex = s.styleSheet.objectIndex;
						s.ll_styleIndex = s.styleSheet.styleIndex;
					}
					s.ll_getHtmlText(tf, s.htmlText);
				}
				j = 0, k = 0, m = 0, b = 0;
				s._ll_height = s.wordHeight || 30;
				if(!LTextField.underlineY){
					LTextField.underlineY = {"alphabetic" : 0, "top" : 1, "bottom" : -0.2, "middle" : 0.4, "hanging" : 0.8};
				}
				s.ll_htmlTexts.forEach(function(element){
					var textFormat = element.textFormat, text = element.text;
					c.font = textFormat.getFontText();
					c.fillStyle = textFormat.color;
					for (i = 0, l = text.length; i < l; i++) {
						enter = /(?:\r\n|\r|\n|¥n)/.exec(text.substr(i, 1));
						if (enter) {
							j = 0;
							k = i + 1;
							m++;
						} else {
							h = c.measureText("O").width * 1.2;
							if (s.stroke) {
								c.strokeText(text.substr(i, 1), j, m * s._ll_height);
							}
							c.fillText(text.substr(i, 1), j, m * s._ll_height);
							if(textFormat.underline){
								c.beginPath();
								underlineY = m * s._ll_height + h * LTextField.underlineY[s.textBaseline];
								c.moveTo(j, underlineY);
								c.lineTo(j + c.measureText(text.substr(i, 1)).width, underlineY);
								c.stroke();
							}
						}
						j += c.measureText(text.substr(i, 1)).width;
						if (s.wordWrap && j + c.measureText(text.substr(i + 1, 1)).width > s.width) {
							j = 0;
							k = i + 1;
							m++;
						}
					}
					s.height = (m + 1) * s._ll_height;
				});
				return;
			}
			lbl = s.text;
			if (s.displayAsPassword) {
				lbl = '';
				for (i=0, l = s.text.length; i < l; i++) {
					lbl += '*';
				}
			}
			if (s.wordWrap || s.multiline) {
				j = 0, k = 0, m = 0, b = 0;
				for (i = 0, l = s.text.length; i < l; i++) {
					enter = /(?:\r\n|\r|\n|¥n)/.exec(lbl.substr(i, 1));
					if (enter) {
						j = 0;
						k = i + 1;
						m++;
					} else {
						if (s.stroke) {
							c.strokeText(lbl.substr(i, 1), j, m * s.wordHeight);
						}
						c.fillText(lbl.substr(i, 1), j, m * s.wordHeight);
					}
					s.numLines = m;
					j = c.measureText(s.text.substr(k, i + 1 - k)).width;
					if (s.wordWrap && j + c.measureText(lbl.substr(i, 1)).width > s.width) {
						j = 0;
						k = i + 1;
						m++;
					}
				}
				s.height = (m + 1) * s.wordHeight;
			} else {
				s.numLines = 1;
				if (s.stroke) {
					c.strokeText(lbl, 0, 0, c.measureText(lbl).width);
				}
				c.fillText(lbl, 0, 0, c.measureText(lbl).width);
			}
			if (s.windRunning) {
				s._ll_windRun();
			}
		},
		_wordHeight : function (h) {
			var s = this;
			if (h > 0) {
				s.wordHeight = h;
			} else {
				s.wordWrap = false;
				s.wordHeight = s.getHeight();
			}
			s.height = 0;
		},
		/** @language chinese
		 * 设置字段是否为多行文本字段。如果值为 true，则文本字段为多行文本字段；如果值为 false，则文本字段为单行文本字段。在类型为 LTextFieldType.INPUT 的字段中，将确定 Enter 键是否创建新行（如果值为 false，则将忽略 Enter 键）。
		 * @method setMultiline
		 * @param {Boolean} value 表示字段是否为多行文本字段.
		 * @param {int} height 指定一行文本的高度.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var inputLayer = new LSprite();
		 * 	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 400, 150]);
		 * 	var theTextField = new LTextField();
		 * 	theTextField.setType(LTextFieldType.INPUT,inputLayer);
		 * 	theTextField.setMultiline(true);
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/setMultiline.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Indicates whether field is a multiline text field. If the value is true, the text field is multiline; if the value is false, the text field is a single-line text field. In a field of type LTextFieldType.INPUT, determines whether the Enter key creates a new line (a value of false, and the Enter key is ignored).
		 * @method setMultiline
		 * @param {Boolean} value Indicates whether field is a multiline text field. If the value is true, the text field is multiline.
		 * @param {int} height The height of a single-line text field.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var inputLayer = new LSprite();
		 * 	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 400, 150]);
		 * 	var theTextField = new LTextField();
		 * 	theTextField.setType(LTextFieldType.INPUT,inputLayer);
		 * 	theTextField.setMultiline(true);
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/setMultiline.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * フィールドが複数行テキストフィールドであるかどうかを示します。値が true である場合は複数行テキストフィールド、値が false である場合は単一行テキストフィールドです。LTextFieldType.INPUT タイプのフィールドでは、Enter キーで改行されるかどうかが決定されます（値が false の場合 Enter キーは無視されます）。
		 * @method setMultiline
		 * @param {Boolean} value フィールドが複数行テキストフィールドであるかどうかを示します。
		 * @param {int} height 一行のテキストフィールドの高さを設定する.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var inputLayer = new LSprite();
		 * 	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 400, 150]);
		 * 	var theTextField = new LTextField();
		 * 	theTextField.setType(LTextFieldType.INPUT,inputLayer);
		 * 	theTextField.setMultiline(true);
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/setMultiline.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		setMultiline : function (v, h) {
			var s = this;
			if (v) {
				s._wordHeight(h);
			}
			s.multiline = v;
		},
		/** @language chinese
		 * 表示文本字段是否自动换行。如果设置的值为 true，则该文本字段自动换行；如果值为 false，则该文本字段不自动换行。默认值为 false。
		 * @method setWordWrap
		 * @param {Boolean} value 表示文本字段是否自动换行.
		 * @param {int} height 指定一行文本的高度.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.setWordWrap(true);
		 * 	theTextField.width = 200;
		 * 	theTextField.text = "text\ntext\ntexttexttexttexttexttexttexttexttexttexttexttexttexttext";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/setWordWrap.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * 	Indicates whether the text field has word wrap. If the value of wordWrap is true, the text field has word wrap; if the value is false, the text field does not have word wrap. The default value is false.
		 * @method setWordWrap
		 * @param {Boolean} value Indicates whether the text field has word wrap.
		 * @param {int} height The height of a single-line text field.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.setWordWrap(true);
		 * 	theTextField.width = 200;
		 * 	theTextField.text = "text\ntext\ntexttexttexttexttexttexttexttexttexttexttexttexttexttext";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/setWordWrap.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * フテキストフィールドのテキストを折り返すかどうかを示す。値が true である場合は、テキストフィールドのテキストを折り返し、false である場合は折り返しません。デフォルト値は false です。
		 * @method setWordWrap
		 * @param {Boolean} value テキストフィールドのテキストを折り返すかどうかを示す。
		 * @param {int} height 一行のテキストフィールドの高さを設定する.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.setWordWrap(true);
		 * 	theTextField.width = 200;
		 * 	theTextField.text = "text\ntext\ntexttexttexttexttexttexttexttexttexttexttexttexttexttext";
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/setWordWrap.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		setWordWrap : function (v, h) {
			var s = this;
			if (v) {
				s._wordHeight(h);
			}
			s.wordWrap = v;
		},
		/** @language chinese
		 * 文本字段的类型。以下 LTextFieldType 常量中的任一个：LTextFieldType.DYNAMIC（指定用户无法编辑的动态文本字段），或 LTextFieldType.INPUT（指定用户可以编辑的输入文本字段）。默认值为 dynamic。
		 * @method setType
		 * @param {String} type 文本字段的类型。
		 * @param {LSprite} obj 文本框形状.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var inputLayer = new LSprite();
		 * 	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 400, 30]);
		 * 	var theTextField = new LTextField();
		 * 	theTextField.setType(LTextFieldType.INPUT,inputLayer);
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/setType.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * The type of the text field. Either one of the following LTextFieldType constants: LTextFieldType.DYNAMIC, which specifies a dynamic text field, which a user cannot edit, or LTextFieldType.INPUT, which specifies an input text field, which a user can edit.The default value is dynamic.
		 * @method setType
		 * @param {String} type The type of the text field.
		 * @param {LSprite} obj The object's shape.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var inputLayer = new LSprite();
		 * 	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 400, 30]);
		 * 	var theTextField = new LTextField();
		 * 	theTextField.setType(LTextFieldType.INPUT,inputLayer);
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/setType.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * テキストフィールドのタイプです。次の LTextFieldType 定数のいずれかです。LTextFieldType.DYNAMIC はダイナミックテキストフィールドを指定します。このフィールドをユーザーが編集することはできません。LTextFieldType.INPUT はテキスト入力フィールドを指定します。このフィールドはユーザーが編集できます。デフォルト値： dynamic。
		 * @method setType
		 * @param {String} type テキストフィールドのタイプです。
		 * @param {LSprite} obj オブジェクトの形.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var inputLayer = new LSprite();
		 * 	inputLayer.graphics.drawRect(1,"#000000",[0, 0, 400, 30]);
		 * 	var theTextField = new LTextField();
		 * 	theTextField.setType(LTextFieldType.INPUT,inputLayer);
		 * 	addChild(theTextField);
		 * @examplelink <p><a href="../../../api/LTextField/setType.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		setType : function (type, inputBackLayer) {
			var s = this;
			if (s.texttype != type && type == LTextFieldType.INPUT) {
				if (inputBackLayer == null || inputBackLayer.type != "LSprite") {
					s.inputBackLayer = new LSprite();
					s.inputBackLayer.graphics.drawRect(1, "#000000", [0, -s.getHeight() * 0.4, s.width, s.getHeight() * 1.5]);
				} else {
					s.inputBackLayer = inputBackLayer;
				}
				s.inputBackLayer.parent = s;
				if (LMouseEventContainer.container[LMouseEvent.MOUSE_DOWN]) {
					LMouseEventContainer.pushInputBox(s);
				}
			} else {
				s.inputBackLayer = null;
				LMouseEventContainer.removeInputBox(s);
			}
			s.texttype = type;
		},
		ismouseon : function (e, cood) {
			var s = this;
			if (!e) {
				return false;
			}
			if (!s.visible) {
				return false;
			}
			if (!cood) {
				cood = {x : 0, y : 0, scaleX : 1, scaleY : 1};
			}
			if (s.mask) {
				if (!s.mask.parent) {
					s.mask.parent = s.parent;
				}
				if (!s.mask.ismouseon(e, cood)) {
					return false;
				}
			}
			if (s.inputBackLayer) {
				return s.inputBackLayer.ismouseon(e, {x : s.x * cood.scaleX + cood.x, y : s.y * cood.scaleY + cood.y, scaleX : cood.scaleX * s.scaleX, scaleY : cood.scaleY * s.scaleY});
			}
			return s.ismouseonShapes([{type : LShape.RECT, arg : [0, 0, s._getWidth(), s._getHeight()]}], e.offsetX, e.offsetY);
		},
		/** @language chinese
		 * 返回一个LTextField的克隆对象。
		 * @method clone
		 * @return {LTextField} 一个新的 LTextField 对象，它与原始对象相同.
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "font test";
		 * 	addChild(theTextField);
		 * 	var theTextField2 = theTextField.clone();
		 * 	theTextField2.y = 50;
		 * 	addChild(theTextField2);
		 * @examplelink <p><a href="../../../api/LTextField/clone.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns a new LTextField object that is a clone of the original instance with an exact copy of the object.
		 * @method clone
		 * @return {LTextField} A new LTextField object that is identical to the original.
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = circle1.clone();
		 * 	circle2.y = 120;
		 * 	addChild(circle1);
		 * 	addChild(circle2);
		 * @examplelink <p><a href="../../../api/LSprite/clone.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 新しい LTextField オブジェクトとして、元のインスタンスのクローンを返します。オブジェクトはまったく同じコピーになります。
		 * @method clone
		 * @return {LTextField} 元のオブジェクトと同一の新しい LTextField オブジェクトです。
		 * @since 1.8.2
		 * @public
		 * @example
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 	var circle2 = circle1.clone();
		 * 	circle2.y = 120;
		 * 	addChild(circle1);
		 * 	addChild(circle2);
		 * @examplelink <p><a href="../../../api/LTextField/clone.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		clone : function () {
			var s = this, a = new s.constructor();
			a.copyProperty(s);
			a.texttype = null;
			if (s.texttype ==  LTextFieldType.INPUT) {
				a.setType( LTextFieldType.INPUT);
			}
			return a;
		},
		mouseEvent : function (event, type, cood) {
			var s = this, on;
			if (s.inputBackLayer == null || type != LMouseEvent.MOUSE_DOWN) {
				return;
			}
			on = s.ismouseon(event, cood);
			if (!on) {
				return;
			}
			s.focus();
		},
		_ll_getValue : function () {
			if (LGlobal.inputBox.style.display != NONE) {
				LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
				LEvent.removeEventListener(LGlobal.inputTextBox, LKeyboardEvent.KEY_DOWN, LGlobal.inputTextField._ll_input);
				LGlobal.inputBox.style.display = NONE;
				if(typeof LGlobal.inputTextField.preventDefault != UNDEFINED){
					LGlobal.preventDefault=LGlobal.inputTextField.preventDefault;
				}
				LGlobal.inputTextField.dispatchEvent(LFocusEvent.FOCUS_OUT);
				LGlobal.inputTextField = null;
			}
		},
		/** @language chinese
		 * 当LTextField对象设置为输入框的时候，将LTextField对象的text值反映到输入框中。
		 * @method updateInput
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.x = 20;
		 * 	theTextField.y = 20;
		 * 	theTextField.text = "Click Enter Key to clear the text!";
		 * 	addChild(theTextField);
		 * 	var theTextField1 = new LTextField();
		 * 	theTextField1.text = "test";
		 * 	theTextField1.x = 20;
		 * 	theTextField1.y = 100;
		 * 	theTextField1.setType(LTextFieldType.INPUT);
		 * 	addChild(theTextField1);
		 * 	theTextField1.addEventListener(LTextEvent.TEXT_INPUT, function (e) {
		 * 		if(e.keyCode == 13){
		 * 			e.currentTarget.text = "";
		 * 			e.currentTarget.updateInput();
		 * 			e.preventDefault();
		 * 		}
		 * 	});
		 * 	setTimeout(function () {
		 * 		theTextField1.focus();
		 * 	}, 200);
		 * @examplelink <p><a href="../../../api/LTextField/updateInput.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * If the LTextField object's texttype is LTextFieldType.INPUT, copy the text to the inputbox.
		 * @method updateInput
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.x = 20;
		 * 	theTextField.y = 20;
		 * 	theTextField.text = "Click Enter Key to clear the text!";
		 * 	addChild(theTextField);
		 * 	var theTextField1 = new LTextField();
		 * 	theTextField1.text = "test";
		 * 	theTextField1.x = 20;
		 * 	theTextField1.y = 100;
		 * 	theTextField1.setType(LTextFieldType.INPUT);
		 * 	addChild(theTextField1);
		 * 	theTextField1.addEventListener(LTextEvent.TEXT_INPUT, function (e) {
		 * 		if(e.keyCode == 13){
		 * 			e.currentTarget.text = "";
		 * 			e.currentTarget.updateInput();
		 * 			e.preventDefault();
		 * 		}
		 * 	});
		 * 	setTimeout(function () {
		 * 		theTextField1.focus();
		 * 	}, 200);
		 * @examplelink <p><a href="../../../api/LSprite/updateInput.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * LTextFieldオブジェクトは入力ボックスの場合、LTextFieldオブジェクトのtextを入力ボックスに反映する。
		 * @method updateInput
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.x = 20;
		 * 	theTextField.y = 20;
		 * 	theTextField.text = "Click Enter Key to clear the text!";
		 * 	addChild(theTextField);
		 * 	var theTextField1 = new LTextField();
		 * 	theTextField1.text = "test";
		 * 	theTextField1.x = 20;
		 * 	theTextField1.y = 100;
		 * 	theTextField1.setType(LTextFieldType.INPUT);
		 * 	addChild(theTextField1);
		 * 	theTextField1.addEventListener(LTextEvent.TEXT_INPUT, function (e) {
		 * 		if(e.keyCode == 13){
		 * 			e.currentTarget.text = "";
		 * 			e.currentTarget.updateInput();
		 * 			e.preventDefault();
		 * 		}
		 * 	});
		 * 	setTimeout(function () {
		 * 		theTextField1.focus();
		 * 	}, 200);
		 * @examplelink <p><a href="../../../api/LTextField/updateInput.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		updateInput : function () {
			var s = this;
			if (s.texttype == LTextFieldType.INPUT && LGlobal.inputTextField.objectIndex == s.objectIndex) {
				LGlobal.inputTextBox.value = LGlobal.inputTextField.text;
			}
		},
		_ll_input : function (e) {
			var event = new LEvent(LTextEvent.TEXT_INPUT);
			event.keyCode = e.keyCode;
			LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
			if (LGlobal.inputTextField.hasEventListener(LTextEvent.TEXT_INPUT)) {
				e.returnValue = LGlobal.inputTextField.dispatchEvent(event);
			} else {
				e.returnValue = true;
			}
		},
		/** @language chinese
		 * 获取焦点。
		 * @method focus
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.x = 20;
		 * 	theTextField.y = 20;
		 * 	theTextField.text = "Click the Enter Key, please!";
		 * 	addChild(theTextField);
		 * 	var theTextField1 = new LTextField();
		 * 	theTextField1.x = 20;
		 * 	theTextField1.y = 100;
		 * 	theTextField1.setType(LTextFieldType.INPUT);
		 * 	addChild(theTextField1);
		 * 	theTextField1.addEventListener(LTextEvent.TEXT_INPUT, function (e) {
		 * 		if(e.keyCode == 13){
		 * 			theTextField2.focus();
		 * 		}
		 * 	});
		 * 	var theTextField2 = new LTextField();
		 * 	theTextField2.x = 20;
		 * 	theTextField2.y = 140;
		 * 	theTextField2.setType(LTextFieldType.INPUT);
		 * 	addChild(theTextField2);
		 * 	theTextField2.addEventListener(LTextEvent.TEXT_INPUT, function (e) {
		 * 		if(e.keyCode == 13){
		 * 			theTextField1.focus();
		 * 		}
		 * 	});
		 * 	setTimeout(function () {
		 * 		theTextField1.focus();
		 * 	}, 200);
		 * @examplelink <p><a href="../../../api/LTextField/focus.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Get focus.
		 * @method focus
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.x = 20;
		 * 	theTextField.y = 20;
		 * 	theTextField.text = "Click the Enter Key, please!";
		 * 	addChild(theTextField);
		 * 	var theTextField1 = new LTextField();
		 * 	theTextField1.x = 20;
		 * 	theTextField1.y = 100;
		 * 	theTextField1.setType(LTextFieldType.INPUT);
		 * 	addChild(theTextField1);
		 * 	theTextField1.addEventListener(LTextEvent.TEXT_INPUT, function (e) {
		 * 		if(e.keyCode == 13){
		 * 			theTextField2.focus();
		 * 		}
		 * 	});
		 * 	var theTextField2 = new LTextField();
		 * 	theTextField2.x = 20;
		 * 	theTextField2.y = 140;
		 * 	theTextField2.setType(LTextFieldType.INPUT);
		 * 	addChild(theTextField2);
		 * 	theTextField2.addEventListener(LTextEvent.TEXT_INPUT, function (e) {
		 * 		if(e.keyCode == 13){
		 * 			theTextField1.focus();
		 * 		}
		 * 	});
		 * 	setTimeout(function () {
		 * 		theTextField1.focus();
		 * 	}, 200);
		 * @examplelink <p><a href="../../../api/LSprite/focus.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * フォーカスを取得。
		 * @method focus
		 * @since 1.9.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.x = 20;
		 * 	theTextField.y = 20;
		 * 	theTextField.text = "Click the Enter Key, please!";
		 * 	addChild(theTextField);
		 * 	var theTextField1 = new LTextField();
		 * 	theTextField1.x = 20;
		 * 	theTextField1.y = 100;
		 * 	theTextField1.setType(LTextFieldType.INPUT);
		 * 	addChild(theTextField1);
		 * 	theTextField1.addEventListener(LTextEvent.TEXT_INPUT, function (e) {
		 * 		if(e.keyCode == 13){
		 * 			theTextField2.focus();
		 * 		}
		 * 	});
		 * 	var theTextField2 = new LTextField();
		 * 	theTextField2.x = 20;
		 * 	theTextField2.y = 140;
		 * 	theTextField2.setType(LTextFieldType.INPUT);
		 * 	addChild(theTextField2);
		 * 	theTextField2.addEventListener(LTextEvent.TEXT_INPUT, function (e) {
		 * 		if(e.keyCode == 13){
		 * 			theTextField1.focus();
		 * 		}
		 * 	});
		 * 	setTimeout(function () {
		 * 		theTextField1.focus();
		 * 	}, 200);
		 * @examplelink <p><a href="../../../api/LTextField/focus.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		focus : function () {
			var s = this, sc, sx;
			if (!s.parent) {
				return;
			}
			if (s.texttype != LTextFieldType.INPUT) {
				return;
			}
			if (LGlobal.inputTextField && LGlobal.inputTextField.objectIndex != s.objectIndex) {
				s._ll_getValue();
			}
			s.dispatchEvent(LFocusEvent.FOCUS_IN);
			sc = s.getAbsoluteScale();
			LGlobal.inputBox.style.display = "";
			LGlobal.inputBox.name = "input" + s.objectIndex;
			LGlobal.inputTextField = s;
			LGlobal.inputTextareaBoxObj.style.display = NONE;
			LGlobal.inputTextBoxObj.style.display = NONE;
			LGlobal.passwordBoxObj.style.display = NONE;
			if (s.displayAsPassword) {
				LGlobal.inputTextBox = LGlobal.passwordBoxObj;
			} else if (s.multiline) {
				LGlobal.inputTextBox = LGlobal.inputTextareaBoxObj;
			} else {
				LGlobal.inputTextBox = LGlobal.inputTextBoxObj;
			}
			sx = parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width;
			sy = parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height;
			LGlobal.inputTextBox.style.display = "";
			LGlobal.inputTextBox.value = s.text;
			LGlobal.inputTextBox.style.height = s.inputBackLayer.getHeight() * sc.scaleY * s.scaleY * sy + "px";
			LGlobal.inputTextBox.style.width = s.inputBackLayer.getWidth() * sc.scaleX * s.scaleX * sx + "px";
			LGlobal.inputTextBox.style.color = s.color;
			LGlobal.inputTextBox.style.fontSize = ((s.size * parseFloat(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height) >> 0) + "px";
			LGlobal.inputTextBox.style.fontFamily = s.font;
			LEvent.addEventListener(LGlobal.inputTextBox, LKeyboardEvent.KEY_DOWN, LGlobal.inputTextField._ll_input);
			if (s.texttype == LTextFieldType.INPUT) {
				rc = s.getRootCoordinate();
				if (LGlobal.inputBox.name == "input" + s.objectIndex) {
					LGlobal.inputBox.style.marginTop = (parseInt(LGlobal.canvasObj.style.marginTop) + (((rc.y + s.inputBackLayer.startY()) * parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height) >>> 0)) + "px";
					LGlobal.inputBox.style.marginLeft = (parseInt(LGlobal.canvasObj.style.marginLeft) + (((rc.x + s.inputBackLayer.startX()) * parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width) >>> 0)) + "px";
				}
			}
			setTimeout(function () {
				if(LGlobal.ios){
					s.preventDefault = LGlobal.preventDefault;
					LGlobal.preventDefault=false;
				}
				LGlobal.inputTextBox.focus();
			}, 0);
		},
		_getWidth : function () {
			var s = this;
			if (s.wordWrap) {
				return s.width;
			}
			LGlobal.canvas.font = s.size + "px " + s.font;
			return LGlobal.canvas.measureText(s.text).width;
		},
		/** @language chinese
		 * 获取显示对象的宽度，以像素为单位。
		 * @method getWidth
		 * @return {float} 显示对象的宽度。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "getWidth test";
		 * 	addChild(theTextField);
		 * 	trace(theTextField.getWidth());
		 * @examplelink <p><a href="../../../api/LTextField/getWidth.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Get the width of the display object, in pixels.
		 * @method getWidth
		 * @return {float} the width of the display object.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "getWidth test";
		 * 	addChild(theTextField);
		 * 	trace(theTextField.getWidth());
		 * @examplelink <p><a href="../../../api/LTextField/getWidth.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 表示オブジェクトの幅を取得します（ピクセル単位）。
		 * @method getWidth
		 * @return {float} オブジェクトの幅。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "getWidth test";
		 * 	addChild(theTextField);
		 * 	trace(theTextField.getWidth());
		 * @examplelink <p><a href="../../../api/LTextField/getWidth.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getWidth : function (maskSize) {
			var s = this, w, mx, mw;
			w = s._getWidth() * s.scaleX;
			if (maskSize && s.mask) {
				mx = s.mask._startX ? s.mask._startX() : s.mask.startX();
				if (mx > w) {
					return 0;
				}
				mw = s.mask.getWidth();
				if (mx + mw > w) {
					return w - mx;
				} else {
					return mw;
				}
			}
			return w;
		},
		_getHeight : function () {
			var s = this, c = LGlobal.canvas, i, l, j, k, m, enter;
			if (s.wordWrap) {
				c.font = s.weight + " " + s.size + "px " + s.font;
				if (s.height == 0) {
					j = 0, k = 0, m = 0;
					for (i = 0, l = s.text.length; i < l; i++) {
						enter = /(?:\r\n|\r|\n|¥n)/.exec(s.text.substr(i, 1));
						if (enter) {
							j = 0;
							k = i + 1;
							m++;
						}
						j = c.measureText(s.text.substr(k, i + 1 - k)).width;
						if (s.wordWrap && j + c.measureText(s.text.substr(i + 1, 1)).width > s.width) {
							j = 0;
							k = i + 1;
							m++;
						}
					}
					s.height = (m + 1) * s.wordHeight;
				}
				return s.height;
			}
			c.font = s.weight + " " + s.size + "px " + s.font; 
			l = c.measureText("O").width * 1.2;
			if (s.heightMode == LTextField.HEIGHT_MODE_BASELINE) {
				l = l * 1.2;
			}
			return l;
		},
		/** @language chinese
		 * 获取显示对象的高度，以像素为单位。
		 * @method getHeight
		 * @return {float} 显示对象的高度。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "getHeight test";
		 * 	addChild(theTextField);
		 * 	trace(theTextField.getHeight());
		 * @examplelink <p><a href="../../../api/LTextField/getHeight.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Get the height of the display object, in pixels.
		 * @method getHeight
		 * @return {float} the height of the display object.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "getHeight test";
		 * 	addChild(theTextField);
		 * 	trace(theTextField.getHeight());
		 * @examplelink <p><a href="../../../api/LTextField/getHeight.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 表示オブジェクトの高さを取得します（ピクセル単位）。
		 * @method getHeight
		 * @return {float} オブジェクトの高さ。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var theTextField = new LTextField();
		 * 	theTextField.text = "getHeight test";
		 * 	addChild(theTextField);
		 * 	trace(theTextField.getHeight());
		 * @examplelink <p><a href="../../../api/LTextField/getHeight.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getHeight : function (maskSize) {
			var s = this, h, my, mh;
			h = s._getHeight() * s.scaleY;
			if (maskSize && s.mask) {
				my = s.mask._startY ? s.mask._startY() : s.mask.startY();
				if (my > h) {
					return 0;
				}
				mh = s.mask.getHeight();
				if (my + mh > h) {
					return h - my;
				} else {
					return mh;
				}
			}
			return h;
		},
		/** @language chinese
		 * 文本逐字显示（打字机效果）。
		 * @method wind
		 * @since 1.3.0
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var theTextField = new LTextField();
		 * 		theTextField.text = "wait click";
		 * 		theTextField.x = 10;
		 * 		theTextField.y = 10;
		 * 		theTextField.size = 20;
		 * 		addChild(theTextField);
		 * 		var button = new LButtonSample1("wind test start");
		 * 		button.textField = theTextField;
		 * 		button.x = 10;
		 * 		button.y = 100;
		 * 		addChild(button);
		 * 		button.addEventListener(LMouseEvent.MOUSE_DOWN, onclick);
		 * 	}
		 * 	function windOver(event){
		 * 		var theTextField = event.target;
		 * 		theTextField.removeEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 		theTextField.text = "wind over";
		 * 	}
		 * 	function onclick(event){
		 * 	var theTextField = event.currentTarget.textField;
		 * 		if (theTextField.hasEventListener(LTextEvent.WIND_COMPLETE)) {
		 * 			theTextField.removeEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 		}
		 * 		theTextField.text = "TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT";
		 * 		theTextField.speed = 3;
		 * 		theTextField.wind();
		 * 		theTextField.addEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 	}
		 * @examplelink <p><a href="../../../api/LTextField/wind.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Text animation
		 * @method wind
		 * @since 1.3.0
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var theTextField = new LTextField();
		 * 		theTextField.text = "wait click";
		 * 		theTextField.x = 10;
		 * 		theTextField.y = 10;
		 * 		theTextField.size = 20;
		 * 		addChild(theTextField);
		 * 		var button = new LButtonSample1("wind test start");
		 * 		button.textField = theTextField;
		 * 		button.x = 10;
		 * 		button.y = 100;
		 * 		addChild(button);
		 * 		button.addEventListener(LMouseEvent.MOUSE_DOWN, onclick);
		 * 	}
		 * 	function windOver(event){
		 * 		var theTextField = event.target;
		 * 		theTextField.removeEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 		theTextField.text = "wind over";
		 * 	}
		 * 	function onclick(event){
		 * 	var theTextField = event.currentTarget.textField;
		 * 		if (theTextField.hasEventListener(LTextEvent.WIND_COMPLETE)) {
		 * 			theTextField.removeEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 		}
		 * 		theTextField.text = "TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT";
		 * 		theTextField.speed = 3;
		 * 		theTextField.wind();
		 * 		theTextField.addEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 	}
		 * @examplelink <p><a href="../../../api/LTextField/wind.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * テキストを1文字ずつ画面に表示させる。
		 * @method wind
		 * @since 1.3.0
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	function main () {
		 * 		var theTextField = new LTextField();
		 * 		theTextField.text = "wait click";
		 * 		theTextField.x = 10;
		 * 		theTextField.y = 10;
		 * 		theTextField.size = 20;
		 * 		addChild(theTextField);
		 * 		var button = new LButtonSample1("wind test start");
		 * 		button.textField = theTextField;
		 * 		button.x = 10;
		 * 		button.y = 100;
		 * 		addChild(button);
		 * 		button.addEventListener(LMouseEvent.MOUSE_DOWN, onclick);
		 * 	}
		 * 	function windOver(event){
		 * 		var theTextField = event.target;
		 * 		theTextField.removeEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 		theTextField.text = "wind over";
		 * 	}
		 * 	function onclick(event){
		 * 	var theTextField = event.currentTarget.textField;
		 * 		if (theTextField.hasEventListener(LTextEvent.WIND_COMPLETE)) {
		 * 			theTextField.removeEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 		}
		 * 		theTextField.text = "TEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXTTEXT";
		 * 		theTextField.speed = 3;
		 * 		theTextField.wind();
		 * 		theTextField.addEventListener(LTextEvent.WIND_COMPLETE, windOver);
		 * 	}
		 * @examplelink <p><a href="../../../api/LTextField/wind.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		wind : function (listener) {
			var s = this;
			s.wind_over_function = listener;
			s.windRunning = true;
			s._ll_wind_text = s.text;
			s.text = "";
			s._ll_wind_length = 0;
		},
		_ll_windRun : function () {
			var s = this;
			if (s._speedIndex++ < s.speed) {
				return;
			}
			s._speedIndex = 0;
			if (s._ll_wind_length > s._ll_wind_text.length) {
				s.windRunning = false;
				if (s.wind_over_function) {
					s.wind_over_function();
				}
				s.dispatchEvent(new LEvent(LTextEvent.WIND_COMPLETE));
				return;
			}
			s.text = s._ll_wind_text.substring(0, s._ll_wind_length);
			s._ll_wind_length++;
		},
		/** @language chinese
		 * <p>结束文本逐字显示。</p>
		 * @method windComplete
		 * @since 1.10.2
		 * @public
		 */
		/** @language english
		 * <p>Stop Text animation.</p>
		 * @method windComplete
		 * @since 1.10.2
		 * @public
		 */
		/** @language japanese
		 * <p>テキストを1文字ずつ画面に表示させることを停止する。</p>
		 * @method windComplete
		 * @since 1.10.2
		 * @public
		 */
		windComplete : function() {
			var s = this;
			s._speedIndex = s.speed;
			s.text = s._ll_wind_text;
			s._ll_wind_length = s._ll_wind_text.length + 1;
			s._ll_windRun();
		},
		/** @language chinese
		 * <p>清空所使用的内存。</p>
		 * @method die
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * <p>Frees memory that is used.</p>
		 * @method die
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * <p>使ったメモリをクリアする。</p>
		 * @method die
		 * @since 1.0.0
		 * @public
		 */
		die : function () {
			LMouseEventContainer.removeInputBox(this);
		}
	};
	for (var k in p) {
		LTextField.prototype[k] = p[k];
	}
	return LTextField;
})();
/** @language chinese
 * LTextField对象获得焦点后调度。
 * <p><a href="LFocusEvent.html#property_FOCUS_IN">LFocusEvent.FOCUS_IN</a></p>
 * @event LFocusEvent.FOCUS_IN
 */
/** @language english
 * Dispatched after a LTextField object gains focus.
 * <p><a href="LFocusEvent.html#property_FOCUS_IN">LFocusEvent.FOCUS_IN</a></p>
 * @event LFocusEvent.FOCUS_IN
 */
/** @language japanese
 * LTextFieldオブジェクトがフォーカスを取得した後に送出されます。
 * <p><a href="LFocusEvent.html#property_FOCUS_IN">LFocusEvent.FOCUS_IN</a></p>
 * @event LFocusEvent.FOCUS_IN
 */
/** @language chinese
 * LTextField对象失去焦点后调度。
 * <p><a href="LFocusEvent.html#property_FOCUS_OUT">LFocusEvent.FOCUS_OUT</a></p>
 * @event LFocusEvent.FOCUS_OUT
 */
/** @language english
 * Dispatched after a LTextField object loses focus.
 * <p><a href="LFocusEvent.html#property_FOCUS_OUT">LFocusEvent.FOCUS_OUT</a></p>
 * @event LFocusEvent.FOCUS_OUT
 */
/** @language japanese
 * LTextFieldオブジェクトがフォーカスを失った後に送出されます。
 * <p><a href="LFocusEvent.html#property_FOCUS_OUT">LFocusEvent.FOCUS_OUT</a></p>
 * @event LFocusEvent.FOCUS_OUT
 */
/** @language chinese
 * 不可用。
 * @event LMouseEvent.MOUSE_DOWN
 */
/** @language english
 * Disabled.
 * @event LMouseEvent.MOUSE_DOWN
 */
/** @language japanese
 * 利用不可。
 * @event LMouseEvent.MOUSE_DOWN
 */
/** @language chinese
 * 不可用。
 * @event LMouseEvent.MOUSE_UP
 */
/** @language english
 * Disabled.
 * @event LMouseEvent.MOUSE_UP
 */
/** @language japanese
 * 利用不可。
 * @event LMouseEvent.MOUSE_UP
 */
/** @language chinese
 * 不可用。
 * @event LMouseEvent.MOUSE_MOVE
 */
/** @language english
 * Disabled.
 * @event LMouseEvent.MOUSE_MOVE
 */
/** @language japanese
 * 利用不可。
 * @event LMouseEvent.MOUSE_MOVE
 */
/** @language chinese
 * 不可用。
 * @event LMouseEvent.MOUSE_OUT
 */
/** @language english
 * Disabled.
 * @event LMouseEvent.MOUSE_OUT
 */
/** @language japanese
 * 利用不可。
 * @event LMouseEvent.MOUSE_OUT
 */
/** @language chinese
 * 不可用。
 * @event LMouseEvent.MOUSE_OVER
 */
/** @language english
 * Disabled.
 * @event LMouseEvent.MOUSE_OVER
 */
/** @language japanese
 * 利用不可。
 * @event LMouseEvent.MOUSE_OVER
 */
/** @language chinese
 * 不可用。
 * @event LMouseEvent.DOUBLE_CLICK
 */
/** @language english
 * Disabled.
 * @event LMouseEvent.DOUBLE_CLICK
 */
/** @language japanese
 * 利用不可。
 * @event LMouseEvent.DOUBLE_CLICK
 */

