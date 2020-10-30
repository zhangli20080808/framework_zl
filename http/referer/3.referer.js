let http = require('http');
let uuid = require('uuid');
let fs = require('fs').promises;
let { createReadStream } = require('fs');
let path = require('path');
let url = require('url');
let whitList = ['localhost']; //权限 这些白名单可以访问
/**
 * 直接打开图片访问一个连接是 没有referer 因为没有引用
 * referer特点
 * 1.可以判断当前资源是不是被某个人来引用
 * 2.安全性 接口  需要referer  比如来源不对 我们把它屏蔽掉 返回错误的图片 csrf 爬虫 增加一些手段 host referer useagent
 * 3.这个东西是可以伪造的
 * 在 host中配置连个域名 a.zhufeng.cn b.zhufeng.cn
 */
http
  .createServer(async (req, res) => {
    // referer referrer
    try {
      let { pathname } = url.parse(req.url);
      let absPath = path.join(__dirname, pathname);
      if (pathname === '/favicon.ico') return res.end();
      let statObj = await fs.stat(absPath);
      if (statObj.isFile()) {
        // 如果是图片的话 做防盗链
        if (/.jpg|.png/.test(pathname)) {
          // 如果直接打开图片没有referer 其他情况都有referer  注意referer的两种写法
          let referer = req.headers['referer'] || req.headers['referrer'];
          if (referer) {
            //   console.log(req.headers.host);  a.zhunfeng.cn
            // 指的是当前请求的网站 当前逐主机  req.headers.host  a.zhunfeng.cn
            let host = req.headers.host.split(':')[0]; // 当前图片的url a.zhufeng.cn:3000
            let refererUrl = url.parse(referer).hostname; // 引用图片的主机名  http://b.zhufeng.cn:3000/index.html
            if (host !== refererUrl) {
              // 如果来源不相等那就直接出错 返回错误图片
              console.log(host, whitList);
              if (whitList.includes(refererUrl)) {
                return createReadStream(absPath).pipe(res);
              }
              createReadStream(path.join(__dirname, 'error.jpg')).pipe(res);
            } else {
              createReadStream(absPath).pipe(res);
            }
          } else {
            createReadStream(absPath).pipe(res);
          }
        } else {
          createReadStream(absPath).pipe(res);
        }
      } else {
        res.end(`is Directory`);
      }
    } catch (e) {
      console.log(e);
      res.end(`Not Found`);
    }
  })
  .listen(3000);
