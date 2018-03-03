import BaseView from './BaseView';
export default ll.LClass(BaseView, 'BaseBindView', {
	lateInit(){
        this.updateView();
	},
	updateView(model){
        this.model = model;
    }
});