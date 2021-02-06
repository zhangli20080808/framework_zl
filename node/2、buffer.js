// 三种声明方式 内存 大小 是不能发生变化的
// buffer 可以通过数字 字符串来声明 可以通过数组来声明

let buffer = Buffer.alloc(10) // 长度声明
let buffer1 = Buffer.from('张力')  // utf8 格式 内容声明
// console.log(buffer1) //<Buffer e5 bc a0 e5 8a 9b>
let buffer2 = Buffer.from([0xe5, 0xbc, 0xa0])  // <Buffer e5 bc a0>

// buffer可以和字符串任意转换
console.log(buffer1.toString()) // 张力
console.log(buffer1.toString('base64')) // 5byg5Yqb 有缺陷 原先是6个字节 现在8个 大了
// 怎么转化base64 好处 可以放到任何url的地方 src上
// 不能转化大图片

// 核心 编码操作 1个汉字三个字节 24位 (3*8)  base64->(4*6)

//  直接把16进制转化为二进制
let code = Buffer.from('张')
console.log(0xe5.toString(2))
console.log(0xbc.toString(2))
console.log(0xa0.toString(2))
// 0x标识16进制 默认的 0b111 二进制 7   010->8
// 11100101 10111100 10100000 将3*8的格式变成4*6的

// 1.连接  2.每隔6位切一刀 3.前面补0
// 00111001  00011011  00110010  00100000
// 00111001 取值范围是0-63 所以叫base64 最大是64
// base64取值表
let str = ''
console.log(parseInt('00111001', 2)) //57
console.log(parseInt('00011011', 2)) //27
console.log(parseInt('00110010', 2)) //50
console.log(parseInt('00100000', 2)) //32
console.log(str[57] + str[27] + str[50] + str[32])  //5byg

// 前端的二进制
