console.log(this) // {}
module.exports.a = 'zhangLi'
console.log(this)  // {a:'zhangLi'}

/**
 * module.exports = {}
 * let exports = module.exports
 * module.exports = 'zhangLi'
 * console.log(this)  -> {}
 * exports会改变？不会
 *
 * 错误的姿势
 * exports = xxxxx
 * 正确导出姿势
 * 1. exports.xxx = '123123'  // 同一个地址引用
 * 2. module.exports = 'zhangLi'
 * 3. module.exports.xxxx = 'zhangLi'
 * 4. global.xx 声明全局方法，但是不建议
 *
 * 如果 exports.a 和 module.exports.a 都写了 取最后一个
 */

// 引用类型的特点
let obj = {}
let o1 = obj
// 刚开始 是指向同一个内存地址的 但是 obj = { name: 'zhangLi' }
// 让obj指向了一个新的地址 o1 还是指向老地址
obj = { name: 'zhangLi' }
o1.a = 123
console.log(o1)

let aa = {name:123}
aa.x = 123
let bb = aa
aa = {x:123}
console.log(bb)  // {name:123} 如果 aa.x = 123 那就是同一个结果

