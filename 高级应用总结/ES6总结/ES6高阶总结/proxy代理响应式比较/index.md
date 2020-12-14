# ES6高阶

## 上节课内容总结
- 基于 defineProperty 的数据劫持
- Vue 数据响应式原理解析
- Vue 双向绑定原理总结

## 课堂主题

1. 基于 Proxy 的数据代理
2. ES6 模块化

## 课程内容
### 基于 Proxy 的数据代理

let proxy = new Proxy(target, handler);

- target 是用Proxy包装的被代理对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
- handler 是一个对象，其声明了代理target 的一些操作，其属性是当执行一个操作时定义代理的行为的函数。

### handler 对象的方法

#### get(target,key[,receiver])

get 方法用来处理获取数据时的劫持行为

#### set(target,key,newValue[,receiver])

get 方法用来处理设置数据时的劫持行为

### has(target,key)

has 方法用来处理在判断是否有该属性时的劫持行为

return true 存在该属性，false 不存在该属性

### apply(target, thisArg, argumentsList)

apply 方法用来代理函数的执行，要求 target 必须是一个函数

### construct(target, argumentsList)
construct 方法用于拦截 new 操作符.

### defineProperty(target, property, descriptor)
defineProperty 方法用于拦截 defineProperty 操作

return Object.defineProperty

### deleteProperty(target, property)

deleteProperty 用于拦截对象属性的删除操作

### getOwnPropertyDescriptor(obj, key)

getOwnPropertyDescriptor 方法用于拦截 getOwnPropertyDescriptor 操作
getOwnPropertyDescriptor 必须返回一个 object 或 undefined
#### Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符

### getPrototypeOf(target) 

getPrototypeOf 用于拦截对象调用 getPrototypeOf 方法

#### Object.getPrototypeOf 查找对象的原型方法

### setPrototypeOf(target,prototype)
setPrototypeOf 方法主要用来拦截 Object.setPrototypeOf().

#### Object.setPrototypeOf 设置对象的原型方法


### isExtensible(target)
isExtensible 用于拦截对象的isExtensible方法

#### 不可扩展对象
    - Object.preventExtensions(obj) 阻止对象扩展
    - Object.freeze(obj) 冻结对象
    - Object.isExtensible() 判断对象是否可以扩展

### preventExtensions(target) 
preventExtensions 用于拦截 Object.preventExtensions

### ownKeys(target)

ownKeys 会拦截一下操作：
    Object.keys()




## es6模块化

- 浏览器默认模块化  script 里加入 "type=module"；
- 导出  关键字  export 依赖前置(前置依赖)
  - 导出 方式一  ：
    ```js
    export { a ,b , c}
    ```
  - 导出方式二 关键字  "as"
    ```js
    export { a as aa ,b , c}
    ```
  - 导出方式三
    ```js
    export let c = ()=>{console.log("I am c function...")}
    ```
  - 导出方式四
    ```js
    export default a;
    ```
    - 等同
      ```js
      export {a as default};
      ```
  - export  可以导出多个，export default  只能导出一个；
- 导入方式：关键字 import
  - export导出的,命名要保持一致
    ```js
    import {aa , b , c} from './moduleb.js';
    ```
  - export导出的，命名可以自定义；
    ```js
    import myfn from './moduleb.js';
    ```
  - 通配符 "*"方式导入
    ```js
    import * as obj from './moduleb.js';
    ```
-  按需导入（延迟导入）
​	import 方法；

```js
document.onclick =async function(){
    // import {fn1} from  './fn.js';
    let res = await import("./fn.js");
    console.log(res);
}
```
### 模块化优点

- 防止作用域污染 
- 提高代码的复用性
- 维护成本降低
 

## 下节课内容
### node.JS
•  npm包的注册与发布
•  yarn、cnpm、nvm工具介绍
•  fs加载模板 、 stream方式加载模板
•  nodejs中路由介绍
•  新闻列表案例的nodejs实现

// https://www.apachefriends.org/download.html

### 唱大海很好听的大海
余维海
web全栈工程师，由后端到前端，曾致力于将本地OA及ERP互联网化的开发与研究工作，为企业提供一体化定制服务。6年互联网工作经验，3年教学经验，教学期间参与教学及研发任务，所带学员就职于知名互联网企业。参与《web前端开发项目化教程》一书的编写工作。精通后端语言php、nodejs后端框架thinkphp、前端框架vuejs、reactjs、avalonjs、reactnative、微信小程序、微信公众号开发等等。
