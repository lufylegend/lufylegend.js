function LHBoxLayout (l, m, a, h) {
	this.update(l, m, a, h);
}

LHBoxLayout.MIDDLE = "center";
LHBoxLayout.TOP = "left";
LHBoxLayout.BOTTOM = "right";

LHBoxLayout.prototype.update = function (l, m, a, h) {
	var s = this;

	s.list = l;
	s.margin = m || 0;
	s.align = a;
	s.parentHeight = h || LGlobal.height;
};

LHBoxLayout.prototype.arrange = function () {
	var s = this, m = s.margin, a = s.align;

	for (var i = 0, l = s.list.length, toX = 0; i < l; i++) {
		var o = s.list[i];

		if (i == 0) {
			toX = o.x;
		}

		if (a == LHBoxLayout.MIDDLE) {
			o.y = (s.parentHeight - o.getHeight()) / 2;
		} else if (a == LHBoxLayout.BOTTOM) {
			o.y = s.parentHeight - o.getHeight();
		} else if (a == LHBoxLayout.TOP) {
			o.y = 0;
		}

		o.x = toX;

		toX += o.getWidth() + m;
	}
};