let http = require('http');
let uuid = require('uuid');
let fs = require('fs');
let url = require('url');
let path = require('path');


// 目标  

Buffer.prototype.split = function(sep){
  // 分割符的长度 有可能是汉字 所以转一下
  let len = Buffer.from(sep).length;
  let arr = [];
  // 当前查找变量
  let offset = 0;
  // 当前查找位置
  let current;
  while(-1!=(current=this.indexOf(sep,offset))){
    arr.push(this.slice(offset,current));
    offset = current + len;
  }
  arr.push(this.slice(offset));
  return arr;
}

let arrs = Buffer.from('张力爱张力爱张力').split('爱') // 分割成三段 
console.log(arrs);

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

        let boundary = req.headers['content-type'].split('=')[1]
        // 上传文件
        let arr = [];
        req.on('data', (data) => {
          arr.push(data);
        });
        req.on('end', function () {
          // 目标 拿到用户上传的内容 写到我的服务器上
          const content = Buffer.concat(arr) // 二进制
          // 拿到content之后如何 根据 boundary 去划分 头不要 尾不要 slice(1,-1)

          let lines  = content.split(boundary).slice(1,-1)
          console.log(lines);

        });
      }
    }
  })
  .listen(3000);
