let context = {
  // 这里也是一个代理的机制，相当于你去 ctx.url ctx指代的并不是我们的context文件，指的是我们
  // 的应用中拷贝出来的那一份，拷贝的一份上面有  context.request.url
  // this 指代的是我们拷贝出来的 context
  // get url() {
  //   return this.request.url;
  // },
  // get path() {
  //   return this.request.path;
  // },
};

function defineGetter(target, key) {
  context.__defineGetter__(key, function () {
    console.log(this.__proto__.__proto__ === context);
    return this[target][key];
  }); // context.url  ->this.request.url
}

defineGetter('request', 'url');
defineGetter('request', 'path');
defineGetter('request', 'query');

module.exports = context;

// let obj = {
//   url: {
//     a: '1',
//   },
// };

// // obj.a  = obj.url.a
// obj.__defineGetter__('a',function(){
//   return obj.url.a
// })

// console.log(obj.a);
