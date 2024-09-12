/**
 * 不难看出 是js控制流的一种方式，这个问题的关键就是我们如何  实现任务的顺序执行

用过Express的应该都知道有个叫中间件的东西，中间件是什么，就跟我们题目中的等待以及看完了类似，当一个中间件完成之后，
调用一下next然后执行下一个中间件，有了这个想法，那么我们就可以考虑实现了。

当然，还要跟大家啰嗦一点，就是这里还涉及到的知识点，就是事件轮训机制，队列等，所以当前我们要创建对应的任务队列，
然后利用next进行任务的执行顺序，开搞


1. 为了链式调用，每个方法都需要返回this。
2. 任务顺序需要使用队列来确认执行顺序
3. 直接执行LazyMan就有输出，说明在构造时(constructor)就执行了输出，但sleepFirst可能先于这个输出，
所以需要使用settimeout，利用Js的轮询机制，在主任务执行完毕后，调用next方法开始执行任务队列。

 */
// class _LazyMan {
//   constructor(name) {
//     this.tasks = [];
//     const task = () => {
//       console.log(name);
//       this.next();
//     };
//     this.tasks.push(task);
//     setTimeout(() => {
//       this.next();
//     }, 0);
//   }
//   // 定义next函数，取到第一个函数，然后执行他的方法，没有就不执行
//   next() {
//     const task = this.tasks.shift();
//     task && task();
//   }
//   // 定义look方法
//   look(something) {
//     const task = () => {
//       console.log(something);
//       this.next();
//     };
//     this.tasks.push(task);
//     return this;
//   }
//   // 定义sleep方法
//   sleep(time) {
//     this._sleepWrapper(time, false);
//     return this;
//   }
//   sleepFirst(time) {
//     this._sleepWrapper(time, true);
//     return this;
//   }
//   // 封装一下延时函数，第一个参数是延时时间，第二个为是否要推送到队列首位
//   _sleepWrapper(time, first) {
//     const task = () => {
//       setTimeout(() => {
//         console.log(`等待${time}s`);
//         this.next();
//       }, time * 1000);
//     };
//     if (first) {
//       this.tasks.unshift(task);
//     } else {
//       this.tasks.push(task);
//     }
//     console.log(this.tasks, 'tasks');
//   }
// }

// 工厂模式返回LazyMan
const LazyMan = (name) => {
  return new _LazyMan(name);
};
// LazyMan('ch').look('泡芙').look('冰淇淋').sleep(2);
// LazyMan('前端小本子');
// 输出：前端小本子

LazyMan('前端小本子')
  .sleep(3)
  .look('看水浒')
  .sleep(2)
  .look('看三国')
  .sleep(1)
  .look('看完了');
// .sleepFirst(4);
// 输出：前端小本子
// 等待10秒
// 看完了

// LazyMan('前端小本子').look('开始看').look('看完了');
// 输出：前端小本子
// 开始看
// 看完了

// LazyMan('前端小本子').sleepFirst(5).look('看完了');
// 等待5秒
// 输出：前端小本子
// 看完了
// 顺便说一下，定时器里面去return this是不行的，定时器属于异步任务，通过事件循环调用回调函数，然而，同步任务会优先执行，也就是等到再执行异步任务的时候，变量已经成undefined了，
// 原理就跟我们之前常碰到过的异步任务进行遍历最终结果一直是最后一个类似
// 如下，实在不明白就补一下js基础知识，奉上

function testAsync() {
  for (var i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
}
// testAsync();
// 最终，每隔一秒打印出来的都是5

// 函数实现
// https://juejin.cn/post/6854573208469929998
function chain() {
  let tasks = [];
  const fn = () => {
    obj.next();
  };
  tasks.push(fn);
  setTimeout(() => {
    obj.next();
  }, 0);
  let obj = {
    next() {
      const f = tasks.shift();
      f && f();
    },
    eat() {
      const fn = () => {
        console.log('eat');
        this.next();
      }; //eat里的this是obj，因为obj.eat()。要想让fn里的this也是obj，fn就要是箭头函数
      tasks.push(fn);
      return obj;
    },
    work() {
      const fn = () => {
        console.log('work');
        this.next();
      };
      tasks.push(fn);
      return obj;
    },
    sleep(time) {
      const fn = () => {
        setTimeout(() => {
          this.next();
        }, time * 1000);
      };
      tasks.push(fn);
      return obj;
    },
  };
  return obj;
}
