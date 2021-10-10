/**
 * 1. fs
 * 2. path
 * 3. vm 做一个虚拟机运行环境
 */
const fs = require('fs')
// readdirSync 同步api
const path = require('path')

const filePath = path.resolve(__dirname, '../../.gitignore')
console.log(path.dirname(filePath),'dirname') // /Users/zhangli/framework_zl
// 判断文件是否存在 不过已经被废弃掉了 返回布尔值
let isFileExist = fs.existsSync(filePath)
console.log(isFileExist) //true
// 读取文件全部采用绝对路径
// console.log(path.resolve(__dirname)) // /Users/zhangli/framework_zl/node/module
if (isFileExist) {
  let content = fs.readFileSync(filePath, 'utf8')
  // console.log(content, 'content')
}
/**
 * 都有拼接的能力，但是要注意 有没有拼接 /
 * 如果需要拼接 / 必须使用join,因为resolve会回到根目录下
 * @type {string}
 */
let s = path.join('a', 'b', 'c')  // 拼接 可以拼接/
let s2 = path.resolve(__dirname, 'a', 'b', 'c')
console.log(s, s2)  // /Users/zhangli/framework_zl/node/module/a/b/c
// 获取文件拓展名
let ext = path.extname('a.min.js') // .js
let basename = path.basename('a.min.ts', 'ts')
console.log(ext, basename)

/**
 * 如何让一个字符串执行
 * 1. eval  存在问题 模块间需要相互独立,不希望模块的变量共享
 * 2. new Function 可以字符串转换为函数 再去调用 一般前端中让一个模块可以运行采用这种方式
 * @type {module:vm}
 */
let vm = require('vm')
let a = 100
// let str = `console.log(a)` // 100

let fn = new Function('a', 'b', `console.log(a); return 100`)
console.log(fn(1, 2))
// console.log(fn.toString())
// vm.runInThisContext('console.log(a)'); // node 的模块使用的是这种方法,直接运行字符串，运行函数字符串


