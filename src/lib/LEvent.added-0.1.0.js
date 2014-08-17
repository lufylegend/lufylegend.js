/*
* LEvent.added.js
**/
LEvent.ADDED = "added";
LEvent.ADDED_TO_STAGE = "addedToStage";
LEvent.REMOVED = "removed";
LEvent.REMOVED_FROM_STAGE = "removedFromStage";
LDisplayObjectContainer.prototype._ll_added_addChild = LDisplayObjectContainer.prototype.addChild;
LDisplayObjectContainer.prototype.addChild = function (d) {
	var r = this._ll_added_addChild(d);
	r.dispatchEvent(LEvent.ADDED);
	r.dispatchEventAddToStage();
	return r;
};
LDisplayObjectContainer.prototype._ll_added_addChildAt = LDisplayObjectContainer.prototype.addChildAt;
LDisplayObjectContainer.prototype.addChildAt = function (d, i) {
	var r = this._ll_added_addChildAt(d, i);
	if (!r) {
		return;
	}
	r.dispatchEvent(LEvent.ADDED);
	r.dispatchEventAddToStage();
	return r;
};
LDisplayObjectContainer.prototype.dispatchEventAddToStage = function () {
	var s = this, p = s.parent;
	while (p && p != "root") {
		p = p.parent;
	}
	if (p == "root") {
		s.dispatchEvent(LEvent.ADDED_TO_STAGE);
	}
};
LDisplayObjectContainer.prototype._ll_removed_removeChild = LDisplayObjectContainer.prototype.removeChild;
LDisplayObjectContainer.prototype.removeChild = function (d) {
	var s = this, h = d.inStage();
	s._ll_removed_removeChild(d);
	d.dispatchEvent(LEvent.REMOVED);
	if (h) {
		d.dispatchEvent(LEvent.REMOVED_FROM_STAGE);
	}
};
LDisplayObjectContainer.prototype._ll_removed_removeChildAt = LDisplayObjectContainer.prototype.removeChildAt;
LDisplayObjectContainer.prototype.removeChildAt = function (i) {
	var s = this, d = s.getChildAt(i);
	if (!d) {
		return;
	}
	var h = d.inStage();
	s._ll_removed_removeChild(d);
	d.dispatchEvent(LEvent.REMOVED);
	if (h) {
		d.dispatchEvent(LEvent.REMOVED_FROM_STAGE);
	}
};
LDisplayObjectContainer.prototype.inStage = function () {
	var s = this, p = s.parent;
	while (p && p != "root") {
		p = p.parent;
	}
	return p == "root";
};
