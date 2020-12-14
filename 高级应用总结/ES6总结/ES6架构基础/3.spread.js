// 解构赋值  (结构相同可以直接拿出来使用)
// 既能声明 又能赋值
let [a, ...args] = [1, 2, 3]; //  剩余运算符
console.log(a, args);
let { b: c } = { a: 1, b: 2 };
console.log(c);

// ... 如果是多层的话 那就是浅拷贝 如果是单层的话 那就是深拷贝  Object.assign类似

// 拓展运算符 展开运算符
let obj = { name: 1 };
let arr = [obj, 2, 3]; // 深拷贝 （拷贝后拷贝前无关）  浅拷贝（有关系的拷贝）
let newArr = arr.slice(0); // 浅拷贝
obj.name = 3;
console.log(newArr);
// ... slice Object.assign 浅拷贝
let obj = {
  name: 1,
  age: { a: 99 },
  a: function () {},
  a: undefined,
  d: new RegExp(),
};
// let newObj = {...obj,age:{...obj.age}}

// 如何实现一个深拷贝  这个方法有很多缺陷  比如我拷贝的对象中 存在undefined 和 函数 正则 日期 他都会给我移除掉 只能拷贝json
let r = JSON.parse(JSON.stringify(obj));
console.log(r);

// 递归拷贝 set .map  主要是考虑类型判断

function deepClone(obj, hash = new WeakMap()) {  // 弱引用 不要用map 
  // 先把特殊情况全部过滤掉 null undefined date reg
  if (obj == null) return obj; // null 和undefine的都不理 你 注意 我们是 ==  null和undefined
  if (typeof obj !== 'object') return obj;   // typeof Symbol 还是 Symbol 不需要copy
  if (obj instanceof Date) return new Date(obj); //判断 obj 是不是正则的实例
  if (obj instanceof RegExp) return new RegExp(obj);
  // [] {} 判断是数组还是对象

  // 判断类型    typeof instanceof constructor  如果已经拷贝过了 我们就把拷贝过的结果直接返回 防止循环拷贝
  if (hash.has(obj)) {
    // 有拷贝后的直接返还即可
    return hash.get(obj); // 解决循环引用的问题
  }
  // 区分对象和数组
  // 这种判断 太麻烦了
  //   let copyObj =
  //   Object.prototype.toString.call(obj) === `[object Array]` ? [] : {};

  //   可以拿当前值得构造器 谁new出来的   obj.constructor  -> Object   [].constructor -> Array

  let instance = new obj.constructor(); // new 做了什么事 new实现原理  []  {}

  hash.set(obj, instance); // 制作一个映射表
  // 把实例上的属性拷贝到这个对象身上 把原型链指向到原型对象上
  for (let key in obj) {    // in会遍历对象上的属性 和 __proto__上面指代的属性
    // 递归拷贝
    if (obj.hasOwnProperty(key)) {
      // 不拷贝原型链上的属性
      instance[key] = deepClone(obj[key], hash);
    }
  }
  return instance;
}
let obj = {};
obj.a = obj;
let a = { name: 1, age: obj };
console.log(deepClone(a)); // 如何实现深度拷贝  weakMap
