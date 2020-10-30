// 实现对象的深度监控
function update () {
  console.log('data update')
}

let obj = {
  name: 1,
  age: { name: 100 },
  c: 1,
}
let oldArray = Array.prototype[
  ('shift', 'unshift', 'push', 'pop', 'reverse')
  ].forEach((method) => [
  (oldArray[method] = function () {
    ipdate() // AOP
    oldArray(...arguments)
  }),
])

function observer (obj) {
  if (Array.isArray(obj)) {
    obj.__proto__ = oldArray
  }
  if (typeof obj === 'object' && obj != null) {
    for (let key in obj) {
      defineReactive(obj, key, obj[key])
    }
  }
}

function defineReactive (obj, key, value) {
  observer(value)
  Object.defineProperty(obj, key, {
    get () {
      return value
    },
    set (val) {
      update()
      value = val
    },
  })
}

observer(obj)
obj.a = 100

// proxy
