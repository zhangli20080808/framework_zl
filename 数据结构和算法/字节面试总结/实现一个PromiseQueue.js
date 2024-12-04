/**
 * 我们将使用一个队列来管理任务，并确保并发数量不超过指定的值。

 * @param {*} filedList 
 * @param {*} limit 
 * @param {*} task 
思路
1. 实现 enqueue 函数 将任务添加到队列中。
    将任务添加到队列中。
    调用 taskExecutor 执行任务，返回一个 Promise。
    将任务结果添加到 results 数组中。
    增加 running 计数器。
    调用 runNext 方法尝试执行下一个任务。
2. runNext 函数
    如果当前运行的任务数量 小于 最大并发数 且 队列中还有任务，则从任务队列中取出一个任务 并且调用 enqueue 方法执行任务
3. 初始化任务队列 - 调用 runNext 方法启动任务队列。
4. 等待所有任务完成
   使用 promise all 来等待所有 promise 完成
   返回所有任务的结果

 */
async function PromiseQueue(tasks, concurrency, taskExecutor) {
  let running = 0; // 当前正在运行的任务数量
  let results = []; // 存储所有任务结果
  let queue = [...tasks]; // 任务队列
  const promises = []; // 存储所有任务的 Promise

  const runNext = () => {
    while (running < concurrency && queue.length) {
      const task = queue.shift();
      enqueue(task);
    }
  };
  // 任务完成或失败时减少正在运行的任务数量
  const enqueue = (task) => {
    const promise = taskExecutor(task)
      .then((result) => {
        results.push(result);
        running--; // 任务完成，减少正在运行的任务数量
        runNext(); // 尝试启动下一个任务
      })
      .catch((err) => {
        results.push(result);
        running--; // 任务失败，减少正在运行的任务数量
        runNext(); // 尝试启动下一个任务
      });
    promises.push(promise);
    running++; // 任务开始，增加正在运行的任务数量
    // 每次任务完成或失败后，我们调用 runNext() 函数，检查当前正在运行的任务数量是否小于最大并发数量 concurrency。
    // 如果是，则继续从队列中取出新的任务并启动它们。
    runNext(); // 检查是否可以启动更多任务
  };
  // 初始化任务队列
  runNext();
  // 等待所有任务完成
  await Promise.all(promises);
  return results;
}

// 示例任务数组
const filedList = [
  { id: 1, name: 'file1.txt' },
  { id: 2, name: 'file2.txt' },
  { id: 3, name: 'file3.txt' },
  { id: 4, name: 'file4.txt' },
  { id: 5, name: 'file5.txt' },
  { id: 6, name: 'file6.txt' },
  { id: 7, name: 'file7.txt' },
  { id: 8, name: 'file8.txt' },
];

const result = await PromiseQueue(filedList, 2, (filedItem) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Processing file: ${filedItem.name}`);
      resolve(filedItem);
    }, Math.random() * 1000); // 随机延迟
  });
});
console.log(result);
