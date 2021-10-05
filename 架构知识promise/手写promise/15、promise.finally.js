// Promise.finally 不是类上的方法
/**
 * 1. finally 方法用来指定在 promise 结束时，无论结果是 fulfilled 或者是 rejected，都会执行的回调函数
 * 这样可以避免同样的语句需要在 then() 和 catch() 中都要写一次的情况
 * 2. finally 方法的回调函数不接受任何参数
 * 3. finally 方法本身无异常抛出的情况下，总是会返回原来的 Promise 对象值.若抛出异常，则返回异常的 Promise 对象。
 */

const Promise = require('./promise')
Promise.prototype.finally = function(){
  console.log('1');
  return new Promise((resolve,reject)=>{
    
  })
}
new Promise((resolve, reject) => {
  resolve(123);
  // reject('helloss');
})
  .finally(() => {
    // 无论成功或者失败都会执行的方法，如果finally中返回了一个promise，会等待这个promise执行结束之后再继续执行
    console.log('finally');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject(); // 如果返回的是一个失败的promise，会将失败的结果传递
        resolve();
      }, 1000);
    });
  })
  .then((data) => {
    // finally 如果返回一个成功的promise会将上一个promise成功的值 hello 返回给下一个then
    console.log(data, 'data');
  })
  .catch((err) => {
    console.log(err, 'catch');
  });
