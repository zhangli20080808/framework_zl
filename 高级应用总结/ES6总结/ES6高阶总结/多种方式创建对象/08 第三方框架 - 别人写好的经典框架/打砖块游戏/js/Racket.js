/**
 * Created by Danny on 2015/9/6 2:10.
 */
(function(){
    // 挡板类
    window.Racket = Class.extend({
        init : function(){
            //位置
            this.x = game.width / 2 - 175 / 2;
            this.y = 600;
            //宽度
            this.w = 179;
            //厚度
            this.h = 37;
            //绑定事件监听
            this.bindMouseListener();
        },
        //渲染，这个函数每帧执行
        render : function(ctx,image){
            ctx.drawImage(image,this.x,this.y,this.w,this.h);
        },
        //绑定事件监听
        bindMouseListener : function(){
            var self = this;
            game.canvas.addEventListener("mousemove",function(event){
                self.x = event.offsetX;
            })
        }
    });
})();