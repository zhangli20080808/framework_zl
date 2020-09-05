let url = require('url'); // 核心模块

// 前端路由 # 后端无法获取
let str = 'http://user:password@www.zhufeng.cn:80/pathname?a=1#1';

let {pathname,query} = url.parse(str,true);
console.log(pathname,query);
// console.log(url.parse(str,true));

// protocol 协议
// slashes //
// auth 权限就是你的账号和密码
// host  带端口号  ✅
// port
// hostname 主机名 不带端口号  ✅
// search ？ 后面的参数 get请求参数都在？号后面
// query  和search比较没有？ ✅
// pathname  ✅