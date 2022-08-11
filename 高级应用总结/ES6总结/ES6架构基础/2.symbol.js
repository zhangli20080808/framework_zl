// Symbol 基本数据类型 string number boolean null undefined
// 独一无二 永远不相等

let s1 = Symbol("jiangwen"); // symbol中的标识 一般放number 、 string  即时参数一样 还是false
let s2 = Symbol("jiangwen");
// symbol中可以增加标识
// 类中可以放私有属性
console.log(s1 === s2);
let a = 1;
let obj = {
  // es6 语法
  [s1]: 1,
  [a]: 1,
}; // 你声明的symbol属性 是不可枚举的

for (let key in obj) {
  // 因为Symbol是不可枚举,不能遍历 所以我们拿不到s1 和 a
  console.log(obj[key], "---");
}
// 可以获取所有对象中的symbol中的key 但是这个方法不怎么常用
console.log(Object.getOwnPropertySymbols(obj));
let s5 = Symbol.for("jiangwen"); // 没有这个变量 就声明一个symbol 如果有 并不会重新声明
let s6 = Symbol.for("jiangwen"); // 如果已经存在了 可以 获取这个Symbol
console.log(s5 === s6, Symbol.keyFor(s5));

// Symbol内置对象 Symbol.iterator 实现对象的遍历
// 元编程 可以去对原生js的操作就行修改
let instance = {
  [Symbol.hasInstance](value) {
    return "a" in value;
  },
};
console.log({ a: 1 } instanceof instance);
// isConcatSpreadable 是否展开拼接的
let arr = [1, 2, 3];
arr[Symbol.isConcatSpreadable] = false;
console.log([].concat(arr, [1, 2, 3]));

// match split search
let obj2 = {
  [Symbol.match](value) {
    return value.length === 3;
  },
};
console.log("abc".match(obj));

// species  衍生对象
class MyArray extends Array {
  constructor(...args) {
    // [1,2,3]
    super(...args); // 1,2,3
  }

  // 强制修改一下
  // 静态属性
  static get [Symbol.species]() {
    // 静态属于类自己的 Object.defineProperty
    return Array;
  }
}

let v = new MyArray(1, 2, 3);
let c = v.map((item) => (item *= 2)); // c是v的衍生对象
console.log(c instanceof Array);

// Symbol.primitive

// 数据类型转化
let obj3 = {
  [Symbol.toPrimitive](type) {
    console.log(type);
    return 123;
  },
};
console.log(obj + "");
// Symbol.toStringTag
let obj4 = {
  [Symbol.toStringTag]: "xxx",
};
console.log(Object.prototype.toString.call(obj)); // [object ]

let arr = [];
console.log(arr[Symbol.unscopables]);
with (arr) {
  // forEach find findindex filter
  console.log(findIndex);
}
// 常见的11中symbol的应用
