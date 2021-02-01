/**
 * node中可以使用同步的方式读取文件
 * 一调用 require 会把当前用户写的代码包装到一个函数中
 */
const path = require('path')
const fs = require('fs')
const vm = require('vm')

// console.log(result);

function Module (id) {
  this.id = id
  this.exports = {}  // 最终模块的返回结果
}

Module._extensions = {
  '.js' (module) {
    console.log('加载js模块')
    let content = fs.readFileSync(module.id, 'utf8')
    content = Module.wrapper[0] + content + Module.wrapper[1]
    // 需要让函数字符串变成真正的函数
    let fn = vm.runInThisContext(content)
    // console.log(fn.toString()) // function (exports, require, module,__filename, __dirname) {module.exports = 'zhangLi'}
    let exports = module.exports // {}
    let dirname = path.dirname(module.id) // /Users/zhangli/framework_zl/node/module
    // 把包装的函数执行 require是会让包装的函数执行 并且会改变this
    fn.call(exports, exports, req, module, module.id, dirname)
  },
  '.json' (module) {
    let content = fs.readFileSync(module.id, 'utf8')
    module.exports = JSON.parse(content)
  }
}

Module.wrapper = [
  `(function (exports, require, module,__filename, __dirname) {`
  ,
  `})`
]

Module._resolveFilename = function (filename) {
  let absPath = path.resolve(__dirname, filename)
  let exists = fs.existsSync(absPath)
  if (exists) {
    return absPath
  }
  let keys = Object.keys(Module._extensions)
  for (let i = 0; i < keys.length; i++) {
    let newPath = absPath + keys[i]
    let flag = fs.existsSync(newPath)
    if (flag) {
      return newPath
    }
  }
  throw new Error('模块不存在')
}

Module.prototype.load = function () {
  let extname = path.extname(this.id)
  Module._extensions[extname](this)  //
}

Module._cache = {}

function req (filename) { // 默认传入的文件名可能是没有.js .json后缀的,如果没有 尝试添加
  filename = Module._resolveFilename(filename) // /Users/zhangli/framework_zl/node/module/a.js
  // 创建一个模块
  // 加载前先看一眼 是否加载过了  如果加载过了 我们直接读缓存

  let cacheModule = Module._cache[filename]  // 多次引用同一个模块只运行一次
  if (cacheModule) {
    return cacheModule.exports  //返回缓存的结果
  }

  let module = new Module(filename)
  Module._cache[filename] = module
  // 加载模块
  module.load()
  return module.exports
}

const result = req('./a')
const result2 = req('./zl.json')
// exports 和 module.exports 的关系  exports = module.exports  = {}
console.log(result, result2)

/**
 * 运行步骤
 * 1. Module._load 加载模块
 * 2. Module._resolveFilename 把相对路径转化成绝对路径
 * 3. let module = new Module 创建一个模块 模块的信息 id exports
 * 4. 尝试加载这个模块
 * 5. 通过不同的后缀进行加载 json/js
 * 6. Module._extensions 文件的处理方式
 * 7. 核心就是读取文件
 * 8. 给文件外层增加一个函数 并且让函数执行 改变了this，传入了  exports, require, module,filename, dirname属性
 9. 用户会给  module.exports 赋值
 * 10.最终返回  module.exports 拿到最终结果

 简单理解-> 把文件读出来 包个函数 执行 传入对象 用户填值 填完返回
 *
 */

/**
 * 通过读取文件内容 将内容包装自执行函数中 默认返回 module.exports 作为函数的结果
 * 会转义成下方代码
 let result = function (exports, module, __filename, __dirname) {
  module.exports = 'zhangLi'
  return module.exports
}(exports, module, __filename, __dirname)
 */

/**
 *
 * @param {*}
 * 1. node --inspect-brk
 * chrome://inspect
 */

// function sun(a) {
//   return function (b) {
//     return a + b;
//   };
// }
// let fn = sun(2);
// fn(10);
