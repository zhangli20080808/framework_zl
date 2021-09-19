/**
 * 什么是 Promise？ 解决了哪些问题？(还是基于回调的方式)
 * 1. 回调地狱 (错误捕获不好处理错误)
 * 2. 多个请求的并发问题 (all)
 * 文档 promise A+ 规范  核心  三个状态
 *
 * 1. executor - 在 new Promise 的时候，是需要传递一个执行器函数,这个函数会默认立即执行，重要
 * 2. 每个 promise有三个状态  默认 promise 的状态是 等待态 pending fulfilled 成功态 rejected 失败态
 * 3. 默认创建一个 Promise 是等待态,默认提供两个函数  resolve让Promise变为成功态， reject让Promise变为失败态
 * 4. 每个Promise实例都具备一个then方法，then方法中需要传递两个参数，分别是成功对应的回调和失败对应的回调函数
 * 5. 如何让promise变成失败态  a.异常抛出就走失败逻辑/是失败态  b. reject('xxx')
 * 6. 如果多次调用成功或者失败,默认会采取第一次调用的结果 如果状态变化后就不能再修改状态
 */

const fs = require('fs')
let Promise = require('./promise')
let p1 = new Promise((resolve, reject) => {
  //读取文件成功调用成功  一开始 promise执行的时候 并没有调用 resolve或者reject 所以then的时候还是一个pending态
  fs.readFile('./name.txt', 'utf8', function (err, data) {
    // if (err) {
    //   // return reject('xxx') 如果 reject 错误信息 xxx 我们可以在then的第二个参数中拿到错误信息
    //   return reject(err)
    // }
    // 1s 后执行 调用了 resolve 我们就让前面保存的成功的 cb 执行
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
  // throw new Error('错误')  抛出错误我们要处理
})
// 每个promise实例对应一个then方法 同一个promise实例可以then多次
// promise 有多个状态 如果成功 会让成功的函数  一次执行
// 如果失败 会让失败的函数 依次执行

// 如果调用then的时候没有成功也没有失败 我们可以先保存success和fail的回调(可以then多次，多个回调) 就像加了定时器的情况 先走then在执行resolve
// 可以将then理解为订阅  将resolve理解为发布 ok的
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

