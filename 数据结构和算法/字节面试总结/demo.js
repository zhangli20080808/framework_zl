const arr = [1, 2, 3];
Array.prototype.customUnshift = function () {
  const length = arguments.length;
  for (let i = length - 1; i > 0; i--) {
    const cur = arguments[i];
    this.splice(0, 0, cur);
  }
  return this.length;
};
console.log(arr.customUnshift(4, 5), arr)
