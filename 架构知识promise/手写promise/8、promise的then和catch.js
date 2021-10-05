const fs = require('fs');
function read(filePath) {
  return new Promise((resolve, reject) => {
    // fs.readFile(filePath, 'utf8', (err, data) => {
    //   if (err) return reject(err)
    //   resolve(data)
    // })

    resolve(1); //返回成功的情况
    // reject() // then的第二个参数返回100 走下一个then的正确
  });
}

/*
 * promise的链式调用 (如果是一个promise 就不是普通值) 

 * 成功的回调和失败的回调都可以返回一个结果
 * 1. 如果返回的是一个promise ，那么会让这个promise执行，并且采用他的状态，将成功或者失败的结果传递给外层下一个then中
 * 2. 如果返回的是一个普通值，会把这个值作为外层的下一次then的成功的回调中
 * 3. 如何让一个promise变成失败态？抛出一个错误或者返回一个reject态的promise
 *
 * 如果then方法中的成功或者失败 执行的时候发生错误 会走下一个then中的失败回调
 * 如果then方法返回了一个失败的promise 会走外层then的失败回调 其他都走成功
 * */

read('./name.txt')
  .then((data) => {
    // return 100
    // throw new Error('i am error')
    return new Promise((resolve, reject) => {
      reject('err');
    });
  })
  .catch((err) => { // catch就是一个语法糖，和下面的then正常写法效果一样
    return 100;
  })
  // .then(
  //   (data) => {
  //     console.log(data, 'data');
  //   },
  //   (err) => {
  //     return 100;
  //   }
  // )
  .then(
    (data) => {
      console.log(data, '我是失败的回调中返回的值');
      throw new Error('抛出异常 , 我希望这个then走到下一次then的失败');
    },
    (err) => {
      console.log(err);
    }
  )
  .then(null, (err) => {
    console.log(err, '下一次then的失败123123');
    throw new Error('我返回错误了，catch去接受');
    // return 100
  })
  .catch((err) => {
    // catch 就是 then 的别名，没有成功的then 只要上面没有捕获错误就会执行catch，
    // 如果第二个参数捕获了错误，就不会走到catch中了
    console.log(err, 'catch');
    //  catch返回了默认值 undefined的 又回到了第二种情况 走到下一个then中
  })
  .then((data) => {
    console.log(data, '最后一个then');
  });
