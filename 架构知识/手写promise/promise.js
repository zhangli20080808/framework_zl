const ENUM = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}
// 返还的新的 promise x是then中的返回值
function resolvePromise (promise2,x,resolve,reject) {
  // 看看 这个 promise2 是成功还是失败
  // 如果x是常量 正常走 如果是promise 我们判断状态 成功 resolve 失败 reject
  if(promise2 === x) {
    // console.log('xxx')
    // return reject('123')
    return reject(new TypeError(`类型错误啊`))
  }
}

class Promise {
  constructor (executor) {
    //executor 默认传入 一开始就执行 默认是 pending
    this.state = ENUM.PENDING
    // 如果是等待状态 可以更改状态
    this.value = undefined
    this.reason = undefined

    this.onResolvedCallbacks = [] //存储成功的的所有的回调 只有pending的时候才存储
    this.onRejectedCallbacks = [] //存储失败的的所有的回调
    const resolve = value => {
      if (this.state === ENUM.PENDING) {
        this.value = value
        this.state = ENUM.FULFILLED
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    const reject = reason => {
      if (this.state === ENUM.PENDING) {
        this.reason = reason
        this.state = ENUM.REJECTED
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      console.log('error')
      reject(e)
    }
  }

  then (onFulfilled, onRejected) { //默认看一下状态  调用对应的函数
    // console.log(onFulfilled, onRejected)
    let promise2
    promise2 = new Promise((resolve, reject) => {
      if (this.state === ENUM.FULFILLED) {
        setTimeout(() => {
          try {
            //调用当前then方法的结果，来判断当前这个promise2是成功还是失败
            let x = onFulfilled(this.value)
            // 解析x值    x 是普通 还是 promise
            //如果 是一个promise呢
            // 关键是我 promise的时候 promise2还没产生呢 我们希望new结束之后把 promise2传递给我们的处理函数 加一个 定时器
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            console.log(e)
            reject(e)
          }
        })
      }
      if (this.state === ENUM.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            console.log(e)
            reject(e)
          }
        })
      }
      if (this.state === ENUM.PENDING) {
        console.log('pending state') // 等会成功的时候 再让他执行
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              console.log(e)
              reject(e)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              console.log(e)
              reject(e)
            }
          })
        })
      }
    })
    return promise2

  }
}

module.exports = Promise