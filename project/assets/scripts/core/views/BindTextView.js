export default ll.LClass(ll.LNode, 'BindTextView', {
	init:function(){
		this.t = new ll.LTextField();
		this.addChild(this.t);
	},
	lateInit:function(){
		console.error('BindTextView lateInit start');
		let key = this.bind.key;
		let target = this.bind.target;
		let parent = this.parent;
		while(parent){
			if(parent._ll_className === target){
				console.error(parent._ll_className, key, parent.dispatcher);
				this.t.text = parent.dispatcher[key];
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