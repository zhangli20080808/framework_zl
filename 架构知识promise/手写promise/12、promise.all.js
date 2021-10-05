/**
 * 类的静态方法
 * Promise.all 表示等待所有的promise全部成功后，才执行回调，如果有一个promise失败了，则失败
 * 1. 我们可以将 node 中的api 转换成 promise的写法 比如 fs 的promise  node的回调参数有两个 err data
 * 2. Promise.all 返回一个promise 只要有一个失败了 那就走catch 有可能返回一个promise 也有可能不是
 */
const fs = require('fs');
// promisify 把 异步的 node中的api 转换成promise的方法 只针对node
// let { promisify } = require('util');

// 高阶函数 接受一个fn 返回一个函数 函数返回一个 promise
function promisify (fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }
}
let read = promisify(fs.readFile);
read('./name.txt', 'utf-8').then(data => {
  console.log(data)
})
// 让我们的promise里面的每一个都依次执行 把结果和我们的索引做上一个映射关系
function isPromise(value) {
  if (
    (typeof value === 'object' && typeof value !== null) ||
    typeof value === 'function'
  ) {
    return typeof value.then === 'function';
  }
  return false;
}

Promise.all = function (promises) {
  //  如果是个值 存起来就好  如果是个 promise 执行
  return new Promise((resolve, reject) => {
    const arr = [];
    let i = 0;
    const processData = (index, data) => {
      arr[index] = data;
      // 需要等待所有的promise都成功之后，再去掉resolve
      // 异步并发 定时器 每次走的时候
      if (++i === promises.length) {
        //成功
        resolve(arr);
      }
    };
    for (let i = 0; i < promises.length; i++) {
      let current = promises[i];
      //  判断是不是 promise
      if (isPromise(current)) {
        current.then((data) => {
          //  如果有任何一个promise失败了，我们直接让这个priomise变成失败态
          processData(i, data);
        }, reject);
      } else {
        //  注意 Promise.all 要保证顺序 我们不能简单的push 将每一个promise的结果对应起来
        processData(i, current);
      }
    }
  });
};

Promise.all([1, 2, read('./name.txt', 'utf8'), read('./age.txt', 'utf8')]).then((data) => {
  console.log(data, 111)
}, (err) => {
  console.log(err, 'err')
})

// Promise.race  谁是第一个完成的就用它的结果、如果是失败，那么这个promise就失败，如果第一个是成功，那么就成功
