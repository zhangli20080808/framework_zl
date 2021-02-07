// read write

// 读取的编码没有指定的类型默认是buffer类型
// 默认写都会转换成utf8格式来进行存储 并且会将文件清空，如果文件没有会创建文件

// 实现拷贝
const fs = require('fs')
const path = require('path')
console.log(path.resolve(__dirname))
// 在代码运行期间最好使用异步 运行时使用同步可能会阻塞
// 这种拷贝不适合大文件操作 比如视频文件 我们需要读一点写一点 采用流的方式
// 如何区分文件大小呢？ 如果文件超过64k，就是用流的方式  小于64k直接 read write
fs.readFile(path.resolve(__dirname, 'zl.json'), function (err, data) {
  if (err) {console.log(err)}
  fs.writeFile(path.resolve(__dirname, 'b.json'), data, {
    // w 写  a 追加  r 读取
    flag: 'w'
  }, function (err, data) {
    console.log('写入成功')
  })
})

// 文件夹操作
// 创建目录必须先有 父级 再有子级
// fs.mkdirSync('a/b/c/d/e/f')  // 同步 不需要回调

// 比如说我创建一个方法 如果这个文件夹没有 自动帮我们创建 如果有 就不做操作
/**
 * 实现同步创建
 * @param path
 */
function mkdirSync (path) {
  let arr = path.split('/')
  for (let i = 0; i < arr.length; i++) {
    let p = arr.slice(0, i + 1).join('/')
    try {
      fs.accessSync(p) // accessSync 不存在会报错
    } catch {
      fs.mkdirSync(p)
    }
  }
}

mkdirSync('a/b/c/d/e/f')

// 异步实现的话 肯定是第一个创建完再创建第二个 next方法 递归创建 上来先调用一次

// 条件 我们的索引和数组的长度相等的时候 结束递归

function mkdir (path, cb) {
  let arr = path.split('/')
  // co库 递归的创建
  let index = 0

  function next () {
    //  递归要有终止条件
    if (index === arr.length) return cb()
    let p = arr.slice(0, index + 1).join('/')
    fs.access(p, err => {
      // 不管文件存在不存在 index++
      index++
      // 如果文件不存在会报错 创建文件
      if (err) {
        fs.mkdir(p, next)
      } else {
        // 如果文件存在 跳过创建过程 继续往下面走
        next()
      }
    })
  }

  next()
}

mkdir('f/s/d/a/s', () => {
  console.log('创建陈宫')
})

