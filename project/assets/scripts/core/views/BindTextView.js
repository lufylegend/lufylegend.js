import BaseBindView from './BaseBindView';
export default ll.LClass(BaseBindView, 'BindTextView', {
	init(){
		this.label = new ll.LTextField();
		this.addChild(this.label);
	},
	updateView(){
		let value = this.getByPath(this.bind.key);
		if(value !== null){
			this.label.text = value;
			console.log('BindTextView',this.label.text);
		}
	}
});