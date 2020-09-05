class Transaction {
  // 对一个方法进行多次改造 在方法之前之后增加一些逻辑
  perform (anyMethod, wrappers) {
    wrappers.forEach((wrapper) => wrapper.initialize())
    anyMethod()
    wrappers.forEach((wrapper) => wrapper.close())
  }
}

let transaction = new Transaction()

let oldFunc = () => {
  console.log('原有的方法')
}

// 当然也可以增加数组 增加好几层条件 wrapper1 wrapper2
transaction.perform(oldFunc, [
  {
    initialize () {
      console.log('初始化')
    },
    close () {
      console.log('关闭')
    },
  },
  {
    initialize () {
      console.log('初始化')
    },
    close () {
      console.log('关闭')
    },
  },
])
