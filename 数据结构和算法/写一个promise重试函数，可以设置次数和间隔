function retry(fn, { times = 3, interval = 1000 } = {}) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const tryFunc = () => {
      attempts++;
      fn()
        .then(resolve)
        .catch((error) => {
          if (attempts < times) {
            setTimeout(tryFunc, interval);
          } else {
            reject(error);
          }
        });
    };

    tryFunc();
  });
}

// 使用示例
const fetchWithRetry = (url, options = {}) => {
  return retry(() => fetch(url, options), { times: 5, interval: 2000 });
};

// 使用fetchWithRetry进行请求
fetchWithRetry('https://api.example.com/data')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
