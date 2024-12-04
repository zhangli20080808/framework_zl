/**
1. 概念
async - 关键字声明的函数
await - 等待一个promise 兑现，并获取 它 兑现 之后的 值

2. 需要知道 generator 函数 生成器
1. 形式 function*
2. 产生生成器，函数带*执行返回变量
3.生成器的next方法，有 next 和 done
4. 生成器的 next 方法， 可传参
5. 生成器的 throw，可抛出错误
6. yield 终止值，可多次

3. 实现步骤
1. 函数返回生成器
2. yield的时候，生成器函数执行
3. 并且 此时根据 promise 的值进行挂起
4. promise 执行后，进行递归执行 yield
5. next 方法的 done 为true， 执行终止
*/

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p');
  }, 1000);
});
// 实现 async await，我们把yield 后面的数据返回给data，这就是 await
const myAsync = (generator) => {
  const iterator = generator(); // 1. 返回生成器,例子[Generator]
  // handle函数控制 async 函数的的挂起 和 后续的执行
  const handle = (iteratorResult) => {
    if (iteratorResult.done) {
      return; // 5. 结束生成器
    }
    const iteratorValue = iteratorResult.value; // 例子 Promise {'p'}
    if (iteratorValue instanceof Promise) {
      iteratorValue
        .then((result) => {
          // 4. promise 兑现后再递归调用  iterator.next() 使生成器函数继续执行
          handle(iterator.next(result));
        })
        .catch((e) => {
          (e) => iterator.throw(e);
        });
    }
  };
  // 2. 生成器函数执行
  // 3. 例子 {value: Promise {'p'}, done: false}
  handle(iterator.next());
};
myAsync(function* generFn() {
  const data = yield p;
  console.log(data);
});
