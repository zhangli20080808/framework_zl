const fs = require('fs')

function read (filePath) {
  return new Promise((resolve, reject) => {
    // fs.readFile(filePath, 'utf8', (err, data) => {
    //   if (err) return reject(err)
    //   resolve(data)
    // })

    resolve(1)  //返回成功的情况
    // reject() // then的第二个参数返回100 走下一个then的正确
  })
}

// promise的链式调用 (如果是一个promise 就不是普通纸值)
// 如果then方法中的成功或者失败 执行的时候发生错误 会走下一个then中的失败回调
// 如果then方法返回了一个失败的promise 会走外层then的失败回调 其他都走成功
// read('./name.txt').then((data) => {
//   console.log(data)
//   // return 100
//   // throw new Error('i am error')
//   return new Promise((resolve, reject) => {reject('err')})
//
// }).then((data) => {
//     console.log(data, 'data')
//   }, (err) => {
//     console.log(err, 'err')
//   })
//   .then(() => {
//     console.log('success')
//   }, (err) => {
//     console.log(err)
//   }).catch(err => {  // catch 就是 then 的别名，没有成功的then
//   console.log(err, 'catch')
// })

// promise的链式调用的实现 靠的不是this
//
// let p = new Promise((resolve,reject)=>{
//   throw new Error()
// }).catch((err)=>{  //已经走到catch 这个时候的promise是一个失败态
//   return 100
// }).then(res=>{ // 返回了一个新的promise
//
// })

let p2 = read('./name.txt').then((data) => {
  // throw new Error('err')
  return new Promise((resolve, reject) => {
    resolve(1000)
  })
}, () => {
  throw 100
})

p2.then(data => {
  console.log(data,'data')
}, (err) => {
  console.log(err, 'error')
})