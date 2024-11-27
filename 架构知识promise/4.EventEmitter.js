/**
 * 实现 on emit off once newListener 方法
 * 维护数据  {'女生失恋事件':[fn1,fn2]} 维护到 EventEmitter 当前实例上
 */

function EventEmitter () {
  this._events = Object.create(null) // {}
}

// 订阅
EventEmitter.prototype.on = function (eventName, callback) {
  // 实例没有 _events 属性，先创建
  if (!this._events) this._events = Object.create(null)
  // 如果用户绑定的不是newListener 让newListener的回调函数执行
  if(eventName !== 'newListener'){
    if(this._events['newListener']){
      this._events['newListener'].forEach(fn=>fn(eventName))
    }
  }
  // 如果不存在这个事件，就绑定一个数组
  if (this._events[eventName]) {
    this._events[eventName].push(callback)
  } else {
    // 如果存在，将事件push进去
    this._events[eventName] = [callback] //  {newListener:[fn1]}
  }
}

EventEmitter.prototype.emit = function (eventName, ...args) {
  // 一次触发对应的事件
  if (this._events[eventName]) {
    this._events[eventName].forEach(fn => {
      fn.call(this, ...args)
    })
  }
}

EventEmitter.prototype.off = function (eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(fn => {
      // 既不能函数相等 也不能 这个函数的l 和 callback 是一样的
      return fn !== callback && fn.l !== callback
    })
  }
}

// 和vue的click.once很类似
EventEmitter.prototype.once = function (eventName, callback) {
  // 执行一次 之后删掉这个函数 先绑定，再删除
  let one = (...args) => {
    // 删除掉这个函数
    callback.call(this, ...args)
    this.off(eventName, one)
  }
  // 我们之间删 绑定的是 one 函数，删除的是eat，增加属性使之产生关联
  one.l = callback
  // 切片编程 先绑定一个once函数，等待emit触发完后执行one函数 ，执行原有的逻辑，执行后删除once函数
  this.on(eventName, one)  // 执行完后在删除掉
}

module.exports = EventEmitter
