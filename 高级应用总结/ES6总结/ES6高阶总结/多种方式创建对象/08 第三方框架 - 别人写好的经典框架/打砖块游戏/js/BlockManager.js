/**
 * Created by Danny on 2015/9/6 0:09.
 */
(function(){
    window.BlockManager = Class.extend({
        init : function(game){
            this.game = game;

            //地图
            this.map = [
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,1,0,2,0,0,0,0,0,0,0],
                [0,0,1,0,0,3,2,0,0,2,0,0,2],
                [0,1,0,0,0,0,3,2,0,2,0,2,3],
                [1,0,0,0,0,0,0,3,2,3,2,3,0],
                [0,1,0,0,0,0,0,0,3,0,3,0,0],
                [0,0,1,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,1,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0],
            ];

            //行列数
            this.rowLength = this.map.length;
            this.colLength = this.map[0].length;

            this.blocks = [[],[],[],[],[],[],[],[],[]];       //转块数组

            this.createBlocks();    //创建转块
        },
        //根据地图创建转块
        createBlocks : function(){
            for(var row = 0 ; row < this.rowLength ; row++){
                for(var col = 0 ; col < this.colLength ; col++){
                    var color = this.map[row][col];
                    if(color != 0 ) {
                        //实例化转块
                        this.blocks[row][col] = new Block(color, 97 * col, 40 * row , 97 ,36,row,col);
                    }else{
                        this.blocks[row][col] = null;
                    }
                }
            }
        },
        //渲染所有转块
        renderAllBlocks : function(ctx,image){
            for(var row = 0 ; row < this.rowLength ; row++){
                for(var col = 0 ; col < this.colLength ; col++){
                    if(this.blocks[row][col] != null){
                        this.blocks[row][col].render(ctx,image);
                    }
                }
            }
        },
        //更新所有小球
        updateAllBlocks : function(){
            for(var row = 0 ; row < this.rowLength ; row++){
                for(var col = 0 ; col < this.colLength ; col++){
                    if(this.blocks[row][col] != null){
                        this.blocks[row][col].update();
                    }
                }
            }
        }
    });
})();