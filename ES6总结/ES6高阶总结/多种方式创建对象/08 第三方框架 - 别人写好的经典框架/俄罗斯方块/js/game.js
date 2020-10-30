/**
 * Created by Danny on 2015年9月7日00:52:07
 */
(function(){
    //游戏类
    //Game类的实例，是全局变量。所以，其他类的实例能够方便的使用Game类的属性和方法
    window.Game = Class.extend({
        // 初始化，用new操作符生成这个类的实例的时候，会执行里面的语句
        init : function(fps){
            //fps
            this.fps = fps;
            //游戏状态，0为活动方块下落，1为判消行
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
                self.ctx.fillStyle = "black";
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
            //计算spf
            var spf = parseInt((1000 / fps));
            //让帧状态对象就位
            this.frameTool.start();

            //定时器
            clearInterval(this.timer);
            this.timer = setInterval(function(){
                //如果当前不是暂停状态
                if(!self.paused){
                    //执行主循环
                    self.mainloop();
                }
            },spf);

            //实例化一个地图
            this.map = new Map();

            //活动元素组合体
            this.activeBlock = null;

        },
        //游戏主循环。里面的语句，每帧执行。
        mainloop : function(){
            //清除屏幕
            this.ctx.clearRect(0,0,this.width,this.height);

            //判断当前是不是整秒数
            if(game.frameTool.currentFrame % (game.fps * 0.1)  == 0){
                if(this.activeBlock == null){
                    this.activeBlock = new UnitBlock();
                }
                //更新活动组合体
                this.activeBlock.update();
            }

            //渲染活动组合体
            this.activeBlock && this.activeBlock.render();
            //渲染所有固定方块
            this.map.renderAllBlock();


            //每个状态的事情
            if(this.state == 1){
                this.map.removeFullRow();
                //判定消除行
                this.state = 0;
            }

            //更新帧工具
            this.frameTool.update();
            //显示实时FPS和帧编号
            this.ctx.fillStyle = "black";
            this.ctx.font = "14px Consolas";
            this.ctx.fillText("FPS / " + this.frameTool.fps,240,20);
            this.ctx.fillText("FNO / " + this.frameTool.currentFrame,240,36);
            this.ctx.fillText("STATE / " + this.state,240,36 + 16);
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