/* function fn(...outerArgs) {
	return function anonymous(...innerArgs) {
		return outerArgs.concat(innerArgs).reduce((a, b) => {
			return a + b;
		});
	};
} */
/* 
let fn = (...outerArgs) => (...innerArgs) => outerArgs.concat(innerArgs).reduce((a, b) => a + b);
let res = fn(1, 2, 3, 4)(5, 6, 7, 8);
console.log(res); //=>6 */

/* 
    在函数式编程当中有一个很重要的概念就是函数组合， 实际上就是把处理数据的函数像管道一样连接起来， 然后让数据穿过管道得到最终的结果。 例如：
    const add1 = (x) => x + 1;
    const mul3 = (x) => x * 3;
    const div2 = (x) => x / 2;
    div2(mul3(add1(add1(0)))); //=>3
​
    而这样的写法可读性明显太差了，我们可以构建一个compose函数，它接受任意多个函数作为参数（这些函数都只接受一个参数），然后compose返回的也是一个函数，达到以下的效果：
    const operate = compose(div2, mul3, add1, add1)
    operate(0) //=>相当于div2(mul3(add1(add1(0)))) 
    operate(2) //=>相当于div2(mul3(add1(add1(2))))
​
    简而言之：compose可以把类似于f(g(h(x)))这种写法简化成compose(f, g, h)(x)，请你完成 compose函数的编写 
*/
const add1 = (x) => x + 1
const mul3 = (x) => x * 3
const div2 = (x) => x / 2

function compose (...funcs) {
  return function anonymous (...args) {
    if (funcs.length === 0) return args
    if (funcs.length === 1) return funcs[0](...args)
    let n = 0
    return funcs.reduce((a, b) => {
      n++
      if (n === 1) return b(a(...args))
      return b(a)
    })
  }
}

let result = compose()(0, 1)
console.log(result)

result = compose(add1)(0, 1)
console.log(result)

result = compose(add1, mul3, div2, add1)(0, 1)
console.log(result)