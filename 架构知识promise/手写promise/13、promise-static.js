// Promise.resolve Promise.reject 创建成功或者失败的 promise
// 静态方法

// 1. Promise.resolve 会等待里面的promise执行成功
// 2. Promise.reject 不会等待里面的promise执行完毕
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value); // resolve里面放一个promise会等待这个promise执行完
  });
};
// Promise.reject 不会等待里面的promise执行完毕，直接将promise传递给错误的结果
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason); // reject 并不会解析 promise值
  });
};
Promise.resolve(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1000);
    }, 1000);
  })
).then(
  (data) => {
    console.log(data, 'data');
  },
  (err) => {
    console.log(err, 'err');
  }
);
// Promise.prototype.finally  无论如何都会执行 还可以跟then 有点类似于catch，其实就是等价的一个then方法
Promise.prototype.finally = function (callback) {
  return this.then(
    (value) => {
      // 我们希望是2s后执行的 等待finally执行完毕后，将上一个成功的结果向下传递
      // callback可能是promise也可能不是
      return Promise.resolve(callback()).then(() => value);
    },
    (err) => {
      return Promise.resolve(callback()).then(() => {
        throw err;
      });
    }
  );
};
Promise.resolve(100).finally(() => {
  return new Promise((resolve, reject) => { // 默认会等待当前finally方法的结束
    setTimeout(() => {
      resolve('hello') // 我这个地方 resolve 这个hello 其实没啥用
    }, 2000)
  })
}).then(data => {
  console.log(data, 'data')
}, fail => {
  console.log(fail, 'fail')
}).catch(err => {
  console.log(err, 'catch')
})

// ---------- Promise.race
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello')
  }, 1000)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('hello')
  }, 1900)
})

// Promise.race 就是默认等到最先得到的 promise的状态

function isPromise (value) {
  if ((typeof value === 'object' && typeof value !== null) || typeof value === 'function') {
    return typeof value.then === 'function'
  }
  return false
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    // 谁返回的结果最快就用谁的
    for (let i = 0; i < promises.length; i++) {
      const current = promises[i]
      if (isPromise(current)) {
        current.then(resolve, reject)
        // current.then(data => {
        //   resolve(data)
        // }, err => {
        //   reject(err)
        // })
      } else {
        resolve(current)
      }
    }
  })
}
// Promise.race 的应用场景
// Promise.race([p1, p2]).then(data => {
//   console.log(data, 'data')
// }, err => {
//   console.log(err, 'err')
// })

// 1. 比如说有很多接口  我们要使用返回最快的那个接口 我们就可以使用
// 2. 超时处理

// 这里并不是让p3变成失败态，而是做一个超时处理，超过2s后 不再采用p的成功结果了
// 中断一个 promise 那我是不是让他变成一个失败态

// 具体 2s之后然他超时了，但是3s后的promise还是会执行

let p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('3s后 我执行了');
  }, 1000);
});

function wrap(promise) {
  let abort;
  let p = new Promise((resolve, reject) => {
    abort = reject;
  });
  // race方法 来在内部构建了一个promise  将这个promise和传递进来的promise组成了一个race,如果用户调用了 p3的abort方法，相当于
  // 让p3失败了 = promise.race失败了
  let newPromise = Promise.race([p, promise]);
  newPromise.abort = abort;
  return newPromise;
}

let p3 = wrap(p4);
p3.then(
  (data) => {
    console.log('success', data);
  },
  (err) => {
    console.log('err', err);
  }
);

setTimeout(() => {
  // 我们希望调用 abort 的时候将他变为失败态
  p3.abort('2s超时啦');
}, 2000);
