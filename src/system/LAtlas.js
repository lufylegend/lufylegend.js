
var LAtlas = (function () {
	function LAtlas () {
		LExtends(s, LEventDispatcher, []);
	}
	var p = {
		destroy:function(){
            delete LAtlas._container[name];
        },
		load:function(path, name){
            var s = this;
            var loadData = [
                { name: `${path}/${name}.png`, path: this.url(`${path}/${name}.png`) },
                { name: `${path}/${name}.plist`, path: this.url(`${path}/${name}.plist` + (LGlobal.wx ? '.meta' : '')), type: 'text' },
                { name: `${path}/${name}.json`, path: this.url(`${path}/${name}.json`), type: 'text' }
            ];
            LLoadManage.load( 
                loadData, null, function(datalist){
                    s._loadComplete(datalist, path, name);
                }
            );
        },
		url:function(u){
            if (!LGlobal.traceDebug) {
                return u;
            }
            return u + (u.indexOf('?') >= 0 ? '&' : '?') + 't=' + Date.now();
        },
        _loadComplete:function(datalist, path, name){
            var resourcesPath = 'resources/';
            var resourcesIndex = path.indexOf(resourcesPath);
            this._atlasKey = path.substring(resourcesIndex + resourcesPath.length) + '/' + name;
            LAtlas._container[this._atlasKey] = this;
            var texture = datalist[`${path}/${name}.png`];
            var xml = datalist[`${path}/${name}.plist`];
            var json = JSON.parse(datalist[`${path}/${name}.json`]);
            this.set(xml, texture, json);
            var event = new LEvent(LEvent.COMPLETE);
            event.currentTarget = this;
            event.target = this;
            this.dispatchEvent(event);
        },
		set:function(xml, texture, json){
            this._texture = texture;
            this._setting = json;
            this._initData(xml);
        },
		_initData:function(xml){
            if (LGlobal.wx) {
                this._textureData = JSON.parse(xml);
                return;
            }
            var parser = new DOMParser();
            this.xmlDom = parser.parseFromString(xml, 'text/xml');
            var plistDom = this.xmlDom.querySelector('plist').querySelector('dict');
            var children = plistDom.children;
            var frames;
            for (var i = 0;i < children.length; i++) {
                var child = children[i];
                if (child.tagName === 'key' && child.textContent === 'frames') {
                    frames = children[i + 1].children;
                    break;
                }
            }
            this._textureData = {};
            for (var i = 0;i < frames.length; i += 2) {
                var key = frames[i].textContent.replace('.png', '');
                var value = frames[i + 1];
                var data = this._getTextureData(value.children);
                this._textureData[key] = data;
            }
        },
		getSprite:function(name, type, width, height){
            var data = this._textureData[name];
            var atlasSprite = new LAtlasSprite(this._texture, this._setting[name], data, type);
            if (width && height) {
                atlasSprite.resize(width, height);
            }
            return atlasSprite;
        },
		_getTextureData:function(children){
            var data = {};
            for (var i = 0;i < children.length; i += 2) {
                var key = children[i].textContent;
                var tict = children[i + 1];
                var value = JSON.parse(tict.tagName === 'string' ? tict.textContent.replace(/\{/g, '[').replace(/\}/g, ']') : tict.tagName);
                data[key] = value;
            }
            return data;
        }
	};
	for (var k in p) {
		LAtlas.prototype[k] = p[k];
	}
    LAtlas.TYPE_PLIST = 'type_plist';
    LAtlas._container = {};
    LAtlas.get = function(name) {
        return LAtlas._container[name] || new LAtlas();
    };
	return LAtlas;
})();