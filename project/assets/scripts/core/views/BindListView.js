import BaseBindView from './BaseBindView';
import BaseManager from '../managers/BaseManager';
export default ll.LClass(BaseBindView, 'BindListView', {
	init(){
		this.listView = new ll.LListView();
		this.addChild(this.listView);
	},
	updateView(){
		let value = this.getByPath(this.bind.key);
		if(value === null){
			return;
		}
		let listView = this.listView;
		listView.maxPerLine = 1;
		listView.cellWidth = 100;
		listView.cellHeight = 30;
		listView.resize(300,300);
		listView.arrangement = ll.LListView.Direction.Horizontal;
		listView.movement = ll.LListView.Direction.Vertical;

		let childPrefab = this.bind.childPrefab;
		let path = `resources/${childPrefab}.json`;
		return BaseManager.loadPrefab(path)
		.then(data => {
			for(let child of value){
				this.createListObject(data, child);
			}
		    //let node = LNode.create(data);
		    //this.listView.insertChildView(node);
		});
	},
	createListObject(data, model){
		let listChild = new ll.LListChildView();
		let node = LNode.create(data);
		console.log("BindListView createListObject,",data,model,node);
		node.updateWidget(model);
		listChild.addChild(node);
		this.listView.insertChildView(listChild);
	}
});