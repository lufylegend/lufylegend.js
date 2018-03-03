import BindListView from '../views/BindListView';
import BindTextView from '../views/BindTextView';
import BindSpriteView from '../views/BindSpriteView';
import BindListChildView from '../views/BindListChildView';
export default ll.LClass(ll.LNode, 'BaseController', {
	init(){
                this.callParent("init",arguments);
                this._ll_isController = true;
                this.dispatcher = this.dispatcher || {};
                this.onLoad();
        },
        onLoad(){

        }
});