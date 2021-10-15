//1. 原promise的状态跟新对象保持一致,当新对象保持“pending”状态时，原Promise链将会中止执行。

// Promise.resolve().then(() => {
//   console.log('1')
//   return new Promise(() => {})
// }).then(() => {
// //  后续的函数不会执行
//   console.log('不会执行')
// }).catch(err => {
//   console.log(err, 'err')
// })

//2. Promise.race竞速方法  利用这一特性，也能达到后续的Promise不再执行
// let p1 = new Promise((resolve, reject) => {
//   resolve('ok')
// })
//
// let p2 = new Promise((resolve, reject) => {
//   setTimeout(() => resolve('20'), 2000)
// })
//
// Promise.race([p1, p2]).then((result) => {
//   console.log(result)
// }).catch(err => {
//   console.log(err)
// })

//3. 当Promise链中抛出一个错误时，错误信息沿着链路向后传递，直至被捕获
Promise.resolve()
  .then(() => {
    console.log('test');
    throw new Error('i am is err');
  })
  .then(
    () => {
      console.log('1');
    },
    () => {
      console.log('then中提前捕获错误，不会走catch了，继续走then');
      return { name: 'zl' }; // 什么都不返回的话就是 undefined
    }
  )
  .then((res) => {
    console.log(res, 'then中捕获错误之后，是否还走then?');
    throw new Error('then中抛出错误，后续catch捕获异常');
  })
  .catch((err) => {
    console.log(err, '输出错误 继续走catch');
  })
  .then(() => {
    console.log('很奇怪吧，catch之后 我还能走then，你想到了吗？');
  });
