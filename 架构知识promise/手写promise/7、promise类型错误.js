const Promise = require('./promise');
let promise = new Promise((resolve, reject) => {
  resolve();
});
// 我们的 Promise2和x是同一个值，要去判断，这个操作不可能发生，抛出一个类型错误，死循环了
let promise2 = promise.then(() => {
  return promise2;
});

promise2.then(
  () => {},
  (err) => {
    console.log(err);
  }
);

// Object.defineProperty(x, 'then', {
//   get() {
//     // 某种条件不满足会抛出错误
//     throw new Error('xxx');
//   },
// });
