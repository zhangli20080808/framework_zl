const ENUM = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

// 返还的新的 promise x是then中的返回值
function resolvePromise (promise2, x, resolve, reject) {
  // 看看 这个 promise2 是成功还是失败
  // 如果x是常量 正常走 如果是promise 我们判断状态 成功 resolve 失败 reject 所以说x决定了当前promise的结果

  // 判断 可能你的promise要和别人的promise进行混用
  // 可能不同的promise库之间会进行调用
  // 如果 promise2和x是同一个类型 或者引用值 就该让 promise2 变成失败态
  if (promise2 === x) { // x如果和promise2s是同一个人 x永远不能成功或者失败,所以就卡住了，直接报错
    console.log('xxx')
    // return reject('123')
    return reject(new TypeError(`Chaining cycle detected for promise #<Promise>]`))
  }
  //----  我们需要判断x的状态 判断x 是不是promise---
  // ？ 如何判断一个值是不是  promise 呢？ 先判断他是不是对象或者函数
  // 我们原生的 promise 是一个对象  别人实现的promise可能是一个函数

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    //如果是一个promise 我们取一下他的then方法 但是 有可能会抛出异常 因为使用 defineProperty 定义的，需要条件处理
    //  防止一个promise 既调成功又调失败
    // 为了考虑别人的promise不健壮 我们需要自己去调整判断 如果调用失败不能成功 调用成功不能失败 不能多次调用成功或者失败
    let called
    try {
      let then = x.then
      if (typeof then === 'function') {
        //  判断then是不是一个函数 如果then不是一个函数 说明不是 promise 可能是个对对象
        //  只能认准他是一个promise
        then.call(x, y => {
          if (called) return
          called = true
          // 如果我们的y还是一个promise的话 继续解析
          resolvePromise(promise2, y, resolve, reject)
        }, e => {
          if (called) return
          called = true
          reject(e)
        })
        //  为什么不用这种写法呢  是因为会再次取then方法   x.then(()=>{},()=>{}) 可能会报错

      } else {
        // x = {then: '12'} 普通值
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)   // 肯定不是promise 直接成功
  }
}

class Promise {
  // constructor 等价于 我们以前写的那种函数 function Promise
  constructor (executor) {
    //executor 默认传入 一开始就执行 默认是 pending
    this.state = ENUM.PENDING
    // 如果是等待状态 可以更改状态
    this.value = undefined
    this.reason = undefined

    this.onResolvedCallbacks = [] //存储成功的的所有的回调 只有pending的时候才存储
    this.onRejectedCallbacks = [] //存储失败的的所有的回调
    const resolve = value => {
      // 只有状态是 pending 才能改变状态
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
    // 我们的 try catch 只能捕获同步的异常 我们加了定时器 里面的异常就捕获不到了
    try {
      executor(resolve, reject)
    } catch (e) {
      // 标识当前有异常  那就使当前的异常作为失败的原因
      reject(e)
    }
  }

  then (onFulfilled, onRejected) { //默认看一下状态  调用对应的函数
    // console.log(onFulfilled, onRejected)
    // 我们要拿到成功的或者失败的返回结果 看看这个结果是什么类型？
    let promise2
    promise2 = new Promise((resolve, reject) => {
      if (this.state === ENUM.FULFILLED) {
        console.log(1)
        setTimeout(() => {
          try {
            //调用当前then方法的结果，来判断当前这个promise2是成功还是失败
            let x = onFulfilled(this.value)
            // 解析x值    x 是普通 还是 promise 只要x是一个普通值 就会让下一个promise变成成功态
            // 如何将data向下传递？ 我们要传递给下一个then的data 就是调用resolve方法
            //如果 是一个promise呢
            // 关键是我 promise的时候 promise2还没产生呢 我们希望new结束之后把
            // promise2传递给我们的处理函数 加一个 定时器
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
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
        console.log('pending state') // 等会成功的时候 再让他执行 分别将成功和失败的回调存起来
        this.onResolvedCallbacks.push(() => {
          console.log(11)
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
          console.log(12)
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