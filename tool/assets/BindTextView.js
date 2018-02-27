export default ll.LClass(ll.LNode, 'BindTextView', {
	init:function(){
		this.t = new ll.LTextField();
		this.addChild(this.t);
	},
	lateInit:function(){
		let key = this.bind.key;
		let target = this.bind.target;
		let parent = this.parent;
		while(parent){
			if(parent._ll_className === target){
				this.t.text = parent.dis[key];
				break;
			}else{
				parent = parent.parent;
				if(typeof parent !== 'object'){
					break;
				}
			}
		}
	}
});