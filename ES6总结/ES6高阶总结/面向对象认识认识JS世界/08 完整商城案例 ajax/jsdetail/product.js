//定义产品对象
function Product(){
    /*产品名称*/
    this.name='HM休闲服登山包'
    /*产品描述*/
    this.description='棒棒的，棒棒的，登山一流，服务一流，你好，我好，他也好，太棒了，一口气等上珠穆朗玛峰'
    /*普通价格*/
    this.normalPrice=144
    /*团购价格*/
    this.youhuijia=120
    /*已经购买的人数*/
    this.buySum=100;
    /*轮播图片列表*/
    this.images=[
        {small:'../images/s11.jpg',big:'../images/s11.jpg'},
        {small:'../images/s12.jpg',big:'../images/s12.jpg'},
        {small:'../images/s13.jpg',big:'../images/s13.jpg'}
    ]
}
Product.prototype={
    /*普通购买*/
    buy:function(){},
    /*绑定图片列表*/
    bindDOMImage:function(){
        var str=''
        for(var i= 0,len=this.images.length;i<len;i++) {
            str+='<li>'
            str+='<img class="etalage_thumb_image" src="'+ this.images[i].small+'" class="img-responsive" />'
            str+='<img class="etalage_source_image" src="'+ this.images[i].small+'" class="img-responsive" />'
            str+='</li>'
        }
        $('#etalage').html(str)

        /*jquery插件实现的幻灯片特效*/
        $('#etalage').etalage({
            thumb_image_width: 250,
            thumb_image_height: 300,
        });
    },
    /*绑定详细信息*/
    bindDOMDetail:function(){
        /*绑定元素*/
        $('#pname').html(this.name)
        $('#description').html(this.description)
        $('#price').html(this.normalPrice)
        $('#groupPrice').html(this.youhuijia)
        $('#buyCount').html(this.buySum)
    },
    /*绑定事件*/
    bindEvents:function(){
        /*绑定事件*/
        $('#btnaddcart').onclick=function(){

        }
        $('#btnbuy').onclick=function(){}
    },
    /*团购*/
    groupBuy:function(){},
    /*添加到购物车*/
    addCart:function(){

    }
}