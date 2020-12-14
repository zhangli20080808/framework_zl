/*转换产品*/
function transformProduct(data){
    var product =  new Product()
    product.name = data.name;
    product.name=data.name;
    product.description=decodeURI(data.description)
    product.normalPrice=data.price;
    product.youhuijia=data.youhuijia;
    product.buySum=data.sum;
    product.images=[
        {small:'images/s11.jpg',big:'images/s11.jpg'},
        {small:'images/s12.jpg',big:'images/s12.jpg'},
        {small:'images/s13.jpg',big:'images/s13.jpg'}
    ]
    return product
}

/*转换产品列表*/
function transformProducts(data){
    var products =[]
    for(var i=0;i<data.length;i++){
        var product = transformProduct(data[i])
        products.push(product)
    }
    return products
}

/*转换购物车*/
function transformCart(data){
    var cart =  new Cart()
    cart.sum=data.sum;
    cart.allPrice=data.allprice;
    cart.products = transformProducts(data.products)
    return cart;
}

var cart;
var product;
//页面的业务逻辑
$(document).ready(function(){
    $$.myAjax('http://localhost/data/object/product.json',function(e){
        var json = JSON.parse(e);
        product = transformProduct(json)
        /*使用对象中的方法属性*/
        product.bindDOMDetail()
        product.bindDOMImage()

        /*绑定事件*/
        $('#btnaddcart').click(function(){
            /*购物车新增一个产品*/
            cart.products.push(product)
            ///*更新购物车 - 重新绑定购物车*/
            /*如果不封装，这里就可能产生代码重复*/
            cart.bindBasic()
            cart.bindList()
            $(window).scrollTop(0);
        });

    });

    $$.myAjax('http://localhost/data/object/cart.json',function(e){
        var json = JSON.parse(e);
        cart = transformCart(json)
        /*使用对象中的方法属性*/
        cart.bindBasic()
        cart.bindList()
    });


});