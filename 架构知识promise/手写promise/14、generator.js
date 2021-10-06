// 1.概念
function* gen() {
  //generator函数  生成器函数
  yield 1; // 生成，产出
  yield 2;
  // 碰到 return 这个函数参才会结束
}

// 生成的是迭代器对象 -> next -> { value: 1, done: false }
// value 就是当前迭代出来的结果 done标识当前函数是否执行完成
let it = gen();
// 生成器函数和普通函数的区别在于 生成器函数具有暂停的效果 碰到yield就会暂停
// console.log(it.next()); // { value: 1, done: false }
// console.log(it.next()); // { value: 2, done: false }
// console.log(it.next()); //{ value: undefined, done: true }

// //2.返回值问题
// function* gen() {
//   let r1 = yield 1;
//   console.log(r1);
//   let r2 = yield 2;
//   console.log(r2);
//   return r2;
// }

// let it = gen();
// console.log(it.next(1)); // 第一次传递的值是无效的 因为执行gen前面没有发现yield
// console.log(it.next(100)); // 当调用next方法时候传递的参数，会给上次yield赋值
// console.log(it.next(200));
// // 1. 每次调用next 碰到yield就暂停
// // 2. 碰到 return 函数就执行完毕
// // 3. 当前调用next时候传递的参数永远给的是上一次yield的返回值

// 深度理解
const fs = require('fs').promises;

// const co = require('co')

function* read() {
  // 感觉写代码是同步的写 但是执行还是异步嵌套的执行
  const content = yield fs.readFile('./name.txt', 'utf8');
  const age = yield fs.readFile(`./${content}`, 'utf8');
  return age;
}
let its = read();
//  执行过程
let { value, done } = its.next();
value.then((data) => {
  let { value, done } = its.next(data);
  value.then((data2) => {
    console.log(data2, 'data2');
    let { value, done } = its.next(data2);
    console.log(value, done); // 10 true
  });
});

// co的实现
function co(it) {
  return new Promise((resolve, reject) => {
    //  如果是异步 而且是重复性的 不能使用循环 因为循环是同步的
    //  异步重复性工作 迭代 上一次输出下一次的输入 -> 回调 我们自己实现一个
    function next(data) {
      let { value, done } = it.next(data);
      // value有可能是promise也有可能是别的类型 我们 统一转成 Promise 使用 Promise.resolve
      if (!done) {
        Promise.resolve(value).then((data) => {
          next(data);
        }, reject);
      } else {
        resolve(value); // 将最终的结果返回给 当前co的promise
      }
    }

    next();
  });
}

// co(read()).then((data) => {
//   console.log(data, 'data');
// });

// 但是如果我们这样一直 往下写不是 回调地狱了嘛 co的实现
// let result = read()
// let { value, done } = result.next()
// value.then(data => {
//   let { value, done } = result.next(data) //data 传递给 content
//   value.then(res => {
//     const { value, done } = result.next(res) // 把10传递给 age 碰到return 代码执行完毕
//     console.log(value, done)
//   })
// })

// ------  async + await 语法糖 -> generator + co

// 用 async + await 模拟 Promise.all

let fn1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('1');
    }, 1000);
  });
};
let fn2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('2');
    }, 2000);
  });
};
let fn3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('3');
    }, 3000);
  });
};

async function asyncAll(promises) {
  const arr = [];
  // forEach是同步的，不具备等待效果
  for (const promise of promises) {
    // 会阻塞for循环 但是我们的promise是一起执行的 所以还是以最长时间为主
    // 第一个成功了 把第一个放进去  第二个成功了 把第二个放进去 这三个一起开的定时器 最长时间3s
    arr.push(await promise); // 走一个 等一个
  }
  return arr;
}

async function readAll() { 
  console.log('start time');
  let r = await asyncAll([fn1(), fn2(), fn3()]);
  console.log('end time');
  return r;
}

readAll().then((res) => {
  console.log(res, 'result');
});
