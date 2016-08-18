function LAnimationSet () {
	var s = this;
	LExtends(s, LSprite, []);

	s.animationData = {};

	s.animation = null;
}

LAnimationSet.prototype.addAnimation = function (label, bmpd, cdList, properties, events) {
	var s = this;

	s.animationData[label] = {
		bmpd : bmpd,
		cdList : cdList,
		properties : properties,
		events : events
	};
};

LAnimationSet.prototype.showAnimation = function (label) {
	var s = this, d = s.animationData[label], p, e;

	if (!d) {
		return;
	}

	p = d.properties || {};
	e = d.events || {};

	if (s.animation) {
		s.animation.remove();

		delete s.animation;
	}

	s.animation = new LAnimation(d.bmpd.clone(), d.cdList);
	s.addChild(s.animation);

	for (var k in p) {
		s.animation[k] = p[k];
	}

	if (e.onStart) {
		s.animation.addEventListener(Animation.Event.START, e.onStart);
	}
	if (e.onChangeFrame) {
		s.animation.addEventListener(Animation.Event.CHANGE_FRAME, e.onChangeFrame);
	}
	if (e.onComplete) {
		s.animation.addEventListener(Animation.Event.COMPLETE, e.onComplete);
	}
	if (e.onStop) {
		s.animation.addEventListener(Animation.Event.STOP, e.onStop);
	}

	s.animation.play();
};