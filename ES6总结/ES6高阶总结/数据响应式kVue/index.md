# 数据响应式

## 课堂主题

1. 利用 defineProperty 实现数据劫持
2. mvvm框架中编译数据到视图
3. 实现数据驱动视图更新

## 课程内容
### 数据劫持
#### setter getter
- getter 是一种获得属性值的方法，setter是一种设置属性值的方法
- getter负责查询值，它不带任何参数，setter则负责设置键值，值是以参数的形式传递

#### defineProperty 
Object.defineProperty(obj, prop, descriptor)

##### 参数
- obj 要在其上定义属性的对象。
- prop 要定义或修改的属性的名称。
- descriptor 将被定义或修改的属性描述符。
    - 数据描述符
      - configurable 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 true。
      - enumerable 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 true。。
      - value 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。
      - writable 当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 true。
    - 存取描述符 
      - get 一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）。默认为 undefined。
      - set 一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。默认为 undefined。

## 基于数据劫持的数据响应式

“响应式”，是指当数据改变后，会通知到使用该数据的代码。例如，视图渲染中使用了数据，数据改变后，视图也会自动更新。

- compileNode 编译方法
    - 正则：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
- dataProxy 添加观察
- defineData 劫持数据
    - 自定义事件
    - new Event 自定义事件
    - dispatchEvent 事件派发

数据响应式实现原理：
  1. 利用数据劫持 (defineProperty, Proxy) 监听对应数据的修改设置
  2. 利用观察者模式(或事件机制),给每一项数据添加相应的事件监听，当数据修改时触发该事件，然后驱动视图进行修改

双向绑定：
 1. 利用数据响应式，完成数据对视图修改
 2. 添加 change 或 input 等事件，监听视图的修改，当视图改变时修改数据

## 练习

- 自己实现一遍 KVue 

## 下节课内容
- 基于 Proxy 的数据劫持
- ES6 模块化


