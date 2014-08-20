/** @language chinese
 * lufylegend.js专用UI，显示一个消息框
 * @class UI:LMessageBox
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LMessageBox.html" target="_blank">测试链接</a></p>
 * @public
 */
/** @language english
 * lufylegend.js UI, MessageBox
 * @class UI:LMessageBox
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LMessageBox.html" target="_blank">Try it »</a></p>
 * @public
 */
/** @language japanese
 * lufylegend.jsの専用のUI、メッセージボックス
 * @class UI:LMessageBox
 * @constructor
 * @since 0.9.1
 * @examplelink <p><a href="../../../api/ui/LMessageBox.html" target="_blank">実際のサンプルを見る</a></p>
 * @public
 */
function LMessageBox(){}
LMessageBox.show = function(properties){
	if(!properties.width)properties.width = 500;
	if(!properties.height)properties.height = 300;
	if(!properties.title)properties.title = "";
	if(!properties.size)properties.size = 16;
	if(!properties.textHeight)properties.textHeight = 35;
	
	if(properties.displayObject){
		properties.width = properties.displayObject.getWidth();
		properties.height = properties.displayObject.getHeight();
	}
	var translucent = new LSprite();
	translucent.graphics.drawRect(0,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");
	translucent.alpha = 0.5;
	LGlobal.stage.addChild(translucent);
	translucent.addEventListener(LMouseEvent.MOUSE_UP,function(e){});
	translucent.addEventListener(LMouseEvent.MOUSE_DOWN,function(e){});
	translucent.addEventListener(LMouseEvent.MOUSE_MOVE,function(e){});
	translucent.addEventListener(LMouseEvent.MOUSE_OVER,function(e){});
	translucent.addEventListener(LMouseEvent.MOUSE_OUT,function(e){});
	
	var myWindow = new LWindow(properties.width,properties.height,properties.title);
	myWindow.x = (LGlobal.width - myWindow.getWidth())*0.5;
	myWindow.y = (LGlobal.height - myWindow.getHeight())*0.5;
	LGlobal.stage.addChild(myWindow);
	
	myWindow.addEventListener(LWindow.CLOSE,function(e){
		translucent.die();
		translucent.remove();
	});			
	
	if(properties.displayObject){
		myWindow.layer.addChild(properties.displayObject);
		return;
	}
	var msgLabel = new LTextField();
	msgLabel.width = properties.width - 100;
	msgLabel.setWordWrap(true,properties.textHeight);
	msgLabel.text = properties.message;
	msgLabel.x = (properties.width - msgLabel.width)*0.5;
	msgLabel.y = (properties.height - myWindow.bar.getHeight() - msgLabel.getHeight())*0.5;
	myWindow.layer.addChild(msgLabel);
};