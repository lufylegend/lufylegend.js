import Person from './person';
import Test from './Test';
import BindTextView from './BindTextView';
class Friend extends Person{
    constructor(name) {
      super(name);
    }
    callName() {
      console.log(this.name);
    }
}
/*let test = new Test();
console.log(test, test.testName);

let test1 = new Test1();
console.log(test1, test1.testName);
console.log(test instanceof Test, test1 instanceof Test);
console.log(test instanceof Test1, test1 instanceof Test1);

var friend = new Friend('Ryo');

friend.callName();
*/

			LInit(50, "legend", 800, 480, main);
			function main () {
				let node = new LNode({
					"class":"",
					"property":{
						"x":0,
						"y":0
					},
					"childNodes":[
						{
							"class":"Test",
							"property":{
								"x":0,
								"y":0
							},
							"childNodes":[

							]
						},
						{
							"class":"Test",
							"property":{
								"x":100,
								"y":0
							},
							"childNodes":[
								{
									"class":"BindTextView",
									"property":{
										"bind":{
											"key":"username",
											"target":"Test"//Controller,ListChildView
										},
										"x":0,
										"y":70
									},
									"childNodes":[
										
									]
								}
							]
						}
					]
				});
				addChild(node);
				console.error(node);
			}