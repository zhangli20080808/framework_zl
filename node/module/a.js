console.log(1)
module.exports = 'zhangLi'

/**
 * module.exports = {}
 * let exports = module.exports
 * module.exports = 'zhangLi'
 * console.log(this)  -> {}
 *
 * 错误的姿势
 * exports = xxxxx
 * 正确导出姿势
 * exports.xxx = '123123'  // 同一个地址引用
 * module.exports = 'zhangLi'
 * module.exports.xxxx = 'zhangLi'
 *
 * 如果 exports.a 和 module.exports.a 都写了 取最后一个
 * @type {{}}
 */

let obj = {}

let o1 = obj
// 刚开始 是指向同一个内存地址的 但是 obj = { name: 'zhangLi' }
// 让obj指向了一个新的地址 o1 还是指向老地址
obj = { name: 'zhangLi' }
o1.a = 123
console.log(o1)

let aa = {name:123}
let bb = aa
aa = {x:123}
console.log(bb)  // {name:123} 如果 aa.x = 123 那就是同一个结果


