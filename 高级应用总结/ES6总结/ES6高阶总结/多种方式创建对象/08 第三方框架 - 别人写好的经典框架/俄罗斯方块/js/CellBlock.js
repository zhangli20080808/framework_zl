/**
 * Created by Danny on 2015/9/7 1:35.
 */
(function(){
    // 细胞方块类
    window.CellBlock = Class.extend({
        //初始化。
        //参数type表示方块颜色，合法值0、1、2、3、4、5、6、7
        //其中，0表示没有。1~7是颜色块。
        //row行，col列
        init : function(color,col,row){
            //根据new的时候传进来的参数，设置对象的属性
            this.color = parseInt(color);
            this.col = parseInt(col);
            this.row = parseInt(row);
            //图片
            this.image = game.imagesResouces["block"];
        },
        //渲染，这个函数，每帧执行
        render : function(){
            if(this.color != 0){
                //在画布上绘制
                game.ctx.drawImage(this.image,20 * (this.color - 1) , 0 , 20 , 20 , this.row * 20 , this.col*20,20,20);
            }
        }
    });
})();