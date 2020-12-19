// 观察者模式 (基于发布订阅模式，而且观察者模式和发布订阅模式之间是有关联的) 两者没有直接关联

//观察者  被观察者 (被观察者需要收集所有的观察者)  把观察者放到被观察者中 小宝宝不开心->通知爸爸妈妈

class Subject {  //被观察者 小宝宝
  constructor (name) {
    this.name = name
    this.observers = []
    this.state = '开心'
  }

  attach (o) {
    this.observers.push(o)
  }

  setState (newState) {
    this.state = newState
    this.observers.forEach(o => o.update(this))
  }
}

class Observer { //观察者 我
  constructor (name) {
    this.name = name
  }

  update (baby) {
    // console.log(baby)
    console.log(this.name + '知道了' + baby.name + '状态' + baby.state)
  }
}

let baby = new Subject('宝宝')
let o1 = new Observer('爸爸')
let o2 = new Observer('妈妈')

//把观察者 attach 注册进去
baby.attach(o1)
baby.attach(o2)
baby.setState('不开心')  // on emit
baby.setState('开心')

