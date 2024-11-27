### 自定义实现 unshift 效果

```js
function customUnshift(arr, ...elements) {
  // 将现有数组元素向后移动
  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i + elements.length] = arr[i];
  }
  // 将新元素插入到数组开头
  for (let i = 0; i < elements.length; i++) {
    arr[i] = elements[i];
  }
  // 返回新的数组长度
  return arr.length;
}
const myArray = [3, 4, 5];
const newLength = customUnshift(myArray, 1, 2);
// 方法二
const arr = [1, 2, 3];
Array.prototype.customUnshift = function () {
  const length = arguments.length;
  for (let i = length - 1; i > 0; i--) {
    const cur = arguments[i];
    this.splice(0, 0, cur);
  }
  return this.length;
};
console.log(arr.customUnshift(4, 5), arr);
```

### 数组去重

<!-- arr.filter((item, index) => arr.indexOf(item) === index);
 -->

### 如果获取指定范围内的随机数

```js
Math.floor(num); // 向下取整数
Math.ceil(num); // 向上取证
Math.round(num); // 四舍五入
// 基于最小的值之上去操作，如果 min和max相等
function getRandom(min, max) {
  // (min, max) 不包含头尾，去掉头尾 + 1
  return Math.round(Math.random() * (max - min - 2) + min + 1);
  // [min,max] 抢红包
  return Math.round(Math.random() * (max - min));
  // (min,max]
  return Math.ceil(Math.random() * (max - min) + min);
  // [min, max)
  return Math.floor(Math.random() * (max - min) + min);
}
```

### 打印 100 以内的质数

```js
// 质数：只能被1和自身整除的数
// 我们可以通过只检查到平方根来提高效率。以下是优化后的代码：
for (let i = 2; i < 100; i++) {
  let count = 0;
  for (let j = 1; j <= i; j++) {
    // 注意这里的条件应该是 j <= i
    if (i % j === 0) {
      count++;
    }
  }
  if (count === 2) {
    console.log(i);
  }
}
```

### 如何提取 url 的参数

```js
let url =
  'https://www.bilibili.com/video/BV1v78Fe4EPg?spm_id_from=333.788.videopod.episodes&vd_source=7ccacfe21911c7d4c550596a31cc3de2&p=5';
function getUrl(URL) {
  const url = URL.split('?')[1];
  const urlParams = new URLSearchParams(url);
  const params = Object.fromEntries(urlParams.entries());
  console.log(urlParams.entries());
  return params;
}
getUrl(url);
```

### 数组的随机排序 - 洗牌算法

```js
function shuffleArray(array) {
  for (let i = 0; i < array.length - 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // 交换 array[i] 和 array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
```

### 使用迭代的方式实现 flatten 函数

```js
function flatten(arr) {
  const stack = [...arr]; // 将输入数组压入栈中
  const result = []; // 用于存储最终的一维数组元素

  while (stack.length > 0) {
    const current = stack.pop(); // 弹出栈顶元素

    if (Array.isArray(current)) {
      // 如果当前元素是数组，则将其展开并将每个子元素压入栈中
      for (let i = current.length - 1; i >= 0; i--) {
        stack.push(current[i]);
      }
    } else {
      // 如果当前元素不是数组，则将其添加到结果数组中
      result.unshift(current); // 使用 unshift 确保顺序正确
    }
  }

  return result;
}
```

// 8. 两数之和
// 9. 给 a b c 三个请求，希望，c 在 ab 获取之后请求
// 10.手动实现发布订阅

### 导致页面加载白屏的原因有哪些？怎么优化？

    - css放到head里面 阻塞渲染 加载时间长会出现白屏问题
    - js加载和执行会阻塞页面解析和渲染 加载时间长会出现白屏

优化

- dns 解析

1. dns 缓存优化
2. dns 预加载策略
3. 确定可靠的 dns 服务器

- 针对浏览器页面下载 解析 渲染过程进行优化

1. 竟可能精简 html 代码和结构
2. 优化 css 文件和结构
3. 合理放置 js 代码，精灵不要使用内敛 js
4. 将渲染首屏 css 内敛到 html 中，快速下载 css
5. 图片懒加载，延迟首屏不需要的图片加载

- 文件体积
  1. 减少 css，js 的体积 ，css
  2. js defer 先加载后执行

### 微前端中的应用隔离是什么？

分为主应用和微应用 js 隔离和 css 隔离

- css 隔离
  采用手段 - css module 、或者命名空间的方式，给每个微应用添加特定前缀 打包使用 postcss 插件
  微应用之间 css 隔离，加载的时候对 link style 进行打标，卸载的时候去标
  shadow dom 都行
- js 隔离
  核心都是对 全局 window 全局事件的改变，或者 沙箱机制（核心，内部运行不会影响外面的）
- js with window.proxy 对象实现沙箱

### es6 和 commonjs 的相同不同点

相同点: 对引入对象进行复制
区别：commonjs 运行时加载，es 编译时输出接口，
同步加载模块，es6 import 异步加载模块
commonjs 对模块的浅拷贝，es6 只读不改变值，重点是，指针指向不能变，类似 const
// 14. promise 中的值穿透式是什么？

### 深浅拷贝

浅拷贝

- 只拷贝一层
- 引用类型拷贝内存地址
  Object.assign slice concat 拓展运算符
  深拷贝

### 虚拟 dom

跨平台能力
js 用对象属性描述节点，映射到真实环境
object tag - attr -children
vdom 节点和真实 dom 节点 一一对应 2. 为什么需要虚拟 dom？
页面的性能问题大部分是由于页面 dom 操作引起的
a. diff 避免无谓的计算
b. 抽象原本的渲染过程，实现跨平台的能力

### promise 的值穿透是什么？

。then 。catch 一般都会传入函数，如果传入非函数，则会发生值穿透
会保存上一个 promise 的 data 传递下去

```js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then((data) => console.log(data)); // 1
//   Promise.data会保存上一个 promise。data 原因是 无效的promise会返回 resolved
```

### 异步编程有哪些实现方式

- 回调函数 嵌套会造成回调地狱，不利于代码维护
- Promise：链式调用（多个 then 语义不是很明确）
- generator 同步顺序书写 函数控制权转移回来 制动执行机制 co
- async：是 generator 和 promise 实现的自动机制的语法糖，内部自带执行器 await 等待变成 resolved
  异步逻辑转换成同步顺序 执行

### 说说你对 es6 中 module 的理解，有哪些应用场景？

模块：代码和数据的结合体
内部特征
外部特征
为什么需要模块？代码抽象，代码封装、代码复用、依赖管理
没有模块，代码会怎么样？

- 变量和方法不容易维护，容易污染全局作用域
- 加载资源的方式通过 script 从上到下
  js 程序模块化机制
  commonjs - nodejs
  cmd - sea。js
  amd - requirejs

### 垃圾回收

### JavaScript 的解释
