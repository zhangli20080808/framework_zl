// 原生的ajax
// fetch 基于promise 太原生 pwa 开启工作线程
// axios

// 同源策略 （浏览器） 协议 域名 端口号
let xhr = new XMLHttpRequest()
xhr.open('GET', 'http://localhost:3000/user', true)
xhr.responseType = 'json' // 设置响应的类型是json格式
// 非简单请求  get post 如果增加了自定义头复杂的  put delete 复杂的
xhr.setRequestHeader('name', 'ZF122223')
xhr.withCredentials = true
xhr.onload = function () {
  console.log(xhr.response)
}
xhr.send()
