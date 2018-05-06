
var LAtlasSprite = (function () {
	function LAtlasSprite (texture, setting, data, atlasType) {
		var s = this;
		LExtends(s, LSprite, []);
        s.atlasType = atlasType;
        s._rotated = data.rotated;
        if (atlasType === LSpriteAtlasType.SIMPLE || !setting) {
            s.atlasType = LSpriteAtlasType.SIMPLE;
            var bitmap = s._getBitmap(texture, data);
            s.addChild(bitmap);
        } else if (atlasType === LSpriteAtlasType.SLICED) {
            var panel = s._getPanel(texture, setting, data);
            s.addChild(panel);
        }
	}
	var p = {
		resize:function(width, height){
			var s = this;
            if (s.atlasType === LSpriteAtlasType.SIMPLE) {
                var sprite = s.getChildAt(0);
                var bitmap = sprite.getChildAt(0);
                var bitmapWidth = s._rotated ? bitmap.bitmapData.getHeight() : bitmap.bitmapData.getWidth();
                var bitmapHeight = s._rotated ? bitmap.bitmapData.getWidth() : bitmap.bitmapData.getHeight();
                sprite.scaleX = width / bitmapWidth;
                sprite.scaleY = height / bitmapHeight;
            } else if (s.atlasType === LSpriteAtlasType.SLICED) {
                var panel = s.getChildAt(0);
                if (s._rotated) {
                    panel.resize(height, width);
                    panel.y = height;
                } else {
                    panel.resize(width, height);
                }
            }
        },
		_getBitmapData:function(texture, data){
			var s = this;
            var x = data.frame[0][0];
            var y = data.frame[0][1];
            var width = data.frame[1][data.rotated ? 1 : 0];
            var height = data.frame[1][data.rotated ? 0 : 1];
            var bitmapData = new LBitmapData(texture, x, y, width, height);
            return bitmapData;
        },
		_getBitmap:function(texture, data){
			var s = this;
            var bitmapData = s._getBitmapData(texture, data);
            var bitmap = new LBitmap(bitmapData);
            bitmap.rotateCenter = false;
            if (data.rotated) {
                bitmap.y = bitmapData.getWidth();
                bitmap.rotate = -90;
            }
            var sprite = new LSprite();
            sprite.addChild(bitmap);
            return sprite;
        },
		_getPanel:function(texture, setting, data){
			var s = this;
            var bitmapData = s._getBitmapData(texture, data);
            var width = bitmapData.getWidth();
            var height = bitmapData.getHeight();
            var left = data.rotated ? setting.bottom : setting.left;
            var right = data.rotated ? setting.top : setting.right;
            var top = data.rotated ? setting.left : setting.top;
            var bottom = data.rotated ? setting.right : setting.bottom;
            var x1 = left;
            var x2 = width - right;
            var y1 = top;
            var y2 = height - bottom;
            var panel = new LPanel(bitmapData, width, height, x1, x2, y1, y2);
            if (data.rotated) {
                panel.y = width;
                panel.rotate = -90;
            }
            return panel;
        }
	};
	for (var k in p) {
		LAtlasSprite.prototype[k] = p[k];
	}
	return LAtlasSprite;
})();