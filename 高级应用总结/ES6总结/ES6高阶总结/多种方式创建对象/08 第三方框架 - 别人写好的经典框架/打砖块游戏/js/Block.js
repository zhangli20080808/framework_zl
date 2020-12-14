/**
 * Created by Danny on 2015/9/6 1:30.
 */
(function () {
    //转块类
    window.Block = Class.extend({
        //初始化
        init: function (color, x, y, w, h,row,col) {
            //颜色，合法值1、2、3、4、5
            this.color = color;
            //位置
            this.x = x;
            this.y = y;
            //自己的行列
            this.row = row;
            this.col = col;
            //宽度、高度
            this.w = w;
            this.h = h;
            //已经爆炸
            this.boomed = false;
            //自己的碰撞检测线
            this.X1 = this.x - game.ball.r;
            this.X2 = this.x;
            this.X3 = this.x + this.w;
            this.X4 = this.x + this.w + game.ball.r;
            this.Y1 = this.y - game.ball.r;
            this.Y2 = this.y;
            this.Y3 = this.y + this.h;
            this.Y4 = this.y + this.h + game.ball.r;
        },
        //更新。这个函数每帧将执行。
        update: function () {
            //与小球的碰撞检测
            //检测碰撞到哪条边
            if(game.ball.x > this.X1 && game.ball.x <= this.X4 && game.ball.y > this.Y3 && game.ball.y <= this.Y4){
                //撞到底边
                this.boom();
                game.ball.y = this.y + this.h + game.ball.r;
                game.ball.crashBottom();
            }else if(game.ball.x > this.X1 && game.ball.x <= this.X2 && game.ball.y > this.Y2 && game.ball.y <= this.Y3){
                //撞到左边
                this.boom();
                game.ball.x = this.x - game.ball.r;
                game.ball.crashLeft();
            }else if(game.ball.x > this.X1 && game.ball.x <= this.X4 && game.ball.y > this.Y1 && game.ball.y <= this.Y2){
                //撞到顶边
                this.boom();
                game.ball.y = this.y - game.ball.r;
                game.ball.crashTop();
            }else if(game.ball.x > this.X3 && game.ball.x <= this.X4 && game.ball.y > this.Y2 && game.ball.y <= this.Y3){
                //撞到右边
                this.boom();
                game.ball.x = this.x + this.w + game.ball.r;
                game.ball.crashRight();
            }
        },
        //渲染
        render: function (ctx, image) {
            if (!this.boomed) {
                ctx.drawImage(image, 97 * this.color, 0, 97, 36, this.x, this.y, this.w, this.h);
            }
        },
        //爆炸
        boom: function () {
            this.boomed = true;
            game.blockManager.blocks[this.row][this.col] = null;
        }
    });
})();