export default ll.LClass(ll.LNode, 'BaseView', {
	init(){
	},
	lateInit(){
	},
    getValue(key){
		let parent = this.parent;
		let target = this.bind.target;
		while(parent){
            if(target){
                if(parent._ll_className === target){
					if(parent._ll_isController){
						return parent.dispatcher[key];
					}
                    return parent.model ? parent.model[key] : null;
                }
            }else if(parent._ll_isController){
                return parent.dispatcher[key];
            }
            
			parent = parent.parent;
			if(typeof parent !== 'object'){
				break;
            }
        }
        return null;
    },
	getByPath(path){
        if (path.indexOf('.') < 0) {
          return this.getValue(path);
        }
        let paths = path.split('.');
        let currentVal = this.getValue(paths[0]);
        if (!currentVal) {
          return null;
        }
        for (let i = 1; i < paths.length; i++) {
          let key = paths[i];
          currentVal = currentVal[key];
          if (currentVal === null) {
            break;
          }
        }
        return currentVal;
	}
});