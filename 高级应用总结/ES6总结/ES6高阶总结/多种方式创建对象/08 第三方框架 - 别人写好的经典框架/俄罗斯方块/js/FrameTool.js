/**
 * Created by Danny on 2015/9/5 19:08.
 */
(function () {
    //它是一个对象，不是一个类
    window.FrameTool = Class.extend({
        init: function () {
            //当前帧编号
            this.currentFrame = 0;
            //标志帧时间戳
            this.sTime = null;
            //标志帧序号
            this.sFrame = 0;
            //实际帧数
            this.fps = 0;
        },

        //开始统计
        start: function () {
            this.currentFrame = 0;  //当前帧编号清零。
            this.sFrame = 0;    //标志帧清0
            this.sTime = (new Date()).getTime();     //标志帧时间戳
        },
        //更新。在游戏主循环中，调用这个方法，更新和计算帧数。
        update: function () {
            this.currentFrame++;   // 当前帧序号加1
            //更新的时候，当前帧的序号
            var fTime = (new Date()).getTime();
            if (fTime - this.sTime >= 1000) {
                //计算中间有多少帧数
                this.fps = this.currentFrame - this.sFrame;
                //将标志帧序号变为此帧
                this.sFrame = this.currentFrame;
                //将标志帧时间变为此帧
                this.sTime = fTime;
            }
        }
    })
})();