/** @language chinese
 * Ajax 操作函数。允许我们在不刷新浏览器的情况下从服务器加载数据。
 * @class LAjax	
 * @constructor
 * @since 1.7.1
 * @public
 */
/** @language english
 * AJAX is the art of exchanging data with a server, and update parts of a web page - without reloading the whole page.
 * @class LAjax
 * @constructor
 * @since 1.7.1
 * @public
 */
/** @language japanese
 * AJAX アプリケーション。
 * @class LAjax
 * @constructor
 * @since 1.7.1
 * @public
 */
var LAjax = (function () {
	function LAjax () {
		/** @language chinese
		 * 服务器响应的数据类型，支持LAjax.TEXT，LAjax.JSON，LAjax.ARRAY_BUFFER，LAjax.BLOB四种类型。
		 * @property LAjax.responseType
		 * @type String
		 * @since 1.9.8
		 * @public
		 * @example
		 * 	LAjax.responseType = LAjax.JSON;
		 * 	LAjax.get("test.txt",{},success);
		 * 	function success (data) {
		 * 		trace(data.name);
		 * 	}
		 */
		/** @language english
		 * ......
		 * @property LAjax.responseType
		 * @type String
		 * @since 1.9.8
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @property LAjax.responseType
		 * @type String
		 * @since 1.9.8
		 * @public
		 */
		this.responseType = null;
	}
	LAjax.prototype = {
		/** @language chinese
		 * 服务器响应的数据类型的一种，TEXT。
		 * @property LAjax.TEXT
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		/** @language english
		 * ......
		 * @property LAjax.TEXT
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @property LAjax.TEXT
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		TEXT : "text",
		/** @language chinese
		 * 服务器响应的数据类型的一种，JSON。
		 * @property LAjax.JSON
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		/** @language english
		 * ......
		 * @property LAjax.JSON
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @property LAjax.JSON
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		JSON : "json",
		/** @language chinese
		 * 服务器响应的数据类型的一种，ARRAY_BUFFER。
		 * @property LAjax.ARRAY_BUFFER
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		/** @language english
		 * ......
		 * @property LAjax.ARRAY_BUFFER
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @property LAjax.ARRAY_BUFFER
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		ARRAY_BUFFER : "arraybuffer",
		/** @language chinese
		 * 服务器响应的数据类型的一种，BLOB。
		 * @property LAjax.BLOB
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		/** @language english
		 * ......
		 * @property LAjax.BLOB
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		/** @language japanese
		 * ......
		 * @property LAjax.BLOB
		 * @type String
		 * @since 1.9.8
		 * @static
		 * @public
		 */
		BLOB : "blob",
		/** @language chinese
		 * 通过远程 HTTP GET 请求载入信息。
		 * @method get
		 * @param {String} url 必需。规定将请求发送的哪个 URL。
		 * @param {Json Object} data 可选。规定连同请求发送到服务器的数据。
		 * @param {function} oncomplete 可选。规定当请求成功时运行的函数。
		 * @param {function} onerror 可选。规定当请求失败时运行的函数。
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var label;
		 * 	function main(){
		 * 		label = new LTextField();
		 * 		addChild(label);
		 * 		label.x = label.y = 50;
		 * 		label.text = "LAjax.get ......";
		 * 		LAjax.get("test.txt",{},success);
		 * 	}
		 * 	function success (data) {
		 * 		label.text = data;
		 * 	}
		 * @examplelink <p><a href="../../../api/LAjax/get.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.7.1
		 */
		/** @language english
		 * The method loads data from the server using a HTTP GET request.
		 * @method get
		 * @param {String} url Required. Specifies the URL you wish to request
		 * @param {Json Object} data Optional. Specifies data to send to the server along with the request
		 * @param {function} oncomplete Optional. Specifies a function to run if the request succeeds
		 * @param {function} onerror Optional. Specifies a function to run if the request failure
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var label;
		 * 	function main(){
		 * 		label = new LTextField();
		 * 		addChild(label);
		 * 		label.x = label.y = 50;
		 * 		label.text = "LAjax.get ......";
		 * 		LAjax.get("test.txt",{},success);
		 * 	}
		 * 	function success (data) {
		 * 		label.text = data;
		 * 	}
		 * @examplelink <p><a href="../../../api/LAjax/get.html" target="_blank">Try it »</a></p>
		 * @public
		 * @since 1.7.1
		 */
		/** @language japanese
		 * HTTP(GET)通信でページを読み込みます。
		 * @method get
		 * @param {String} url 必須。読み込むHTMLページのURL
		 * @param {Json Object} data パラメータ(キーと値の組み合わせ)
		 * @param {function} oncomplete 通信成功時のコールバック関数。
		 * @param {function} onerror 通信失敗時のコールバック関数。
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var label;
		 * 	function main(){
		 * 		label = new LTextField();
		 * 		addChild(label);
		 * 		label.x = label.y = 50;
		 * 		label.text = "LAjax.get ......";
		 * 		LAjax.get("test.txt",{},success);
		 * 	}
		 * 	function success (data) {
		 * 		label.text = data;
		 * 	}
		 * @examplelink <p><a href="../../../api/LAjax/get.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 * @since 1.7.1
		 */
		get : function (url, data, oncomplete, onerror) {
			this.getRequest("GET", url, data, oncomplete, onerror);
		},
		/** @language chinese
		 * 通过远程 HTTP POST 请求载入信息。
		 * @method post
		 * @param {String} url 必需。规定将请求发送的哪个 URL。
		 * @param {Json Object} data 可选。规定连同请求发送到服务器的数据。
		 * @param {function} oncomplete 可选。规定当请求成功时运行的函数。
		 * @param {function} onerror 可选。规定当请求失败时运行的函数。
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var label;
		 * 	function main(){
		 * 		label = new LTextField();
		 * 		addChild(label);
		 * 		label.x = label.y = 50;
		 * 		label.text = "LAjax.post ......";
		 * 		LAjax.post("test.txt",{},success);
		 * 	}
		 * 	function success (data) {
		 * 		label.text = data;
		 * 	}
		 * @examplelink <p><a href="../../../api/LAjax/post.html" target="_blank">测试链接</a></p>
		 * @public
		 * @since 1.7.1
		 */
		/** @language english
		 * The method loads data from the server using a HTTP POST request.
		 * @method post
		 * @param {String} url Required. Specifies the URL you wish to request
		 * @param {Json Object} data Optional. Specifies data to send to the server along with the request
		 * @param {function} oncomplete Optional. Specifies a function to run if the request succeeds
		 * @param {function} onerror Optional. Specifies a function to run if the request failure
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var label;
		 * 	function main(){
		 * 		label = new LTextField();
		 * 		addChild(label);
		 * 		label.x = label.y = 50;
		 * 		label.text = "LAjax.post ......";
		 * 		LAjax.post("test.txt",{},success);
		 * 	}
		 * 	function success (data) {
		 * 		label.text = data;
		 * 	}
		 * @examplelink <p><a href="../../../api/LAjax/post.html" target="_blank">Try it »</a></p>
		 * @public
		 * @since 1.7.1
		 */
		/** @language japanese
		 * HTTP(POST)通信でページを読み込みます。
		 * @method post
		 * @param {String} url 必須。読み込むHTMLページのURL
		 * @param {Json Object} data パラメータ(キーと値の組み合わせ)
		 * @param {function} oncomplete 通信成功時のコールバック関数。
		 * @param {function} onerror 通信失敗時のコールバック関数。
		 * @example
		 * 	LInit(1000/50,"legend",800,450,main);
		 * 	var label;
		 * 	function main(){
		 * 		label = new LTextField();
		 * 		addChild(label);
		 * 		label.x = label.y = 50;
		 * 		label.text = "LAjax.post ......";
		 * 		LAjax.post("test.txt",{},success);
		 * 	}
		 * 	function success (data) {
		 * 		label.text = data;
		 * 	}
		 * @examplelink <p><a href="../../../api/LAjax/post.html" target="_blank">実際のサンプルを見る</a></p>
		 * @public
		 * @since 1.7.1
		 */
		post : function (url, data, oncomplete, onerror) {
			this.getRequest("POST", url, data, oncomplete, onerror);
		},
		getRequest : function (t, url, d, oncomplete, err) {
			var s = this, k, data = "", a = "";
			s.err = err;
			var ajax = s.getHttp();
			if (!ajax) {
				return;
			}
			if (d) {
				for (k in d) {
					data += (a + k + "=" + d[k]);
					a = "&";	
				}
			}
			if (t.toLowerCase() == "get" && data.length > 0) {
				url += ((url.indexOf('?') >= 0 ? '&' : '?') + data);
				data = null;
			}
			ajax.open(t, url, true);
			if (s.responseType) {
				ajax.responseType = s.responseType;
				s.responseType = s.TEXT;
			}
			ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4) {
					if (ajax.status >= 200 && ajax.status < 300 || ajax.status === 304) {
						if (oncomplete) {
							if (ajax.responseType == s.ARRAY_BUFFER || ajax.responseType == s.BLOB) {
								oncomplete(ajax.response);
							} else if (ajax.responseType == s.JSON) {
								if(JSON && typeof JSON.parse == "function"){
									oncomplete(JSON.parse(ajax.responseText));
								}else{
									oncomplete(eval('(' + ajax.responseText + ')'));
								}
							} else if (ajax.responseText.length > 0) {
								oncomplete(ajax.responseText);
							} else {
								oncomplete(null);
							}
						}
					} else {
						if (err) {
							err(ajax);
						}
					}
		 		}
			};
			ajax.send(data);
		},
		getHttp : function () {
			if (typeof XMLHttpRequest != UNDEFINED) {
				return new XMLHttpRequest();
			}  
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
					if (!this.err) {
						this.err(e);
					}
				}
			}
			return false;
		}
	};
	return new LAjax();
})();