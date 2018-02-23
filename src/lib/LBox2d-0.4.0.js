/** @language chinese
 * <p>Library:lufylegend.LBox2d-x.x.x.min.js</p>
 * <p>在lufylegend库件里使用box2dweb。</p>
 * <p>下面是几篇相关的文章。</p>
 * <p><a href="http://blog.csdn.net/lufy_legend/article/details/7654607" target="_blank">HTML5游戏开发-Box2dWeb应用(一)-创建各种各样的刚体</a></p>
 * <p><a href="http://blog.csdn.net/lufy_legend/article/details/7672110" target="_blank">HTML5游戏开发-Box2dWeb应用(二)-碰撞以及各种连接</a></p>
 * <p><a href="http://blog.csdn.net/lufy_legend/article/details/7765599" target="_blank">html5游戏开发-愤怒的小鸟-开源讲座</a></p>
 * <p><a href="http://blog.csdn.net/lufy_legend/article/details/8758585" target="_blank">制作一款简单的物理小游戏(绳子原理)</a></p>
 * @class LBox2d
 * @constructor
 * @param {Array} gravity 世界重力向量(例：[0,9.8])，可省略。
 * @param {Boolean} doSleep 物体是否可休眠，可省略。
 * @param {float} drawScale 缩放比例，可省略。
 * @since 1.4.0
 * @public
 */
