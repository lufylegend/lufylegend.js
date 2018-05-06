
class WxLocalRequest {
    constructor() {
        this.responseType = 'text';
    }
    setRequestHeader(type, application) {

    }
    _onreadystatechange(e) {
        if (!this.onreadystatechange) {
            return;
        }
        let event = {
            currentTarget: {
                readyState: 4,
                status: 200,
                responseType: this.responseType,
                _responseType: this._responseType,
                responseText: e.data,
                response: e.data
            }
        };
        this.onreadystatechange(event);
    }
    _onerror(event) {
        if (!this.onerror) {
            return;
        }
        this.onerror(event);
    }
    open(method, url, async, user, password) {
        this.url = url;
    }
    send(body) {
        let option = {
            filePath: this.url, 
            success: (event) => {
                this._onreadystatechange(event);
            }, 
            fail: (event) => {
                this._onerror(event);
            }
        };
        if (this.responseType === 'text') {
            option.encoding = 'utf8';
        }
        wx.getFileSystemManager().readFile(option);
    }
}
export default WxLocalRequest;