// 1.概念
// function * gen () {  //generator函数  生成器函数
//   yield 1
//   yield 2
// //  碰到 return 这个函数参才会结束
// }
//
// // 生成的是迭代器对象 -> next -> { value: 1, done: false }
// // value 就是当前迭代出来的结果 done标识当前函数是否执行完成
// let it = gen()
// // 生成器函数和普通函数的区别在于 生成器函数具有暂停的效果 碰到yield就会暂停
// console.log(it.next()) // { value: 1, done: false }
// console.log(it.next())  // { value: 2, done: false }
// console.log(it.next())  //{ value: undefined, done: true }

//2.返回值问题

function * gen () {
  let r1 = yield 1
  let r2 = yield 2
  return r2
}

let it = gen()
console.log(it.next(1)) // 第一次传递的值是无效的 因为执行gen前面没有发现yield
console.log(it.next(100))  // 当调用next方法时候传递的参数 会给上次yield赋值
console.log(it.next(200))
// 1. 每次调用nex 碰到yield就暂停
// 2. 碰到 return 函数就执行完毕
// 3. 当前调用next时候传递的参数永远给的是上一次yield的返回值

// 深度理解
const fs = require('fs').promises

// const co = require('co')

function * read () {
  // 感觉写代码是同步的写 但是执行还是异步嵌套的执行
  const content = yield fs.readFile('./name.txt', 'utf8')
  const age = yield fs.readFile('./age.txt', 'utf8')
  const ccc = yield 444
  return ccc
}

function co (it) {
  return new Promise(((resolve, reject) => {
    //  如果是异步 而且是重复性的 不能使用循环 因为循环是同步的
    //  异步重复性工作 迭代 上一次输出下一次的输入 -> 回调 我们自己实现一个
    function next (data) {
      let { value, done } = it.next(data)
      // value有可能是promise也有可能是别的类型 我们 统一转成 Promise 使用 Promise.resolve
      if (!done) {
        Promise.resolve(value).then(data => {
          next(data)
        }, reject)
      } else {
        resolve(value) // 将最终的结果返回给 当前co的promise
      }
    }
    next()
  }))
}

co(read()).then(data => {
  console.log(data, 'data')
})

// 但是如果我们这样一直 往下写不是 回调地狱了嘛 co的实现
// let result = read()
// let { value, done } = result.next()
// value.then(data => {
//   let { value, done } = result.next(data) //data 传递给 content
//   value.then(res => {
//     const { value, done } = result.next(res) // 把10传递给 age 碰到return 代码执行完毕
//     console.log(value, done)
//   })
// })

// ------  async + await 语法糖 -> generator + co

// 用 async + await 模拟 Promise.all

async function asyncAll(promises){
  const arr = []
  // forEach是同步的，不具备等待效果
  for (const promise of promises) {
    // 会阻塞for循环 但是我们的promise是一起执行的 所以还是以最长事件为主
    arr.push(await promise) // 走一个 等一个
  }
  return arr
}