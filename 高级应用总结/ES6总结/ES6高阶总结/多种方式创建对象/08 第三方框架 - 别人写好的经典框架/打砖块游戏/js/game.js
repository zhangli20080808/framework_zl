/**
 * Created by Danny on 2015/9/5 18:57.
 */
(function(){
    //游戏类
    //Game类的实例，是全局变量。所以，其他类的实例能够方便的使用Game类的属性和方法
    window.Game = Class.extend({
        // 初始化，用new操作符生成这个类的实例的时候，会执行里面的语句
        init : function(fps){
            //游戏状态，0粘在板子上，1为弹走。
            this.state = 0;
            //是否暂停
            this.paused = false;
            //canvas元素
            this.canvas = document.getElementById("canvas");
            //上下文
            this.ctx = this.canvas.getContext("2d");
            //帧工具
            this.frameTool = new FrameTool();
            //画布宽高
            this.width = parseInt(document.getElementById("canvas").width);
            this.height = parseInt(document.getElementById("canvas").height);
            //资源管理器
            this.resourceManager = new ResourceManager();
            //存放图片资源的对象。之所以用对象来存储，而不是用数组来存储，是为了通过名字引用来使用图片
            this.imagesResouces = {};
            //命令资源管理器加载图片资源，放入imagesResouces对象中
            var self = this;
            this.resourceManager.loadImage("data/res.json",function(alreadyLoadNumber,allNumber,imagesResoucesObj){
                // 清屏
                self.ctx.clearRect(0,0,self.width,self.height);
                // 显示加载资源的数量
                self.ctx.font = "20px 微软雅黑";
                self.ctx.fillStyle = "white";
                self.ctx.fillText("正在加载图片" + alreadyLoadNumber + "/" + allNumber , self.width / 2 - 100 , 30);
                //如果已经加载好的图片数量，等于所有图片的数量
                if(alreadyLoadNumber == allNumber){
                    //将返回来的资源对象，保存为自己的属性
                    self.imagesResouces = imagesResoucesObj;
                    //命令游戏开始
                    self.run(fps);
                }
            });
        },
        run : function(fps){
            fps = fps || 60;    //默认为60
            var self = this;    //让定时器认识this

            var spf = parseInt((1000 / fps));
            //让帧状态对象就位
            this.frameTool.start();

            //下面的一些语句是游戏开始的时候，实例化一些东西。为什么不在init中实例化这些东西，必须在run中生成呢？
            //这是因为init中的语句必须都执行完毕了，才能真的实例化一个game对象。
            //而ball、racket、blockManager类都在使用game对象（它是一个全局对象）。
            //所以，如果在init中实例化这些对象，那么ball、racket、blockManager将无法使用game对象。
            //实例化一个小球
            this.ball = new Ball();
            //实例化一个挡板
            this.racket = new Racket();
            //实例化一个砖块管理器
            this.blockManager = new BlockManager(this);

            //定时器
            clearInterval(this.timer);
            this.timer = setInterval(function(){
                //如果当前不是暂停状态
                if(!self.paused){
                    //执行主循环
                    self.mainloop();
                }
            },spf);
        },
        //游戏主循环。里面的语句，每帧执行。
        mainloop : function(){
            //清除屏幕
            this.ctx.clearRect(0,0,this.width,this.height);
            //更新帧工具
            this.frameTool.update();
            //显示实时FPS和帧编号
            this.ctx.fillStyle = "white";
            this.ctx.font = "20px Consolas";
            this.ctx.fillText("FPS / " + this.frameTool.fps,20,20);
            this.ctx.fillText("FNO / " + this.frameTool.currentFrame,20,40);

            //更新、渲染所有的转块。这里使用的是转块管理器提供的方法
            this.blockManager.updateAllBlocks();
            this.blockManager.renderAllBlocks(this.ctx,this.imagesResouces.block);
            //渲染球拍
            this.racket.render(this.ctx,this.imagesResouces.racket);
            //更新、渲染小球
            this.ball.update();
            this.ball.render(this.ctx,this.imagesResouces.ball);
        },
        //暂停
        pause : function(){
            this.paused = true;
        },
        //停止
        stop : function(){
            clearInterval(this.timer);
        }
    });
})();