var LBox2d = (function() {
	function LBox2d(gravity, doSleep, drawScale) {
		var s = this;
		Box2D.Dynamics.b2World.prototype.LAddController = Box2D.Dynamics.b2World.prototype.AddController;
		Box2D.Dynamics.b2World.prototype.AddController = function(c) {
			var l = {}, k;
			for (k in c) {
				l[k] = c[k];
			}
			if (LBox2d) {
				LBox2d.m_controllerList = l;
			}
			return this.LAddController(c);
		};
		var i, j, b = Box2D, d, a = [b.Collision, b.Common, b.Common.Math, b.Dynamics, b.Dynamics.Contacts, b.Dynamics.Controllers, b.Dynamics.Joints, b.Collision.Shapes];
		for (i in a) {
			for (j in a[i]) {
				s[j] = a[i][j];
			}
		}
		if ( typeof drawScale == UNDEFINED) {
			drawScale = 30;
		}
		/** @language chinese
		 * LBox2d暂停处理
		 * @property stop
		 * @type Boolean
		 * @default false
		 * @since 1.9.1
		 * @public
		 */
		s.stop = false;
		s.drawScale = 30;
		s.selectedBody = null;
		s.mouseJoint = null;
		s.mousePVec = null;
		s.contactListener = null;
		if ( typeof gravity == UNDEFINED) {
			gravity = new s.b2Vec2(0, 9.8);
		} else {
			gravity = new s.b2Vec2(gravity[0], gravity[1]);
		}
		if ( typeof doSleep == UNDEFINED) {
			doSleep = true;
		}
		s.world = new s.b2World(gravity, doSleep);
		s.removeList = new Array();
		if (LGlobal.traceDebug) {
			d = new s.b2DebugDraw();
			d.SetSprite(LGlobal.canvas);
			d.SetLineThickness(1);
			d.SetFillAlpha(0.5);
			d.SetAlpha(1);
			d.SetDrawScale(s.drawScale);
			d.SetFlags(s.b2DebugDraw.e_shapeBit | s.b2DebugDraw.e_jointBit);
			s.world.SetDebugDraw(d);
		}
		LGlobal.destroy = true;
	}
	LBox2d.prototype = {
		/** @language chinese
		 * <p>为box2d加载事件监听器。</p>
		 * @method setEvent
		 * @param {String} type 事件的类型。
		 * <p>事件的类型，可以使用下面四个事件类型：</p>
		 * <table>
		 * <tr><th>类型</th><th>作用</th></tr>
		 * <tr><td>LEvent.BEGIN_CONTACT</td><td>刚刚碰撞开始的时候会触发这个函数。</td></tr>
		 * <tr><td>LEvent.END_CONTACT</td><td>碰撞结束的时候会触发这个函数。</td></tr>
		 * <tr><td>LEvent.POST_SOLVE</td><td>碰撞后会处理这个函数。</td></tr>
		 * <tr><td>LEvent.PRE_SOLVE</td><td>碰撞前即将碰撞的时候。</td></tr>
		 * </table>
		 * @param {Function} listener 处理事件的侦听器函数。
		 * @since 1.4.0
		 * @public
		 */
		setEvent : function(t_v, f_v) {
			var s = this;
			if (t_v == LEvent.ENTER_FRAME) {
				s.ll_enterFrame = f_v;
				return;
			}
			if (!s.contactListener) {
				s.contactListener = new s.b2ContactListener();
				s.world.SetContactListener(s.contactListener);
			}
			switch (t_v) {
				case LEvent.END_CONTACT:
					s.contactListener.EndContact = f_v;
					break;
				case LEvent.PRE_SOLVE:
					s.contactListener.PreSolve = f_v;
					break;
				case LEvent.POST_SOLVE:
					s.contactListener.PostSolve = f_v;
					break;
				case LEvent.BEGIN_CONTACT:
				default:
					s.contactListener.BeginContact = f_v;
			}
		},
		/** @language chinese
		 * <p>给两个物体添加焊接关节。</p>
		 * <p>焊接关节相当于捆绑，就是将两个物体牢牢地绑在一起，使其成为一个物体。</p>
		 * @method setWeldJoint
		 * @param {b2BodyDef} b2BodyDefA 表示捆绑对象物体A
		 * @param {b2BodyDef} b2BodyDefB 表示捆绑对象物体B
		 * @since 1.4.0
		 * @public
		 */
		setWeldJoint : function(A, B) {
			var s = this;
			var j = new s.b2WeldJointDef();
			j.Initialize(B, A, B.GetWorldCenter());
			return s.world.CreateJoint(j);
		},
		/** @language chinese
		 * <p>给两个物体添加悬挂关节。</p>
		 * <p>悬挂关节类似于一个垂直的移动关节，它将一个物体悬挂到了另一物体上。</p>
		 * @method setLineJoint
		 * @param {b2BodyDef} b2BodyDefA 表示对象物体A
		 * @param {b2BodyDef} b2BodyDefB 表示对象物体B
		 * @param {Array} vec 表示物体B相对与悬挂点的移动方向，这个悬挂点就是物体B的初始位置，vec是一个数组[x,y]，设置不同的比例，可以建立不同方向上的悬挂关节。这和移动关节比较类似，大家可以试着改变这个参数的值，来体验一下它们的具体区别
		 * @param {Array} limits 表示移动的相对长度限制数组，这个数组的内容是：[正向最大长度,反向最大角度]，在这里它可以限制两个物体相对移动的最大长度
		 * @param {Array} motors 表示马达数组，这个数组的内容是：[正向力度,反向力度]，这个马达可以给移动关节添加一个持续的力，比如在上面的例子中，如果将马达参数设置为[0,10]，你会发现，物体不是向下移动了，而是向上移动，即使你用鼠标将物体拖拽到下面，它也会因为马达的力而再次向上移动
		 * @since 1.4.0
		 * @public
		 */
		setLineJoint : function(A, B, vec, t, m) {
			var s = this;
			var wa = new s.b2Vec2(vec[0], vec[1]);
			var j = new s.b2LineJointDef();
			j.Initialize(A, B, B.GetWorldCenter(), wa);
			if (t == null) {
				j.enableLimit = false;
			} else {
				j.lowerTranslation = t[0];
				j.upperTranslation = t[1];
				j.enableLimit = true;
			}
			if (m == null) {
				j.enableMotor = false;
			} else {
				j.maxMotorForce = m[0];
				j.motorSpeed = m[1];
				j.enableMotor = true;
			}
			return s.world.CreateJoint(j);
		},
		/** @language chinese
		 * <p>添加齿轮关节。</p>
		 * <p>使用Box2d可以模拟齿轮功能，这样就可以轻松地建立复杂的机械模型等，齿轮关节相对来说稍微复杂一些，因为它需要结合旋转关节和移动关节。</p>
		 * @method setGearJoint
		 * @param {b2BodyDef} b2BodyDefA 表示对象物体A
		 * @param {b2BodyDef} b2BodyDefB 表示对象物体B
		 * @param {float} ratio 表示齿轮的比例系数，这个数值越小，物体A旋转一周使得物体B移动的距离也就越大，如果这个值设置得很大，那么物体A旋转几周才能使B移动一段很短的距离
		 * @param {JointDef} revoluteJointDef 齿轮关节中的物体A和轴心所建立的旋转关节
		 * @param {JointDef} prismaticJointDef 齿轮关节中的物体B和齿轮轴心所建立的移动连接
		 * @since 1.4.0
		 * @public
		 */
		setGearJoint : function(A, B, ra, r, p) {
			var s = this;
			var j = new s.b2GearJointDef();
			j.joint1 = r;
			j.joint2 = p;
			j.bodyA = A;
			j.bodyB = B;
			j.ratio = ra * s.b2Settings.b2_pi / (300 / s.drawScale);
			return s.world.CreateJoint(j);
		},
		/** @language chinese
		 * <p>给两个物体添加移动关节。</p>
		 * <p>对于移动关节来说，它会有一个自由度，也就是说它限制了两个物体的移动范畴，即只能沿指定轴相对移动。</p>
		 * @method setPrismaticJoint
		 * @param {b2BodyDef} b2BodyDefA 表示对象物体A
		 * @param {b2BodyDef} b2BodyDefB 表示对象物体B
		 * @param {Array} vec 表示物体A和物体B的相对移动方向，它是一个数组[x,y]，设置不同的比例，可以建立不同方向上的移动关节
		 * @param {Array} limits 表示移动的相对长度限制数组，这个数组的内容是：[正向最大长度,反向最大角度]，在这里它可以限制两个物体相对移动的最大长度
		 * @param {Array} motors 表示马达数组，这个数组的内容是：[正向力度,反向力度]，这个马达可以给移动关节添加一个持续的力。比如在上面的例子中，如果将马达参数设置为[0,10]，你会发现，物体不是向下移动了，而是向上移动，即使你用鼠标将物体拖拽到下面，它也会因为马达的力而再次向上移动
		 * @since 1.4.0
		 * @public
		 */
		setPrismaticJoint : function(A, B, vec, t, m) {
			var s = this;
			var wa = new s.b2Vec2(vec[0], vec[1]);
			var j = new s.b2PrismaticJointDef();
			j.Initialize(B, A, B.GetWorldCenter(), wa);
			if (t == null) {
				j.enableLimit = false;
			} else {
				j.lowerTranslation = t[0];
				j.upperTranslation = t[1];
				j.enableLimit = true;
			}
			if (m == null) {
				j.enableMotor = false;
			} else {
				j.maxMotorForce = m[0];
				j.motorSpeed = m[1];
				j.enableMotor = true;
			}
			return s.world.CreateJoint(j);
		},
		/** @language chinese
		 * <p>给两个物体添加旋转关节。</p>
		 * <p>旋转关节可以强制两个物体共享一个描点，这样就能使它们进行相对旋转。</p>
		 * @method setRevoluteJoint
		 * @param {b2BodyDef} b2BodyDefA 表示对象物体A
		 * @param {b2BodyDef} b2BodyDefB 表示对象物体B
		 * @param {Array} limits 表示旋转角度限制数组，这个数组的内容是：[最小角度,最大角度]，它在这里可以限制旋转关节旋转的角度
		 * @param {Array} motors 表示马达数组，这个数组的内容是：[力度,速度]，马达可以有很多用途，在这里，它可以是关节自动进行旋转
		 * @since 1.4.0
		 * @public
		 */
		setRevoluteJoint : function(A, B, a, m) {
			var s = this;
			var j = new s.b2RevoluteJointDef();
			j.Initialize(A, B, B.GetWorldCenter());
			if (a == null) {
				j.enableLimit = false;
			} else {
				j.lowerAngle = a[0] * s.b2Settings.b2_pi / 180;
				j.upperAngle = a[1] * s.b2Settings.b2_pi / 180;
				j.enableLimit = true;
			}
			if (m == null) {
				j.enableMotor = false;
			} else {
				j.maxMotorTorque = m[0];
				j.motorSpeed = m[1];
				j.enableMotor = true;
			}
			return s.world.CreateJoint(j);
		},
		/** @language chinese
		 * <p>给两个物体添加距离关节。</p>
		 * <p>距离关节是一个最简单的关节，它约束了两个物体之间的距离，两个物体之间的距离关节一旦建立，它们的距离就将会固定住。当你拖拽其中一个物体，另一个物体为了保证距离固定不变，也会跟着移动起来。</p>
		 * @method setDistanceJoint
		 * @param {b2BodyDef} b2BodyDefA 表示对象物体A
		 * @param {b2BodyDef} b2BodyDefB 表示对象物体B
		 * @since 1.4.0
		 * @public
		 */
		setDistanceJoint : function(A, B) {
			var s = this;
			var j = new s.b2DistanceJointDef();
			j.Initialize(A, B, A.GetWorldCenter(), B.GetWorldCenter());
			return s.world.CreateJoint(j);
		},
		/** @language chinese
		 * <p>给两个物体添加滑轮关节。</p>
		 * <p>要滑轮关节，可以先创建一个滑轮，然后将两个物体通过一条“绳子”接通，当一个物体上升或者下降的时候，因为“绳子”的长短不变，另一个物体就会相应的下降或者上升。</p>
		 * @method setPulleyJoint
		 * @param {b2BodyDef} b2BodyDefA 表示对象物体A
		 * @param {b2BodyDef} b2BodyDefB 表示对象物体B
		 * @param {Array} anchorA 表示物体A相关的控制参数数组，这个数组的内容是：[x,y,length]，使用setPulleyJoint建立滑轮关节的时候，会自动以物体本身的中心作为描点，anchorA数组的前两个元素，决定了关节被建立时物体相对于这个描点的位置，anchorA数组的最后一个元素，决定了左侧绳子的长度
		 * @param {Array} anchorB 表示物体B相关的控制参数数组，该数组中各元素的含义同anchorA
		 * @param {float} ratio 表示两边绳子的比例系数，比如在上面的例子中，如果将比例系数设置为2，那么左边的物体上升2的时候，右边物体只下降1
		 * @since 1.4.0
		 * @public
		 */
		setPulleyJoint : function(A, B, vA, vB, ratio) {
			var s = this;
			var a1 = A.GetWorldCenter();
			var a2 = B.GetWorldCenter();
			var g1 = new s.b2Vec2(a1.x + (vA[0] / s.drawScale), a1.y + (vA[1] / s.drawScale));
			var g2 = new s.b2Vec2(a2.x + (vB[0] / s.drawScale), a2.y + (vB[1] / s.drawScale));
			var j = new s.b2PulleyJointDef();
			j.Initialize(A, B, g1, g2, a1, a2, ratio);
			j.maxLengthA = vA[2] / s.drawScale;
			j.maxLengthB = vB[2] / s.drawScale;
			return s.world.CreateJoint(j);
		},
		addCircle : function(r, cx, cy, t, d, f, e) {
			var s = this;
			s.bodyDef = new s.b2BodyDef;
			/*动态*/
			s.bodyDef.type = t;
			s.fixDef = new s.b2FixtureDef;
			/*密度*/
			s.fixDef.density = d;
			/*摩擦*/
			s.fixDef.friction = f;
			/*弹力*/
			s.fixDef.restitution = e;
			s.fixDef.shape = new s.b2CircleShape(r);
			s.bodyDef.position.x = cx;
			s.bodyDef.position.y = cy;
			var shape = s.world.CreateBody(s.bodyDef);
			shape.CreateFixture(s.fixDef);
			return shape;
		},
		addPolygon : function(w, h, cx, cy, type, d, f, e) {
			var s = this;
			s.bodyDef = new s.b2BodyDef;
			/*动态*/
			s.bodyDef.type = type;
			s.fixDef = new s.b2FixtureDef;
			/*密度*/
			s.fixDef.density = d;
			/*摩擦*/
			s.fixDef.friction = f;
			/*弹力*/
			s.fixDef.restitution = e;
			s.fixDef.shape = new s.b2PolygonShape;
			s.fixDef.shape.SetAsBox(w, h);
			s.bodyDef.position.x = cx;
			s.bodyDef.position.y = cy;
			var shape = s.world.CreateBody(s.bodyDef);
			shape.CreateFixture(s.fixDef);
			return shape;
		},
		addVertices : function(vertices, type, d, f, e) {
			var s = this, i, l;
			s.bodyDef = new s.b2BodyDef;
			/*动态*/
			s.bodyDef.type = type;
			var shape = s.world.CreateBody(s.bodyDef);
			for ( i = 0, l = vertices.length; i < l; i++) {
				s.createShapeAsArray(shape, vertices[i], type, d, f, e);
			}
			return shape;
		},
		createShapeAsArray : function(c, vertices, type, d, f, e) {
			var s = this;
			var shape = new s.b2PolygonShape();
			var sv = s.createVerticesArray(vertices);
			shape.SetAsArray(sv, 0);
			var def = new s.b2FixtureDef();
			def.shape = shape;
			/*密度*/
			def.density = d;
			/*摩擦*/
			def.friction = f;
			/*弹力*/
			def.restitution = e;
			c.CreateFixture(def);
		},
		createVerticesArray : function(a) {
			var s = this, i, l;
			var v = new Array();
			if (a.length < 3) {
				return v;
			}
			for ( i = 0, l = a.length; i < l; i++) {
				v.push(new s.b2Vec2(a[i][0] / s.drawScale, a[i][1] / s.drawScale));
			}
			return v;
		},
		getBodyAtMouse : function(mouseX, mouseY) {
			var s = this;
			s.mousePVec = new s.b2Vec2(mouseX, mouseY);
			var aabb = new s.b2AABB();
			aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
			aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
			s.selectedBody = null;
			s.world.QueryAABB(s.getBodyCallBack, aabb);
			return s.selectedBody;
		},
		getBodyCallBack : function(fixture) {
			var s = LGlobal.box2d;
			if (fixture.GetBody().GetType() != s.b2Body.b2_staticBody) {
				if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), s.mousePVec)) {
					s.selectedBody = fixture.GetBody();
					return false;
				}
			}
			return true;
		},
		ll_show : function() {
			var s = this, k = null;
			for (k in s.removeList) {
				s.world.DestroyBody(s.removeList[k]);
			}
			s.removeList.splice(0, s.removeList.length);
			if (s.stop) {
				return;
			}
			if (s.ll_enterFrame) {
				s.ll_enterFrame({
					target : s
				});
			}
			s.world.Step(1 / 30, 10, 10);
			s.world.ClearForces();
			if (LGlobal.traceDebug) {
				s.world.DrawDebugData();
			}
		},
		/** @language chinese
		 * <p>LBox2d相关。</p>
		 * <p>重新计算Box2d中的所有刚体的坐标，一般用于镜头跟随效果。</p>
		 * @method synchronous
		 * @since 1.4.1
		 * @public
		 */
		synchronous : function() {
			var s = this;
			var parent = null, child, position = null, cx = 0, cy = 0, currentBody, joint;
			for ( currentBody = s.world.GetBodyList(); currentBody; currentBody = currentBody.GetNext()) {
				child = currentBody.GetUserData();
				if (child) {
					if (position == null) {
						parent = child.parent;
						cx = currentBody.GetPosition().x;
						cy = currentBody.GetPosition().y;
					}
					currentBody.SetPosition(new s.b2Vec2((child.x + child.rotatex + parent.x) / s.drawScale, (child.y + child.rotatey + parent.y) / s.drawScale));
					if (position == null) {
						position = {
							x : (currentBody.GetPosition().x - cx),
							y : (currentBody.GetPosition().y - cy)
						};
					}
				}
			}
			for ( joint = s.world.GetJointList(); joint; joint = joint.GetNext()) {
				if (joint.m_groundAnchor1) {
					joint.m_groundAnchor1.x += position.x;
					joint.m_groundAnchor1.y += position.y;
				}
				if (joint.m_groundAnchor2) {
					joint.m_groundAnchor2.x += position.x;
					joint.m_groundAnchor2.y += position.y;
				}
			}
			if (LBox2d.m_controllerList && s.world.m_controllerList && parent) {
				LGlobal.box2d.world.m_controllerList.offset = LBox2d.m_controllerList.offset - parent.y / LGlobal.box2d.drawScale;
			}
		}
	};
	return LBox2d;
})();
LSprite.prototype.setBodyMouseJoint = function(value) {
	var s = this;
	if (!s.box2dBody) {
		return;
	}
	s.box2dBody.mouseJoint = value;
};
LSprite.prototype.clearBody = function(value) {
	var s = this;
	if (!s.box2dBody) {
		return;
	}
	LGlobal.box2d.removeList.push(s.box2dBody);
	s.box2dBody = null;
};
LSprite.prototype.addBodyCircle = function(radius, cx, cy, type, density, friction, restitution) {
	var s = this;
	s.rotatex = radius;
	s.rotatey = radius;
	s.box2dBody = LGlobal.box2d.addCircle(radius / LGlobal.box2d.drawScale, (s.x + cx) / LGlobal.box2d.drawScale, (s.y + cy) / LGlobal.box2d.drawScale, (type == 1) ? LGlobal.box2d.b2Body.b2_dynamicBody : LGlobal.box2d.b2Body.b2_staticBody, density == null ? 0.5 : density, friction == null ? 0.4 : friction, restitution == null ? 0.8 : restitution);
	s.box2dBody.SetUserData(s);
};
LSprite.prototype.addBodyPolygon = function(w, h, type, density, friction, restitution) {
	var s = this;
	s.rotatex = w / 2;
	s.rotatey = h / 2;
	s.box2dBody = LGlobal.box2d.addPolygon(w * 0.5 / LGlobal.box2d.drawScale, h * 0.5 / LGlobal.box2d.drawScale, s.x / LGlobal.box2d.drawScale, s.y / LGlobal.box2d.drawScale, (type == 1) ? LGlobal.box2d.b2Body.b2_dynamicBody : LGlobal.box2d.b2Body.b2_staticBody, density == null ? 0.5 : density, friction == null ? 0.4 : friction, restitution == null ? 0.8 : restitution);
	s.box2dBody.SetUserData(s);
};
LSprite.prototype.addBodyVertices = function(vertices, cx, cy, type, density, friction, restitution) {
	var s = this;
	s.rotatex = 0;
	s.rotatey = 0;
	s.box2dBody = LGlobal.box2d.addVertices(vertices, (type == 1) ? LGlobal.box2d.b2Body.b2_dynamicBody : LGlobal.box2d.b2Body.b2_staticBody, density, friction, restitution);
	s.box2dBody.SetUserData(s);
	s.box2dBody.SetPosition(new LGlobal.box2d.b2Vec2((s.x + cx) / LGlobal.box2d.drawScale, (s.y + cy) / LGlobal.box2d.drawScale));
};
LGlobal.mouseJoint_start = function(eve) {
	if (!LGlobal.IS_MOUSE_DOWN || !LGlobal.box2d || LGlobal.box2d.mouseJoint || LGlobal.box2d.stop) {
		return;
	}
	var mX = eve.offsetX / LGlobal.box2d.drawScale, mY = eve.offsetY / LGlobal.box2d.drawScale, b = LGlobal.box2d.getBodyAtMouse(mX, mY);
	if (b && b.mouseJoint) {
		var m = new LGlobal.box2d.b2MouseJointDef();
		m.bodyA = LGlobal.box2d.world.GetGroundBody();
		m.bodyB = b;
		m.target.Set(mX, mY);
		m.collideConnected = true;
		m.maxForce = 300000.0 * b.GetMass();
		LGlobal.box2d.mouseJoint = LGlobal.box2d.world.CreateJoint(m);
		b.SetAwake(true);
	};
};
LGlobal.mouseJoint_move = function(eve) {
	if (!LGlobal.IS_MOUSE_DOWN || !LGlobal.box2d || !LGlobal.box2d.mouseJoint) {
		return;
	}
	mX = eve.offsetX / LGlobal.box2d.drawScale, mY = eve.offsetY / LGlobal.box2d.drawScale;
	LGlobal.box2d.mouseJoint.SetTarget(new LGlobal.box2d.b2Vec2(mX, mY));
};
LGlobal.mouseJoint_end = function() {
	if (LGlobal.box2d != null && LGlobal.box2d.mouseJoint) {
		LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
		LGlobal.box2d.mouseJoint = null;
	}
}; 