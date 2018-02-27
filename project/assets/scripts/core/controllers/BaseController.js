import BindTextView from '../views/BindTextView';
export default ll.LClass(ll.LNode, 'BaseController', {
        init:function(){
                this.callParent("init",arguments);
                this.dispatcher = this.dispatche || {};
	}
});