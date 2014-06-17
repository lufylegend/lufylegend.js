/** @language chinese
 * <p>全局类。</p>
 * @class LGlobal
 */
/** @language english
 * <p>Global Class</p>
 * @class LGlobal
 */
/** @language japanese
 * <p>グローバルクラス</p>
 * @class LGlobal
 */
var LGlobal = ( function () {
	function LGlobal () {
		throw "LGlobal cannot be instantiated";
	}

	/** @language chinese
	 * <p>[静态] 定义全屏的属性值。</p>
	 * <p>用法请参照LGlobal.screen函数</p>
	 * @property FULL_SCREEN
	 * @type String
	 * @static
	 * @since 1.9.0
	 * @public
	 */
	/** @language english
	 * <p>[static] Defines the value of the full screen.</p>
	 * <p>Please refer LGlobal.screen function</p>
	 * @property FULL_SCREEN
	 * @type String
	 * @static
	 * @since 1.9.0
	 * @public
	 */
	/** @language japanese
	 * <p>[静的] フルスクリーンの値を定義します。</p>
	 * <p>使い方はLGlobal.screenの関数を参考してください。</p>
	 * @property FULL_SCREEN
	 * @type String
	 * @static
	 * @since 1.9.0
	 * @public
	 */
	LGlobal.FULL_SCREEN = "full_screen";
	LGlobal.traceDebug = false;
	LGlobal.displayState = NONE;
	LGlobal.aspectRatio = NONE;
	LGlobal.stage = null;
	LGlobal.canvas = null;
	LGlobal.width = 0;
	LGlobal.height = 0;
	LGlobal.box2d = null;
	LGlobal.speed = 50;
	LGlobal.IS_MOUSE_DOWN = false;
	LGlobal.preventDefault = true;
	LGlobal.childList = new Array();
	LGlobal.dragList = new Array();
	LGlobal.stageScale = "noScale";
	LGlobal.align = "M";
	LGlobal.canTouch = false;
	LGlobal.os = OS_PC;
	LGlobal.ios = false;
	LGlobal.android = false;
	LGlobal.android_new = false;
	LGlobal.backgroundColor = null;
	LGlobal.destroy = true;
	LGlobal.devicePixelRatio = window.devicePixelRatio || 1;
	LGlobal.startTimer = 0;
	LGlobal.keepClear = true;
	LGlobal.top = 0;
	LGlobal.left = 0;
	LGlobal.window = window;
	(function (n) {
		LGlobal.isFirefox = (n.toLowerCase().indexOf('firefox') >= 0);
		if (n.indexOf(OS_IPHONE) > 0) {
			LGlobal.os = OS_IPHONE;
			LGlobal.canTouch = true;
			LGlobal.ios = true;
		} else if (n.indexOf(OS_IPOD) > 0) {
			LGlobal.os = OS_IPOD;
			LGlobal.canTouch = true;
			LGlobal.ios = true;
		} else if (n.indexOf(OS_IPAD) > 0) {
			LGlobal.os = OS_IPAD;
			LGlobal.ios = true;
			LGlobal.canTouch = true;
		} else if (n.indexOf(OS_ANDROID) > 0) {
			LGlobal.os = OS_ANDROID;
			LGlobal.canTouch = true;
			LGlobal.android = true;
			var i = n.indexOf(OS_ANDROID);
			if(parseInt(n.substr(i + 8, 1)) > 3){
				LGlobal.android_new = true;
			}
		}
	})(navigator.userAgent);
	LGlobal.setDebug = function (v) {
		LGlobal.traceDebug = v; 
	};
	LGlobal.setCanvas = function (id, w, h) {
		LGlobal.ll_createCanvas(id, w, h);
		LGlobal.ll_createStage();
		if(LGlobal.displayState == LStage.FULL_SCREEN){
			LGlobal.resize();
		}else if(typeof LGlobal.displayState == "number"){
			LGlobal.resize(LGlobal.width * LGlobal.displayState, LGlobal.height * LGlobal.displayState);
		}
		if (LGlobal.canTouch) {
			LGlobal.ll_clicks = 0;
			LGlobal.ll_prev_clickTime = 0;
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_START, LGlobal.ll_touchStart);
			LEvent.addEventListener(document,LMouseEvent.TOUCH_END, LGlobal.ll_touchEnd);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_MOVE, LGlobal.ll_touchMove);
		} else {
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.DOUBLE_CLICK, LGlobal.ll_mouseDbclick);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_DOWN, LGlobal.ll_mouseDown);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_MOVE, LGlobal.ll_mouseMove);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_UP, LGlobal.ll_mouseUp);
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_OUT, LGlobal.ll_mouseOut);
		}
	};
	LGlobal.ll_createCanvas = function (id, w, h) {
		LGlobal.id = id;
		LGlobal.object = document.getElementById(id);
		LGlobal.object.innerHTML = '<div style="position:absolute;margin:0;padding:0;overflow:visible;-webkit-transform: translateZ(0);z-index:0;">' +
		'<canvas id="' + LGlobal.id + '_canvas" style="margin:0;padding:0;width:' + w + 'px;height:' + h + 'px;">' +
		'<div id="noCanvas">' +
		"<p>Hey there, it looks like you're using Microsoft's Internet Explorer. Microsoft hates the Web and doesn't support HTML5 :(</p>" + 
		'</div>' +  
		'</canvas></div>' +
		'<div id="' + LGlobal.id + '_InputText" style="position:absolute;margin:0;padding:0;z-index:10;display:none;">' +
		'<textarea rows="1" id="' + LGlobal.id + '_InputTextareaBox" style="resize:none;background:transparent;border:0px;"></textarea>' +
		'<input type="text" id="' + LGlobal.id + '_InputTextBox"  style="background:transparent;border:0px;" />' +
		'<input type="password" id="' + LGlobal.id + '_passwordBox"  style="background:transparent;border:0px;" /></div>';
		LGlobal.canvasObj = document.getElementById(LGlobal.id + "_canvas");
		LGlobal._canvas = document.createElement("canvas");
		LGlobal._context = LGlobal._canvas.getContext("2d");
		if (LGlobal._context) {
			LGlobal.canvasObj.innerHTML="";
		}
		LGlobal.inputBox = document.getElementById(LGlobal.id + '_InputText');
		LGlobal.inputTextareaBoxObj = document.getElementById(LGlobal.id + '_InputTextareaBox');
		LGlobal.inputTextBoxObj = document.getElementById(LGlobal.id + '_InputTextBox');
		LGlobal.passwordBoxObj = document.getElementById(LGlobal.id + '_passwordBox');
		LGlobal.inputTextField = null;
		if (w) {
			LGlobal.canvasObj.width = w;
		}
		if (h) {
			LGlobal.canvasObj.height = h;
		}
		LGlobal.width = LGlobal.canvasObj.width;
		LGlobal.height = LGlobal.canvasObj.height;
		LGlobal.canvasStyleWidth = LGlobal.width;
		LGlobal.canvasStyleHeight = LGlobal.height;
		LGlobal.canvas = LGlobal.canvasObj.getContext("2d");
		LGlobal.offsetX = mouseX = 0;
		LGlobal.offsetY = mouseY = 0;
	};
	LGlobal.ll_createStage = function () {
		LGlobal.stage = new LSprite();
		LGlobal.stage.parent = "root";
		LGlobal.childList.push(LGlobal.stage);
		LGlobal.stage.baseAddEvent = LGlobal.stage.addEventListener;
		LGlobal.stage.baseRemoveEvent = LGlobal.stage.removeEventListener;
		LGlobal.stage.addEventListener = function (type, listener) {
			if (type == LEvent.WINDOW_RESIZE) {
				LGlobal.stage.onresizeListener = listener;
				LGlobal.stage.onresize = function (e) {
					LGlobal.stage.onresizeEvent = e;
				};
				LEvent.addEventListener(LGlobal.window, type,LGlobal.stage.onresize);
			} else if (type == LKeyboardEvent.KEY_DOWN || type == LKeyboardEvent.KEY_UP || type == LKeyboardEvent.KEY_PRESS) {
				LEvent.addEventListener(LGlobal.window, type, listener);
			} else {
				LGlobal.stage.baseAddEvent(type, listener);
			}
		};
		LGlobal.stage.removeEventListener = function (type, listener) {
			if (type == LEvent.WINDOW_RESIZE) {
				LEvent.removeEventListener(LGlobal.window, LEvent.WINDOW_RESIZE, LGlobal.stage.onresize);
				delete LGlobal.stage.onresize;
				delete LGlobal.stage.onresizeListener;
			} else if (type == LKeyboardEvent.KEY_DOWN || type == LKeyboardEvent.KEY_UP || type == LKeyboardEvent.KEY_PRESS) {
				LEvent.removeEventListener(LGlobal.window, type, listener);
			} else {
				LGlobal.stage.baseRemoveEvent(type, listener);
			}
		};
	};
	LGlobal.ll_touchStart = function (event) {
		if (LGlobal.inputBox.style.display != NONE) {
			LGlobal.inputTextField._ll_getValue();
		}
		var canvasX = parseInt(STR_ZERO + LGlobal.object.style.left) + parseInt(LGlobal.canvasObj.style.marginLeft),
		canvasY = parseInt(STR_ZERO + LGlobal.object.style.top) + parseInt(LGlobal.canvasObj.style.marginTop), eve, k, i, eveIndex;
		if (LMultitouch.inputMode == LMultitouchInputMode.NONE) {
			eveIndex = 0;
		} else if (LMultitouch.inputMode == LMultitouchInputMode.TOUCH_POINT) {
			eveIndex = event.touches.length - 1;
		}
		eve = {offsetX : (event.touches[eveIndex].pageX - canvasX),
		offsetY : (event.touches[eveIndex].pageY - canvasY),
		touchPointID : event.touches[eveIndex].identifier};
		eve.offsetX = LGlobal.ll_scaleX(eve.offsetX);
		eve.offsetY = LGlobal.ll_scaleY(eve.offsetY);
		mouseX = LGlobal.offsetX = eve.offsetX;
		mouseY = LGlobal.offsetY = eve.offsetY;
		LMultitouch.touchs["touch" + eve.touchPointID] = eve;
		LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_DOWN);
		LGlobal.buttonStatusEvent = eve;
		var date = new Date();
		var clickTime = date.getTime();
		LGlobal.ll_clicks = (clickTime <= (LGlobal.ll_prev_clickTime + 500)) ? (LGlobal.ll_clicks + 1) : 1;
		LGlobal.ll_prev_clickTime = clickTime;
		if (LGlobal.ll_clicks === 2) {
			LGlobal.mouseEvent(eve, LMouseEvent.DOUBLE_CLICK);
			LGlobal.ll_clicks = 0;
		}
		LGlobal.IS_MOUSE_DOWN = true;
		if (LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.mouseJoint_start) {
			LGlobal.mouseJoint_start(eve);
		}
		LGlobal.touchHandler(event);
	};
	LGlobal.ll_touchEnd = function (event) {
		var e, eve, k, i, l, h;
		if (LMultitouch.inputMode == LMultitouchInputMode.TOUCH_POINT) {
			for (k in LMultitouch.touchs) {
				e = LMultitouch.touchs[k];
				h = false;
				for (i = 0,l = event.touches.length; i < l; i++) {
					if (event.touches[i].identifier == e.touchPointID) {
						h = true;
						break;
					}
				}
				if (!h) {
					eve = e;
					delete LMultitouch.touchs[k];
					break;
				}
			}
		}
		if (!eve) {
			eve = {offsetX : LGlobal.offsetX, offsetY : LGlobal.offsetY};
		}
		LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_UP);
		LGlobal.touchHandler(event);
		LGlobal.IS_MOUSE_DOWN = false;
		LGlobal.buttonStatusEvent = null;
		if (LGlobal.box2d != null && LGlobal.box2d.mouseJoint) {
			LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
			LGlobal.box2d.mouseJoint = null;
		}
	};
	LGlobal.ll_touchMove = function (e) {
		var cX = parseInt(STR_ZERO + LGlobal.object.style.left) + parseInt(LGlobal.canvasObj.style.marginLeft),
		cY = parseInt(STR_ZERO + LGlobal.object.style.top) + parseInt(LGlobal.canvasObj.style.marginTop),
		eve, l, ll = e.touches.length;
		if (LMultitouch.inputMode == LMultitouchInputMode.NONE) {
			ll = 1;
		}
		for (i = 0, l = e.touches.length; i < l && i < ll; i++) {
			eve = {offsetX : (e.touches[i].pageX - cX), offsetY : (e.touches[i].pageY - cY), touchPointID : e.touches[i].identifier};
			eve.offsetX = LGlobal.ll_scaleX(eve.offsetX);
			eve.offsetY = LGlobal.ll_scaleY(eve.offsetY);
			mouseX = LGlobal.offsetX = eve.offsetX;
			mouseY = LGlobal.offsetY = eve.offsetY;
			if (LMultitouch.touchs["touch" + eve.touchPointID] && 
				LMultitouch.touchs["touch" + eve.touchPointID].offsetX == eve.offsetX && 
				LMultitouch.touchs["touch" + eve.touchPointID].offsetY == eve.offsetY){
				continue;	
			}
			LGlobal.buttonStatusEvent = eve;
			LMultitouch.touchs["touch" + eve.touchPointID] = eve;
			LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_MOVE);
		}
		LGlobal.touchHandler(e);
		if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.mouseJoint_move){
			LGlobal.mouseJoint_move(eve);
		}
	};
	LGlobal.ll_mouseDbclick = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		var event = {button : e.button};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.mouseEvent(event, LMouseEvent.DOUBLE_CLICK);
	};
	LGlobal.ll_mouseDown = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		if (LGlobal.inputBox.style.display != NONE) {
			LGlobal.inputTextField._ll_getValue();
		}
		var event = {button : e.button};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.mouseEvent(event, LMouseEvent.MOUSE_DOWN);
		LGlobal.IS_MOUSE_DOWN = true;
		if (LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.mouseJoint_start) {
			LGlobal.mouseJoint_start(e);
		}
	};
	LGlobal.ll_mouseMove = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		var event = {};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.buttonStatusEvent = event;
		mouseX = LGlobal.offsetX = event.offsetX;
		mouseY = LGlobal.offsetY = event.offsetY;
		LGlobal.mouseEvent(event, LMouseEvent.MOUSE_MOVE);
		if (LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null && LGlobal.box2d.mouseJoint) {
			LGlobal.box2d.mouseJoint.SetTarget(new LGlobal.box2d.b2Vec2(e.offsetX / LGlobal.box2d.drawScale, e.offsetY / LGlobal.box2d.drawScale));
		}
	};
	LGlobal.ll_mouseUp = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		var event = {button : e.button};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.mouseEvent(event, LMouseEvent.MOUSE_UP);
		LGlobal.IS_MOUSE_DOWN = false;
		if (LGlobal.box2d != null && LGlobal.box2d.mouseJoint) {
			LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
			LGlobal.box2d.mouseJoint = null;
		}
	};
	LGlobal.ll_mouseOut = function (e) {
		if (e.offsetX == null && e.layerX != null) {
			e.offsetX = e.layerX;
			e.offsetY = e.layerY;
		}
		var event = {};
		event.offsetX = LGlobal.ll_scaleX(e.offsetX);
		event.offsetY = LGlobal.ll_scaleY(e.offsetY);
		LGlobal.mouseEvent(event, LMouseEvent.MOUSE_OUT);
		LGlobal.IS_MOUSE_DOWN = false;
	};
	LGlobal.touchHandler = function (e) {
		e.stopPropagation();
		if (LGlobal.preventDefault) {
			e.preventDefault();
		}
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		return e;
	};
	LGlobal.mouseEvent = function (e, t) {
		if (t == LMouseEvent.MOUSE_MOVE) {
			LGlobal.dragHandler(e);
		}
		if (LMouseEventContainer.container[t]) {
			LMouseEventContainer.dispatchMouseEvent(e, t);
			return;
		}
		for (var k = LGlobal.childList.length - 1; k >= 0; k--) {
			if (LGlobal.childList[k].mouseEvent && LGlobal.childList[k].mouseEvent(e, t)) {
				break;
			}
		}
	};
	LGlobal.dragHandler = function (e) {
		var i, s, c, d = LGlobal.dragList;
		for(i = d.length - 1; i >= 0; i--) {
			s = d[i];
			if (LGlobal.canTouch && s.ll_touchPointID != e.touchPointID) {
				continue;
			}
			c = s.getAbsoluteScale();
			s.x = s.ll_dragStartX + (e.offsetX - s.ll_dragMX) * s.scaleX / c.scaleX;
			s.y = s.ll_dragStartY + (e.offsetY - s.ll_dragMY) * s.scaleY / c.scaleY;
			break;
		}
	};
	LGlobal.horizontalError = function () {
		var b = new LSprite(), c = '#cccccc', d = '#000000';
		b.graphics.drawRoundRect(4, c, [5, 5, 70, 100, 5]);
		b.graphics.drawRect(4, c, [30, 15, 20, 10]);
		b.graphics.drawRoundRect(4, d, [125, 25, 100, 70, 5]);
		b.graphics.drawRect(4, d, [200, 50, 10, 20]);
		b.graphics.drawRect(4, d, [80, 50, 20, 20]);
		b.graphics.drawVertices(4, d, [[100, 40], [120, 60], [100, 80]]);
		addChild(b);
		var f = function () {
			setTimeout(function () {
				location.href = location.href;
			}, 100);
		};
		window.onorientationchange = f;
	};
	LGlobal.verticalError = function () {
		var b = new LSprite(), c = '#cccccc', d = '#000000';
		b.graphics.drawRoundRect(4, c, [5, 25, 100, 70, 5]);
		b.graphics.drawRect(4, c, [80, 50, 10, 20]);
		b.graphics.drawRoundRect(4, d, [155, 5, 70, 100, 5]);
		b.graphics.drawRect(4, d, [180, 15, 20, 10]);
		b.graphics.drawRect(4, d, [110, 50, 20, 20]);
		b.graphics.drawVertices(4, d, [[130, 40], [150, 60], [130, 80]]);
		addChild(b);
		var f = function () {
			setTimeout(function () {
				location.href = location.href;
			}, 100);
		};
		window.onorientationchange = f;
	};
	LGlobal.onShow = function () {
		if (LGlobal.canvas == null) {
			return;
		}
		if (LGlobal.stage.onresizeEvent) {
			LGlobal.stage.onresizeListener(LGlobal.stage.onresizeEvent);
			delete LGlobal.stage.onresizeEvent;
		}
		if (LGlobal.box2d != null) {
			LGlobal.box2d.ll_show();
			if (!LGlobal.traceDebug && LGlobal.keepClear) {
				LGlobal.canvas.clearRect(0, 0, LGlobal.width + 1, LGlobal.height + 1);
			}
		} else {
			if (LGlobal.keepClear) {
				LGlobal.canvas.clearRect(0, 0, LGlobal.width + 1, LGlobal.height + 1);
			}
			if (LGlobal.backgroundColor !== null) {
				LGlobal.canvas.fillStyle = LGlobal.backgroundColor;
				LGlobal.canvas.fillRect(0, 0, LGlobal.width, LGlobal.height);
			}
		}
		LGlobal.show(LGlobal.childList);
	};
	LGlobal.show = function (s) {
		for (var i = 0, l = s.length; i < l; i++) {
			if (s[i] && s[i].ll_show) {
				s[i].ll_show();
			}
		}
	};
	LGlobal.divideCoordinate = function (w, h, row, col) {
		var i, j, cw = w / col, ch = h / row, r = [], c;
		for (i = 0; i < row; i++) {
			c = [];
			for (j = 0; j < col; j++) {
				c.push({x : cw * j, y : ch * i});
			}
			r.push(c);
		}
		return r;
	};
	LGlobal._create_loading_color = function () {
		var co = LGlobal.canvas.createRadialGradient(LGlobal.width / 2, LGlobal.height, 0, LGlobal.width / 2, 0, LGlobal.height);  
		co.addColorStop(0, "red");  
		co.addColorStop(0.3, "orange");  
		co.addColorStop(0.4, "yellow");  
		co.addColorStop(0.5, "green");  
		co.addColorStop(0.8, "blue");  
		co.addColorStop(1, "violet");  
		return co;
	};
	LGlobal.hitPolygon = function (list, x, y) {
		var c = 0, p0 = list[0], b0x = (x <= p0[0]), b0y = (y <= p0[1]), i, l, p1, b1x, b1y;
		for (i = 1, l = list.length; i < l + 1; i++) {
			p1 = list[i % l];
			b1x = (x <= p1[0]);
			b1y = (y <= p1[1]);
			if (b0y != b1y) {
				if (b0x == b1x) {
					if (b0x) {
						c += (b0y ? -1 : 1);
					}
				} else {
					if (x <= (p0[0] + (p1[0] - p0[0]) * (y - p0[1] ) / (p1[1] - p0[1]))) {
						c += (b0y ? -1 : 1);
					}
				}
			}
			p0 = p1;
			b0x = b1x;
			b0y = b1y;
		}
		return 0 != c;
	};
	LGlobal.hitTestPolygon = function (p1, p2) {
		var i, j, l, listA, normals, vecs, list = [[p1, [], []], [p2, [], []]];
		for (j = 0; j < list.length; j++) {
			listA = list[j][0], normals = list[j][1];
			for (i = 0, l = listA.length; i < l; i++) {
				list[j][2].push(new LVec2(listA[i][0], listA[i][1]));
				if (i < l - 1) {
					normals.push((new LVec2(listA[i + 1][0] - listA[i][0], listA[i + 1][1] - listA[i][1])).normL());
				}
			}
			normals.push((new LVec2(listA[0][0] - listA[l - 1][0], listA[0][1] - listA[l - 1][1])).normL());
		}
		for (j = 0; j < list.length; j++) {
			normals = list[j][1];
			for (i = 0, l = normals.length; i < l; i++) {
				var r1 = LVec2.getMinMax(list[0][2], normals[i]);
				var r2 = LVec2.getMinMax(list[1][2], normals[i]);
				if (r1.max_o < r2.min_o || r1.min_o > r2.max_o) {
					return false;
				}
			}
		}
		return true;
	};
	LGlobal.hitTestPolygonArc = function (vs, arc) {
		if (LGlobal.hitPolygon(vs, arc[0], arc[1])) {
			return true;
		}	
		var i, j, l, p1, p2, v1, v2, ext, inn, l2;
		for (i = 0, l = vs.length; i < l; i++) {
			j = i < l - 1 ? i + 1 : 0;
			p1 = vs[i], p2 = vs[j];
			v1 = new LVec2(arc[0] - p1[0], arc[1] - p1[1]), v2 = new LVec2(p2[0] - p1[0], p2[1] - p1[1]);
			l2 = v2.normalize();
			inn = LVec2.dot(v1, l2);
			if (inn <= 0) {
				if (v1.x * v1.x + v1.y * v1.y < arc[3]) {
					return true;
				}
			} else if (inn * inn < v2.x * v2.x + v2.y * v2.y) {
				ext = LVec2.cross(v1, l2);
				if (ext * ext < arc[3]) {
					return true;
				}
			}
		}
		return false;
	};
	LGlobal.hitTestArc = function (objA, objB, objAR, objBR) {
		var rA = objA.getWidth() * 0.5
		,rB = objB.getWidth() * 0.5
		,xA = objA._startX ? objA._startX() : objA.startX()
		,xB = objB._startX ? objB._startX() : objB.startX()
		,yA = objA._startY ? objA._startY() : objA.startY()
		,yB = objB._startY ? objB._startY() : objB.startY();
		if (typeof objAR != UNDEFINED) {
			xA += (rA - objAR);
			yA += (rA - objAR);
			rA = objAR;
		}
		if (typeof objBR != UNDEFINED) {
			xB += (rB - objBR);
			yB += (rB - objBR);
			rB = objBR;
		}
		var disx = xA + rA - xB - rB
		,disy = yA + rA - yB - rB;
		return disx * disx + disy * disy < (rA + rB) * (rA + rB);
	};
	LGlobal.hitTestRect = function (objA, objB, vecA, vecB) {
		var wA = objA.getWidth()
		,wB = objB.getWidth()
		,hA = objA.getHeight()
		,hB = objB.getHeight()
		,xA = objA._startX ? objA._startX() : objA.startX()
		,xB = objB._startX ? objB._startX() : objB.startX()
		,yA = objA._startY ? objA._startY() : objA.startY()
		,yB = objB._startY ? objB._startY() : objB.startY();
		if (typeof vecA != UNDEFINED) {
			xA += (wA - vecA[0]) * 0.5;
			yA += (hA - vecA[1]) * 0.5;
			wA = vecA[0];
			hA = vecA[1];
		}
		if (typeof vecB != UNDEFINED) {
			xB += (wB - vecB[0]) * 0.5;
			yB += (hB - vecB[1]) * 0.5;
			wB = vecB[0];
			hB = vecB[1];
		}
		var minx = xA > xB ? xA : xB
		,miny = yA > yB ? yA : yB
		,maxx = (xA + wA) > (xB + wB) ? (xB + wB) : (xA + wA)
		,maxy = (yA + hA) > (yB + hB) ? (yB + hB) : (yA + hA);
		return minx <= maxx && miny <= maxy;
	};
	LGlobal.hitTest = LGlobal.hitTestRect;
	/** @language chinese
	 * 重新设定游戏速度
	 * @method setFrameRate
	 * @static
	 * @param {int} speed 游戏速度,每次页面刷新间隔（单位毫秒）, FPS = 1000 / speed。
	 * @example
	 * 	LGlobal.setFrameRate(1000/60);
	 * @examplelink <p><a href="../../../api/LGlobal/setFrameRate.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.0.0
	 */
	/** @language english
	 * game speed reset 
	 * @method setFrameRate
	 * @static
	 * @param {float} speed game speed(milliseconds), FPS = 1000 / speed.
	 * @example
	 * 	LGlobal.setFrameRate(1000/60);
	 * @examplelink <p><a href="../../../api/LGlobal/setFrameRate.html" target="_blank">Try it »</a></p>
	 * @public
	 * @since 1.0.0
	 */
	/** @language japanese
	 * スクリーンをリサイズする
	 * @method setFrameRate
	 * @static
	 * @param {float} speed ゲームスピード（单位：ミリ秒）, FPS = 1000 / speed。
	 * @example
	 * 	LGlobal.setFrameRate(1000/60);
	 * @examplelink <p><a href="../../../api/LGlobal/setFrameRate.html" target="_blank">実際のサンプルを見る</a></p>
	 * @public
	 * @since 1.0.0
	 */
	LGlobal.setFrameRate = function (s) {
		if (LGlobal.frameRate) {
			clearInterval(LGlobal.frameRate);
		}
		LGlobal.speed = s;
		LGlobal.frameRate = setInterval(function () {
			LGlobal.onShow();
		}, s);
	};
	LGlobal.ll_scaleX = function (v) {
		return (v - LGlobal.left) * LGlobal.width/LGlobal.canvasStyleWidth;
	};
	LGlobal.ll_scaleY = function (v) {
		return (v - LGlobal.top) * LGlobal.height / LGlobal.canvasStyleHeight;
	};
	LGlobal.ll_setStageSize = function (w, h) {
		w =  Math.ceil(w);
		h =  Math.ceil(h);
		LGlobal.canvasObj.style.width = w + "px";
		LGlobal.canvasObj.style.height = h + "px";
		LGlobal.canvasStyleWidth = w;
		LGlobal.canvasStyleHeight = h;
	};
	/** @language chinese
	 * 将画面设置为指定大小
	 * @method resize
	 * @static
	 * @param {float} width 指定宽度
	 * @param {float} height 指定高度
	 * @example
	 * 	LInit(1000/60, "legend", 240, 240, main);
	 * 	function main () {
	 * 		LGlobal.resize(400,100);
	 * 		var loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("face.jpg", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata (event) {
	 * 		var bitmapdata = new LBitmapData(event.target);  
	 * 		var bitmap = new LBitmap(bitmapdata);
	 * 		addChild(bitmap);
	 * 	}
	 * @examplelink <p><a href="../../../api/LGlobal/resize.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.0.0
	 */
	/** @language english
	 * change the screen size 
	 * @method resize
	 * @static
	 * @param {float} width screen width
	 * @param {float} height screen height
	 * @example
	 * 	LInit(1000/60, "legend", 240, 240, main);
	 * 	function main () {
	 * 		LGlobal.resize(400,100);
	 * 		var loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("face.jpg", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata (event) {
	 * 		var bitmapdata = new LBitmapData(event.target);  
	 * 		var bitmap = new LBitmap(bitmapdata);
	 * 		addChild(bitmap);
	 * 	}
	 * @examplelink <p><a href="../../../api/LGlobal/resize.html" target="_blank">Try it »</a></p>
	 * @public
	 * @since 1.0.0
	 */
	/** @language japanese
	 * スクリーンをリサイズする
	 * @method resize
	 * @static
	 * @param {float} width スクリーンの幅
	 * @param {float} height スクリーンの高さ
	 * @example
	 * 	LInit(1000/60, "legend", 240, 240, main);
	 * 	function main () {
	 * 		LGlobal.resize(400,100);
	 * 		var loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("face.jpg", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata (event) {
	 * 		var bitmapdata = new LBitmapData(event.target);  
	 * 		var bitmap = new LBitmap(bitmapdata);
	 * 		addChild(bitmap);
	 * 	}
	 * @examplelink <p><a href="../../../api/LGlobal/resize.html" target="_blank">実際のサンプルを見る</a></p>
	 * @public
	 * @since 1.0.0
	 */
	LGlobal.resize = function (canvasW, canvasH) {
		var w, h, t = 0, l = 0, ww = window.innerWidth, wh = window.innerHeight;
		if (canvasW) {
			w = canvasW;
		}
		if (canvasH) {
			h = canvasH;
		}
		if (LGlobal.stageScale == "noScale") {
			w = canvasW || LGlobal.width;
			h = canvasH || LGlobal.height;
		}
		switch (LGlobal.stageScale) {
		case "exactFit":
			w = canvasW || ww;
			h = canvasH || wh;
			break;
		case "noBorder":
			w = canvasW || ww;
			h = canvasH || LGlobal.height*ww/LGlobal.width;
			switch (LGlobal.align) {
			case LStageAlign.BOTTOM:
			case LStageAlign.BOTTOM_LEFT:
			case LStageAlign.BOTTOM_RIGHT:
			case LStageAlign.BOTTOM_MIDDLE:
				t = wh - h;
				break;
			}
		break;
		case "showAll":
			if (ww / wh > LGlobal.width / LGlobal.height) {
				h = canvasH || wh;
				w = canvasW || LGlobal.width * wh / LGlobal.height;
			} else {
				w = canvasW || ww;
				h = canvasH || LGlobal.height * ww / LGlobal.width;
			}
		case "noScale":
		default:
			switch (LGlobal.align) {
			case LStageAlign.BOTTOM:
			case LStageAlign.BOTTOM_LEFT:
				t = wh - h;
				break;
			case LStageAlign.RIGHT:
			case LStageAlign.TOP_RIGHT:
				l = ww - w;
				break;
			case LStageAlign.TOP_MIDDLE:
				l = (ww - w) * 0.5;
				break;
			case LStageAlign.BOTTOM_RIGHT:
				t = wh - h;
				l = ww - w;
				break;
			case LStageAlign.BOTTOM_MIDDLE:
				t = wh - h;
				l = (ww - w) * 0.5;
				break;
			case LStageAlign.MIDDLE:
				t = (wh - h) * 0.5;
				l = (ww - w) * 0.5;
				break;
			case LStageAlign.TOP:
			case LStageAlign.LEFT:
			case LStageAlign.TOP_LEFT:
			default:
			}
		}
		LGlobal.canvasObj.style.marginTop = t + "px";
		LGlobal.canvasObj.style.marginLeft = l + "px";
		if (LGlobal.isFirefox) {
			LGlobal.left = parseInt(LGlobal.canvasObj.style.marginLeft);
			LGlobal.top = parseInt(LGlobal.canvasObj.style.marginTop);
		}
		LGlobal.ll_setStageSize(w, h);
	};
	LGlobal.sleep = function (s) {
		var d = new Date();   
		while ((new Date().getTime() - d.getTime()) < s) {}
	};
	/** @language chinese
	 * 全画面显示或者设定画面大小的缩放比例值
	 * @method screen
	 * @static
	 * @param {String | float} value 全画面的静态值LGlobal.FULL_SCREEN 或者 画面大小的缩放比例值
	 * @example
	 * 	LInit(1000/60, "legend", 240, 240, main);
	 * 	function main () {
	 * 		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	 * 		LGlobal.screen(LStage.FULL_SCREEN);
	 * 		//you can also use it like : LGlobal.screen(1.5);
	 * 		var loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("face.jpg", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata (event) {
	 * 		var bitmapdata = new LBitmapData(event.target);  
	 * 		var bitmap = new LBitmap(bitmapdata);
	 * 		addChild(bitmap);
	 * 	}
	 * @examplelink <p><a href="../../../api/LGlobal/screen.html" target="_blank">测试链接</a></p>
	 * @public
	 * @since 1.0.0
	 */
	/** @language english
	 * Full screen display　or to scale the screen size 
	 * @method screen
	 * @static
	 * @param {String | float} value LGlobal.FULL_SCREEN or Screen size scaling value
	 * @example
	 * 	LInit(1000/60, "legend", 240, 240, main);
	 * 	function main () {
	 * 		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	 * 		LGlobal.screen(LStage.FULL_SCREEN);
	 * 		//you can also use it like : LGlobal.screen(1.5);
	 * 		var loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("face.jpg", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata (event) {
	 * 		var bitmapdata = new LBitmapData(event.target);  
	 * 		var bitmap = new LBitmap(bitmapdata);
	 * 		addChild(bitmap);
	 * 	}
	 * @examplelink <p><a href="../../../api/LGlobal/screen.html" target="_blank">Try it »</a></p>
	 * @public
	 * @since 1.0.0
	 */
	/** @language japanese
	 * フルスクリーン表示または画面サイズを拡大縮小する
	 * @method screen
	 * @static
	 * @param {String | float} value 全画面のLGlobal.FULL_SCREEN または 画面サイズの拡大縮小の割合
	 * @example
	 * 	LInit(1000/60, "legend", 240, 240, main);
	 * 	function main () {
	 * 		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	 * 		LGlobal.screen(LStage.FULL_SCREEN);
	 * 		//you can also use it like : LGlobal.screen(1.5);
	 * 		var loader = new LLoader();
	 * 		loader.addEventListener(LEvent.COMPLETE, loadBitmapdata); 
	 * 		loader.load("face.jpg", "bitmapData");
	 * 	}
	 * 	function loadBitmapdata (event) {
	 * 		var bitmapdata = new LBitmapData(event.target);  
	 * 		var bitmap = new LBitmap(bitmapdata);
	 * 		addChild(bitmap);
	 * 	}
	 * @examplelink <p><a href="../../../api/LGlobal/screen.html" target="_blank">実際のサンプルを見る</a></p>
	 * @public
	 * @since 1.0.0
	 */
	LGlobal.screen = function (a) {
		LGlobal.displayState = a;
		if (LGlobal.stage) {
			if (typeof LGlobal.displayState == "number") {
				LGlobal.resize(LGlobal.width * LGlobal.displayState, LGlobal.height * LGlobal.displayState);
			} else {
				LGlobal.resize();
			}
		}
	};
	return LGlobal;
})();
var LSystem = LGlobal;
var LStage = LGlobal;
