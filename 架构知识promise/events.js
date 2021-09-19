/**
 * 事件模块 events 发布订阅 订阅(多个) 发布（触发n次）
 * 核心模块  首先看是不是核心模块
 * 第三方模块查找策略 - 默认查找 node_modules 文件，找同名的文件夹，默认找的是index.js
 * 如果当前目录下，没有 node_modules 回向上级查找，一直找到根目录，找不到报错
 */

const EventEmitter = require('./4.EventEmitter')
const util = require('util')
// let events = new EventEmitter()
// class Girl extends EventEmitter {}
function Girl () {

}

// 三种继承方式
// Girl.prototype.__proto__ = EventEmitter.prototype
// Girl.prototype = Object.create(EventEmitter.prototype)
// Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype)

util.inherits(Girl, EventEmitter)
let girl = new Girl()

let fn = (who) => {
  console.log('cry' + who)
}

girl.on('data', fn)
girl.on('data', (who) => {
  console.log('eat' + who)
})
girl.emit('data', fn)

girl.emit('data', '我')
