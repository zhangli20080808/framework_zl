/* 
function Dog(name) {
	this.name = name;
}
Dog.prototype.bark = function () {
	console.log('wangwang');
}
Dog.prototype.sayName = function () {
	console.log('my name is ' + this.name);
}

function _new(Func, ...args) {
	// 1.创建实例对象
	// let obj = {};
	// obj.__proto__ = Func.prototype;
	let obj = Object.create(Func.prototype);

	// 2.把方法执行，让里面的THIS是实例对象
	let result = Func.call(obj, ...args);

	// 3.分析返回结果
	if (result !== null && /^(object|function)$/.test(typeof result)) return result;
	return obj;
}
let sanmao = _new(Dog, '三毛');
sanmao.bark(); //=>"wangwang"
sanmao.sayName(); //=>"my name is 三毛"
console.log(sanmao instanceof Dog); //=>true 
*/

/* // 手写call方法
~ function () {
	function change(context, ...args) {
		// this -> func
		context = context == undefined ? window : context;
		let type = typeof context;
		if (!/^(object|function)$/.test(type)) {
			if (/^(symbol|bigint)$/.test(type)) {
				context = Object(context);
			} else {
				context = new context.constructor(context);
			}
		}
		let key = Symbol('key'),
			result;
		context[key] = this;
		result = context[key](...args);
		delete context[key];
		return result;
	};
	Function.prototype.change = change;
}();

let obj = {
	name: 'zhufeng'
};

function func(x, y) {
	this.total = x + y;
	return this;
}
let res = func.call(0, 100, 200);
console.log(res);
//res => {name:'Alibaba',total:300} 
*/

~function () {
  function bind (context, ...args) {
    // this -> func
    let _this = this
    context = context == undefined ? window : context
    let type = typeof context
    if (!/^(object|function)$/.test(type)) {
      if (/^(symbol|bigint)$/.test(type)) {
        context = Object(context)
      } else {
        context = new context.constructor(context)
      }
    }
    return function anonymous (...innerArgs) {
      _this.call(context, ...args.concat(innerArgs))
    }
  }

  Function.prototype.bind = bind
}()
var obj = {
  name: 'zhufeng'
}

function func () {
  console.log(this, arguments)
}

document.body.onclick = func.bind(obj, 100, 200)

/* document.body.onclick = function anonymous(ev) {
	func.call(obj, 100, 200,ev);
}; */