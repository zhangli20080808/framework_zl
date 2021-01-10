/*
* 手写  深度比较  模拟 lodash objectIsIsEqual
*
* 地址不一样  但是属性什么的都一样 我们返回true
*
* 实现效果

const obj1 = { a: '10', b: { x: 100, y: 200 } }
const obj2 = { a: '10', b: { x: 100, y: 200 } }

objectIsIsEqual(obj1,obj2) === true
obj1 === obj2 false
* */

// 判断是否是对象或数组
function isObject (obj) {
  return typeof obj === 'object.create.js' && obj !== null
}

// 全相等（深度）
function objectIsIsEqual (obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) {
    // 值类型（注意，参与 equal 的一般不会是函数）
    return obj1 === obj2
  }
  if (Object.toString.call(obj1) !== Object.toString.call(obj2)) {
    return false
  }
  if (obj1 === obj2) {
    return true
  }
  // 两个都是对象或数组，而且不相等
  // 1. 先取出 obj1 和 obj2 的 keys ，比较个数
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if (obj1Keys.length !== obj2Keys.length) {
    return false
  }
  // 2. 以 obj1 为基准，和 obj2 一次递归比较
  for (let key in obj1) {
    // 比较当前 key 的 val —— 递归！！！
    const res = objectIsIsEqual(obj1[key], obj2[key])
    if (!res) {
      return false
    }
  }
  // 3. 全相等
  return true
}

// 测试
const obj1 = {
  a: 100,
  b: {
    x: 100,
    y: 200
  }
}
const obj2 = {
  a: 100,
  b: {
    x: 100,
    y: 200
  }
}
// console.log( obj1 === obj2 )
console.log(objectIsIsEqual(obj1, obj2))

const arr1 = [1, 2, 3]
const arr2 = [1, 2, 3, 4]

console.log(Object.is(obj1, obj2), 'object') //false
//  Object.is 类似于 ===   严格相等
/*
* ==：等同，比较运算符，两边值类型不同的时候，先进行类型转换，再比较；
* ===：恒等，严格比较运算符，不做类型转换，类型不同就是不等；
*
* 如果两个值都是null，或者都是undefined，那么相等。 null === null true
* undefined === undefined true
如果两个都是字符串，每个位置的字符都一样，那么相等；否则不相等。
*  值得注意的是，如果两个值中至少一个是NaN，那么不相等（判断一个值是否是NaN，可以用isNaN()或Object.is()来判断）
*
* O
* */
console.log(Object.is(NaN, 123), 'NaN') //false
console.log(NaN === NaN)  //false
console.log(+0 === -0)  //true

console.log(Object.is(+0, -0)) //false
console.log(Object.is(NaN, NaN)) //true