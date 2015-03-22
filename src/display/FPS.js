/** @language chinese
 * <p>确认FPS</p>
 * <p>各属性如下：</p>
 * <table>
 * <tr><th>属性</th><th>说明</th></tr>
 * <tr><td>FPS</td><td>每秒传输帧数(Frames Per Second)。</td></tr>
 * <tr><td>DisplayObject</td><td>画面中有属性变换的LDisplayObject对象的数量 / 画面中LDisplayObject对象的总数量。</td></tr>
 * <tr><td>Draw image</td><td>画面中LBitmap对象的总数量。</td></tr>
 * <tr><td>Draw graphics</td><td>画面中LGraphics的绘图次数。</td></tr>
 * <tr><td>Draw text</td><td>画面中LTextField对象的总数量。</td></tr>
 * </table>
 * @class FPS
 * @extends LSprite
 * @constructor
 * @example
 * 	addChild(new FPS());
 * @examplelink <p><a href="../../../api/FPS/index.html" target="_blank">测试链接</a></p>
 * @since 1.7.6
 * @public
 */
/** @language english
 * Show the FPS
 * @class LShape
 * @extends LSprite
 * @constructor
 * @example
 * 	addChild(new FPS());
 * @examplelink <p><a href="../../../api/FPS/index.html" target="_blank">Try it »</a></p>
 * @since 1.7.6
 * @public
 */
/** @language japanese
 * FPSを確認する
 * @class FPS
 * @extends LSprite
 * @constructor
 * @example
 * 	addChild(new FPS());
 * @examplelink <p><a href="../../../api/FPS/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.7.6
 * @public
 */
var FPS = (function () {
	function FPS(){
		var s = this;
		LExtends(s,LSprite,[]);
		if (!LGlobal.fpsStatus) {
			LGlobal.fpsStatus = {
				a : 0,
				b : 0,
				c : 0,
				d : 0,
				e : 0,
				bitmapData : 0,
				display : 0,
				transform : 0,
				graphics : 0,
				text : 0,
				reset : function () {
					this.a = this.bitmapData;
					this.b = this.display - 1;
					this.c = this.transform - 1;
					this.d = this.graphics - 1;
					this.e = this.text - 5;
					this.bitmapData = 0;
					this.display = 0;
					this.transform = 0;
					this.graphics = 0;
					this.text = 0;
				}
			};
		}
		s.fps = [];
		s.back = new LShape();
		s.back.alpha = 0.5;
		s.addChild(s.back);
		for(var i=0;i<5;i++){
			var f = new LTextField();
			f.color = "#ffffff";
			f.y = i * 20;
			s.addChild(f);
			s.fps.push(f);
		}
		s.fpsCount = 0;
		s.fpsTime = (new Date()).getTime();
		s.addEventListener(LEvent.ENTER_FRAME,s.showFPS);
	}
	FPS.prototype.showFPS = function(e){
		var s = e.currentTarget, t, f;
		s.fpsCount++;
		t = (new Date()).getTime();
		if(t - s.fpsTime < 1000)return;
		s.fps[0].text = "FPS : " + Math.round(s.fpsCount*10000 / (t-s.fpsTime))/10; 
		f = LGlobal.fpsStatus;
		s.fps[1].text = "DisplayObject : " + f.c + "/" + f.b; 
		s.fps[2].text = "Draw image : " + f.a; 
		s.fps[3].text = "Drwa graphics : " + f.d; 
		s.fps[4].text = "Draw text : " + f.e; 
		s.fpsTime = t;
		s.fpsCount = 0;
		s.back.graphics.clear();
		s.back.graphics.drawRect(0,"#000000",[0,0,s.fps[1].getWidth(),100],true,"#000000");
	};
	FPS.prototype.die = function(){
		var s = this;
		LGlobal.fpsStatus = null;
		s.callParent("die",arguments);
	};
	return FPS;
})();