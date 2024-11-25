// 1. 创建唯一属性键
const sym1 = Symbol('description');
const sym2 = Symbol('description');

const obj = {
  [sym1]: 'value1',
  [sym2]: 'value2',
};

console.log(obj[sym1]); // 输出: value1
console.log(obj[sym2]); // 输出: value2

// 2. 隐藏属性 - 由于 Symbol 属性键不会被 for...in 循环枚举，也不会被 Object.keys、Object.getOwnPropertyNames 等方法列出，因此可以用来创建“私有”属性。
const privateData = Symbol('privateData');
class MyClass {
  constructor(data) {
    this[privateData] = data;
  }

  getData() {
    return this[privateData];
  }
}
const instance = new MyClass('secret');
console.log(instance.getData()); // 输出: secret
console.log(Object.keys(instance)); // []
// 3. 内置符号
// JavaScript 提供了一些内置的 Symbol，用于特定的操作和行为。这些符号可以通过 Symbol 对象访问。

// Symbol.iterator：定义对象的默认迭代器。
// Symbol.toPrimitive：定义对象的默认值转换。
// Symbol.hasInstance：定义 instanceof 操作符的行为。
// Symbol.isConcatSpreadable：定义数组的 concat 方法是否展开数组。
// Symbol.species：定义构造函数的默认构造函数。
// Symbol.unscopables：定义 with 语句中不可见的属性。
const myArray = [1, 2, 3];

myArray[Symbol.isConcatSpreadable] = false; // 不展开数组

const newArray = [].concat(myArray, [4, 5]);
console.log(newArray); // 输出: [ [ 1, 2, 3 ], 4, 5 ]
// 4. 描述元数据
const metadata = Symbol('data');
const objTest = {
  name: '123',
  [metadata]: {
    created: new Date(),
    author: 'Alice',
  },
};
console.log(objTest.name); // 123
console.log(objTest[metadata].created); // Thu Nov 14 2024 17:42:25 GMT+0800 (中国标准时间)
console.log(objTest[metadata].author); // Alice

// 5. 避免属性名冲突
const module1 = {
  [Symbol('id')]: 1,
};

const module2 = {
  [Symbol('id')]: 2,
};

const combined = { ...module1, ...module2 };
console.log(combined[Symbol('id')]); // 输出: 2
