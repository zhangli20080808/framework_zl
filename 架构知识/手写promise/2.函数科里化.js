// 函数科里化
// 判断一个元素的类型、数组、对象

/*
* 1.typeof 不能区分对象和数组
* 2.constructor 可以判断这个实例是通过谁构造出来的 无法区分到底属于谁
* 3.instanceof 可以区分实例
* 4.Object.prototype.toString.call([]) 区分具体的类型 不能区分实例
*
* */
// function isType (content, typing) {
//   return Object.prototype.toString.call(content) === `[object ${typing}]`
// }
//
// console.log(isType('123', 'String')) //true
// console.log(isType(123, 'Number')) //true

//细化函数的功能  让其变得具体一点
//内置参数 isNumber  isString

// const isType = (typing) => value => {
//   return Object.prototype.toString.call(value) === `[object ${typing}]`
//
// }
// let util = {};
// ['String', 'Number', 'Null', 'Undefined'].forEach(typing => {
//   util['is' + typing] = isType(typing)
// })
// console.log(util.isString(123)) //false
// console.log(util.isString('123')) //true

//通用的函数科里化
function sum (a, b, c, d) {
  console.log(a, b, c, d)
}

const curring = (fn, arr = []) => { //记录调用时参数的个数 和函数个体的关系
  let len = fn.length
  // console.log(len, arr, 'arr')
  return (...args) => {
    let concatArgs = [...arr, ...args]
    //获取长度和值得关系
    if (concatArgs.length < len) { //递归
      // console.log(args,'hello')
      return curring(fn, concatArgs)
    } else {
      // console.log(args)
      return fn(...concatArgs)
    }
  }
}

// let newSum = curring(sum)
// newSum(1, 2)(3)(4)

const isType = (typing, content) => {
  console.log(typing, content)
  return Object.prototype.toString.call(content) === `[object ${typing}]`

}
let util = {};
['String', 'Number', 'Null', 'Undefined', 'Boolean'].forEach(typing => {
  util['is' + typing] = curring(isType)(typing)
})
console.log(util.isString('hello'))
// console.log(util.isNumber('hello'))

//科里化  依次传入   反科里化  也有可能叫偏函数  第一个函数参数可能有n个
// function fn (a, b, c) {
//   return a + b + c
// }
//
// function fn (a) {
//   return function (b) {
//     return function (c) {
//       return a + b + c
//     }
//   }
// }