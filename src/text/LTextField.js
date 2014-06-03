/** @language chinese
 * 创建新的 LTextField 实例。在创建 LTextField 实例后，调用父 LSprite 对象的 addChild() 或 addChildAt() 方法可将 LTextField 实例添加到显示列表中。
 * LTextField 类的方法允许您设置、选择并操作在创作过程中或运行时创建的动态或输入文本字段中的文本。
 * @class LTextField
 * @extends LInteractiveObject
 * @constructor
 * @example
 *  var theTextField = new LTextField();
 *  theTextField.setType(LTextFieldType.INPUT);
 *  theTextField.x = 10;
 *  theTextField.y = 10;
 *  addChild(theTextField);
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
 *  var theTextField = new LTextField();
 *  theTextField.setType(LTextFieldType.INPUT);
 *  theTextField.x = 10;
 *  theTextField.y = 10;
 *  addChild(theTextField);
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
 *  var theTextField = new LTextField();
 *  theTextField.setType(LTextFieldType.INPUT);
 *  theTextField.x = 10;
 *  theTextField.y = 10;
 *  addChild(theTextField);
 * @examplelink <p><a href="../../../api/LTextField/index.html" target="_blank">実際のサンプルを見る</a></p>
 * @since 1.0.0
 * @public
 */
