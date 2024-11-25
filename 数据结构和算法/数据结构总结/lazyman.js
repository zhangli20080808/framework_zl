class LazyMan {
  constructor(name) {
    this.tasks = [];
    const task = () => {
      console.log(name);
      this.next();
    };
    this.tasks.push(task);
    setTimeout(() => {
      this.next();
    }, 0);
  }
  eat(name) {
    const task = () => {
      console.log(name);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }
  sleep(time) {
    const task = () => {
      setTimeout(() => {
        console.log(`等待${time}s`);
        this.next();
      }, time * 1000);
    };
    this.tasks.push(task);
    return this;
  }
  next() {
    const task = this.tasks.shift();
    task && task();
    return this;
  }
}
const me = new LazyMan();
me.eat('苹果').eat('香蕉').sleep(5).eat('吃葡萄');
