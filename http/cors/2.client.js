// 中间层 - 可以解决跨域问题,自己创建一个客户端去请求服务器
let http = require('http'); /// 自己写一个客户端 中间层

// 可以像其他的服务器发送请求

// http.get 只能发送get请求  http.request发任何请求  ajax

// 发送请求必须调用end方法 post返回的是一个客户端

let client = http.request({
  host:'localhost', // 不能加端口和协议
  port:3000, // 像
  path:'/url?a=1',
  method:'POST',
  headers:{ // connection:close / keep-alive
    a:1,
    //'Content-Type':'application/x-www-form-urlencoded'
    'Content-Type':'application/json'
  }
},(res)=>{
  let arr = [];
  res.on('data',function(chunk){
    arr.push(chunk)
  });
  res.on('end',function(){
    console.log(Buffer.concat(arr).toString(),'result');
  })
});
client.end('{"a":2}'); // 相当于我要给服务端的res写入内容


// text/plain
// application/x-www-form-urlencoded 表单格式
// application/json json格式
// multipart/form-data 文件格式


// 静态服务 -> class
// ajax 跨域
// 头的应用
// cookie - session
// koa (http-server)
