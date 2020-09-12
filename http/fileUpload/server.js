let http = require('http');
let uuid = require('uuid');
let fs = require('fs');
let url = require('url');
let path = require('path');
// console.log(uuid.v4()); //122febbd-ef92-4b8a-b822-dd5be5bd2294

// 目标
Buffer.prototype.split = function (sep) {
  // 分割符的长度 有可能是汉字 所以转一下
  let len = Buffer.from(sep).length;
  let arr = [];
  // 当前查找变量
  let offset = 0;
  // 当前查找位置
  let current;
  while (-1 != (current = this.indexOf(sep, offset))) {
    arr.push(this.slice(offset, current));
    offset = current + len;
  }
  arr.push(this.slice(offset));
  return arr;
};

let arrs = Buffer.from('张力爱张力爱张力').split('爱'); // 分割成三段
// console.log(arrs,'arr');

// 二进制文件的解析
http
  .createServer((req, res) => {
    let { pathname, query } = url.parse(req.url);
    console.log(pathname, query);
    if (req.url == '/upload' && req.method === 'POST') {
      // console.log(req.headers['content-type']);
      //multipart/form-data; boundary=----WebKitFormBoundaryAyVANBmmJjBMmu1M  // boundary 边界符 根据分割符号分割出对应的内容
      // 根据分隔符 把二进制的内容分割开 把名字和内容取出来作为一个结果
      if (req.headers['content-type'].includes('multipart/form-data')) {
        let boundary = '--' + req.headers['content-type'].split('=')[1]; //------WebKitFormBoundary45Ss2e1vYmgzDdAS boundary
        // 上传文件
        let arr = [];
        req.on('data', (data) => {
          arr.push(data);
        });
        req.on('end', function () {
          // 目标 拿到用户上传的内容 写到我的服务器上
          const content = Buffer.concat(arr); // 二进制
          // 拿到content之后如何 根据 boundary 去划分 头不要 尾不要 slice(1,-1)
          // console.log(content.toString());
          let lines = content.split(boundary).slice(1, -1); // [buffer1,buffer2,buffer3] http协议规范\r\n

          let obj = {};
          lines.forEach((item) => {
            let [h, body] = item.split('\r\n\r\n');
            head = h.toString();
            let key = head.match(/name="([\s\S]+?)"/)[1];
            // console.log(head.toString());
            // 如果是文件的话(fileName属性) 我们要返回上传文件的信息 如果是表单 拿用户名和结果
            if (head.includes('filename')) {
              // 要拿到文件的内容 将文件写入到服务器上  拿到整个文件的内容 减去头的高度 就是内容的高度了 因为文件里面可能也有换行回车 再减去换行回车-4
              // 整个字段的长度
              // 当前头部的长度
              let buffer = item.slice(h.length + 4); // 内容开始的部分
              // uuid 上传文件的唯一标识 id或者文件名 会根据电脑mac地址一对信息算出一个不会重复的值
              let filename = uuid.v4();
              let filePath = path.resolve(__dirname, './upload', filename);
              fs.writeFileSync(filePath, buffer); //上传到服务器
              let statObj = fs.statSync(filePath);
              // 多文件
              let arr = obj[key] || (obj[key] = []);
              arr.push({
                filename,
                filePath,
                size: statObj.size,
              });
            } else {
              // 文本
              body = body.toString();
              // console.log(body,'body');
              obj[key] = body.slice(0, -2);
            }
          });
          // console.log(obj, 'obj');
          res.end(JSON.stringify(obj));
        });
      }
    }
  })
  .listen(3001);
