function getMax () {
  const nums = Array.prototype.slice.call(arguments)
  let max = 0
  nums.forEach(n => {
    if (n > max) {
      max = n
    }
  })
  return max
}

console.log(getMax(1, 23, 556, 777776, 3333, 11, 1))
console.log(Math.max.call(1, 23, 556, 777776, 3333, 11, 1))