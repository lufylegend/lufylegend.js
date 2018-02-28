import BaseView from './BaseView';
export default ll.LClass(BaseView, 'BaseBindView', {
	lateInit(){
        this.callParent("lateInit",arguments);
		this.updateView();
	},
	updateView(model){
        this.model = model;
    }
});