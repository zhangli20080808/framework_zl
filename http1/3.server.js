// node 为了提供http服务 引用http摸块 内部封装了tcp模块 socket

// server.on('request',function(req,res){ // 内部是基于发布订阅的
//     console.log(123);
// })
let http = require('http');
let url = require('url');
let querystring = require('querystring'); // 核心模块
// console.log(querystring.parse('a=1; b=2','; ','=')); // {a:1,b:2} 实现一下这个功能
// console.log(querystring.stringify({a:1,b:2},'&&','==')); // 实现这个模块

// 服务端就是有特定的端口号 和特定ip
let server = http.createServer((req,res)=>{
  // 请求行
  console.log(req.method); // 请求方法 是大写的
  let {pathname,query} = url.parse(req.url,true);
  console.log(pathname,query);
  console.log(req.httpVersion,req.httpVersionMajor,req.httpVersionMinor);
  // 请求头 请求实体 通用头 自己的
  console.log(req.headers); // 所有的key都是小写的
  // 有一个空行
  // 请求体 req是一个可读流 （源码 incoming message）  作业
  // 读取可读流内容 on('data') on('end')  ajax发送
  let arr = [];
  req.on('data',function(chunk){ // this.push(xxx) this.push(null)
    arr.push(chunk)
  })
  req.on('end',function(){ // 如果没有请求体会直接执行end事件
    if(req.headers['content-type'] === 'application/x-www-form-urlencoded'){
      let str = Buffer.concat(arr).toString(); // a=1&b=2  => {a:1,b:2}
      let obj = querystring.parse(str);
      res.setHeader('Content-Type','application/json;charset=utf-8');
      res.end(JSON.stringify(obj)); // 前后端通信 都是json
    }else if(req.headers['content-type'] == 'application/json'){
      let str = Buffer.concat(arr).toString();
      let obj = JSON.parse(str);
      res.setHeader('Content-Type','application/json;charset=utf-8');
      res.end(JSON.stringify(obj)); // 前后端通信 都是json
    }else if(req.headers['content-type'].includes('text/plain')){
      res.setHeader('Content-Type','text/plain;charset=utf-8');
      res.end(Buffer.concat(arr));
    }
  });
  // -----------------请求--------------------
  // 响应行 状态码 表示已经存在 1xx - 5xx  res是一个可写流 write end
  //res.statusCode = 404;
  //res.statusCode = 200;
  // 响应头 writeHead(200,{content-type:'text/html'})
  //res.setHeader('Content-Type','text/html;charset=utf-8');
  // 响应体
  //res.write('100'); // write 方法中 string or buffer
  //res.end('我很帅'); // 每次调用end 方法传递参数都会调用write方法
  // write after end
  // 请求-》响应完成 事务
}); // 默认会基于tcp 中socket => req ,res

let port = 3000;
server.listen(port,()=>{ //  服务启动后会执行此函数
  console.log(`server start ${port}`);
}); // 多个请求访问我如果超过了最大限制 就不在接收了

// 如果多次启动同一个端口号 address in use  自动+1
server.on('error',function(err){
  if(err.code === 'EADDRINUSE'){
    server.listen(++port);
  }
});
// 如果服务端代码更改了 必须重新启动
// lsof -i:3000

// nodemon 可以启动一个node服务监视器 可以监控你的代码变化 可以配置nodemon的配置文件
// npm install nodemon -g

