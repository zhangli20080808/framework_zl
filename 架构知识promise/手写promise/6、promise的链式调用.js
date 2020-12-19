let Promise = require('./promise')
let promise = new Promise((resolve, reject) => {
  resolve('hello')
})

// promise的链式调用的实现 靠的不是this 靠的是返回一个promise
// promise必须返回一个全新的promise 这样可以解决promise的状态问题，否则可能出现promise刚开始成功，又变成了失败态

let promise2 = promise.then((data) => {
  // 如何将data向下传递？ 我们要传递给下一个then的data 就是调用p2的resolve方法
  //返回一个普通值
  // return data
//  返回一个promise

  // return promise2  // 报错就好了 对应 promise2 =x的判断
  return new Promise((resolve, reject) => {
    //返回去的y又是一个promise 继续解析
    resolve(new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('hello 12312')
      }, 1000)
    }))
  })
})
promise2.then((data) => {
  console.log(data, 'zl')
}, (err) => {
  console.log(err, 'err')
})
// 穿透 不写我们默认把值传递下去 return data
promise2.then(null).then().then().then(data => {
  console.log(data)
})
//
// Object.defineProperty(x, 'then', {
//   get () {
//     // 有抛出异常的逻辑
//     throw new Error()
//   }
// })
