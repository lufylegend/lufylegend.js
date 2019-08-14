function LAnimation (bmpd, frameList) {
	var s = this;
	LExtends(s, LSprite, []);

	s.frameList = frameList;
	s.rowIndex = 0;
	s.colIndex = 0;
	s.isPlaying = false;
	s.frameWidth = frameList[0][0].width;
	s.frameHeight = frameList[0][0].height;
	s.__bmpdOriginalX = bmpd.x;
	s.__bmpdOriginalY = bmpd.y;
	s.playDirection = LAnimation.PlayDirection.HORIZONTAL;
	s.isMirror = false;
	s.times = Number.MAX_VALUE;
	s.__timesIndex = 0;
	s.speed = 1;
	s.__speedIndex = 0;

	bmpd.setProperties(bmpd.x, bmpd.y, s.frameWidth, s.frameHeight);

	s.bitmap = new LBitmap(bmpd);
	s.addChild(s.bitmap);

	s.addEventListener(LEvent.ENTER_FRAME, s.loop);
}

LAnimation.PlayDirection = {
	VERTICAL : "vertical",
	HORIZONTAL : "horizontal"
};

LAnimation.Event = {
	START : "start",
	CHANGE_FRAME : "change_frame",
	COMPLETE : "complete",
	STOP : "stop"
};

LAnimation.prototype.loop = function (e) {
	var s = e.currentTarget, isComplete;

	if (!s.isPlaying) {
		return;
	}

	if (s.isMirror) {
		s.bitmap.scaleX = -1;
		s.bitmap.x = s.frameWidth;
	} else {
		s.bitmap.scaleX = 1;
		s.bitmap.x = 0;
	}

	if (s.__speedIndex++ < s.speed) {
		return;
	}

	s.__speedIndex = 0;

	isComplete = false;

	s.dispatchEvent(LAnimation.Event.CHANGE_FRAME);

	if (s.playDirection == LAnimation.PlayDirection.HORIZONTAL) {
		s.colIndex++;
	} else if (s.playDirection == LAnimation.PlayDirection.VERTICAL) {
		s.rowIndex++;
	}

	if (s.playDirection == LAnimation.PlayDirection.HORIZONTAL && s.colIndex >= s.frameList[0].length) {
		s.colIndex = 0;

		isComplete = true;
	}

	if (s.playDirection == LAnimation.PlayDirection.VERTICAL && s.rowIndex >= s.frameList.length) {
		s.rowIndex = 0;

		isComplete = true;
	}

	if (isComplete) {
		s.dispatchEvent(LAnimation.Event.COMPLETE);

		if (++s.__timesIndex >= s.times) {
			s.stop();

			return;
		}
	}

	s.bitmap.bitmapData.setCoordinate(
		s.__bmpdOriginalX + s.colIndex * s.frameWidth,
		s.__bmpdOriginalY + s.rowIndex * s.frameHeight
	);
};

LAnimation.prototype.play = function () {
	var s = this;

	if (!s.isPlaying) {
		s.isPlaying = true;

		s.dispatchEvent(LAnimation.Event.START);
	}
};

LAnimation.prototype.pause = function () {
	var s = this;

	s.isPlaying = false;
};

LAnimation.prototype.stop = function () {
	var s = this;

	s.isPlaying = false;
	s.__timesIndex = 0;
	s.__speedIndex = 0;

	s.dispatchEvent(LAnimation.Event.STOP);
};