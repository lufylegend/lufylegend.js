import BaseBindView from './BaseBindView';
export default ll.LClass(BaseBindView, 'BindListChildView', {
	init(){
	},
	lateInit(){
	},
	updateWidget(model){
        this.model = model;
        for(let child of this.childList){
            console.error("BindListChildView",child._ll_className);
            child.updateView();
        }
	}
});