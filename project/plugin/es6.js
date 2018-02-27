this.ll = this.ll||{};
/*
{
	"class":"",
	"property":{
		"x":0,
		"y":0,
		...
	},
	"bind":{
		"key":"",
		"target":""//Controller,ListChildView
	},
	"childNodes":[
		{
		},
		{
		}
	]
}
*/

let LClass = (function(){
	function LClass(_super, name, params){
		params = params || {};
		var Class = (function () {
			function Class () {
				LExtends(this, _super, arguments);
				for(let key in params){
					let value = params[key];
					if(typeof value === 'function'){
						continue;
					}
					this[key] = value;
				}
			}
			for(let key in params){
				let value = params[key];
				if(typeof value !== 'function'){
					continue;
				}
				if(_super.prototype[key]){
					Class.prototype[key] = function(){
						value.apply(this, arguments)
						return this.callParent(key,arguments);
					};
				}else{
					Class.prototype[key] = value;
				}
			}
			Class.prototype['_ll_className'] = name;
			return Class;
		})();
		ll[name] = Class;
		return Class;
	}
	return LClass;
})();
ll.LClass = LClass;
let LNode = (function () {
	function LNode (data) {
		LExtends(this, LSprite, []);
		this.type = "LNode";
		if(typeof this.init === 'function'){
			this.init();
		}
		this._initData(data);
	}
	LNode.prototype._initData = function (data) {
		if(!data){
			return;
		}
		this._initDataProperty(data);
		this._initDataChildNodes(data);
	};
	LNode.prototype._initDataProperty = function (data) {
		let property = data.property;
		if(!property){
			return;
		}
		for(let key in property){
			this[key] = property[key];
		}
	};
	LNode.prototype._initDataChildNodes = function (data) {
		if(!data.childNodes){
			return;
		}
		for(let childNode of data.childNodes){
			let className = childNode.class;
			if(typeof ll[className] !== 'function'){
				continue;
			}
			let child = new ll[className](childNode);
			this.addChild(child);
			if(typeof child.lateInit === 'function'){
				child.lateInit();
			}
		}
	};
	return LNode;
})();
ll.LNode = LNode;