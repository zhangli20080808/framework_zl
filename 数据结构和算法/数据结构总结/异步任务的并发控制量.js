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
 * 涉及到任务调度，都需要队列 [1,2,3] 长度是三，小于3，push，高于3，先不管，放到任务队列

 * @param {*} n 
 */
function limit(maxCount) {
  let queue = [];
  let activeCount = 0;
  // 下一个任务
  const next = () => {
    activeCount--;
    if (queue.length > 0) {
      queue.shift()();
    }
  };
  const run = async (fn, resolve, args) => {
    // 执行一个函数
    activeCount++;
    const result = (async () => fn(...args))();
    resolve(result);
    await result;
    next();
  };
  const push = async (fn, resolve, args) => {
    queue.push(run.bind(null, fn, resolve, args));
    if (activeCount < maxCount && queue.length > 0) {
      // 队列没满，并且还有任务，启动任务
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
// 需要实现的效果，5个任务同时只能有三个执行
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
  console.log(result);
  console.log('====================================');
  // 期望 前面三个任务先执行，1s之后 吃饭，开始学习算法，再过3s之后，睡觉结束，开始学习vue，并发量只能是三
  // 结束一个执行一个
}
start();
