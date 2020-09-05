// promise 是一个类 需要new这个类型  解决的问题 回调地狱 错误捕获不好处理错误 多个异步同步的问题 all
// 还是基于回调的方式

// 文档 promise A+ 规范  核心  三个状态

//1. executor 执行器 默认会立即执行
//2、默认 promise的状态是 待等待状态
//3、调用 resolve 成功 reject 失败
//4、返回实例有一个then方法，then中需要提供两个参数，分别是成功对应的函数和失败对应的函数
//5、如果 同时调用成功和失败 默认会采取第一次调用的结果 如果状态变化后就不能再修改状态
//6、异常抛出就走失败逻辑
//7、成功时可以传入成功的值、失败时可以传入失败的原因

const fs = require('fs')
let Promise = require('./promise')
let p1 = new Promise((resolve, reject) => {
  //读取文件成功调用成功  一开始 promise执行的时候 并没有调用 resolve或者reject 所以then的时候还是一个pending态
  fs.readFile('./name.txt', 'utf8', function (err, data) {
    if (err) {
      return reject(err)
    }
    resolve(data)
  })
  // throw new Error('错误')  抛出错误我们要处理
})
// 每个promise实例对应一个then方法
// promise 有多个状态 如果成功 会让成功的函数  一次执行
// 如果失败 会让失败的函数 依次执行
p1.then((value) => {
  console.log(value, 'success')
}, (reason) => {
  console.log(reason, 'err')
})

// p1.then((value) => {
//   console.log(value, 'success')
// }, (reason) => {
//   console.log(reason, 'err')
// })
// 链式调用
//
// new Promise((resolve) => {
//   resolve(1)
// }).then(x => x + 1)
//   .then(x => throw new Error('err')
//   )
//   .catch(() => 1)   // 相当于  then(null,()=>1)
//   .then(x => x + 1)
//   .then(res => {
//     console.log(res)
//   }).catch(err => {
//   console.log(err, 'catch') //不会走
// })