var LTextField = (function () {
	function LTextField () {
		var s = this;
		LExtends(s, LInteractiveObject, []);
		s.type = "LTextField";
		s.texttype = null;
		s.text = "";
		s.font = "Arial";
		s.size = "11";
		s.color = "#000000";
		s.weight = "normal";
		s.textAlign = "left";
		s.textBaseline = "top";
		s.lineWidth = 1;
		s.width = 150;
		s.height = s.size;
		s.stroke = false;
		s.displayAsPassword = false;
		s.wordWrap = false;
		s.multiline = false;
		s.numLines = 1;
	}
	var p = {
		_showReady : function (c) {
			var s = this;
			c.font = s.weight + " " + s.size + "pt " + s.font;  
			c.textAlign = s.textAlign;
			c.textBaseline = s.textBaseline;
			c.lineWidth = s.lineWidth;  
		},
		_ll_show : function (c) {
			var s = this, d, lbl, i, rc, j, l, k, m, b, enter;
			if (s.texttype == LTextFieldType.INPUT) {
				s.inputBackLayer.ll_show();
				rc = s.getRootCoordinate();
				if (LGlobal.inputBox.name == "input" + s.objectIndex) {
					LGlobal.inputBox.style.marginTop = (parseInt(LGlobal.canvasObj.style.marginTop) + (((rc.y + s.inputBackLayer.startY()) * parseInt(LGlobal.canvasObj.style.height) / LGlobal.canvasObj.height) >>> 0)) + "px";
					LGlobal.inputBox.style.marginLeft = (parseInt(LGlobal.canvasObj.style.marginLeft) + (((rc.x + s.inputBackLayer.startX()) * parseInt(LGlobal.canvasObj.style.width) / LGlobal.canvasObj.width) >>> 0)) + "px";
				}
			}
			if (LGlobal.inputTextField && LGlobal.inputTextField.objectIndex == s.objectIndex) {
				return;
			}
			lbl = s.text;
			if (s.displayAsPassword) {
				lbl = '';
				for (i=0, l = s.text.length; i < l; i++) {
					lbl += '*';
				}
			}
			if (s.stroke) {
				c.strokeStyle = s.color;
				d = c.strokeText;
			} else {
				c.fillStyle = s.color;
				d = c.fillText;
			}
			if (s.wordWrap || s.multiline) {
				j = 0, k = 0, m = 0, b = 0;
				for (i = 0, l = s.text.length; i < l; i++) {
					j = c.measureText(s.text.substr(k, i - k)).width;
					enter = /(?:\r\n|\r|\n|¥n)/.exec(lbl.substr(i, 1));
					if ((s.wordWrap && j > s.width) || enter) {
						j = 0;
						k = i;
						m++;
						if (enter) {
							k++;
						}
					}
					if (!enter) {
						d.apply(c, [lbl.substr(i, 1), j, m * s.wordHeight, c.measureText(lbl).width]);
					}
					s.numLines = m;
				}
				s.height = (m + 1) * s.wordHeight;
			} else {
				s.numLines = 1;
				d.apply(c, [lbl, 0, 0, c.measureText(lbl).width]);
			}
			if (s.wind_flag) {
				s.windRun();
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
		setMultiline : function (v, h) {
			var s = this;
			if (v) {
				s._wordHeight(h);
			}
			s.multiline = v;
		},
		setWordWrap : function (v, h) {
			var s = this;
			if (v) {
				s._wordHeight(h);
			}
			s.wordWrap = v;
		},
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
				if (LGlobal.mouseEventContainer[LMouseEvent.MOUSE_DOWN]) {
					LMouseEventContainer.pushInputBox(s);
				}
			} else {
				s.inputBackLayer = null;
				LMouseEventContainer.removeInputBox(s);
			}
			s.texttype = type;
		},
		ismouseon : function (e, cood) {
			var s = this, ox, oy;
			if (e==null || e == UNDEFINED) {
				return false;
			}
			if (!s.visible) {
				return false;
			}
			if (cood == null) {
				cood = {x : 0, y : 0, scaleX : 1, scaleY : 1};
			}
			if (s.mask) {
				if (!s.mask.parent) {
					s.mask.parent = s.parent;
				}
				if (!s.mask.ismouseon(e, cd)) {
					return false;
				}
			}
			if (s.inputBackLayer) {
				return s.inputBackLayer.ismouseon(e, {x : s.x * cood.scaleX + cood.x, y : s.y * cood.scaleY + cood.y, scaleX : cood.scaleX * s.scaleX, scaleY : cood.scaleY * s.scaleY});
			}
			return s.ismouseonShapes([{type : LShape.RECT, arg : [0, 0, s._getWidth(), s._getHeight()]}], e.offsetX, e.offsetY);
		},
		clone : function () {
			var s = this, a = new LTextField();
			a.copyProperty(s);
			a.texttype = null;
			if (s.texttype ==  LTextFieldType.INPUT) {
				a.setType( LTextFieldType.INPUT);
			}
			return a;
		},
		mouseEvent : function (event, type, cood) {
			var s = this, on;
			if (s.inputBackLayer == null) {
				return;
			}
			on = s.ismouseon(event, cood);
			if (type != LMouseEvent.MOUSE_DOWN || !on) {
				return;
			}
			s.focus();
		},
		_ll_getValue : function () {
			if (LGlobal.inputBox.style.display != NONE) {
				LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
				LEvent.removeEventListener(LGlobal.inputTextBox, LKeyboardEvent.KEY_DOWN, LGlobal.inputTextField._ll_input);
				LGlobal.inputBox.style.display = NONE;
				LGlobal.inputTextField.dispatchEvent(LFocusEvent.FOCUS_OUT);
				LGlobal.inputTextField = null;
			}
		},
		_ll_input : function (e) {
			var event = new LEvent(LTextEvent.TEXT_INPUT);
			event.keyCode = e.keyCode;
			LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
			LGlobal.inputTextField.dispatchEvent(event);
		},
		focus : function () {
			var s = this, sc, sx;
			if (!s.parent) {
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
			LEvent.addEventListener(LGlobal.inputTextBox, LKeyboardEvent.KEY_DOWN, LGlobal.inputTextField._ll_input);
			setTimeout(function () {
				LGlobal.inputTextBox.focus();
			}, 50);
		},
		_getWidth : function () {
			var s = this;
			if (s.wordWrap) {
				return s.width;
			}
			LGlobal.canvas.font = s.size + "pt " + s.font;
			return LGlobal.canvas.measureText(s.text).width;
		},
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
				c.font = s.weight + " " + s.size + "pt " + s.font;
				if (s.height == 0) {
					j = 0, k = 0, m = 0;
					for (i = 0, l = s.text.length; i < l; i++) {
						j = c.measureText(s.text.substr(k, i - k)).width;
						enter = /(?:\r\n|\r|\n|¥n)/.exec(s.text.substr(i, 1));
						if ((s.wordWrap && j > s.width) || enter) {
							j = 0;
							k = i;
							m++;
							if (enter) {
								k++;
							}
						}
					}
					s.height = (m + 1) * s.wordHeight;
				}
				return s.height;
			}
			c.font = s.weight + " " + s.size + "pt " + s.font; 
			return c.measureText("O").width * 1.2;
		},
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
		wind : function (listener) {
			var s = this;
			s.wind_over_function = listener;
			s.wind_flag = true;
			s.wind_text = s.text;
			s.text = "";
			s.wind_length = 0;
		},
		windRun : function () {
			var s = this;
			if (s.wind_length > s.wind_text.length) {
				s.wind_flag = false;
				if (s.wind_over_function) {
					s.wind_over_function();
				}
				return;
			}
			s.text = s.wind_text.substring(0, s.wind_length);
			s.wind_length++;
		},
		die : function () {
			LMouseEventContainer.removeInputBox(this);
		}
	};
	for (var k in p) {
		LTextField.prototype[k] = p[k];
	}
	return LTextField;
})();