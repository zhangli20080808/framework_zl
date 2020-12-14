/*
* 模板⽅法模式
* 定义呢？

* 实现的方法？
* 模板⽅法模式在⼀个⽅法中定义⼀个算法的⻣架，⽽将⼀些步骤的实现延迟到⼦类中。
* 模板⽅法使得⼦类可以在不改变算法结构的情况下，重新定义算法中某些步骤的具体实现
*
* 应用场景
* 这个我们⽤的很多，vue中的slot，react中的children
*
* */
// class Parent {
//     constructor() {
//     }
//     render() {
//         <div>
//             <div name="tom"></div>
//             <!-- 算法过程：children要渲染在name为joe的div中 -->
//             <div name="joe">{this.props.children}</div>
//         </div>
//     }
// }
//
// class Stage {
//     constructor() {
//     }
//
//     render() {
// // 在parent中已经设定了children的渲染位置算法
//         <Parent>
//             // children的具体实现
//             <div>child</div>
//         </Parent>
//     }
// }

<template>
    <div>
        <div name="tom"></div>
        <div name="joe">
            <!--vue中的插槽渲染children-->
            <slot/>
        </div>
    </div>
</template>


// <template>
//     <div>
//         <parent>
//         <!-- children的具体实现 -->
//            <div>child</div>
//         </parent>
//     </div>
// </template>