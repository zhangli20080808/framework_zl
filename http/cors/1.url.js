let url = require('url') // 核心模块
const path = require('path')
// 前端路由 # 后端无法获取
let str = 'https://user:password@www.zhufeng.cn:80/abs?a=1#1'

let { pathname, query } = url.parse(str, true)
console.log(pathname, query) //'/pathname'
console.log(url.parse(str, true))

// 规范 如果路径 带了 / 我们不能使用 path.resolve，要使用 join
const absPath = path.join(__dirname, pathname)  // /Users/zhangli/framework_zl/http/cors/abs
const absPath2 = path.resolve(__dirname, pathname)  // /abs

// protocol 协议
// slashes //
// auth 权限就是你的账号和密码
// host  带端口号  ✅
// port
// hostname 主机名 不带端口号  ✅
// search ？ 后面的参数 get请求参数都在？号后面
// query  和search比较没有？ ✅
// pathname  ✅
