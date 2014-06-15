/** @language chinese
 * LMultitouch 类管理并提供有关当前环境支持用于处理来自用户输入设备的接触的信息，包括有两个或多个触点（例如，用户在触摸屏上使用的手指）的接触。当用户与带有触摸屏的移动电话或平板电脑等设备交互时，用户通常使用手指或指针设备接触屏幕。有很多种指针设备，如鼠标或笔针，其中很多种设备在某个应用程序中仅具有一个触控点。对于具有一个触控点的指针设备，用户交互事件可处理为鼠标事件，或者使用基本 touch 事件集（称为“接触点”事件）。
 * @class LMultitouch
 * @constructor
 * @since 1.0.0
 * @example
 * 	LInit(1000/50,"legend",800,450,main);
 * 	var layer,backLayer,touchPointIDList = [];
 * 	function main () {
 * 		if(LGlobal.canTouch){
 * 				LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
 * 					LSystem.screen(LStage.FULL_SCREEN);
 * 		}
 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
 * 		layer = new LSprite();
 * 		layer.graphics.drawRect(2,"#ffffff",[0,0,LGlobal.width,LGlobal.height],true,"#ffffff");
 * 		addChild(layer);
 * 		backLayer = new LSprite();
 * 		backLayer.y = 50;
 * 		layer.addChild(backLayer);
 * 		var txtLabel = new LTextField();
 * 		txtLabel.size = 18;
 * 		txtLabel.x = 10;
 * 		txtLabel.y = 5;
 * 		layer.addChild(txtLabel);
 * 		if(!LGlobal.canTouch){
 * 			txtLabel.text = "多点触屏测试：请用手机或平板电脑测试";
 * 		}else{
 * 			txtLabel.text = "多点触屏测试：请点击屏幕进行测试";
 * 		}
 * 		layer.addEventListener(LMouseEvent.MOUSE_DOWN,addTouchPointID);
 * 		layer.addEventListener(LMouseEvent.MOUSE_MOVE,addTouchPointID);
 * 		layer.addEventListener(LMouseEvent.MOUSE_UP,removeTouchPointID);
 * 	}
 * 	function addTouchPointID(e){
 * 		var f = false;
 * 		for(var i=0;i<touchPointIDList.length;i++){
 * 			if(touchPointIDList[i].touchPointID == e.touchPointID){
 * 				touchPointIDList[i] = e;
 * 				f = true;
 * 				break;
 * 			}
 * 		}
 * 		if(!f)touchPointIDList.push(e);
 * 		draw();
 * 	}
 * 	function removeTouchPointID(e){
 * 		for(var i=0;i<touchPointIDList.length;i++){
 * 			if(touchPointIDList[i].touchPointID == e.touchPointID){
 * 				touchPointIDList.splice(i,1);
 * 				break;
 * 			}
 * 		}
 * 		draw();
 * 	}
 * 	function draw(){
 * 		backLayer.removeAllChild();
 * 		for(var i=0;i<touchPointIDList.length;i++){
 * 			var eve = touchPointIDList[i];
 * 			var title = new LTextField();
 * 			title.text = "id:"+eve.touchPointID+","+eve.offsetX+","+eve.offsetY;
 * 			title.size = 18;
 * 			title.x = 10;
 * 			title.y = i*23;
 * 			backLayer.addChild(title);
 * 		}
 * 	}
 * @examplelink <p><a href="../../../api/LMultitouch/index.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * The LMultitouch class manages and provides information about the current environment's support for handling contact from user input devices, including contact that has two or more touch points (such as a user's fingers on a touch screen). When a user interacts with a device such as a mobile phone or tablet with a touch screen, the user typically touches the screen with his or her fingers or a pointing device. While there is a broad range of pointing devices, such as a mouse or a stylus, many of these devices only have a single point of contact with an application. For pointing devices with a single point of contact, user interaction events can be handled as a mouse event, or using a basic set of touch events (called "touch point" events).
 * @class LMultitouch
 * @constructor
 * @since 1.0.0
 * 	LInit(1000/50,"legend",800,450,main);
 * 	var layer,backLayer,touchPointIDList = [];
 * 	function main () {
 * 		if(LGlobal.canTouch){
 * 				LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
 * 					LSystem.screen(LStage.FULL_SCREEN);
 * 		}
 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
 * 		layer = new LSprite();
 * 		layer.graphics.drawRect(2,"#ffffff",[0,0,LGlobal.width,LGlobal.height],true,"#ffffff");
 * 		addChild(layer);
 * 		backLayer = new LSprite();
 * 		backLayer.y = 50;
 * 		layer.addChild(backLayer);
 * 		var txtLabel = new LTextField();
 * 		txtLabel.size = 18;
 * 		txtLabel.x = 10;
 * 		txtLabel.y = 5;
 * 		layer.addChild(txtLabel);
 * 		if(!LGlobal.canTouch){
 * 			txtLabel.text = "多点触屏测试：请用手机或平板电脑测试";
 * 		}else{
 * 			txtLabel.text = "多点触屏测试：请点击屏幕进行测试";
 * 		}
 * 		layer.addEventListener(LMouseEvent.MOUSE_DOWN,addTouchPointID);
 * 		layer.addEventListener(LMouseEvent.MOUSE_MOVE,addTouchPointID);
 * 		layer.addEventListener(LMouseEvent.MOUSE_UP,removeTouchPointID);
 * 	}
 * 	function addTouchPointID(e){
 * 		var f = false;
 * 		for(var i=0;i<touchPointIDList.length;i++){
 * 			if(touchPointIDList[i].touchPointID == e.touchPointID){
 * 				touchPointIDList[i] = e;
 * 				f = true;
 * 				break;
 * 			}
 * 		}
 * 		if(!f)touchPointIDList.push(e);
 * 		draw();
 * 	}
 * 	function removeTouchPointID(e){
 * 		for(var i=0;i<touchPointIDList.length;i++){
 * 			if(touchPointIDList[i].touchPointID == e.touchPointID){
 * 				touchPointIDList.splice(i,1);
 * 				break;
 * 			}
 * 		}
 * 		draw();
 * 	}
 * 	function draw(){
 * 		backLayer.removeAllChild();
 * 		for(var i=0;i<touchPointIDList.length;i++){
 * 			var eve = touchPointIDList[i];
 * 			var title = new LTextField();
 * 			title.text = "id:"+eve.touchPointID+","+eve.offsetX+","+eve.offsetY;
 * 			title.size = 18;
 * 			title.x = 10;
 * 			title.y = i*23;
 * 			backLayer.addChild(title);
 * 		}
 * 	}
 * @examplelink <p><a href="../../../api/LMultitouch/index.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * LMultitouch クラスは、現在の環境でのユーザーによる入力デバイス操作の処理のサポートに関する情報の管理と提供を行います。複数のタッチポイント（ユーザーが複数の指でタッチスクリーンに触れるなど）が可能な入力デバイスが含まれます。タッチスクリーン搭載の携帯電話またはタブレットなどのデバイスを操作する場合、ユーザーは通常、指やポインティングデバイスで画面に触れます。ポインティングデバイスにはマウスやスタイラスなど様々な種類のものがありますが、これらのデバイスの多くは、アプリケーションでの接触ポイントは 1 つだけです。接触ポイントが 1 つだけのポインティングデバイスでは、ユーザーの操作イベントは、マウスイベントとしてか、タッチイベント（"タッチポイント" イベントと呼ばれる）の基本セットを使用したものとして扱うことができます。
 * @class LMultitouch
 * @constructor
 * @since 1.0.0
 * 	LInit(1000/50,"legend",800,450,main);
 * 	var layer,backLayer,touchPointIDList = [];
 * 	function main () {
 * 		if(LGlobal.canTouch){
 * 				LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
 * 					LSystem.screen(LStage.FULL_SCREEN);
 * 		}
 * 		LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
 * 		layer = new LSprite();
 * 		layer.graphics.drawRect(2,"#ffffff",[0,0,LGlobal.width,LGlobal.height],true,"#ffffff");
 * 		addChild(layer);
 * 		backLayer = new LSprite();
 * 		backLayer.y = 50;
 * 		layer.addChild(backLayer);
 * 		var txtLabel = new LTextField();
 * 		txtLabel.size = 18;
 * 		txtLabel.x = 10;
 * 		txtLabel.y = 5;
 * 		layer.addChild(txtLabel);
 * 		if(!LGlobal.canTouch){
 * 			txtLabel.text = "多点触屏测试：请用手机或平板电脑测试";
 * 		}else{
 * 			txtLabel.text = "多点触屏测试：请点击屏幕进行测试";
 * 		}
 * 		layer.addEventListener(LMouseEvent.MOUSE_DOWN,addTouchPointID);
 * 		layer.addEventListener(LMouseEvent.MOUSE_MOVE,addTouchPointID);
 * 		layer.addEventListener(LMouseEvent.MOUSE_UP,removeTouchPointID);
 * 	}
 * 	function addTouchPointID(e){
 * 		var f = false;
 * 		for(var i=0;i<touchPointIDList.length;i++){
 * 			if(touchPointIDList[i].touchPointID == e.touchPointID){
 * 				touchPointIDList[i] = e;
 * 				f = true;
 * 				break;
 * 			}
 * 		}
 * 		if(!f)touchPointIDList.push(e);
 * 		draw();
 * 	}
 * 	function removeTouchPointID(e){
 * 		for(var i=0;i<touchPointIDList.length;i++){
 * 			if(touchPointIDList[i].touchPointID == e.touchPointID){
 * 				touchPointIDList.splice(i,1);
 * 				break;
 * 			}
 * 		}
 * 		draw();
 * 	}
 * 	function draw(){
 * 		backLayer.removeAllChild();
 * 		for(var i=0;i<touchPointIDList.length;i++){
 * 			var eve = touchPointIDList[i];
 * 			var title = new LTextField();
 * 			title.text = "id:"+eve.touchPointID+","+eve.offsetX+","+eve.offsetY;
 * 			title.size = 18;
 * 			title.x = 10;
 * 			title.y = i*23;
 * 			backLayer.addChild(title);
 * 		}
 * 	}
 * @examplelink <p><a href="../../../api/LMultitouch/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
var LMultitouch = function () {throw "LMultitouch cannot be instantiated";};
/** @language chinese
 * 标识用于触摸和手势事件处理的多点触控模式。要设置此属性，请使用 LMultitouchInputMode 类中的值。
 * @property inputMode
 * @type String
 * @default none
 * @since 1.9.0
 * @public
 */
/** @language english
 * Identifies the multi-touch mode for touch and gesture event handling. To set this property, use values from the LMultitouchInputMode class.
 * @property inputMode
 * @type String
 * @default none
 * @since 1.9.0
 * @public
 */
/** @language japanese
 * タッチおよびジェスチャイベントを扱うマルチタッチモードを識別します。このプロパティを設定するには、LMultitouchInputMode クラスの値を使用します。
 * @property inputMode
 * @type String
 * @default none
 * @since 1.9.0
 * @public
 */
LMultitouch.inputMode = "none";
LMultitouch.touchs = [];
