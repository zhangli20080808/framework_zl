class EventBus {
  constructor(parameters) {
    this.events = {};
    // {key1:[{fn: fn1, isOnce: false}]}
  }
  on(type, fn, isOnce) {
    const events = this.events;
    if (!events[type]) {
      events[type] = [];
    }
    events[type].push({
      fn,
      isOnce,
    });
  }
  emit(type, ...args) {
    const fnList = this.events[type];
    if (!fnList) return;
    fnList = fnList.filters((item) => {
      const { fn, isOnce } = item;
      fn(...args);
      if (!isOnce) return true;
      return false;
    });
  }
  isOnce(type, fn) {
    this.on(type, fn, true);
  }
  off(type, fn) {
    if (!fn) {
      // 解绑所有
      this.events[type] = [];
    } else {
      const fnList = this.events[type];
      if (fnList) {
        this.events[type] = fnList?.filter((p) => p !== fn);
      }
    }
  }
}
const fn11 = (a, b) => {
  console.log('fn11', a, b);
};
const fn22 = (a, b) => {
  console.log('fn22', a, b);
};
const fn33 = (a, b) => {
  console.log('fn33', a, b);
};
const e = new EventBus();
e.on('key1', fn11);
e.on('key1', fn22);
e.once('key1', fn33);
e.on('xxxxx', fn33);
