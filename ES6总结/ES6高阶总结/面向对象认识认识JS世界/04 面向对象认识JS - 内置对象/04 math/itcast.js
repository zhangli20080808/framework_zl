/**
 * 作者：传智播客教育集团
 * 开发日期：2015/12/25
 * 描述：通用框架
 * 版权所有 违者必究
 */

//定义一个对象 - 名字是$
var $$ = function() {

};
//第二种写法
$$.prototype = {
    init:function(){
        this.stringExtend();
        this.MathExtend();
    },
    stringExtend:function(){

        /*新增一个方法*/
        String.prototype.formateString=function(data){
            return this.replace(/@\((\w+)\)/g, function(match, key){
                return typeof data[key] === "undefined" ? '' : data[key]});
        }

        /*trim是ES5新增的，以前的版本不支持，一般我们在编程的时候不会直接使用ES5，所以必须自己扩充*/
        String.prototype.trim = function() {
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }

        /*字符串-去掉前空白字符 */
        String.prototype.ltrim = function(){
            return this.replace(/(^\s*)/g, "");
        }

        /**
         *字符串-去掉后空白字符
         */
        String.prototype.rtrim = function(){
            return this.replace(/(\s*$)/g, "");
        }

        /**
         * 将一个字符串的首字母大写，其它字符小写
         */
        String.prototype.capitalize= function() {
            return this.trim().replace(/^(\w{1})(.*)/g, function(match, g1, g2) {
                return g1.toUpperCase() + g2.toLowerCase();
            });
        }

        /**
         * 将字符串中的下划线转换成中划线
         */
        String.prototype.dashString = function() {
            return this.replace(/\_/g, '-');
        }

        /**
         * 检测字符串是否是空串
         */
        String.prototype.isEmpty = function() {
            return this.length === 0;
        }

        /**
         * 检测字符串是否包含特定的字符串
         */
        String.prototype.contains = function(target) {
            return this.indexOf(target) !== -1;
        }

        /**
         * 对字符串中的特殊字符进行转义，避免XSS
         */
        String.prototype.escapeHTML=function() {
        //转义后的字符是可以直接设置成innerHTML的值。
        //replace(/&/g, '&amp;')这条replace()调用一定要写在所有的特殊字符转义的前面，不然转换后有&符号的会再被转一次
            return this.replace(/&/g, '&amp;')
                .replace(/\</g, '&lt;')
                .replace(/\>/g, '&gt;')
                .replace(/\'/g, '&#39;')
                .replace(/\"/g, '&quot;');

            /*var strArr = this.split('');
             for(var pos = 0, l = strArr.length, tmp; pos < l; pos++) {
             tmp = strArr[pos];
             switch(tmp) {
             case '<':
             replaceArr(strArr, pos, '&lt;');
             break;
             case '>':
             replaceArr(strArr, pos, '&gt;');
             break;
             case '\'':
             replaceArr(strArr, pos, '&#39;');
             break;
             case '\"':
             replaceArr(strArr, pos, '&quot;');
             break;
             case '&':
             replaceArr(strArr, pos, '&amp;');
             break;
             default:;
             }
             }
             return strArr.join('');

             function replaceArr(arr, pos, item) {
             return arr.splice(pos, 1, item);
             }*/
        },

        /**
         * 对字符串进行反转义
         */
         String.prototype.unescapeHTML = function() {
            return this.replace(/&amp;/, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&#39;/g, '\'')
                .replace(/&quot;/g, '\"')
                .replace(/&#(\d+)/g, function($0, $1) {
                    return String.formCharCode(parseInt($1, 10));
                });
        }


        /**
         * 取得字符串的逆序
         */
        String.prototype.reverse = function() {
            return (this.toString()).split('').reverse().join('');
        }

    },
    mathExtend:function(){
    },

    $id:function(id){
        return document.getElementById(id)
    },
    //去除左边空格
    ltrim:function(){
        return str.replace(/(^\s*)/g,'');
    },
    //去除右边空格
    rtrim:function(){
        return str.replace(/(\s*$)/g,'');
    },
    //去除空格
    trim:function(){
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    //随机选取
    getRandom:function(begin,end){
    return Math.floor(Math.random()*(end-begin))+begin;
},

    //ajax - 前面我们学习的
    myAjax:function(URL,fn){
        var xhr = createXHR();	//返回了一个对象，这个对象IE6兼容。
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                    fn(xhr.responseText);
                }else{
                    alert("错误的文件！");
                }
            }
        };
        xhr.open("get",URL,true);
        xhr.send();

        //闭包形式，因为这个函数只服务于ajax函数，所以放在里面
        function createXHR() {
            //本函数来自于《JavaScript高级程序设计 第3版》第21章
            if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
                if (typeof arguments.callee.activeXString != "string") {
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                            "MSXML2.XMLHttp"
                        ],
                        i, len;

                    for (i = 0, len = versions.length; i < len; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        } catch (ex) {
                            //skip
                        }
                    }
                }

                return new ActiveXObject(arguments.callee.activeXString);
            } else {
                throw new Error("No XHR object available.");
            }
        }
    },
    //tab
    tab:function(id) {
    //如何获取某个父元素下面的子元素
    var box = document.getElementById(id);
    var spans = box.getElementsByTagName('span');
    var lis = box.getElementsByTagName('li');


    //两步走
    //第一步: 先把上半部分实现
    //群体绑定事件  -- 对所有的span绑定事件
    //群体绑定事件
    for(var i=0;i<spans.length;i++) {
        //相亲法则  -- 给男一号一个代号  --  怎么给 -- 自定义属性
        spans[i].index=i;
        spans[i].onmouseover = function() {
            //排他思想 --  将所有的span置为默认状态  --- 然后再将当前鼠标移上的span置为class -- select
            for(var i=0;i<spans.length;i++) {
                spans[i].className='';
                lis[i].className='';
            }
            this.className='select';
            lis[this.index].className='select';
        }
    }

},
    //简单的数据绑定formateString
    formateString:function(str, data){
    return str.replace(/@\((\w+)\)/g, function(match, key){
        return typeof data[key] === "undefined" ? '' : data[key]});
},
    //arttemplate语法
    //封装成一个函数
    BindTemplate:function (data, divid, Template) {
    //alert(divid);
    //alert(Template);
    var html = template(Template, data);
    document.getElementById(divid).innerHTML = html;
},
    artTemplate:function (id,html,data){
    var render = template.compile(html);
    var str = render(data)
    document.getElementById(id).innerHTML = str;
}

}
//在框架中实例化，这样外面使用的使用就不用实例化了
$$ = new $$();
$$.init();

