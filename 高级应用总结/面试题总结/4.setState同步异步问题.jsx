class Example extends React.Component {
  constructor () {
    super()
    this.state = {
      val: 0
    }
  }

  componentDidMount () {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 第 1 次 log
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 第 2 次 log
    setTimeout(() => {
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val) // 第 3 次 log
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val) // 第 4 次 log
    }, 0)
  }

  render () {
    return null
  }
}
/*

在React中，如果是由React引发的事件处理（⽐如通过onClick引发的事件处理），调⽤setState不会
同步更新this.state，除此之外的setState调⽤会同步执⾏this.state。所谓“除此之外”，指的是绕过
React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产⽣的异步调
⽤。

原因：在React的setState函数实现中，会根据⼀个变量isBatchingUpdates判断是直接更新this.state还
是放到队列中回头再说，⽽isBatchingUpdates默认是false，也就表示setState会同步更新this.state，
但是，有⼀个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，⽽当React在
调⽤事件处理函数之前就会调⽤这个batchedUpdates，造成的后果，就是由React控制的事件处理过
程setState不会同步更新this.state

* */