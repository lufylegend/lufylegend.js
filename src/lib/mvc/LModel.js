/** @language chinese
 * <p>模型Model</p>
 * <p>模型是专门用来和数据打交道的，数据的存储等工作需要写到模型内。模型必须放到Models文件夹内，模型的名字以Model结尾。</p>
 * @class LModel
 * @extends LMvcObject
 * @constructor
 * @since 1.8.4
 * @public
 */
var LModel = (function() {
	function LModel(controller){
		var self = this;
		base(self,LMvcObject,[]);
		self.mvcType = "model";
		if (controller) {
			/** @language chinese
			 * 模型的控制器。
			 * @property controller
			 * @type LModel
			 * @since 1.8.4
			 * @public
			 */
			self.controller = controller;
			/** @language chinese
			 * 模型的视图。
			 * @property view
			 * @type LView
			 * @since 1.8.4
			 * @public
			 */
			self.view = controller.view;
		}
	}
	return LModel;
})();
