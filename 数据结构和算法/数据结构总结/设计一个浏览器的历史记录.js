/**
数据结构
  1. 双向链表
  每个节点代表一个页面。
  支持快速前进和后退操作。
  2. 栈
  用于记录页面的访问顺序，便于实现后退操作。
基本功能
1. 访问页面
将新页面添加到历史记录中。
清除当前页面之后的记录，支持前进操作。

2. 前进
3. 后退

*/

let BrowserHistory = function (homePage) {
  this.stack = [homePage];
  // 当前的页面，在数组中的位置
  this.cur = 0;
};

// 后退
// 比如当前的current 是第三个。要后退一个 到第二个，后退5步，到底0个
BrowserHistory.prototype.back = function (steps) {
  this.cur = Math.max(0, this.cur - steps);
  return this.stack[this.cur];
};

// 前进，选个小的，总共有5个，比如
// 比如当前的current 是第2个。要前进10步，只能到到第5个
BrowserHistory.prototype.back = function (steps) {
  this.cur = Math.min(this.stack.length - 1, this.cur + steps);
  return this.stack[this.cur];
};
// visit 访问之后，要把所有前进的记录删除掉
BrowserHistory.prototype.visit = function (url) {
  //直接修改他的长度+1=》 后面的都不要了
  this.stack.length = this.cur + 1;
  this.stack.push(url);
  this.cur++;
};
