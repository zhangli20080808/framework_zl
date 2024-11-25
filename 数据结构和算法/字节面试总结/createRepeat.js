function createRepeat(fn, repeat, interval) {
  return function (...args) {
    let count = 0;

    const timer = setInterval(() => {
      fn(...args);
      count++;

      if (count === repeat) {
        clearInterval(timer);
      }
    }, interval);
  };
}

// 测试用例
const fn = createRepeat(console.log, 3, 4000);
fn('hello world'); // 每4秒输出一次'hello world'，输出3次
