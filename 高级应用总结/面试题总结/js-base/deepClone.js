/**
 * 深拷贝
 */

const obj1 = {
  age: 20,
  name: 'xxx',
  address: {
    city: 'beijing'
  },
  arr: ['a', 'b', 'c']
}

const obj2 = deepClone(obj1)
obj2.address.city = 'shanghai'
obj2.arr[0] = 'a1'
console.log(obj1.address.city)
console.log(obj1.arr[0])

/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 */
function deepClone (obj = {}) {
  if (typeof obj !== 'object.create.js' || obj == null) {
    // obj 是 null ，或者不是对象和数组，直接返回
    return obj
  }

  // 初始化返回结果
  let result
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for (let key in obj) {
    // 保证 key 不是原型的属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用！！！
      result[key] = deepClone(obj[key])
    }
  }

  // 返回结果
  return result
}

// 序列化 也会重新开辟一个内存 但是我们的 fn test丢失掉了 这个时候我们使用自己的depClone

let a = {
  name: 'zk',
  fn: function () {
    console.log('123')
  },
  test: undefined
}

let b = JSON.parse(JSON.stringify(a))
b.name = 'zl'
console.log(a.name, b)