/**
 * Created by Danny on 2015/9/7 2:46.
 */
(function () {
    //罗列所有的组合方块形态
    var allType = {
        "I": [
            ["0010", "0010", "0010", "0010"],
            ["0000", "1111", "0000", "0000"]
        ],
        "L": [
            ["0200", "0200", "0220", "0000"],
            ["0000", "2220", "2000", "0000"],
            ["2200", "0200", "0200", "0000"],
            ["0020", "2220", "0000", "0000"]
        ],
        "J": [
            ["0300", "0300", "3300", "0000"],
            ["3000", "3330", "0000", "0000"],
            ["3300", "3000", "3000", "0000"],
            ["3330", "0030", "0000", "0000"]
        ],
        "O": [
            ["0440", "0440", "0000", "0000"]
        ],
        "S": [
            ["0550", "0500", "5500", "0000"],
            ["5000", "5550", "0050", "0000"]
        ],
        "Z": [
            ["6600", "0600", "0660", "0000"],
            ["0060", "6660", "6000", "0000"]
        ],
        "T": [
            ["7700", "0700", "0770", "0000"],
            ["0070", "7770", "7000", "0000"]
        ]
    }
    //组合方块
    window.UnitBlock = Class.extend({
        //初始化
        //组合块都是4*4的格子
        //type表示类型，合法值ILJOSZT
        //direction表示方向，合法值0、1、2、3
        //row表示此4*4的格子左上角的行
        //col表示此4*4的格子左上角的列
        init: function () {
            //方向
            this.direction = 0;
            //自己的类型是随机的
            var typeString = "ILJOSZT";
            this.type = typeString.substr(parseInt(Math.random() * 7),1);
            //4*4形态：
            this.ff = allType[this.type][this.direction];
            //旋转方向个数
            this.directionAmount = allType[this.type].length;

            //当前组合体左上角所在的行、列
            this.row = 0;
            this.col = 7;
            //自己的小方块
            this.blocks = [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]];

            this.changeBlocksByFF();
            //绑定键盘监听
            this.bindKeyListener();
        },
        //根据4*4形态，更改自己的小方块
        changeBlocksByFF: function () {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    var color = this.ff[i].substr(j, 1);
                    this.blocks[i][j] = new CellBlock(color, this.row + i, this.col + j);
                }
            }
        },
        //每秒执行
        update: function () {
            //让自己的小方块，根据自己的4*4形态，来设置
            //下移一行，判断能否下移
            //判断这次下移是否成立
            this.moveOneRowDown();
        },
        //向下移动一行
        moveOneRowDown : function(){
            if(this.checkIsCanDowm(this)){
                // 能够移动
                this.row++;         //加上1
                this.changeBlocksByFF();
            }else{
                // 不能够移动
                game.state = 1;     //更改游戏的状态。1表示判定消除行
                //清除游戏的活动方块
                game.activeBlock = null;
                //将自己添加进入地图
                game.map.addUnitBlockIntoBlockMap(this);
                return;
            }
        },
        //向左移动一列
        moveOneColLeft : function(){
            if(this.checkIsCanLeft()) {
                this.col--;
                this.changeBlocksByFF();
            }
        },
        //向右边移动一列
        moveOneColRight : function(){
            if(this.checkIsCanRight()) {
                this.col++;
                this.changeBlocksByFF();
            }
        },
        //旋转
        turnRound : function(){
            if(this.checkIsCanTurn()){
                this.direction = (this.direction + 1) % this.directionAmount;
                this.ff = allType[this.type][this.direction];
                this.changeBlocksByFF();
            }
        },
        //函数用来判断是否能向下移动
        checkIsCanDowm : function(){
            //判断是否被当前存在的小方块阻挡
            for(var i = 0 ; i < 4 ; i++) {
                for (var j = 0; j < 4; j++) {
                    var unitBlockColor = this.ff[i].substr(j, 1);
                    var mapBlockColor = game.map.blockMap[i + this.row + 1].substr(j + this.col + 3, 1);
                    if (unitBlockColor != 0 && mapBlockColor != 0) {
                        return false;
                    }
                }
            }
            return true;
        },
        //函数用来判断是否能向左边移动
        checkIsCanLeft : function(){
            //判断是否被当前存在的小方块阻挡
            for(var i = 0 ; i < 4 ; i++){
                for(var j = 0 ; j < 4 ; j++){
                    //读取这一位unitBlockColor值
                    var unitBlockColor = this.ff[i].substr(j, 1);
                    //读取地图上左边一位
                    var mapBlockColor = game.map.blockMap[i + this.row].substr(j + this.col + 3 - 1, 1);
                    //如果两个都不是0，那么表示碰上了，不能移动
                    if(unitBlockColor != 0 && mapBlockColor != 0){
                        return false;
                    }
                }
            }
            return true;
        },
        //函数用来判断是否能向右边移动
        checkIsCanRight : function(){
            //判断是否被当前存在的小方块阻挡
            for(var i = 0 ; i < 4 ; i++){
                for(var j = 0 ; j < 4 ; j++){
                    //读取这一位unitBlockColor值
                    var unitBlockColor = this.ff[i].substr(j, 1);
                    //读取地图上左边一位
                    var mapBlockColor = game.map.blockMap[i + this.row].substr(j + this.col + 3 + 1, 1);
                    //如果两个都不是0，那么表示碰上了，不能移动
                    if(unitBlockColor != 0 && mapBlockColor != 0){
                        return false;
                    }
                }
            }
            return true;
        },
        //函数用来判断是否能旋转
        checkIsCanTurn : function(){
            var newDiction = (this.direction + 1) % this.directionAmount;
            var newFF = allType[this.type][newDiction];

            //判断是否被当前存在的小方块阻挡
            for(var i = 0 ; i < 4 ; i++) {
                for (var j = 0; j < 4; j++) {
                    var unitBlockColor = newFF[i].substr(j, 1);
                    var mapBlockColor = game.map.blockMap[i + this.row].substr(j + this.col + 3, 1);
                    if (unitBlockColor != 0 && mapBlockColor != 0) {
                        return false;
                    }
                }
            }
            return true;
        },
        //渲染自己的所有小方块
        render: function () {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    this.blocks[i][j].render();
                }
            }
        },
        // 绑定键盘监听
        bindKeyListener : function(){
            var self = this;
            document.addEventListener("keydown",function(e){

                if(e.keyCode == 37){
                    //左边
                    self.moveOneColLeft();
                }else if(e.keyCode == 39){
                    //右边
                    self.moveOneColRight();
                }else if(e.keyCode == 38){
                    //旋转
                    self.turnRound();
                }
            });
        }
    });
})();