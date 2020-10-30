const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

http
  .createServer((req, res) => {
    const { query, pathname } = url.parse(req.url);
    // pathname 有可能是客服端发起的接口请求
    let method = req.method;
    // 允许哪个域来访问我
    // http 1.1 有的origin
    // 如果跨域 才走跨域逻辑
    if (req.headers.origin) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin); //和*是一样的
      // 允许哪些方法来访问我
      res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT');
      // 允许哪些头来访问我
      res.setHeader('Access-Control-Allow-Headers', 'token');
      // 是否允许客户端携带凭证
      res.setHeader('Access-Control-Allow-Credentials', true);
      // 设置options请求的间隔时间 秒为单位
      res.setHeader('Access-Control-Max-Age', '10');
      // 跨域cookie 凭证 如果跨域是不允许携带cookie的
      if (method === 'OPTIONS') {
        res.end();
        return;
        // 浏览器就知道 我可以继续访问你
      }
    }

    if (pathname === '/user') {
      switch (method) {
        case 'GET':
          // 获取 headers 自定义头
          console.log(req.headers['token']);
          // 这里不能直接返回对象 只支持string和buffer
          res.end(JSON.stringify({ name: 'zl' }));
          break;
        case 'POST':
          let arr = [];
          req.on('data', (chunk) => {
            arr.push(chunk);
          });
          req.on('end', () => {
            console.log(Buffer.concat(arr).toString(), 'data');
            res.end(JSON.stringify({ name: 'zl' })); //返回给当前请求
          });
        default:
          break;
      }
    }

    const filePath = path.join(__dirname, pathname);
    // console.log(filePath, 'filePath');
    // 判断路径是否存在
    fs.stat(filePath, (err, statObj) => {
      // http://localhost:3001/1.html   statObj.isFile() -> true
      if (err) {
        res.statusCode = 404;
        res.end();
        return;
      }
      if (statObj.isFile()) {
        console.log(statObj.isFile());
        fs.createReadStream(filePath).pipe(res);
        return;
      } else {
        // 如果是文件夹
        res.statusCode = 404;
        res.end();
        return;
      }
    });
  })
  .listen(3001, () => {
    console.log('服务启动在3001');
  });
