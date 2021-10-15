function fn1(name, age) {
  this.say = '123';
  console.log(this);
  console.log(`我养了一直${this.name},今年${name},${age}${this.test}`);
}

function fn2() {
  console.log(this);
}

Function.prototype.call = function (context) {
  context = context ? Object(context) : window;
  // 想法  构造对象的fn方法 调用
  context.fn = this;
  //  保存传递进来的参数
  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']'); // ['', '']
  }
  args.join('');
  //  利用数组的 toString 特性
  let r = eval('context.fn(' + args + ')');
  delete context.fn;
  return r;
};

// 一般会将fn1中的this指向hello 不能直接把this 给一个hello 构造对象fn
// xxx.fn1() 可以将hello作为.前面的值   {}.fn = fn1
// fn1.call('hello', '1', '2')
// fn1.call(fn2)
// fn1.call.call.call(fn2) //fn2最后执行的时候前面并没有.
// 如果多个call会让call方法执行 并且把call中的this变成fn2

Function.prototype.apply = function (context, args) {
  context = context ? Object(context) : window;
  // 想法  构造对象的fn方法 调用
  context.fn = this;
  // 直接调用
  if (!args) {
    return context.fn();
  }

  //  利用数组的 toString 特性
  let r = eval('context.fn(' + args + ')');
  delete context.fn;
  return r;
};

// fn1.apply('hello', [1, 2, 3])

let obj = {
  name: '猫',
};
Function.prototype.bind = function (context) {
  // 我们的参数可以分两侧传入 做一个合并
  let that = this;
  let bindArgs = Array.prototype.slice.call(arguments, 1);

  function fBound() {
    let args = Array.prototype.slice.call(arguments);
    const currentThis = this instanceof fBound ? this : context;
    return that.apply(currentThis, bindArgs.concat(args));
  }

  fBound.prototype = this.prototype;
  return fBound;
};

fn1.prototype.test = '张力';
let bindFn = fn1.bind(obj, ' 哎哎哎');
bindFn(9);
//如果绑定的函数被new了 当前函数的this就是当前实例
let instance = new bindFn(10);
