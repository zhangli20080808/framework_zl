// 如果当前是手机端 就跳转到 百度
// 如果是pc端 我就挑转 腾讯
let http = require('http');
http
  .createServer((req, res) => {
    let agent = req.headers['user-agent'];
    res.statusCode = 302;
    if (agent.includes('iPhone')) {
      res.setHeader('Location', 'http://www.baidu.com');
    } else {
      res.setHeader('Location', 'http://www.qq.com');
    }
    res.end(); // 重定向的原理
  })
  .listen(8000);
