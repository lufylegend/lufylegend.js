function LVBoxLayout (l, m, a, w) {
	this.update(l, m, a, w);
}

LVBoxLayout.CENTER = "center";
LVBoxLayout.LEFT = "left";
LVBoxLayout.RIGHT = "right";

LVBoxLayout.prototype.update = function (l, m, a, w) {
	var s = this;

	s.list = l;
	s.margin = m || 0;
	s.align = a;
	s.parentWidth = w || LGlobal.width;
};

LVBoxLayout.prototype.arrange = function () {
	var s = this, m = s.margin, a = s.align;

	for (var i = 0, l = s.list.length, toY = 0; i < l; i++) {
		var o = s.list[i];

		if (i == 0) {
			toY = o.y;
		}

		if (a == LVBoxLayout.CENTER) {
			o.x = (s.parentWidth - o.getWidth()) / 2;
		} else if (a == LVBoxLayout.RIGHT) {
			o.x = s.parentWidth - o.getWidth();
		} else if (a == LVBoxLayout.LEFT) {
			o.x = 0;
		}

		o.y = toY;

		toY += o.getHeight() + m;
	}
};