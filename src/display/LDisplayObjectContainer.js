/** @language chinese
 * <p>LDisplayObjectContainer 类是可用作显示列表中显示对象容器的所有对象的基类。该显示列表管理 运行时中显示的所有对象。使用 LDisplayObjectContainer 类排列显示列表中的显示对象。每个 LDisplayObjectContainer 对象都有自己的子级列表，用于组织对象的 Z 轴顺序。Z 轴顺序是由前至后的顺序，可确定哪个对象绘制在前，哪个对象绘制在后等。</p>
 * <p>LDisplayObject 是一种抽象基类；因此，不能直接调用 LDisplayObject。</p>
 * <p>LDisplayObjectContainer 类是可以包含子对象的所有对象的抽象基类。无法直接对其进行实例化。</p>
 * @class LDisplayObjectContainer
 * @extends LInteractiveObject
 * @constructor
 * @since 1.9.0
 * @public
 */
/** @language english
 * <p>The DisplayObjectContainer class is the base class for all objects that can serve as display object containers on the display list. The display list manages all objects displayed in the runtimes. Use the DisplayObjectContainer class to arrange the display objects in the display list. Each DisplayObjectContainer object has its own child list for organizing the z-order of the objects. The z-order is the front-to-back order that determines which object is drawn in front, which is behind, and so on.</p>
 * <p>LDisplayObject is an abstract base class; therefore, you cannot call LDisplayObject directly. </p>
 * <p>The DisplayObjectContainer class is an abstract base class for all objects that can contain child objects. It cannot be instantiated directly.</p>
 * @class LDisplayObjectContainer
 * @extends LInteractiveObject
 * @constructor
 * @since 1.9.0
 * @public
 */
/** @language japanese
 * <p>LDisplayObjectContainer クラスは、表示リストで表示オブジェクトコンテナとして機能するすべてのオブジェクトの基本クラスです。表示リストでは、ランタイムに表示されるすべてのオブジェクトを管理します。LDisplayObjectContainer クラスは、表示リスト内で表示オブジェクトを配置するために使用します。各 LDisplayObjectContainer オブジェクトは、オブジェクトの z 順序を編成するために独自の子リストを持っています。z 順序は、どのオブジェクトを前面、背面、その他に描画するかを決定する、前から後ろへの順序です。</p>
 * <p>LDisplayObject は抽象基本クラスであるため、LDisplayObject を直接呼び出すことはできません。</p>
 * <p>LDisplayObjectContainer クラスは、子オブジェクトを持つすべてのオブジェクトの抽象基本クラスです。これは直接インスタンス化することはできません。</p>
 * @class LDisplayObjectContainer
 * @extends LInteractiveObject
 * @constructor
 * @since 1.9.0
 * @public
 */
