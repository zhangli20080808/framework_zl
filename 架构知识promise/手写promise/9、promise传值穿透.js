let Promise = require('./promise')
let promise = new Promise((resolve, reject) => {
  // resolve('hello')
  reject('hello')
})

// 穿透 不写我们默认把值传递下去 return data
// promise.then(null).then().then().then(data => {
//   console.log(data)
// })

promise.then(null, (err) => {
  throw err
}).then().then().then(null, (err) => {
  console.log(err, '接受err')
})

// 需要测试的话  全局安装 promises-aplus-tests 静态方法
