Function.prototype.customBind = (content, ...bindArgs) => {
  // context 是函数传入的this
  // bindArgs 是传入的各个参数
  const self = this; // 当前执行的函数本身
  return (...args) => {
    // 拼接参数
    const newArgs = args.concat(bindArgs);
    self.apply(content, newArgs);
  };
};
function sum(a, b, c) {
  console.log(this, a, b, c);
}
const fn1 = sum.bind({ x: 100 }, 1, 2, 3);
console.log(fn1()); // {x: 100} , 1, 2, 3
console.log(fn1(50)); //  {x: 100} , 1, 2, 3 , 因为参数满了

Function.prototype.customCall = (content, ...args) => {
  // 如果content 传入 null
  if (content == null) content = globalThis;
  if (typeof content !== 'object') content = new Object(content); // 值类型变为对象类型
  // 利用对象执行函数的特性
  const fnKey = Symbol(); // 不会出现属性名称的覆盖
  content[fnKey] = this; // this 就是当前函数
  const res = content[fnKey](...args); // 绑定了this
  delete content[fnKey]; // 清理掉fn，防止污染
  return res;
};
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
fn1.apply('hello', [1, 2, 3]);
