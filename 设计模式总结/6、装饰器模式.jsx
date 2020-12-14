/*
* 装饰器模式
* 定义呢？
*
* 在不改变对象⾃身的基础上，在程序运⾏期间给对象动态地添加⽅法。常⻅应⽤，
  react的⾼阶组件, 或者react-redux中的@connect 或者⾃⼰定义⼀些⾼阶组件
*
*
* 装饰者模式和代理模式的结构看起来⾮常相像，这两种模式都描述了怎样为对象提供
*  ⼀定程度上的间接引⽤，它们的实现部分都保留了对另外⼀个对象的引⽤，并且向那个对象发送请求。
*
* 代理模式和装饰者模式最重要的区别在于它们的意图和设计⽬的。
*
* 代理模式的⽬的是，当直接访问本体不⽅便或者不符合需要时，为这个本体提供⼀个替代者。
* 本体定义了关键功能，⽽代理提供或拒绝对它的访问，或者在访问本体之前做⼀些额外的事情。
* 装饰者模式的作⽤就是为对象动态加⼊⾏为。
*
* 其实Vue中的v-input，v-checkbox也可以认为是装饰器模式，对原⽣的input和checkbox做⼀层装饰
* */

import React from 'react'

const withLog = Component => {
// 类组件
    class NewComponent extends React.Component {
        componentWillMount() {
            console.time(`CompoentRender`)
            console.log(`准备完毕了`)
        }

        render() {
            return <Component {...this.props}></Component>
        }
    }

    return NewComponent
}

export {withLog}

@withLog
class XX {
    render() {
        return (<div>123</div>)
    }
}

// @withLog 相当于 withLog(XX)  错误处理 权限


//connect 理解 平常使用
// @connect(
//     state => ({ info: state.teamReward.info }),
//     { dispatchTeamRewardInfo, dispatchTeamRewardDetail }
// )

export const connect = (mapStateToProps = state => state, mapDispatchToProps =
    {}) => (WrapComponent) => {
    return class ConnectComponent extends React.Component {
        static contextTypes = {
            store: PropTypes.object
        }

        constructor(props, context) {
            super(props, context)
            this.state = {
                props: {}
            }
        }

        componentDidMount() {
            const {store} = this.context
            // 当前状态 update 后, 放⼊监听器中, ⽤于下⼀次的更新(每次 dispatch 后会执⾏subscribe 中的所有函数)
            store.subscribe(() => this.update())
            this.update()
        }

        update() {
            const {store} = this.context
            const stateProps = mapStateToProps(store.getState())
            const dispatchProps = bindActionCreators(mapDispatchToProps,
                store.dispatch)
            this.setState({
                props: {
                    ...this.state.props,
                    ...stateProps,
                    ...dispatchProps
                }
            })
        }

        render() {
            return <WrapComponent {...this.state.props}></WrapComponent>
        }
    }
}

/*
* 假设我们在编写⼀个⻜机⼤战的游戏，随着经验值的增加，我们操作的⻜机对象可以升级成更厉害的⻜
机，⼀开始这些⻜机只能发射普通的⼦弹，升到第⼆级时可以发射导弹，升到第三级时可以发射原⼦
弹。
* */

Function.prototype.before = function (beforefn) {
    let __self = this; // 保存原函数的引⽤
    return function () { // 返回包含了原函数和新函数的"代理"函数
        beforefn.apply(this, arguments); // 执⾏新函数，且保证 this 不被劫持，新函数接受的参数 // 也会被原封不动地传⼊原函数，新函数在原函数之前执⾏
        return __self.apply(this, arguments); // 执⾏原函数并返回原函数的执⾏结果， // 并且保证 this 不被劫持
    }
}
Function.prototype.after = function (afterfn) {
    let __self = this;
    return function () {
        let ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};
//
// ⽐如⻚⾯中有⼀个登录 button，点击这个 button 会弹出登录浮层，与此同时要进⾏数据上报， 来统计
// 有多少⽤户点击了这个登录 button

// 普通写法
// let showLogin = function () {
//     console.log('打开登录浮层');
//     log(this.getAttribute('tag'));
// }
// let log = function (tag) {
//     console.log('上报标签为: ' + tag);
//     (new Image).src = 'http:// xxx.com/report?tag=' + tag;
// }
// document.getElementById('button').onclick = showLogin;

//使⽤装饰器


let showLogin = function () {
    console.log('打开登录浮层');
}
let log = function () {
    console.log('上报标签为: ' + this.getAttribute('tag'));
}
showLogin = showLogin.after(log); // 打开登录浮层之后上报数据
document.getElementById('button').onclick = showLogin;