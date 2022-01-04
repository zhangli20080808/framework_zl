function sumValue(argv) {
  return argv.reduce((a, b) => a + b, 0);
}

function add(...args) {
  let sum = sumValue(args);
  return function fn(...params) {
    if (params.length > 0) {
      sum += sumValue(params);
      return fn;
    } else {
      return sum;
    }
  };
}
let res = add(1, 2, 3)(1)(2)(3)(4, 5, 6)(7, 8)(10)();

console.log(res);
