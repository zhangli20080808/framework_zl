<script>
    /*
  * 迭代器模式
  * 定义呢？
  * 享元(flyweight)模式是⼀种⽤于性能优化的模式，“fly”在这⾥是苍蝇的意思，意为蝇量级。享元模
  式的核⼼是运⽤共享技术来有效⽀持⼤量细粒度的对象。 如果系统中因为创建了⼤量类似的对象
  ⽽导致内存占⽤过⾼，享元模式就⾮常有⽤了。在 JavaScript 中，浏览器特别是移动端的浏览器
  分配的内存并不算多，如何节省内存就成了⼀件⾮常有意义的事情。


  * 常用
  * 假设有个内⾐⼯⼚，⽬前的产品有 50 种男式内⾐和 50 种⼥⼠内⾐，为了推销产品，⼯⼚决定⽣产⼀些
  塑料模特来穿上他们的内⾐拍成⼴告照⽚。 正常情况下需要 50个男模特和50个⼥模特，然后让他们每
  ⼈分别穿上⼀件内⾐来拍照。
  * */

    // var Model = function( sex, underwear){
    //     this.sex = sex;
    //     this.underwear = underwear;
    // };
    // Model.prototype.takePhoto = function(){
    //     console.log( 'sex= ' + this.sex + ' underwear=' + this.underwear);
    // };
    // for ( var i = 1; i <= 50; i++ ){
    //     var maleModel = new Model( 'male', 'underwear' + i );
    //     maleModel.takePhoto();
    // };
    // for ( var j = 1; j <= 50; j++ ){
    //     var femaleModel= new Model( 'female', 'underwear' + j );
    //     femaleModel.takePhoto();
    // };

    /*
    * 如上所述，现在⼀共有 50 种男内 ⾐和 50 种⼥内⾐，所以⼀共会产⽣ 100 个对象。如果将来⽣产了
    10000 种内⾐，那这个程序可能会因为存在如此多的对象已经提前崩溃。 下⾯我们来考虑⼀下如何优化
    这个场景。虽然有 100 种内⾐，但很显然并不需要 50 个男 模特和 50 个⼥模特。其实男模特和⼥模特
    各⾃有⼀个就⾜够了，他们可以分别穿上不同的内⾐来拍照。
    *
    * */
    /*只需要区别男⼥模特
    那我们先把 underwear 参数从构造函数中 移除，构造函数只接收 sex 参数*/
    // var Model = function (sex) {
    //     this.sex = sex;
    // };
    // Model.prototype.takePhoto = function () {
    //     console.log('sex= ' + this.sex + ' underwear=' + this.underwear);
    // };
    // /*分别创建⼀个男模特对象和⼀个⼥模特对象*/
    // var maleModel = new Model('male'),
    //     femaleModel = new Model('female');
    // /*给男模特依次穿上所有的男装，并进⾏拍照*/
    // for (var i = 1; i <= 50; i++) {
    //     maleModel.underwear = 'underwear' + i;
    //     maleModel.takePhoto();
    // }
    // /*给⼥模特依次穿上所有的⼥装，并进⾏拍照*/
    // for (var j = 1; j <= 50; j++) {
    //     femaleModel.underwear = 'underwear' + j;
    //     femaleModel.takePhoto();
    // }
    //只需要两个对象便完成了同样的功能

    /*
    内部状态存储于对象内部
    内部状态可以被⼀些对象共享
    内部状态独⽴于具体的场景，通常不会改变
    外部状态取决于具体的场景，并根据场景⽽变化，外部状态不能被共享

    性别是内部状态，内⾐是外部状态，通过区分这两种状态，⼤⼤减少了系 统中的对象数量。通常来讲，
    内部状态有多少种组合，系统中便最多存在多少个对象，因为性别 通常只有男⼥两种，所以该内⾐⼚商
    最多只需要 2 个对象。

    * */

    /*
    应⽤案例  消息组件
    * 1. 弹窗逻辑⼀样
    2. 四中弹窗，颜⾊，icon不同
    3. 接收⽂案
    交互⽅式——弹出、隐藏，由共享对象所拥有
    提示icon、背景样式、字体样式提供接⼝可配置
    * */
    export default {
        install(Vue) {
            // 在使⽤插件Vue.use(Message)时实例化⼀个Dialog组件对象
            const Dialog = new Vue({
                data() {
                    return {
                        icon: '',
                        fontStyle: '',
                        backgroundStyle: '',
                        text: ''
                    }
                },
                ...
            })
            // 扩展Vue的`prototype`
            Vue.prototype.$Message = {
                success(text) {
                    // 改变Dialog的data.xx的值触发Dialog的更新
                    Dialog.icon = successIcon
                    Dialog.fontStyle = successFontStyle
                    Dialog.backgroundStyle = successBackgroundStyle
                    Dialog.text = text
                    // 获取Dialog的最新DOM添加到body标签中
                    document.body.appendChild(Dialog.$el)
                },
                warning(text) {
                    // 同上
                    Dialog.icon = warningIcon
                ...
                    document.body.appendChild(Dialog.$el)
                },
                error(text) {
                    // 同上
                    Dialog.icon = errorIcon
                ...
                    document.body.appendChild(Dialog.$el)
                }
            }
        }
    }

    /*
    * Dialog只会在项⽬初始化时被 new ⼀次，每次使⽤Message组件通过改变Dialog的状态获取组件
      DOM，其实很容易知道new⼀个组件的成本要⽐⼀个组件的更新成本⾼很多
    * */

</script>

