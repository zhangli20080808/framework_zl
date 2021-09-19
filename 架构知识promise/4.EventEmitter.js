/**
 * 实现 on emit off once newListener 方法
 */

function EventEmitter () {
  // _events = { 'on':[],'off':[] }
  this._events = Object.create(null)
}

EventEmitter.prototype.on = function (eventName, callback) {
  if (!eventName) this._events = Object.create(null)
  if (!this._events[eventName]) {
    this._events[eventName].push(callback)
  } else {
    this._events[eventName] = [callback] //  {newListener:[fn1]}
  }
}

EventEmitter.prototype.emit = function (eventName, ...args) {
  if (this._events[eventName]) {
    this._events[eventName].forEach(fn => {
      fn.call(this, ...args)
    })
  }
}

EventEmitter.prototype.off = function (eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(fn => {
      return fn !== callback && fn.l !== callback
    })
  }

}

EventEmitter.prototype.once = function (eventName, callback) {
  // 执行一次 之后删掉这个函数 先绑定，再删除
  let one = (...args) => {
    // 删除掉这个函数
    callback.call(this, ...args)
    this.off(eventName, one)
  }
  one.l = callback
  // 先绑定一个once函数，等待emit触发完后执行one函数 ，执行原有的逻辑，执行后删除once函数
  this.on(eventName, one)  // 执行完后在删除掉
}

module.exports = EventEmitter
