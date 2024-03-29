const path = require('path')
// 前端路由 # 后端无法获取
let str = 'https://user:password@www.zhufeng.cn:80/abs?a=1#1'

let myURL = new URL(str)
let myURL2 = new URL('/abs?a=1#1', 'https://www.baidu.com')
console.log(myURL2,'myURL2')
// 获取键值对
const a = myURL.searchParams.get('a')
myURL.searchParams.append('b', '4')

console.log(myURL.href, 'append b')
// href: 'https://user:password@www.zhufeng.cn:80/abs?a=1&b=4#1',

myURL.searchParams.delete('a')
console.log(myURL.href, 'delete a')

myURL.searchParams.set('name', 'zhangLi')
console.log(myURL.href, 'set name')

// 规范 如果路径 带了 / 我们不能使用 path.resolve，要使用 join
const absPath = path.join(__dirname, myURL.pathname)  // /Users/zhangli/framework_zl/http/cors/abs
const absPath2 = path.resolve(__dirname, myURL.pathname)  // /abs
console.log(absPath)
console.log(absPath2)
// protocol 协议
// slashes //
// auth 权限就是你的账号和密码
// host  带端口号  ✅
// port
// hostname 主机名 不带端口号  ✅
// search ？ 后面的参数 get请求参数都在？号后面
// query  和search比较没有？ ✅
// pathname  ✅
// URL {
//   href: 'https://user:password@www.zhufeng.cn:80/abs?a=1#1',
//     origin: 'https://www.zhufeng.cn:80',
//     protocol: 'https:',
//     username: 'user',
//     password: 'password',
//     host: 'www.zhufeng.cn:80',
//     hostname: 'www.zhufeng.cn',
//     port: '80',
//     pathname: '/abs',
//     search: '?a=1',
//     searchParams: URLSearchParams { 'a' => '1' },
//   hash: '#1'
// }

