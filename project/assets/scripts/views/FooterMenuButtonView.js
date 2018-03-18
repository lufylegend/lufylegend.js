import PrefabContainer from '../../plugin/mvc/prefabs/PrefabContainer';
import BindButtonView from '../../plugin/mvc/views/BindButtonView';
class FooterMenuButtonView extends BindButtonView {
    init() {
        super.init();
        this._focus = false;
    }
    get focus() {
        return this._focus;
    }
    _iconReset(status) {
        let icon = this.currentButton.upState.getChildAt(1);
        if (status) {
            icon.resize(100, 100);
        } else {
            icon.resize(80, 80);
        }
        
        icon.x = (this.getWidth() - icon.getWidth()) * 0.5;
        icon.y = this.getHeight() - icon.getHeight();
    }
    focusOn() {
        if (this._focus) {
            return;
        }
        this._focus = true;
        this.currentButton.upState.resize(190, this.getHeight());
        this._iconReset(true);
    }
    focusOff() {
        if (!this._focus) {
            return;
        }
        this._focus = false;
        this.currentButton.upState.resize(150, this.getHeight());
        this._iconReset(false);
    }
}
PrefabContainer.set('FooterMenuButtonView', FooterMenuButtonView);
export default FooterMenuButtonView;