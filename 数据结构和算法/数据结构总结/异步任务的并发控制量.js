// 传递1.5s 那就 1.5s 之后 执行

function sleep(n, name = 'demo') {
  return new Promise((resolve) => {
    console.log(n, name, 'start');
    setTimeout(() => {
      console.log(n, name, 'end ----------');
      resolve({ n, name });
    }, n * 1000);
  });
}

/**
 * 涉及到任务调度，都需要队列 [1,2,3] 长度是三
 * @param {*} n 
 小于3，push, 高于3，先不管，放到任务队列
[4,5,6]
[1,2,3]
===
[5,6]
[2,3,4]
队列需要几个功能
1. 下一个任务 next
2. 执行一个函数 run，所有的参数都带上
3. 入队列，因为每个函数fn进来，不能直接执行 push 不执行，推到 队列里面 run 需要 bind 一下

 */
function limit(maxCount) {
  let queue = [];
  let activeCount = 0; // 判断当前有几个活动，异步任务的队列数
  // 下一个任务
  const next = () => {
    activeCount--;
    if (queue.length > 0) {
      queue.shift()(); // 下一个执行的时候，又会执行run函数
    }
  };
  const run = async (fn, resolve, args) => {
    // 执行一个函数
    activeCount++;
    const result = (async () => fn(...args))(); // pending 态的promise
    resolve(result); // resolve 的意思是因为 我们要很好的支持 promise。all
    await result;
    next();
  };
  const push = async (fn, resolve, args) => {
    queue.push(run.bind(null, fn, resolve, args));
    if (activeCount < maxCount && queue.length > 0) {
      // 队列没满，并且还有任务，执行一下，启动任务
      // 一开始3个任务，进来，我们直接推进去之后，如果 activeCount 小，直接执行3个
      // 第四个进来，就执行不了了，因为每次 run 的时候 activeCount 会++
      queue.shift()();
    }
  };
  let runner = (fn, ...args) => {
    return new Promise((resolve) => {
      push(fn, resolve, args);
    });
  };
  return runner;
}
// 需要实现的效果，5个任务同时只能有三个执行，每个任务都让 runner 去执行，会有并发量的控制
// 1. 实现limit 函数
// 2. 使用一个计数器 activeCount 跟踪当前活动任务数
async function start() {
  let runner = limit(3); // 并发量是3
  let tasks = [
    () => sleep(1, '吃饭'),
    () => sleep(3, '睡觉'),
    () => sleep(5, '打豆豆'),
    () => sleep(3.5, '学习算法'),
    () => sleep(4, '学习vue'),
  ].map(runner);
  const result = await Promise.all(tasks);
  console.log('====================================');
  console.log(result, 'end');
  console.log('====================================');
  // 期望 前面三个任务先执行，1s之后，吃饭结束，开始学习算法，再过3s之后，睡觉结束，开始学习vue，并发量只能是三
  // 结束一个执行一个
}
start();

// function debounce(fn, delay) {
//   let timer = 0;
//   return function () {
//     if (timer) clearTimeout(timer); 防抖
//     if (timer) return 节流
//     timer = setTimeout(() => {
//       fn.apply(this, arguments);
//     }, delay);
//   };
// }
function fn() {
  console.log('arguments', arguments);
}
fn(100, 200);

// 使用 async 和 await 来处理
// 1. async function runNext:
// 负责运行下一个任务。
// 使用 await 等待任务完成。

// 2. 并发控制:
// 初始启动 limit 个任务。
// 每个任务完成后，启动下一个任务（如果有）。

// 3. 收集结果 - 任务结果按顺序存储在 results 数组中。

// Array.from({ length: limit }, () => runNext()) 创建一个长度为 limit 的数组，并用 runNext() 填充每个元素。具体来说：

// { length: limit }: 创建一个具有指定长度的类数组对象。
// Array.from(): 将类数组对象转换为真正的数组。
// () => runNext(): 为数组中的每个元素调用 runNext()，并将返回的 Promise 填入数组。
// 这个方法用于启动指定数量的并发任务。
async function limitConcurrency(tasks, limit) {
  let results = [];
  let currentIndex = 0;
  let activeCount = 0;
  async function runNext() {
    if (currentIndex >= this.tasks.length) return;
    const index = currentIndex++;
    activeCount++;
    try {
      results[index] = this.tasks[index]();
    } catch (error) {
      throw error;
    } finally {
      activeCount--;
      if (currentIndex < this.tasks.length) {
        await runNext();
      }
    }
  }
  const initialTasks = Array.from({ length: limit }, () => runNext());
  await Promise.all(initialTasks);

  return results;
}
// / 示例任务
// const tasks = [
//   () => new Promise((res) => setTimeout(() => res('Task 1 Complete'), 1000)),
//   () => new Promise((res) => setTimeout(() => res('Task 2 Complete'), 500)),
//   () => new Promise((res) => setTimeout(() => res('Task 3 Complete'), 1200)),
//   () => new Promise((res) => setTimeout(() => res('Task 4 Complete'), 300)),
//   () => new Promise((res) => setTimeout(() => res('Task 5 Complete'), 800)),
// ];

// limitConcurrency(tasks, 3).then((results) => {
//   console.log(results);
// });
// 如果任务有优先级呢？如何实现呢？
// 1. 实现一个优先级的队列
class PriorityQueue {
  constructor() {
    this.queue = [];
  }
  enqueue(task, priority) {
    this.queue.push({ task, priority }); // 有了任务和优先级之后，需要对其做一个排序
    this.queue.sort((a, b) => b.priority - a.priority);
  }
  dequeue() {
    return this.queue.shift().task;
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}
/**
 * 1. 对任务队列进行 初始化 根据优先级
 * @param {*} task
 * @param {*} limit
 */
async function priorityLimitConcurrency(tasks = [], limit) {
  let activeCount = 0;
  let results = [];

  const queue = new PriorityQueue();
  tasks.forEach(({ task, priority }, index) => {
    queue.dequeue(async () => {
      try {
        results[index] = await task();
      } catch (error) {
        throw error;
      } finally {
        activeCount--;
        if (!queue.isEmpty) {
          await runNext();
        }
      }
    }, priority);
  });

  async function runNext() {
    // 如果任务数大于limit或者 队列长队为空 return
    if (activeCount >= limit || queue.isEmpty) return;
    activeCount++;
    // 从队列拿出
    const nextTask = queue.enqueue();
    await nextTask();
  }
  const initialTask = Array.from({ length: limit }, () => runNext());
  await Promise.all(initialTask);
  return results;
}

// 示例任务
const tasks = [
  {
    task: () =>
      new Promise((res) => setTimeout(() => res('Task 1 Complete'), 1000)),
    priority: 2,
  },
  {
    task: () =>
      new Promise((res) => setTimeout(() => res('Task 2 Complete'), 500)),
    priority: 1,
  },
  {
    task: () =>
      new Promise((res) => setTimeout(() => res('Task 3 Complete'), 1200)),
    priority: 3,
  },
  {
    task: () =>
      new Promise((res) => setTimeout(() => res('Task 4 Complete'), 300)),
    priority: 2,
  },
  {
    task: () =>
      new Promise((res) => setTimeout(() => res('Task 5 Complete'), 800)),
    priority: 1,
  },
];

priorityLimitConcurrency(tasks, 3).then((results) => {
  console.log(results);
});

const result = await PromiseQueue(filedList, 5, (filedItem) => {
  return new Promise((resolve, reject) => {
    resolve(filedItem);
  });
});
