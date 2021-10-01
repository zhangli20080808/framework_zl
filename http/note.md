### 

表单是不存在跨域的 注意 可以使用ajax来提交 异步无刷新
表单的格式

content-type:application/www-x-form-urlencoded
content-type:application/json

文件上传的
content-type: multipart/form-data  一般提交表单会跳页面 除了这种还可用ajax，最多的h5的formData 两种方式

优化手段 分片上传 断点续传 



### 报文应用 
- 304 http缓存 ✅

- Content-Encoding : gzip压缩     ✅             
- form-data: 多部分对象集合  上传文件 (form 跨域 ajax 同源) ✅
- range: 范围请求    206   根据用户的需求返回部分内容 ✅
- accept-language：协商类型  多语言 页面点击按钮 返回的内容 可以显示不同的语言 ✅
- referer:访问来源 防盗链 nginx    ✅
- host：单主机多域名    ✅                              
- proxy:代理、网关和隧道 ✅  cdn
- user-agent:用户内核     根据用户内核来显示网站                       
- 安全相关的头: X-Frame-Options、X-XSS-Protection (安全 csrf xss https 加密)

- 多语言实现原理 你好 翻译 hello  语言包
前端 后端实现 前后端配合
zh-CN;q=1,zh;q=0.9,en;q=0.8


// 80=>3000/4000 反向代理 正向代理
// a.zl.cn =>  127.0.0.1:3000
// b.zl.cn =>  127.0.0.1:4000

// webpack proxy
// koa promise async + await