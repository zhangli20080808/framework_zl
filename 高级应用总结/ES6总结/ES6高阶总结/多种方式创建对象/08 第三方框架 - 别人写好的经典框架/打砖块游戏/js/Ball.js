/**
 * Created by Danny on 2015/9/6 2:31.
 */
(function(){
    window.Ball = Class.extend({
        //初始化
        init : function(){
            //小球的位置
            this.x = 0;
            this.y = 0;
            //半径
            this.r = 14;
            //角度
            this.angle = -45;
            //速度
            this.speed = 11;
            //绑定监听
            this.bindMouseListener();
        },
        //更新，这个函数每帧执行。
        update : function(){
            //如果当前游戏状态是0
            if(game.state == 0){
                //小球黏在板子上
                this.x = game.racket.x + game.racket.w / 2 - this.r
                this.y = game.racket.y - this.r * 2;
            }
            else if(game.state == 1){
                //如果当前游戏状态是1
                //根据三角函数，算出dX、dY
                this.x += this.speed * Math.cos(degreeToRad(this.angle));
                this.y += this.speed * Math.sin(degreeToRad(this.angle));
            }

            //检测是否撞到挡板
            if(this.x > game.racket.x  && this.x < game.racket.x + game.racket.w && this.y > game.racket.y - this.r){
                this.y = game.racket.y - this.r;
                this.crashTop();
            }
            //检测是否没有接住
            if(this.y > game.racket.y + game.racket.h){
                alert("没接住！");
                game.stop();
            }

            //检测是否撞到界面边缘
            if(this.x > game.width - this.r){
                this.crashLeft();
            }else if(this.x < this.r){
                this.crashRight();
            }else if(this.y < this.r){
                this.crashTop();
            }
        },
        //渲染，这个函数每帧执行
        render : function(ctx,image){
            //小球的渲染，每帧执行
            ctx.drawImage(image,this.x,this.y);
        },
        //绑定鼠标事件
        bindMouseListener : function(){
            game.canvas.addEventListener("mousedown",function(event){
                game.state = 1;
            });
        },
        //碰撞到底边
        crashBottom : function(){
            this.angle = 360 - this.angle;
        },
        //碰撞到底边
        crashLeft : function(){
            this.angle = 180 - this.angle;
        },
        //碰撞到顶边
        crashTop: function(){
            this.angle = 360 - this.angle;
        },
        //碰撞到右边
        crashRight : function(){
            this.angle = 180 - this.angle;
        }
    });

    //角度转弧度
    function degreeToRad(degree){
        var rad = degree * Math.PI / 180;
        return rad;
    }
})();