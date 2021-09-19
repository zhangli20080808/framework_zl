/**
 * 默认事件
 * 绑定一次，触发一次，能触发几次
 */
const EventEmitter = require('events')

let e = new EventEmitter()

e.on('newListener', type => {
  // // 绑定一次调一次
  // e.emit(type)
  process.nextTick(() => {
    // 都绑定完了，再去调
    e.emit(type)
  })

})

e.once('睡觉', () => {
  console.log('睡觉')
})
e.once('睡觉', () => {
  console.log('睡觉')
})

e.once('睡觉', () => {
  console.log('睡觉')
})
e.once('睡觉', () => {
  console.log('睡觉')
})
//  0+ 1 + 2 + 3



