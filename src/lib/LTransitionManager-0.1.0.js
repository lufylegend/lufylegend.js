/** @language chinese
 * <p>Library:lufylegend.LTransitionManager-x.x.x.min.js</p>
 * <p>为LTransitionManager提供动画效果。</p>
 * @class LTransition
 * @constructor
 * @since 1.8.0
 * @public
 */
var LTransition = (function() {

	function LTransition(displayObject, transObj) {
		this.child = displayObject;
		this.trans = transObj;
	}


	LTransition.prototype = {
		startTransition : function() {
			var self = this;
			switch(self.trans.type) {
				case LTransition.Blinds:
					self.blinds();
					break;
				case LTransition.Fade:
					self.fade();
					break;
				case LTransition.Fly:
					self.fly();
					break;
				case LTransition.Iris:
					self.iris();
					break;
				case LTransition.Squeeze:
					self.squeeze();
					break;
				case LTransition.Wipe:
					self.wipe();
					break;
				case LTransition.Zoom:
					self.zoom();
					break;
				case LTransition.PixelDissolve:
					self.pixelDissolve();
					break;
				case LTransition.Curtain:
					self.curtain();
					break;
				default:
					throw ("the type is not exists.");
			}
		},
		blindsComplete : function(self) {
			if (self.trans.direction == LTransition.OUT) {
				self.child.mask.clear();
			} else {
				self.blindsUpdateRun();
			}
			self.child.mask = null;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		blindsUpdateRun : function() {
			var self = this, g = self.child.mask, c = LGlobal.canvas;
			g.clear();
			if (self.trans.dimension) {
				g.add(function() {
					c.save();
					for (var i = 0; i < self.trans.numStrips; i++) {
						c.rect(i * self.maxSize, 0, self.blindsSize, self.child.getHeight());
					}
					c.restore();
				});
			} else {
				g.add(function() {
					c.save();
					for (var i = 0; i < self.trans.numStrips; i++) {
						c.rect(0, 0 + i * self.maxSize, self.child.getWidth(), self.blindsSize);
					}
					c.restore();
				});
			}
		},
		blindsUpdate : function(self) {
			self.blindsUpdateRun();
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		blinds : function() {
			var self = this;
			if (!self.trans.numStrips)
				self.trans.numStrips = 1;
			self.blindsSize = 0;
			if (self.trans.dimension) {
				self.maxSize = self.child.getWidth() / self.trans.numStrips >> 0;
			} else {
				self.maxSize = self.child.getHeight() / self.trans.numStrips >> 0;
			}
			var g = new LGraphics();
			self.child.mask = g;
			var toSize = self.maxSize;
			if (self.trans.direction == LTransition.OUT) {
				self.blindsSize = self.maxSize;
				toSize = 0;
			}
			LTweenLite.to(self, self.trans.duration, {
				blindsSize : toSize,
				onComplete : self.blindsComplete,
				onUpdate : self.blindsUpdate,
				ease : self.trans.easing
			});
		},
		fadeComplete : function(self) {
			self.child.alpha = self.alpha;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		fadeUpdate : function(self) {
			self.child.alpha = self.alpha;
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		fade : function() {
			var self = this;
			var toAlpha = 1;
			self.alpha = 0;
			if (self.trans.direction == LTransition.OUT) {
				self.alpha = 1;
				toAlpha = 0;
			}
			self.child.alpha = self.alpha;
			LTweenLite.to(self, self.trans.duration, {
				alpha : toAlpha,
				onComplete : self.fadeComplete,
				onUpdate : self.fadeUpdate,
				ease : self.trans.easing
			});
		},
		flyComplete : function(self) {
			self.child.x = self.x;
			self.child.y = self.y;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		flyUpdate : function(self) {
			self.child.x = self.x;
			self.child.y = self.y;
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		fly : function() {
			var self = this;
			var toX = self.child.x;
			var toY = self.child.y;
			switch(self.trans.startPoint) {
				case 1:
					self.x = -self.child.getWidth();
					self.y = -self.child.getHeight();
					break;
				case 2:
					self.x = (LGlobal.width - self.child.getWidth()) * 0.5;
					self.y = -self.child.getHeight();
					break;
				case 3:
					self.x = LGlobal.width;
					self.y = -self.child.getHeight();
					break;
				case 4:
					self.x = -self.child.getWidth();
					self.y = (LGlobal.height - self.child.getHeight()) * 0.5;
					break;
				case 6:
					self.x = LGlobal.width;
					self.y = (LGlobal.height - self.child.getHeight()) * 0.5;
					break;
				case 7:
					self.x = -self.child.getWidth();
					self.y = LGlobal.height;
					break;
				case 8:
					self.x = (LGlobal.width - self.child.getWidth()) * 0.5;
					self.y = LGlobal.height;
					break;
				case 9:
					self.x = LGlobal.width;
					self.y = LGlobal.height;
					break;
				case 5:
				default:
					self.x = (LGlobal.width - self.child.getWidth()) * 0.5;
					self.y = (LGlobal.height - self.child.getHeight()) * 0.5;
			}
			if (self.trans.direction == LTransition.OUT) {
				var toX = self.x;
				var toY = self.y;
				self.x = self.child.x;
				self.y = self.child.y;
			} else {
				self.child.x = self.x;
				self.child.y = self.y;
			}
			LTweenLite.to(self, self.trans.duration, {
				x : toX,
				y : toY,
				onComplete : self.flyComplete,
				onUpdate : self.flyUpdate,
				ease : self.trans.easing
			});
		},
		irisComplete : function(self) {
			if (self.trans.direction == LTransition.OUT) {
				self.child.mask.clear();
			} else {
				self.irisUpdateRun();
			}
			self.child.mask = null;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		irisUpdateRun : function() {
			var self = this, g = self.child.mask, c = LGlobal.canvas;
			g.clear();
			if (self.trans.shape == LIris.CIRCLE) {
				g.drawArc(0, "#000000", [self.x, self.y, self.r, 0, Math.PI * 2]);
			} else {
				g.drawRect(0, "#000000", [self.x + self.sLeft, self.y + self.sTop, self.width, self.height]);
			}
		},
		irisUpdate : function(self) {
			self.irisUpdateRun();
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		iris : function() {
			var self = this;
			self.sLeft = 0;
			self.sTop = 0;
			self.width = 0;
			self.height = 0;
			self.x = 0;
			self.y = 0;
			self.r = 0;
			self.eWidth = self.child.getWidth();
			self.eHeight = self.child.getHeight();
			switch(self.trans.startPoint) {
				case 1:
					self.eR = Math.sqrt(self.eWidth * self.eWidth + self.eHeight * self.eHeight);
					break;
				case 2:
					self.eR = Math.sqrt((self.eWidth * 0.5) * (self.eWidth * 0.5) + self.eHeight * self.eHeight);
					self.x = self.child.getWidth() * 0.5;
					break;
				case 3:
					self.eR = Math.sqrt(self.eWidth * self.eWidth + self.eHeight * self.eHeight);
					self.x = self.child.getWidth();
					break;
				case 4:
					self.eR = Math.sqrt(self.eWidth * self.eWidth + (self.eHeight * 0.5) * (self.eHeight * 0.5));
					self.y = self.child.getHeight() * 0.5;
					break;
				case 6:
					self.eR = Math.sqrt(self.eWidth * self.eWidth + (self.eHeight * 0.5) * (self.eHeight * 0.5));
					self.x = self.child.getWidth();
					self.y = self.child.getHeight() * 0.5;
					break;
				case 7:
					self.eR = Math.sqrt(self.eWidth * self.eWidth + self.eHeight * self.eHeight);
					self.y = self.child.getHeight();
					break;
				case 8:
					self.eR = Math.sqrt((self.eWidth * 0.5) * (self.eWidth * 0.5) + self.eHeight * self.eHeight);
					self.x = self.child.getWidth() * 0.5;
					self.y = self.child.getHeight();
					break;
				case 9:
					self.eR = Math.sqrt(self.eWidth * self.eWidth + self.eHeight * self.eHeight);
					self.x = self.child.getWidth();
					self.y = self.child.getHeight();
					break;
				case 5:
				default:
					self.eR = Math.sqrt((self.eWidth * 0.5) * (self.eWidth * 0.5) + (self.eHeight * 0.5) * (self.eHeight * 0.5));
					self.x = self.child.getWidth() * 0.5;
					self.y = self.child.getHeight() * 0.5;
			}
			self.eLeft = -self.x;
			self.eTop = -self.y;

			var g = new LGraphics();
			self.child.mask = g;
			var toSize = self.maxSize;
			if (self.trans.direction == LTransition.OUT) {
				self.sLeft = self.eLeft;
				self.sTop = self.eTop;
				self.eLeft = 0;
				self.eTop = 0;
				self.width = self.eWidth;
				self.height = self.eHeight;
				self.eWidth = 0;
				self.eHeight = 0;
				self.r = self.eR;
				self.eR = 0;
			}
			LTweenLite.to(self, self.trans.duration, {
				width : self.eWidth,
				height : self.eHeight,
				sLeft : self.eLeft,
				sTop : self.eTop,
				r : self.eR,
				onComplete : self.irisComplete,
				onUpdate : self.irisUpdate,
				ease : self.trans.easing
			});
		},
		curtainComplete : function(self) {
			if (self.trans.direction == LTransition.OUT) {
				self.child.mask.clear();
			} else {
				self.curtainUpdateRun();
			}
			self.child.mask = null;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		curtainUpdateRun : function() {
			var self = this, g = self.child.mask, c = LGlobal.canvas;
			g.clear();
			if (self.trans.dimension) {
				g.add(function() {
					c.save();
					c.rect(0, 0, self.width, self.child.getHeight());
					c.rect(self.child.getWidth() - self.width, 0, self.width, self.child.getHeight());
					c.restore();
				});
			} else {
				g.add(function() {
					c.save();
					c.rect(0, 0, self.child.getWidth(), self.height);
					c.rect(0, self.child.getHeight() - self.height, self.child.getWidth(), self.height);
					c.restore();
				});
			}
		},
		curtainUpdate : function(self) {
			self.curtainUpdateRun();
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		curtain : function() {
			var self = this;
			var eW = self.child.getWidth() * 0.5;
			var eH = self.child.getHeight() * 0.5;
			if (self.trans.dimension) {
				eH = 0;
			} else {
				eW = 0;
			}
			self.width = 0;
			self.height = 0;
			var g = new LGraphics();
			self.child.mask = g;
			var toSize = self.maxSize;
			if (self.trans.direction == LTransition.OUT) {
				self.width = eW;
				self.height = eH;
				eW = 0;
				eH = 0;
			}
			LTweenLite.to(self, self.trans.duration, {
				width : eW,
				height : eH,
				onComplete : self.curtainComplete,
				onUpdate : self.curtainUpdate,
				ease : self.trans.easing
			});
		},
		squeezeComplete : function(self) {
			self.child.scaleX = self.scaleX;
			self.child.scaleY = self.scaleY;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		squeezeUpdate : function(self) {
			self.child.scaleX = self.scaleX;
			self.child.scaleY = self.scaleY;
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		squeeze : function() {
			var self = this;
			var toScaleX = 1, toScaleY = 1;
			self.scaleX = 0, self.scaleY = 0;
			if (self.trans.dimension) {
				self.scaleX = 1;
			} else {
				self.scaleY = 1;
			}
			if (self.trans.direction == LTransition.OUT) {
				toScaleX = self.scaleX, toScaleY = self.scaleY;
				self.scaleX = 1, self.scaleY = 1;
			}
			self.child.scaleX = self.scaleX;
			self.child.scaleY = self.scaleY;
			LTweenLite.to(self, self.trans.duration, {
				scaleX : toScaleX,
				scaleY : toScaleY,
				onComplete : self.squeezeComplete,
				onUpdate : self.squeezeUpdate,
				ease : self.trans.easing
			});
		},
		zoomComplete : function(self) {
			self.child.scaleX = self.scaleX;
			self.child.scaleY = self.scaleY;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		zoomUpdate : function(self) {
			self.child.scaleX = self.scaleX;
			self.child.scaleY = self.scaleY;
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		zoom : function() {
			var self = this;
			var toScaleX = 1, toScaleY = 1;
			self.scaleX = 0, self.scaleY = 0;
			if (self.trans.direction == LTransition.OUT) {
				toScaleX = 0, toScaleY = 0;
				self.scaleX = 1, self.scaleY = 1;
			}
			self.child.scaleX = self.scaleX;
			self.child.scaleY = self.scaleY;
			LTweenLite.to(self, self.trans.duration, {
				scaleX : toScaleX,
				scaleY : toScaleY,
				onComplete : self.zoomComplete,
				onUpdate : self.zoomUpdate,
				ease : self.trans.easing
			});
		},
		wipeComplete : function(self) {
			if (self.trans.direction == LTransition.OUT) {
				self.child.mask.clear();
			} else {
				self.wipeUpdateRun();
			}
			self.child.mask = null;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		wipeUpdateRun : function() {
			var self = this, g = self.child.mask, c = LGlobal.canvas;
			g.clear();
			g.drawVertices(0, "#000000", [[self.leftTopX, self.leftTopY], [self.leftBottomX, self.leftBottomY], [self.rightBottomX, self.rightBottomY], [self.rightTopX, self.rightTopY]]);
		},
		wipeUpdate : function(self) {
			self.wipeUpdateRun();
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		wipe : function() {
			var self = this, w = self.child.getWidth(), h = self.child.getHeight(), ltX = self.leftTopX = 0, ltY = self.leftTopY = 0, lbX = self.leftBottomX = 0, lbY = self.leftBottomY = h, rtX = self.rightTopX = w, rtY = self.rightTopY = 0, rbX = self.rightBottomX = w, rbY = self.rightBottomY = h;
			switch(self.trans.startPoint) {
				case 1:
					ltX = self.leftTopX = -w;
					lbX = self.leftBottomX = -w * 2;
					self.rightTopX = 0;
					rtX = w * 2;
					self.rightBottomX = -w;
					rbX = w;
					break;
				case 2:
					ltY = self.leftTopY = -h;
					self.leftBottomY = 0;
					lbY = h;
					rtY = self.rightTopY = -h;
					self.rightBottomY = 0;
					rbY = h;
					break;
				case 3:
					self.leftTopX = w;
					ltX = -w;
					self.leftBottomX = w * 2;
					lbX = 0;
					rtX = self.rightTopX = w * 2;
					rbX = self.rightBottomX = w * 3;
					break;
				case 4:
					self.rightTopX = 0;
					rtX = w;
					self.rightBottomX = 0;
					rbX = w;
					break;
				case 6:
					self.leftTopX = w;
					ltX = 0;
					self.leftBottomX = w;
					lbX = 0;
					break;
				case 7:
					lbX = self.leftBottomX = -w;
					ltX = self.leftTopX = -w * 2;
					self.rightBottomX = 0;
					rbX = w * 2;
					self.rightTopX = -w;
					rtX = w;
					break;
				case 8:
					lbY = self.leftBottomY = h;
					self.leftTopY = h;
					ltY = 0;
					rbY = self.rightBottomY = h;
					self.rightTopY = h;
					rtY = 0;
					break;
				case 9:
					self.leftBottomX = w;
					lbX = -w;
					self.leftTopX = w * 2;
					ltX = 0;
					rbX = self.rightBottomX = w * 2;
					rtX = self.rightTopX = w * 3;
					break;
				case 5:
				default:
					self.leftTopX = w * 0.5;
					self.leftTopY = h * 0.5;
					self.rightTopX = w * 0.5;
					self.rightTopY = h * 0.5;
					self.leftBottomX = w * 0.5;
					self.leftBottomY = h * 0.5;
					self.rightBottomX = w * 0.5;
					self.rightBottomY = h * 0.5;
					ltX = 0, ltY = 0;
					lbX = 0, lbY = h;
					rtX = w, rtY = 0;
					rbX = w, rbY = h;
			}

			var g = new LGraphics();
			self.child.mask = g;
			if (self.trans.direction == LTransition.OUT) {
				var oltX = ltX, oltY = ltY, olbX = lbX, olbY = lbY, ortX = rtX, ortY = rtY, orbX = rbX, orbY = rbY;
				ltX = self.leftTopX, ltY = self.leftTopY, lbX = self.leftBottomX, lbY = self.leftBottomY, rtX = self.rightTopX, rtY = self.rightTopY, rbX = self.rightBottomX, rbY = self.rightBottomY;
				self.leftTopX = oltX, self.leftTopY = oltY, self.leftBottomX = olbX, self.leftBottomY = olbY, self.rightTopX = ortX, self.rightTopY = ortY, self.rightBottomX = orbX, self.rightBottomY = orbY;
			}
			LTweenLite.to(self, self.trans.duration, {
				leftTopX : ltX,
				leftTopY : ltY,
				leftBottomX : lbX,
				leftBottomY : lbY,
				rightTopX : rtX,
				rightTopY : rtY,
				rightBottomX : rbX,
				rightBottomY : rbY,
				onComplete : self.wipeComplete,
				onUpdate : self.wipeUpdate,
				ease : self.trans.easing
			});
		},
		pixelDissolveComplete : function(self) {
			if (self.trans.direction == LTransition.OUT) {
				self.child.mask.clear();
			} else {
				self.pixelDissolveUpdateRun();
			}
			self.child.mask = null;
			if (self.trans.onComplete) {
				self.trans.onComplete(self.child);
			}
		},
		pixelDissolveUpdateRun : function() {
			var self = this, g = self.child.mask, c = LGlobal.canvas, list;
			g.clear();
			g.add(function() {
				c.save();
				for (var i = 0; i < self.index; i++) {
					list = self.list[i];
					c.rect(list[0] * self.w, list[1] * self.h, self.w, self.h);
				}
				c.restore();
			});
		},
		pixelDissolveUpdate : function(self) {
			self.pixelDissolveUpdateRun();
			if (self.trans.onUpdate) {
				self.trans.onUpdate(self.child);
			}
		},
		pixelDissolve : function() {
			var self = this;
			var g = new LGraphics();
			self.child.mask = g;
			LGlobal.mg = g;
			self.w = self.child.getWidth() / self.trans.xSections, self.h = self.child.getHeight() / self.trans.ySections;
			self.list = [];
			for (var i = 0; i < self.trans.xSections; i++) {
				for (var j = 0; j < self.trans.ySections; j++) {
					self.list.push([i, j]);
				}
			}
			self.index = 0;
			var to = self.trans.xSections * self.trans.ySections;
			if (self.trans.direction == LTransition.OUT) {
				self.index = to;
				to = 0;
			}
			self.list = self.list.sort(function(a, b) {
				return Math.random() > 0.5;
			});
			self.pixelDissolveUpdateRun();
			LTweenLite.to(self, self.trans.duration, {
				index : to,
				onComplete : self.pixelDissolveComplete,
				onUpdate : self.pixelDissolveUpdate,
				ease : self.trans.easing
			});
		}
	};
	/** @language chinese
	 * <p>指出现时的动画。</p>
	 * @property LTransition.IN
	 * @since 1.8.0
	 * @public
	 * @static
	 */
	LTransition.IN = "in";
	/** @language chinese
	 * <p>指消失时的动画。</p>
	 * @property LTransition.OUT
	 * @since 1.8.0
	 * @public
	 * @static
	 */
	LTransition.OUT = "out";
	/** @language chinese
	 * <p>使用逐渐消失或逐渐出现的矩形来显示影剪对象。</p>
	 * <p>支持属性:</p>
	 * <table>
	 * <tr><th>属性</th><th>类型</th><th>说明</th></tr>
	 * <tr><td>numStrips</td><td>int</td><td>“遮帘”效果中的遮罩条纹数，建议范围1-50。</td></tr>
	 * <tr><td>dimension</td><td>0|1</td><td>指示遮罩条纹是垂直的（0）还是水平的（1）。遮罩条纹是垂直的，也意味着显示出来的是水平条纹的影片剪辑。</td></tr>
	 * </table>
	 * @property LTransition.Blinds
	 * @since 1.8.0
	 * @public
	 * @static
	 */
	LTransition.Blinds = 1;
	/** @language chinese
	 * <p>淡入淡出效果。</p>
	 * <p>支持属性:无</p>
	 * @property LTransition.Fade
	 * @since 1.8.0
	 * @public
	 * @static
	 */
	LTransition.Fade = 2;
	/** @language chinese
	 * <p>从某一指定方向滑入影片剪辑对象。</p>
	 * <p>支持属性:</p>
	 * <table>
	 * <tr><th>属性</th><th>类型</th><th>说明</th></tr>
	 * <tr><td>startPoint</td><td>int</td><td><p>一个指示起始位置的整数，范围1-9。</p><p>1：左上，2：上中，3：右上，4：左中，5：中心，6：右中，7：左下，8：下中，9：右下。</p></td></tr>
	 * </table>
	 * @property LTransition.Fly
	 * @since 1.8.0
	 * @public
	 * @static
	 */
	LTransition.Fly = 3;
	/** @language chinese
	 * <p>使用可以缩放的方形或圆形动画遮罩来显示影剪对象。</p>
	 * <p>支持属性:</p>
	 * <table>
	 * <tr><th>属性</th><th>类型</th><th>说明</th></tr>
	 * <tr><td>startPoint</td><td>int</td><td><p>一个指示起始位置的整数，范围1-9。</p><p>1：左上，2：上中，3：右上，4：左中，5：中心，6：右中，7：左下，8：下中，9：右下。</p></td></tr>
	 * <tr><td>shape</td><td>int</td><td><p>LIris.SQUARE(方形）的遮罩形状</p><p>LIris.CIRCLE（圆形）的遮罩形状</p></td></tr>
	 * </table>
	 * @property LTransition.Iris
	 * @since 1.8.0
	 * @public
	 * @static
	 */
	LTransition.Iris = 4;
	/** @language chinese
	 * <p>使用挤压遮帘效果水平或垂直显示对象。</p>
	 * <p>支持属性:</p>
	 * <table>
	 * <tr><th>属性</th><th>类型</th><th>说明</th></tr>
	 * <tr><td>dimension</td><td>int</td><td>挤压效果是水平的（0）还是垂直的（1）。</td></tr>
	 * </table>
	 * @property LTransition.Curtain
	 * @since 1.8.0
	 * @public
	 * @static
	 */
	LTransition.Curtain = 5;
	/** @language chinese
	 * <p>使用随机出现或消失的棋盘图案矩形来显示影剪。</p>
	 * <p>支持属性:</p>
	 * <table>
	 * <tr><th>属性</th><th>类型</th><th>说明</th></tr>
	 * <tr><td>xSections</td><td>int</td><td>沿水平轴的遮罩矩形的数目（建议1-25）</td></tr>
	 * <tr><td>ySections</td><td>int</td><td>沿垂直轴的遮罩矩形的数目（建议1-25）</td></tr>
	 * </table>
	 * @property LTransition.PixelDissolve
	 * @since 1.8.0
	 * @public
	 * @static
	 */
	LTransition.PixelDissolve = 6;
	/** @language chinese
	 * <p>使用缩放效果水平或垂直影剪对象。</p>
	 * <p>支持属性:</p>
	 * <table>
	 * <tr><th>属性</th><th>类型</th><th>说明</th></tr>
	 * <tr><td>dimension</td><td>int</td><td>缩放效果是水平的（0）还是垂直的（1）。</td></tr>
	 * </table>
	 * @property LTransition.Squeeze
	 * @since 1.8.0
	 * @public
	 * @static
	 */
	LTransition.Squeeze = 7;
	/** @language chinese
	 * <p>使用水平移动的某一形状的动画遮罩来显示或隐藏影剪对象。</p>
	 * <p>支持属性:</p>
	 * <table>
	 * <tr><th>属性</th><th>类型</th><th>说明</th></tr>
	 * <tr><td>startPoint</td><td>int</td><td><p>一个指示起始位置的整数，范围1-9。</p><p>1：左上，2：上中，3：右上，4：左中，5：中心，6：右中，7：左下，8：下中，9：右下。</p></td></tr>
	 * </table>
	 * @property LTransition.Wipe
	 * @since 1.8.0
	 * @public
	 * @static
	 */
	LTransition.Wipe = 8;
	/** @language chinese
	 * <p>通过按比例缩放来 放大或缩小 影剪对象。</p>
	 * <p>支持属性:无</p>
	 * @property LTransition.Zoom
	 * @since 1.8.0
	 * @public
	 * @static
	 */
	LTransition.Zoom = 9;
	return LTransition;
})();
var LIris = (function() {
	function LIris() {
	}
	LIris.SQUARE = 0;
	LIris.CIRCLE = 1;
	return LIris;
})();
/** @language chinese
 * <p>Library:lufylegend.LTransitionManager-x.x.x.min.js</p>
 * <p>定义动画效果。 它允许您将九种动画效果中的一种应用于影片剪辑。 在创建自定义组件时，您可以使用 LTransitionManager 类将动画效果应用于组件可视界面中的影片剪辑。整体来说，有九个不同的动画可以用。</p>
 * <p>您可以通过两种方式创建 TransitionManager 实例：</p>
 * <p>请调用 LTransitionManager.start() 方法。 这是创建 LTransitionManager 实例最简单的方式，建议使用该方式。</p>
 * <p>使用 new 运算符。 然后可以指定过渡属性，并通过调用 LTransitionManager.startTransition() 方法在另一步中启动过渡效果。</p>
 * @class LTransitionManager
 * @constructor
 * @param {LDisplayObject} displayObject 要应用过渡效果的对象。
 * @examplelink <p><a href="../../../api/LTransitionManager/index.html" target="_blank">测试链接</a></p>
 * @since 1.8.0
 * @public
 */
var LTransitionManager = (function() {
	function LTransitionManager(displayObject) {
		this.child = displayObject;
	}
	LTransitionManager.prototype = {
		/** @language chinese
		 * <p>创建新的 LTransitionManager 实例，并指定目标对象，应用过渡并启动该过渡。</p>
		 * @method startTransition
		 * @param {Object} transParams 请参考LTransitionManager.start的transParams参数。
		 * @since 1.8.0
		 * @example
		 * 	LInit(20,"legend",640,400,main);
		 * 	function main(){
		 * 	    var layer = new LSprite();
		 * 		addChild(layer);
		 * 		var sprite01 = new LSprite();
		 * 		sprite01.graphics.drawRect(1, "#ff0000", [0, 0, 300, 300], true, "#ff0000");
		 * 		layer.addChild(sprite01);
		 * 		var sprite02 = new LSprite();
		 * 		sprite02.graphics.drawRect(1, "#008800", [0, 0, 300, 300], true, "#008800");
		 * 		layer.addChild(sprite02);
		 * 		var transitionManager = new LTransitionManager(sprite02);
		 * 		var transParams = {type:LTransition.Fly,startPoint:1,duration:2,direction:LTransition.OUT,easing:Strong.easeOut};
		 * 		transitionManager.startTransition(transParams);
		 * 	}
		 * @examplelink <p><a href="../../../api/LTransitionManager/startTransition.html" target="_blank">测试链接</a></p>
		 * @public
		 */
		startTransition : function(transParams) {
			return LTransitionManager.start(this.child, transParams);
		}
	};
	/** @language chinese
	 * <p>[静态] 不创建新的 LTransitionManager 实例，直接指定目标对象，应用过渡并启动该过渡。</p>
	 * @method LTransitionManager.start
	 * @static
	 * @param {LDisplayObject} content 要应用过渡效果的对象。
	 * @param {Object} transParams 
	 * 在对象内传递的参数的集合。 transParams 对象应包含 type 参数，该参数（后面跟有 direction、duration 和 easing 参数） 指示要应用的过渡效果类。 
	 * 此外，还必须包括该过渡效果类所必需的任何参数。 例如，LIris过渡效果类需要附加的 startPoint 和 shape 参数。 
	 * 因此，除了每个过渡都需要的 type、duration 和 easing 参数外，您还应该添加 LIris 效果所需要的 startPoint 和 shape 参数（添加到 transParams 对象）。
	 * <p>transParams可以使用的值:</p>
	 * <table>
	 * <tr><th>属性</th><th>类型</th><th>说明</th></tr>
	 * <tr><td>type</td><td>float</td><td>过渡效果的类型，具体类型请参考LTransition</td></tr>
	 * <tr><td>duration</td><td>float</td><td>过渡效果的时间长度。</td></tr>
	 * <tr><td>ease</td><td>LEasing (or Function)</td><td>动画的补间效果，比如LEasing.Quad.easeIn or LEasing.Cubic.easeOut。默认值是LEasing.None.easeIn.</td></tr>
	 * </table>
	 * @since 1.8.0
	 * @example
	 * 	LInit(20,"legend",640,400,main);
	 * 	function main(){
	 * 	    var layer = new LSprite();
	 * 		addChild(layer);
	 * 		var sprite01 = new LSprite();
	 * 		sprite01.graphics.drawRect(1, "#ff0000", [0, 0, 300, 300], true, "#ff0000");
	 * 		layer.addChild(sprite01);
	 * 		var sprite02 = new LSprite();
	 * 		sprite02.graphics.drawRect(1, "#008800", [0, 0, 300, 300], true, "#008800");
	 * 		layer.addChild(sprite02);
	 * 		var transParams = {type:LTransition.Fly,startPoint:1,duration:2,direction:LTransition.OUT,easing:Strong.easeOut};
	 * 		LTransitionManager.start(sprite02,transParams);
	 * 	}
	 * @examplelink <p><a href="../../../api/LTransitionManager/LTransitionManager_start.html" target="_blank">测试链接</a></p>
	 * @public
	 */
	LTransitionManager.start = function(displayObject, transParams) {
		var trans = new LTransition(displayObject, transParams);
		trans.startTransition();
		return trans;
	};
	return LTransitionManager;
})(); 