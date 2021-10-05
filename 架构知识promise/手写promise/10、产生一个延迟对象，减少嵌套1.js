let Promise = require('./promise');
// Q.deferred 可以帮我们 产生一个延迟对象
function read() {
  const dfd = Promise.deferred(); // promise为了解决嵌套问题
  fs.readFile('./na1me.txt', 'utf-8', (err, data) => {
    if (err) {
      dfd.reject(err);
    }
    dfd.resolve(data);
  });
  return dfd.promise;
}

// promise 中的 catch 指代的就是 then没有成功回调的一个别名而已

// read().then(null, (err) => {
//   console.log(err, 'tet')
// })
read().catch((err) => {
  console.log(err, '捕捉错误');
});
