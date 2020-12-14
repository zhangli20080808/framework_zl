/**
 * Created by Danny on 2015/9/7 1:30.
 */
(function () {
    //地图类。这个类是所有算法的核心。
    window.Map = Class.extend({
        //初始化
        init: function () {
            //总行数和列数
            this.rowAmount = 24;
            this.colAmount = 12;

            //当前的方块地图，表示现在不在活动的方块，是个1维数组，形如
            // ["xxx000000000000000xxx","xxx000000000000000xxx","xxx000000000000000xxx" ……共行数+3项]
            this.blockMap = [];

            //真实方块数组，里面存放的真实的block对象，他是一个二维数组
            //[[block,block,……],[block,block,……],[block,block,……],[block,block,……]]
            this.blockArray = [];

            //清空当前固定方块地图
            this.clearBlockMap();
            //清空真实block数组
            this.clearBlockArray();
            //根据固定转块地图，生成转块
            this.changeBlockArrayByBlockMap();
        },
        //清空当前固定方块地图
        clearBlockMap: function () {
            //清除
            this.blockMap = [];
            //初始化鸟瞰地图
            for (var row = 0; row < this.rowAmount; row++) {
                this.blockMap.push("xxx000000000000xxx");
            }
            //测试：
            //this.blockMap[21] = "xxx123456071234xxx";
            //this.blockMap[22] = "xxx000010000000xxx";
            //this.blockMap[23] = "xxx123456071234xxx";
            //多3个底边
            this.blockMap.push("xxxxxxxxxxxxxxxxxx");
            this.blockMap.push("xxxxxxxxxxxxxxxxxx");
            this.blockMap.push("xxxxxxxxxxxxxxxxxx");
        },
        //清空真实block数组
        clearBlockArray: function () {
            //清空
            this.blockArray = [];
            //初始化
            for (var row = 0; row < this.rowAmount; row++) {
                this.blockArray.push(new Array(this.colAmount));
            }
        },
        //根据固定转块地图，生成转块
        changeBlockArrayByBlockMap: function () {
            //首先读取鸟瞰地图数组中的每一项数据（每一行的数据）
            for (var row = 0; row < this.rowAmount; row++) {
                //读取某一行，这是一个形如"xxx000000000000xxx"的字符串
                var r = this.blockMap[row];

                //遍历这个字符串，从第3项开始遍历
                for (var col = 3; col < this.colAmount + 3; col++) {
                    //读取一位
                    var c = r.substr(col, 1);
                    //在cellBlock中的参数，指的是实际的列数，所以减3
                    this.blockArray[row][col - 3] = new CellBlock(c, row, col - 3);
                }
            }
        },
        //渲染所有方块，每帧执行
        renderAllBlock: function () {
            //遍历blockArray中的元素，渲染。
            for (var row = 0; row < this.rowAmount; row++) {
                for (var col = 0; col < this.colAmount; col++) {
                    this.blockArray[row][col].render();
                }
            }
        },
        //将活动转块添加到地图中
        addUnitBlockIntoBlockMap: function (unitBlock) {
            //遍历活动砖块的4*4矩阵
            //这个矩阵形如：
            //["0110","0010","0010","0110"];
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    //读取第i条数据（字符串）第j位的数字，这个数字表示颜色
                    var unitBlockColor = unitBlock.ff[i].substr(j, 1);
                    //如果这一位的信息不是0 ， 那么要更改map对象的blockMap属性数组中的对应位置
                    if (unitBlockColor != 0) {
                        //读取对应行原来上的内容
                        //形如"xxx000000000000xxx"
                        var t = this.blockMap[i + unitBlock.row];
                        //对应位置
                        this.blockMap[i + unitBlock.row] = replaceChat(t, j + unitBlock.col + 3, unitBlockColor);
                    }
                }
            }
            //更改block数组
            this.changeBlockArrayByBlockMap();
        },
        //删除满行
        removeFullRow : function(){
            var fullRowNumber = [];
            //从最后一行开始筛选，找出哪些行是满行
            for(var row = this.rowAmount - 1 ; row > 0; row--){
                var num = 0;    //本行0的个数
                //遍历这个字符串
                for (var col = 3; col < this.colAmount + 3; col++) {
                    //读取1位
                    var c = this.blockMap[row].substr(col, 1);
                    //如果有某1位等于0，那么退出本函数
                    if(c == "0"){
                        num++;
                    }
                }
                //如果本行0的个数是0，说明满了
                if(num == 0){
                    fullRowNumber.push(row);
                }
            }

            console.log(fullRowNumber);
            //让满行都消失
            for(var i = 0 ; i < fullRowNumber.length ; i++){
                this.blockMap[fullRowNumber[i]] = "xxx000000000000xxx";

                //让Block更改
                this.changeBlockArrayByBlockMap();
                this.renderAllBlock();
            }

            //上面的行都下移
            for(var i = fullRowNumber.length - 1 ; i >= 0 ; i--){
                //从这一行开始，上面的所有行，都下移一行
                for(var j = fullRowNumber[i]; j > 0 ; j--){
                    this.blockMap[j] = this.blockMap[j - 1];
                }

                //让Block更改
                this.changeBlockArrayByBlockMap();
                this.renderAllBlock();
            }
        }
    });

    //替换字符串中的某一位
    function replaceChat(source, pos, newChar) {
        if (pos < 0 || pos >= source.length || source.length == 0) {
            return "invalid parameters...";
        }
        var iBeginPos = 0, iEndPos = source.length;
        var sFrontPart = source.substr(iBeginPos, pos);
        var sTailPart = source.substr(pos + 1, source.length);
        var sRet = sFrontPart + newChar + sTailPart;
        return sRet;
    }
})();