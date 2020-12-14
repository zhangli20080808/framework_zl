//先思考单个对象
/*var str*/
var data = [
    {
        name:'白羊座',
        time:'3.21-4.19'
    }
    ,{
        name:'金牛座',
        time:'4.20-5.20'
    }
    ,{
        name:'双子座',
        time:'5.21-6.21'
    }
    ,{
        name:'巨蟹座',
        time:'6.22-7.22'
    }
    ,{
        name:'狮子座',
        time:'7.23-8.22'
    }
    ,{
        name:'处女座',
        time:'8.23-9.22'
    }
    ,{
        name:'天秤座',
        time:'9.23-10.23'
    }
    ,{
        name:'天蝎座',
        time:'10.24-11.22'
    }
    ,{
        name:'射手座',
        time:'11.23-12.21'
    }
    ,{
        name:'摩羯座',
        time:'12.22-1.19'
    }
    ,{
        name:'水瓶座',
        time:'1.20-2.18'
    }
    ,{
        name:'双鱼座',
        time:'2.19-3.20'
    }
];

function xingzuo(data,num){
    this.index = num;
   /* this.index=num*/
    this.data = data;
    this.dom = $('<div></div>').addClass('item num-'+num)
    this.config={jqueryContainer:$('.xingzuo')}
    this.init()
}
xingzuo.prototype={
    init:function(){
        this.bindDOM()
        this.bindEvents()
    },

    bindDOM:function(){
        var str =''
        str +=' <div class="image"></div>'
        str +='<div class="description">'
        str +='<p class="name">{{name}}</p>'
        str +='<p class="time">{{time}}</p>'
        str +='<div class="mark"></div>'
        str +='</div>'
        this.dom.html($$.artTemplate(str, this.data)).appendTo(this.config.jqueryContainer)

    },
    bindEvents:function(){
        var that = this;

        /*鼠标悬浮核离开*/
        /*前面我们讲了排他思想 -- 针对整体进行编程*/
        this.dom.on('mouseenter',function(){
            that.dom.addClass('is-hover')
        }).on('mouseleave',function(){
            that.dom.removeClass('is-hover')
        }).on('click',function(){
            //that.dom.toggleClass('selected')
            //window.open('detail.html?num=0')
            window.location = 'detail.html?num='+that.index
        })
    }
}


//我的同位
for(var i=0;i<data.length;i++){
    new xingzuo(data[i],i)
    //item.init()
}
