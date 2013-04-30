/*
* LQuadTree.js
**/
function LQuadTree(rect){
	var self = this;
	self.q1 = null;
	self.q2 = null;
	self.q3 = null;
	self.q4 = null;
	self.parent = null;
	self.data = [];
	self.rect = rect;
	self.root = self;
}
LQuadTree.prototype = {
	createChildren:function (deep){
        if (deep == 0){
        	return;
        }
		var self = this;
		var hw = self.rect.width / 2 , hh = self.rect.height / 2;
		self.q1 = new LQuadTree(new LRectangle(self.rect.x + hw, self.rect.y, hw, hh));
		self.q2 = new LQuadTree(new LRectangle(self.rect.x + hw, self.rect.y + hh, hw, hh));
		self.q3 = new LQuadTree(new LRectangle(self.rect.x, self.rect.y + hh, hw, hh));
		self.q4 = new LQuadTree(new LRectangle(self.rect.x, self.rect.y, hw, hh));
    
		self.q1.parent = self.q2.parent = self.q3.parent = self.q4.parent = self;
		self.q1.root = self.q2.root = self.q3.root = self.q4.root = self.root;
    
		self.q1.createChildren(deep - 1);
		self.q2.createChildren(deep - 1);
		self.q3.createChildren(deep - 1);
		self.q4.createChildren(deep - 1);
	},
	hasChildren:function(){
		var self = this;
		return self.q1 && self.q2 && self.q3 && self.q4;
	},
	clear:function(){
		var self = this;
	    if (self.hasChildren()){
	    	return self.q1.clear() || self.q2.clear()|| self.q3.clear() || self.q4.clear();
	    }else{
	    	self.q1 = null;
	    	self.q2 = null;
	    	self.q3 = null;
	    	self.q4 = null;
	    	self.parent = null;
	    	self.data = [];
	    	return self;
	    }
	},
	add:function(v, x, y){
		var self = this;
        if (!self.isIn(x,y))return null;
    
	    if (self.hasChildren()){
	    	return self.q1.add(v,x,y) || self.q2.add(v,x,y) || self.q3.add(v,x,y) || self.q4.add(v,x,y);
	    }else{
	    	self.data.push(v);
	    	return self;
	    }
	},
	remove:function(v, x, y){
		var self = this;
        if (!self.isIn(x,y))return null;
    
	    if (self.hasChildren()){
	    	return self.q1.remove(v,x,y) || self.q2.remove(v,x,y) || self.q3.remove(v,x,y) || self.q4.remove(v,x,y);
	    }else{
            var index = self.data.indexOf(v);
	        if (index!=-1){
	        	self.data.splice(index, 1);
	            return self;
	        }else{
	            return null;
	        }
	    }
	},
	isIn:function(x, y){
		var self = this;
		return (typeof x == UNDEFINED || (x >= self.rect.x && x < self.rect.right)) && (typeof y == UNDEFINED || (y >= self.rect.y && y < self.rect.bottom));
	},
	getDataInRect:function(rect){
		var self = this;
        if (!self.rect.intersects(rect))return [];
        var r = self.data.concat();
        if (self.hasChildren()){
            r.push.apply(r,self.q1.getDataInRect(rect));
            r.push.apply(r,self.q2.getDataInRect(rect));
            r.push.apply(r,self.q3.getDataInRect(rect));
            r.push.apply(r,self.q4.getDataInRect(rect));
	    }else{
        }
        
	    return r;
	}
};