// read write

// 读取的编码没有指定的类型默认是buffer类型
// 默认写都会转换成utf8格式来进行存储 并且会将文件清空，如果文件没有会创建文件

// 实现拷贝
const { dir } = require('console');
const fs = require('fs');
const path = require('path');
// 在代码运行期间最好使用异步 运行时使用同步可能会阻塞
// 这种拷贝不适合大文件操作 比如视频文件 我们需要读一点写一点 采用流的方式
// 如何区分文件大小呢？ 如果文件超过64k，就是用流的方式  小于64k直接 read write
fs.readFile(path.resolve(__dirname, 'zl.json'), function (err, data) {
  if (err) {
    console.log(err);
  }
  fs.writeFile(
    path.resolve(__dirname, 'b.json'),
    data,
    {
      // w 写  a 追加  r 读取
      flag: 'w',
    },
    function (err, data) {
      console.log('写入成功');
    }
  );
});

// 文件夹操作
// 创建目录必须先有 父级 再有子级
// fs.mkdirSync('a/b/c/d/e/f')  // 同步 不需要回调

// 比如说我创建一个方法 如果这个文件夹没有 自动帮我们创建 如果有 就不做操作
/**
 * 实现同步创建
 * @param path
 */
function mkdirSync(path) {
  let arr = path.split('/');
  for (let i = 0; i < arr.length; i++) {
    let p = arr.slice(0, i + 1).join('/');
    try {
      fs.accessSync(p); // accessSync 不存在会报错
    } catch {
      fs.mkdirSync(p);
    }
  }
}

// mkdirSync('a/b/c/d/e/f')

// 异步实现的话 肯定是第一个创建完再创建第二个 next方法 递归创建 上来先调用一次

// 条件 我们的索引和数组的长度相等的时候 结束递归

function mkdir(path, cb) {
  let arr = path.split('/');
  // co库 递归的创建
  let index = 0;

  function next() {
    //  递归要有终止条件
    if (index === arr.length) return cb();
    let p = arr.slice(0, index + 1).join('/');
    fs.access(p, (err) => {
      // 不管文件存在不存在 index++
      index++;
      // 如果文件不存在会报错 创建文件
      if (err) {
        fs.mkdir(p, next);
      } else {
        // 如果文件存在 跳过创建过程 继续往下面走
        next();
      }
    });
  }

  next();
}

// mkdir('f/s/d/a/s', () => {
//   console.log('创建陈宫')
// })

// 删除目录 1.得保证目录非空 先遍历到最底层 从先网上删除

/**
 * 删除目录思路 先把儿子删除掉 再删父亲
 * 读取目录 readdirSync
 * 删除目录 rmdirSync
 * 删除文件 unlinkSync
 * 判断状态 statSync
 * @param p
 */
function rmdirSync(p) {
  try {
    // 判断文件路径是否存在
    fs.accessSync(p);
  } catch (e) {
    return;
  }
  let dirs = fs.readdirSync(p); // [ '1.txt', 'a' ]
  // 路径映射
  dirs = dirs.map((dir) => path.join(p, dir)); // [ 'q/1.txt', 'q/a' ]
  console.log(dirs);
  // 需要判断 这个路径 是文件  还是文件夹 在删除
  dirs.forEach((item) => {
    // 判断文件状态 statSync
    let statObj = fs.statSync(item);
    if (statObj.isDirectory()) {
      // isDirectory  isFile 不是目录就是文件
      // console.log('目录', item)
      fs.rmdirSync(item); // 删除目录
    } else {
      // console.log('文件', item)
      fs.unlinkSync(item); // 删除文件
    }
  });
  fs.rmdirSync(p);
}

// rmdirSync('q')

// 删除目录 深度遍历 同步 性能有问题
function deepRmdirSync(p) {
  let stat = fs.statSync(p);
  if (stat.isDirectory()) {
    let dirs = fs.readdirSync(p);
    dirs.forEach((dir) => {
      let current = path.join(p, dir);
      deepRmdirSync(current); // 递归删除 一般考虑两层就好了
    });
    fs.rmdirSync(p);
  } else {
    fs.unlinkSync(p); // 如果是文件直接删除掉
  }
}

//
/**
 * 删除逻辑如何使用异步实现？
 * 1. 异步串行执行  1. 整个节点串行在一起 性能不好 删除动作应该是独立的
 * 2. 异步并行执行 两个节点同时开始遍历 Promise.all
 * 3. 异步广度删除如何实现
 *
 * 广度遍历 刚才深度 我们是首先找了儿子 广度呢 一行一行找 环形
 *
 * 思路？ 树
 * 1. 设置一个数组 读取第一层A 再给A配一个指针 A中可能有B也可能有C 读取当前A下面的内容 B C 放到数组中 [A,B,C]
 * 2. 再让指针后移一位 指向了B B中可能有E F 各种 再把B中的儿子放入数组中 [A,B,C,E,F]
 * 3. 再把指针往后移 移到C 等等  结束完之后我们获取到了一个列表 优点 可以倒着删除
 */

function wideSync(p) {
  let arr = [p];
  let index = 0;
  let current; // 获取当前指针指向谁
  while (current === arr[index++]) {
    let statObj = fs.statSync(current);
    if (statObj.isDirectory()) {
      let dirs = fs.readdirSync(current);
      dirs = dirs.map((d) => path.join(current, d));
      arr = [...arr, ...dirs];
    }
  }
  // 倒着删
  for (let i = 0; i < arr.length - 1; i--) {
    let current = arr[i];
    let statObj = fs.statSync(current);
    if (statObj.isDirectory()) {
      fs.rmdirSync(current);
    } else {
      fs.unlinkSync(current);
    }
  }
}
wideSync('a');

//  异步深度删除
function deepRmdir(p, cb) {
  // co库 cb
  fs.stat(p, function (err, statObj) {
    if (statObj.isDirectory()) {
      fs.readdir(p, function (err, dirs) {
        dirs = dirs.map((dir) => path.join(p, dir)); // a/b
        let index = 0;
        function next() {
          // 等到儿子都删除完毕 触发自己的删除
          if (index === dirs.length) return fs.rmdir(p, cb);
          let current = dirs[index++];
          // 将第二个路劲的删除放入回调中，等待第一个删除完毕后，再进行删除
          fs.rmdir(current, next);
        }
        next();
      });
    } else {
      fs.unlink(p, cb);
    }
  });
}
deepRmdir('a', function (err, data) {console.log('删除成功');});
