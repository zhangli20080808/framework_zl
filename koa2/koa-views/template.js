/**
 * 1. 需要用户读取html，将最终的结果用一个字符串保存起来
 * 2. 通过 new Function 的方式，将字符串变成一个函数
 * 3. with来解决取值问题
 */
function anonymous(obj) {
  let str;
  with (obj) {
    str = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        `;
    arr.forEach((item) => {
      str += `
            <li>${item}</li>
        `;
    });
    str += `
    </body>
    </html>`;
  }
  return str;
}

let r = anonymous({ arr: [1, 2, 3] });
console.log(r);

let obj = { a: 1 };
with (obj) {
  console.log(a, 'a');
}