var LDisplayObjectContainer = (function () {
	function LDisplayObjectContainer () {
		var s = this;
		LExtends(s, LInteractiveObject, []);
		/** @language chinese
		 * 子对象列表
		 * @property childList
		 * @type Array
		 * @since 1.0.0
		 * @public
		 */
		/** @language english
		 * the child display object list
		 * @property childList
		 * @type Array
		 * @since 1.0.0
		 * @public
		 */
		/** @language japanese
		 * 子表示オブジェクトのリスト
		 * @property childList
		 * @type Array
		 * @since 1.0.0
		 * @public
		 */
		s.childList = new Array();
		/** @language chinese
		 * 返回此对象的子项数目。
		 * @property numChildren
		 * @type int
		 * @since 1.9.0
		 * @example
		 * 	var container1 = new LSprite();
		 * 	var container2 = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 	var circle2 = new LSprite();
		 * 	circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 	container2.addChild(container1);
		 * 	container1.addChild(circle1);
		 * 	container1.addChild(circle2);
		 * 	trace(container1.numChildren); // 2
		 * 	trace(container2.numChildren); // 1
		 * 	trace(circle1.numChildren); // 0
		 * 	trace(circle2.numChildren); // 0
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/numChildren.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * Returns the number of children of this object.
		 * @property numChildren
		 * @type int
		 * @since 1.9.0
		 * @example
		 * 	var container1 = new LSprite();
		 * 	var container2 = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 	var circle2 = new LSprite();
		 * 	circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 	container2.addChild(container1);
		 * 	container1.addChild(circle1);
		 * 	container1.addChild(circle2);
		 * 	trace(container1.numChildren); // 2
		 * 	trace(container2.numChildren); // 1
		 * 	trace(circle1.numChildren); // 0
		 * 	trace(circle2.numChildren); // 0
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/numChildren.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * このオブジェクトの子の数を返します。
		 * @property numChildren
		 * @type int
		 * @since 1.9.0
		 * @example
		 * 	var container1 = new LSprite();
		 * 	var container2 = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 	var circle2 = new LSprite();
		 * 	circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 	container2.addChild(container1);
		 * 	container1.addChild(circle1);
		 * 	container1.addChild(circle2);
		 * 	trace(container1.numChildren); // 2
		 * 	trace(container2.numChildren); // 1
		 * 	trace(circle1.numChildren); // 0
		 * 	trace(circle2.numChildren); // 0
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/numChildren.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.numChildren = 0;
		/** @language chinese
		 * 返回此对象的子项数目。
		 * @property mouseChildren
		 * @type int
		 * @since 1.9.0
		 * @example
		 * 	var container1 = new LSprite();
		 * 	var container2 = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 	var circle2 = new LSprite();
		 * 	circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 	container2.addChild(container1);
		 * 	container1.addChild(circle1);
		 * 	container1.addChild(circle2);
		 * 	trace(container1.numChildren); // 2
		 * 	trace(container2.numChildren); // 1
		 * 	trace(circle1.numChildren); // 0
		 * 	trace(circle2.numChildren); // 0
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/mouseChildren.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		/** @language english
		 * Returns the number of children of this object.
		 * @property mouseChildren
		 * @type int
		 * @since 1.9.0
		 * @example
		 * 	var container1 = new LSprite();
		 * 	var container2 = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 	var circle2 = new LSprite();
		 * 	circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 	container2.addChild(container1);
		 * 	container1.addChild(circle1);
		 * 	container1.addChild(circle2);
		 * 	trace(container1.numChildren); // 2
		 * 	trace(container2.numChildren); // 1
		 * 	trace(circle1.numChildren); // 0
		 * 	trace(circle2.numChildren); // 0
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/mouseChildren.html" target="_blank">Try it »</a></p>
		 * @public
		 */
		/** @language japanese
		 * このオブジェクトの子の数を返します。
		 * @property mouseChildren
		 * @type int
		 * @since 1.9.0
		 * @example
		 * 	var container1 = new LSprite();
		 * 	var container2 = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 	var circle2 = new LSprite();
		 * 	circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 	container2.addChild(container1);
		 * 	container1.addChild(circle1);
		 * 	container1.addChild(circle2);
		 * 	trace(container1.numChildren); // 2
		 * 	trace(container2.numChildren); // 1
		 * 	trace(circle1.numChildren); // 0
		 * 	trace(circle2.numChildren); // 0
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/mouseChildren.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 */
		s.mouseChildren = true;
	}
	var p = {
		/** @language chinese
		 * <p>将一个 DisplayObject 子实例添加到该 LDisplayObjectContainer 实例中。子项将被添加到该 LDisplayObjectContainer 实例中其他所有子项的前（上）面。（要将某子项添加到特定索引位置，请使用 addChildAt() 方法。）</p>
		 * <p>如果添加一个已将其它显示对象容器作为父项的子对象，则会从其它显示对象容器的子列表中删除该对象。</p>
		 * @method addChild
		 * @param {LDisplayObject} child 要作为该 LDisplayObjectContainer 实例的子项添加的 LDisplayObject 实例。
		 * @return {LDisplayObject} 在 child 参数中传递的 LDisplayObject 实例。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData("#FF0000",0,0,100,100);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/addChild.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * <p>Adds a child DisplayObject instance to this LDisplayObjectContainer instance. The child is added to the front (top) of all other children in this LDisplayObjectContainer instance. (To add a child to a specific index position, use the addChildAt() method.)</p>
		 * <p>If you add a child object that already has a different display object container as a parent, the object is removed from the child list of the other display object container.</p>
		 * @method addChild
		 * @param {LDisplayObject} child The LDisplayObject instance to add as a child of this LDisplayObjectContainer instance.
		 * @return {LDisplayObject} The LDisplayObject instance that you pass in the child parameter.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData("#FF0000",0,0,100,100);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/addChild.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>この DisplayObjectContainer インスタンスに子 LDisplayObjectContainer インスタンスを追加します。子インスタンスは、この LDisplayObjectContainer インスタンスにある他のすべての子の前（上）に追加されます（特定のインデックス位置に子を追加する場合は、addChildAt() メソッドを使用します）。</p>
		 * <p>既に異なる表示オブジェクトコンテナを親に持つ子オブジェクトを追加する場合は、もう一方の表示オブジェクトコンテナの子リストからそのオブジェクトが削除されます。</p>
		 * @method addChild
		 * @param {LDisplayObject} child この LDisplayObjectContainer インスタンスの子として追加する LDisplayObject インスタンスです。
		 * @return {LDisplayObject} child パラメーターで渡す LDisplayObject インスタンスです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var bitmapdata = new LBitmapData("#FF0000",0,0,100,100);  
		 * 	var bitmap = new LBitmap(bitmapdata);
		 * 	var layer = new LSprite();
		 * 	addChild(layer);
		 * 	layer.addChild(bitmap);
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/addChild.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		addChild : function (d) {
			var s  = this,t;
			if (d.parent) {
				t = LGlobal.destroy;
				LGlobal.destroy = false;
				d.parent.removeChild(d);
				LGlobal.destroy = t;
			}
			d.parent = s;
			s.childList.push(d);
			s.numChildren = s.childList.length;
			return d;
		},
		/** @language chinese
		 * <p>将一个 LDisplayObject 子实例添加到该 LDisplayObjectContainer 实例中。该子项将被添加到指定的索引位置。索引为 0 表示该 LDisplayObjectContainer 对象的显示列表的后（底）部。</p>
		 * <p>例如，下例在索引位置 0、2、1 处分别显示 a、b、c 三个显示对象：</p>
		 * <p><img src="../../../api/LDisplayObjectContainer/LDisplayObjectContainer_layers.jpg" /></p>
		 * <p>如果添加一个已将其它显示对象容器作为父项的子对象，则会从其它显示对象容器的子列表中删除该对象。</p>
		 * @method addChildAt
		 * @param {LDisplayObject} child 要作为该 LDisplayObjectContainer 实例的子项添加的 LDisplayObject 实例。
		 * @param {int} index 添加该子项的索引位置。 如果指定当前占用的索引位置，则该位置以及所有更高位置上的子对象会在子级列表中上移一个位置。
		 * @return {LDisplayObject} 在 child 参数中传递的 LDisplayObject 实例。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	var circle2 = new LSprite();
		 * 	container.addChild(circle1);
		 * 	container.addChildAt(circle2, 0);
		 * 	trace(container.getChildAt(0) == circle2); // true
		 * 	trace(container.getChildAt(1) == circle1); // true
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/addChildAt.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * <p>Adds a child LDisplayObject instance to this LDisplayObjectContainer instance. The child is added at the index position specified. An index of 0 represents the back (bottom) of the display list for this LDisplayObjectContainer object.</p>
		 * <p>For example, the following example shows three display objects, labeled a, b, and c, at index positions 0, 2, and 1, respectively:</p>
		 * <p><img src="../../../api/LDisplayObjectContainer/LDisplayObjectContainer_layers.jpg" /></p>
		 * <p>If you add a child object that already has a different display object container as a parent, the object is removed from the child list of the other display object container.</p>
		 * @method addChildAt
		 * @param {LDisplayObject} child child The LDisplayObject instance to add as a child of this LDisplayObjectContainer instance.
		 * @param {int} index The index position to which the child is added. If you specify a currently occupied index position, the child object that exists at that position and all higher positions are moved up one position in the child list.
		 * @return {LDisplayObject} The LDisplayObject instance that you pass in the child parameter.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	var circle2 = new LSprite();
		 * 	container.addChild(circle1);
		 * 	container.addChildAt(circle2, 0);
		 * 	trace(container.getChildAt(0) == circle2); // true
		 * 	trace(container.getChildAt(1) == circle1); // true
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/addChildAt.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>この DisplayObjectContainer インスタンスに子 LDisplayObject インスタンスを追加します。子インスタンスは、指定されたインデックス位置に追加されます。インデックス 0 は、この LDisplayObjectContainer オブジェクトの表示リストの背景または一番下を表します。</p>
		 * <p>例えば、a、b、c というラベルの 3 個の表示オブジェクトをインデックス位置 0、2、1 にそれぞれ配置すると、以下のようになります。</p>
		 * <p><img src="../../../api/LDisplayObjectContainer/LDisplayObjectContainer_layers.jpg" /></p>
		 * <p>既に異なる表示オブジェクトコンテナを親に持つ子オブジェクトを追加する場合は、もう一方の表示オブジェクトコンテナの子リストからそのオブジェクトが削除されます。</p>
		 * @method addChildAt
		 * @param {LDisplayObject} child この LDisplayObjectContainer インスタンスの子として追加する LDisplayObject インスタンスです。
		 * @param {int} index 子を追加するインデックス位置です。既にオブジェクトが置かれているインデックス位置を指定すると、その位置にあるオブジェクトとその上に位置するすべてのオブジェクトが、子リスト内で 1 つ上の位置に移動します。
		 * @return {LDisplayObject} child パラメーターで渡す LDisplayObject インスタンスです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	var circle1 = new LSprite();
		 * 	var circle2 = new LSprite();
		 * 	container.addChild(circle1);
		 * 	container.addChildAt(circle2, 0);
		 * 	trace(container.getChildAt(0) == circle2); // true
		 * 	trace(container.getChildAt(1) == circle1); // true
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/addChildAt.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		addChildAt : function (d, i) {
			var s = this,t;
			if (i < 0 || i > s.childList.length) {
				return;
			}
			if (typeof d.remove == "function") {
				t = LGlobal.destroy;
				LGlobal.destroy = false;
				d.remove();
				LGlobal.destroy = t;
			}
			d.parent = s;
			s.childList.splice(i, 0, d);
			s.numChildren = s.childList.length;
			return d;
		},
		/** @language chinese
		 * <p>从 LDisplayObjectContainer 实例的子列表中删除指定的 child LDisplayObject 实例。将已删除子项的 parent 属性设置为 null；如果不存在对该子项的任何其它引用，则将该对象作为垃圾回收。LDisplayObjectContainer 中该子项之上的任何显示对象的索引位置都减去 1。</p>
		 * @method removeChild
		 * @param {LDisplayObject} child 要删除的 LDisplayObject 实例。
		 * @return {LDisplayObject} 在 child 参数中传递的 LDisplayObject 实例。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	function main () {
		 * 		var container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 	}
		 * 	function clicked (event) {
		 * 		event.currentTarget.removeChild(event.target);
		 * 	}
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/removeChild.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * <p>Removes the specified child LDisplayObject instance from the child list of the LDisplayObjectContainer instance. The parent property of the removed child is set to null , and the object is garbage collected if no other references to the child exist. The index positions of any display objects above the child in the LDisplayObjectContainer are decreased by 1.</p>
		 * @method removeChild
		 * @param {LDisplayObject} The LDisplayObject instance to remove.
		 * @return {LDisplayObject} The LDisplayObject instance that you pass in the child parameter.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	function main () {
		 * 		var container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 	}
		 * 	function clicked (event) {
		 * 		event.currentTarget.removeChild(event.target);
		 * 	}
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/removeChild.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>LDisplayObjectContainer インスタンスの子リストから指定の child LDisplayObject インスタンスを削除します。削除された子の parent プロパティは null に設定されます。その子に対する参照が存在しない場合、そのオブジェクトはガベージコレクションによって収集されます。LDisplayObjectContainer の子より上位にある表示オブジェクトのインデックス位置は 1 つ下がります。</p>
		 * @method removeChild
		 * @param {LDisplayObject} child 削除する LDisplayObject インスタンスです。
		 * @return {LDisplayObject} child パラメーターで渡す LDisplayObject インスタンスです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	function main () {
		 * 		var container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,50,50]);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#000000",[100,100,50,50]);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 	}
		 * 	function clicked (event) {
		 * 		event.currentTarget.removeChild(event.target);
		 * 	}
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/removeChild.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		removeChild : function (d) {
			var s  = this, c = s.childList, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (d.objectIndex == c[i].objectIndex) {
					if (LGlobal.destroy && d.die) {
						d.die();
					}
					s.childList.splice(i, 1);
					break;
				}
			}
			s.numChildren = s.childList.length;
			delete d.parent;
		},
		/** @language chinese
		 * 返回位于指定索引处的子显示对象实例。
		 * @method getChildAt
		 * @param {int} index 子对象的索引位置。
		 * @return {LDisplayObject} 位于指定索引位置处的子显示对象。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	var sprite2 = new LSprite();
		 * 	var sprite3 = new LSprite();
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	container.addChildAt(sprite3, 0);
		 * 	trace(container.getChildAt(0) == sprite3); // true
		 * 	trace(container.getChildAt(1) == sprite1); // true
		 * 	trace(container.getChildAt(2) == sprite2); // true
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/getChildAt.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns the child display object instance that exists at the specified index.
		 * @method getChildAt
		 * @param {int} index The index position of the child object.
		 * @return {LDisplayObject} The child display object at the specified index position.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	var sprite2 = new LSprite();
		 * 	var sprite3 = new LSprite();
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	container.addChildAt(sprite3, 0);
		 * 	trace(container.getChildAt(0) == sprite3); // true
		 * 	trace(container.getChildAt(1) == sprite1); // true
		 * 	trace(container.getChildAt(2) == sprite2); // true
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/getChildAt.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * 指定のインデックス位置にある子表示オブジェクトインスタンスを返します。
		 * @method getChildAt
		 * @param {int} index 子オブジェクトのインデックス位置です。
		 * @return {LDisplayObject} 指定されたインデックス位置にある子表示オブジェクトです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	var sprite2 = new LSprite();
		 * 	var sprite3 = new LSprite();
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	container.addChildAt(sprite3, 0);
		 * 	trace(container.getChildAt(0) == sprite3); // true
		 * 	trace(container.getChildAt(1) == sprite1); // true
		 * 	trace(container.getChildAt(2) == sprite2); // true
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/getChildAt.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getChildAt : function (i) {
			var s  = this, c = s.childList;
			if (c.length == 0 || c.length <= i) {
				return null;
			}
			return c[i];
		},
		/** @language chinese
		 * 从 LDisplayObjectContainer 的子列表中指定的 index 位置删除子 LDisplayObject。将已删除子项的 parent 属性设置为 null；如果没有对该子项的任何其他引用，则将该对象作为垃圾回收。LDisplayObjectContainer 中该子项之上的任何显示对象的索引位置都减去 1。
		 * @method removeChildAt
		 * @param {int} index 要删除的 DisplayObject 的子索引。
		 * @return {LDisplayObject} 已删除的 DisplayObject 实例。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	trace(container.numChildren) // 2
		 * 	container.removeChildAt(0); 
		 * 	trace(container.numChildren) // 1
		 * 	trace(container.getChildAt(0).name); // sprite2
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/removeChildAt.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Removes a child LDisplayObject from the specified index position in the child list of the LDisplayObjectContainer. The parent property of the removed child is set to null, and the object is garbage collected if no other references to the child exist. The index positions of any display objects above the child in the LDisplayObjectContainer are decreased by 1.
		 * @method removeChildAt
		 * @param {int} index The child index of the LDisplayObject to remove.
		 * @return {LDisplayObject} The LDisplayObject instance that was removed.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	trace(container.numChildren) // 2
		 * 	container.removeChildAt(0); 
		 * 	trace(container.numChildren) // 1
		 * 	trace(container.getChildAt(0).name); // sprite2
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/removeChildAt.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * LDisplayObjectContainer の子リストの指定された index 位置から子 LDisplayObject を削除します。削除された子の parent プロパティは null に設定されます。その子に対する参照が存在しない場合、そのオブジェクトはガベージコレクションによって収集されます。LDisplayObjectContainer の子より上位にある表示オブジェクトのインデックス位置は 1 つ下がります。
		 * @method removeChildAt
		 * @param {int} index 削除する LDisplayObject の子インデックスです。
		 * @return {LDisplayObject} 削除された LDisplayObject インスタンスです。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	trace(container.numChildren) // 2
		 * 	container.removeChildAt(0); 
		 * 	trace(container.numChildren) // 1
		 * 	trace(container.getChildAt(0).name); // sprite2
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/removeChildAt.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		removeChildAt : function (i) {
			var s  = this, c = s.childList;
			if (c.length <= i) {
				return;
			}
			if (LGlobal.destroy && c[i].die) {
				c[i].die();
			}
			var d = s.childList.splice(i, 1);
			s.numChildren = s.childList.length;
			return d;
		},
		/** @language chinese
		 * 返回 LDisplayObject 的 child 实例的索引位置。
		 * @method getChildIndex
		 * @param {LDisplayObject} child 要标识的 LDisplayObject 实例。
		 * @return {int} 要标识的子显示对象的索引位置。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	trace(container.getChildIndex(sprite1)); // 0
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/getChildIndex.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * Returns the index position of a child LDisplayObject instance.
		 * @method getChildIndex
		 * @param {LDisplayObject} The DisplayObject instance to identify.
		 * @return {int} The index position of the child display object to identify.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	trace(container.getChildIndex(sprite1)); // 0
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/getChildIndex.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * child LDisplayObject インスタンスのインデックス位置を返します
		 * @method getChildIndex
		 * @param {LDisplayObject} 特定する LDisplayObject インスタンスです。
		 * @return {int} 特定する子表示オブジェクトのインデックス位置です。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	var container = new LSprite();
		 * 	addChild(container);
		 * 	var sprite1 = new LSprite();
		 * 	sprite1.name = "sprite1";
		 * 	var sprite2 = new LSprite();
		 * 	sprite2.name = "sprite2";
		 * 	container.addChild(sprite1);
		 * 	container.addChild(sprite2);
		 * 	trace(container.getChildIndex(sprite1)); // 0
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/getChildIndex.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		getChildIndex : function (child) {
			var s = this, c = s.childList, i, l = c.length;
			for (i = 0; i < l; i++) {
				if (c[i].objectIndex == child.objectIndex) {
					return i;
				}
			}
			return -1;
		},
		/** @language chinese
		 * <p>更改现有子项在显示对象容器中的位置。这会影响子对象的分层。例如，下例在索引位置 0、1、2 处分别显示 a、b、c 三个显示对象：</p>
		 * <p><img src="../../../api/LDisplayObjectContainer/DisplayObjectContainerSetChildIndex1.jpg" /></p>
		 * <p>在使用 setChildIndex() 方法并指定一个已经占用的索引位置时，唯一发生更改的位置是显示对象先前的位置和新位置之间的位置。所有其他位置将保持不变。如果将一个子项移动到比它当前的索引更低的索引处，则这两个索引之间的所有子项的索引引用都将增加 1。如果将一个子项移动到比它当前的索引更高的索引处，则这两个索引之间的所有子项的索引引用都将减小 1。例如，如果上例中的显示对象容器名为 container，则可以通过调用以下代码来交换带有 a 和 b 标记的显示对象的位置：</p>
		 * <p>container.setChildIndex(container.getChildAt(1), 0);</p>
		 * <p>该代码产生以下对象排列：</p>
		 * <p><img src="../../../api/LDisplayObjectContainer/DisplayObjectContainerSetChildIndex2.jpg" /></p>
		 * @method setChildIndex
		 * @param {LDisplayObject} child 要为其更改索引编号的 LDisplayObject 子实例。
		 * @param {int} index 生成的 child 显示对象的索引编号。
		 * @return {int} 生成的 child 显示对象的索引编号。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	var container;
		 * 	function main () {
		 * 		container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 		circle1.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#FF0000",[40,80,100,100],true,"#FF0000");
		 * 		circle2.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle3 = new LSprite();
		 * 		circle3.graphics.drawRect(1,"#008800",[80,0,100,100],true,"#008800");
		 * 		circle3.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addChild(circle3);
		 * 	}
		 * 	function clicked (event) {
		 * 		var circle = event.target;
		 * 		var topPosition = container.numChildren - 1;
		 * 		container.setChildIndex(circle, topPosition);
		 * 	}
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/setChildIndex.html" target="_blank">测试链接</a></p>
		 */
		/** @language english
		 * <p>Changes the position of an existing child in the display object container. This affects the layering of child objects. For example, the following example shows three display objects, labeled a, b, and c, at index positions 0, 1, and 2, respectively:</p>
		 * <p><img src="../../../api/LDisplayObjectContainer/DisplayObjectContainerSetChildIndex1.jpg" /></p>
		 * <p>When you use the setChildIndex() method and specify an index position that is already occupied, the only positions that change are those in between the display object's former and new position. All others will stay the same. If a child is moved to an index LOWER than its current index, all children in between will INCREASE by 1 for their index reference. If a child is moved to an index HIGHER than its current index, all children in between will DECREASE by 1 for their index reference. For example, if the display object container in the previous example is named container, you can swap the position of the display objects labeled a and b by calling the following code:</p>
		 * <p>container.setChildIndex(container.getChildAt(1), 0);</p>
		 * <p>This code results in the following arrangement of objects:</p>
		 * <p><img src="../../../api/LDisplayObjectContainer/DisplayObjectContainerSetChildIndex2.jpg" /></p>
		 * @method setChildIndex
		 * @param {LDisplayObject} child The child LDisplayObject instance for which you want to change the index number.
		 * @param {int} index The resulting index number for the child display object.
		 * @return {int} The resulting index number for the child display object.
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	var container;
		 * 	function main () {
		 * 		container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 		circle1.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#FF0000",[40,80,100,100],true,"#FF0000");
		 * 		circle2.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle3 = new LSprite();
		 * 		circle3.graphics.drawRect(1,"#008800",[80,0,100,100],true,"#008800");
		 * 		circle3.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addChild(circle3);
		 * 	}
		 * 	function clicked (event) {
		 * 		var circle = event.target;
		 * 		var topPosition = container.numChildren - 1;
		 * 		container.setChildIndex(circle, topPosition);
		 * 	}
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/setChildIndex.html" target="_blank">Try it »</a></p>
		 */
		/** @language japanese
		 * <p>表示オブジェクトコンテナの既存の子の位置を変更します。これは、子オブジェクトのレイヤーに影響します。例えば、a、b、c というラベルの 3 個の表示オブジェクトをインデックス位置 0、1、2 にそれぞれ配置すると、以下のようになります。</p>
		 * <p><img src="../../../api/LDisplayObjectContainer/DisplayObjectContainerSetChildIndex1.jpg" /></p>
		 * <p>setChildIndex() を使用し、既に占有されているインデックス位置を指定した場合、表示オブジェクトの前の位置と新しい位置の間にある位置だけが変化します。その他は変化しません。現在のインデックスよりも小さいインデックスに子を移動すると、その間のすべての子が、それぞれのインデックス参照について 1 増加します。現在のインデックスよりも大きいインデックスに子を移動すると、その間のすべての子が、それぞれのインデックス参照について 1 減少します。例えば、上記の例の表示オブジェクトコンテナの名前が container である場合、次に示すコードを呼び出すことによって、a および b というラベルが付けられた表示オブジェクトの位置を入れ替えることができます。</p>
		 * <p>container.setChildIndex(container.getChildAt(1), 0);</p>
		 * <p>このコードによって、次に示すようなオブジェクトの配置になります。</p>
		 * <p><img src="../../../api/LDisplayObjectContainer/DisplayObjectContainerSetChildIndex2.jpg" /></p>
		 * @method setChildIndex
		 * @param {LDisplayObject} child インデックス番号を変更する子 LDisplayObject インスタンスです。
		 * @param {int} index 表示オブジェクトの結果のインデックス番号です。
		 * @return {int} child 表示オブジェクトの結果のインデックス番号です。
		 * @since 1.0.0
		 * @public
		 * @example
		 * 	LInit(50, "legend", 800, 480, main);
		 * 	var container;
		 * 	function main () {
		 * 		container = new LSprite();
		 * 		addChild(container);
		 * 		var circle1 = new LSprite();
		 * 		circle1.graphics.drawRect(1,"#000000",[0,0,100,100],true,"#000000");
		 * 		circle1.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle2 = new LSprite();
		 * 		circle2.graphics.drawRect(1,"#FF0000",[40,80,100,100],true,"#FF0000");
		 * 		circle2.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		var circle3 = new LSprite();
		 * 		circle3.graphics.drawRect(1,"#008800",[80,0,100,100],true,"#008800");
		 * 		circle3.addEventListener(LMouseEvent.MOUSE_DOWN, clicked);
		 * 		container.addChild(circle1);
		 * 		container.addChild(circle2);
		 * 		container.addChild(circle3);
		 * 	}
		 * 	function clicked (event) {
		 * 		var circle = event.target;
		 * 		var topPosition = container.numChildren - 1;
		 * 		container.setChildIndex(circle, topPosition);
		 * 	}
		 * @examplelink <p><a href="../../../api/LDisplayObjectContainer/setChildIndex.html" target="_blank">実際のサンプルを見る</a></p>
		 */
		setChildIndex : function (child, index) {
			var s = this, c = s.childList, i, l = c.length;
			if (child.parent == "root" || child.parent.objectIndex != s.objectIndex || index < 0 || index >= l) {
				return -1;
			}
			for (i = 0; i < l; i++) {
				if(c[i].objectIndex == child.objectIndex){
					break;
				}
			}
			s.childList.splice(i,1);
			s.childList.splice(index, 0, child);
			return index;
		},
		resize : function () {
			var s  = this;
			s.width = s.getWidth();
			s.height = s.getHeight();
		},
		removeAllChild : function () {
			var s  = this, c = s.childList, i, l;
			for (i = 0, l = c.length; i < l; i++) {
				if (LGlobal.destroy && c[i].die) {
					c[i].die();
				}
			}
			s.childList.length = 0;
			s.width = 0;
			s.height = 0;
			s.numChildren = 0;
		}
	};
	for (var k in p) {
		LDisplayObjectContainer.prototype[k] = p[k];
	}
	return LDisplayObjectContainer;
})();