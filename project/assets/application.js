import LogoController from './scripts/controllers/LogoController';
import BaseManager from './scripts/core/managers/BaseManager';

LInit(50, "legend", 800, 480, main);
function main () {
	BaseManager.showDialog('Logo');
	/*
	let node = new LNode({
		"class":"",
		"property":{
			"x":0,
			"y":0
		},
		"childNodes":[
			{
				"class":"LogoController",
				"property":{
					"x":10,
					"y":10
				},
				"childNodes":[
					{
						"class":"BindTextView",
						"property":{
							"bind":{
								"key":"username",
								"target":"LogoController"//Controller,ListChildView
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
	console.error(node);*/
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
