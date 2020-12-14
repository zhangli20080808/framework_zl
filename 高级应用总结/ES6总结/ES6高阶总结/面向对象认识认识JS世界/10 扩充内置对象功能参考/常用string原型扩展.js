/** 在字符串末尾追加字符串 **/
String.prototype.append = function (str) {
    return this.concat(str);
}
/** 删除指定索引位置的字符，索引无效将不删除任何字符 **/
String.prototype.deleteCharAt = function (index) {
    if (index < 0 || index >= this.length) {
        return this.valueOf();
    }
    else if (index == 0) {
        return this.substring(1, this.length);
    }
    else if (index == this.length - 1) {
        return this.substring(0, this.length - 1);
    }
    else {
        return this.substring(0, index) + this.substring(index + 1);
    }
}
/** 删除指定索引区间的字符串 **/
String.prototype.deleteString = function (start, end) {
    if (start == end) {
        return this.deleteCharAt(start);
    }
    else {
        if (start > end) {
            var temp = start;
            start = end;
            end = temp;
        }
        if (start < 0) {
            start = 0;
        }
        if (end > this.length - 1) {
            end = this.length - 1;
        }
        return this.substring(0, start) + this.substring(end +1 , this.length);
    }
}
/** 检查字符串是否以subStr结尾 **/
String.prototype.endWith = function (subStr) {
    if (subStr.length > this.length) {
        return false;
    }
    else {
        return (this.lastIndexOf(subStr) == (this.length - subStr.length)) ? true : false;
    }
}
/** 比较两个字符串是否相等，也可以直接用 == 进行比较 **/
String.prototype.equal = function (str) {
    if (this.length != str.length) {
        return false;
    }
    else {
        for (var i = 0; i < this.length; i++) {
            if (this.charAt(i) != str.charAt(i)) {
                return false;
            }
        }
        return true;
    }
}
/** 比较两个字符串是否相等，不区分大小写 **/
String.prototype.equalIgnoreCase = function (str) {
    var temp1 = this.toLowerCase();
    var temp2 = str.toLowerCase();
    return temp1.equal(temp2);
}
/** 将指定的字符串插入到指定的位置后面，索引无效将直接追加到字符串的末尾 **/
String.prototype.insert = function (ofset, subStr) {
    if (ofset < 0 || ofset >= this.length - 1) {
        return this.append(subStr);
    }
    return this.substring(0, ofset + 1) + subStr + this.substring(ofset + 1);
}
/** 判断字符串是否数字串 **/
String.prototype.isAllNumber = function () {
    for (var i = 0; i < this.length; i++) {
        if (this.charAt(i) < '0' || this.charAt(i) > '9') {
            return false;
        }
    }
    return true;
}
/** 将字符串反序排列 **/
String.prototype.reserve = function () {
    var temp = "";
    for (var i = this.length - 1; i >= 0; i--) {
        temp = temp.concat(this.charAt(i));
    }
    return temp;
}
/** 将指定的位置的字符设置为另外指定的字符或字符串.索引无效将直接返回不做任何处理 **/
String.prototype.setCharAt = function (index, subStr) {
    if (index < 0 || index > this.length - 1) {
        return this.valueOf();
    }
    return this.substring(0, index) + subStr + this.substring(index+1);
}
/** 检查字符串是否以subStr开头 **/
String.prototype.startWith = function (subStr) {
    if (subStr.length > this.length) {
        return false;
    }
    return (this.indexOf(subStr) == 0) ? true : false;
}
/** 计算长度，每个汉字占两个长度，英文字符每个占一个长度 **/
String.prototype.charLength = function () {
    var temp = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 255) {
            temp += 2;
        }
        else {
            temp += 1;
        }
    }
    return temp;
}
String.prototype.charLengthReg = function () {
    return this.replace(/[^\x00-\xff]/g, "**").length;
}
/** 去掉首尾空格 **/
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
/** 测试是否是数字 **/
String.prototype.isNumeric = function () {
    var tmpFloat = parseFloat(this);
    if (isNaN(tmpFloat))
        return false;
    var tmpLen = this.length - tmpFloat.toString().length;
    return tmpFloat + "0".Repeat(tmpLen) == this;
}
/** 测试是否是整数 **/ 
String.prototype.isInt = function () {
    if (this == "NaN")
        return false;
    return this == parseInt(this).toString();
}
/** 获取N个相同的字符串 **/
String.prototype.Repeat = function (num) {
    var tmpArr = [];
    for (var i = 0; i < num; i++) tmpArr.push(this);
    return tmpArr.join("");
}
/** 合并多个空白为一个空白 **/ 
String.prototype.resetBlank = function () {
    return this.replace(/s+/g, " ");
}
/** 除去左边空白 **/ 
String.prototype.LTrim = function () {
    return this.replace(/^s+/g, "");
}
/** 除去右边空白 **/ 
String.prototype.RTrim = function () {
    return this.replace(/s+$/g, "");
}
/** 除去两边空白 **/ 
String.prototype.trim = function () {
    return this.replace(/(^s+)|(s+$)/g, "");
}
/** 保留数字 **/ 
String.prototype.getNum = function () {
    return this.replace(/[^d]/g, "");
}
/** 保留字母 **/ 
String.prototype.getEn = function () {
    return this.replace(/[^A-Za-z]/g, "");
}
/** 保留中文 **/ 
String.prototype.getCn = function () {
    return this.replace(/[^u4e00-u9fa5uf900-ufa2d]/g, "");
}
/** 得到字节长度 **/ 
String.prototype.getRealLength = function () {
    return this.replace(/[^x00-xff]/g, "--").length;
}
/** 从左截取指定长度的字串 **/ 
String.prototype.left = function (n) {
    return this.slice(0, n);
}
/** 从右截取指定长度的字串 **/ 
String.prototype.right = function (n) {
    return this.slice(this.length - n);
}
/*** 删除首尾空格 ***/ 
String.prototype.Trim = function() { 
  return this.replace(/(^\s*)|(\s*$)/g, ""); 
} 

/*** 统计指定字符出现的次数 ***/ 
String.prototype.Occurs = function(ch) { 
//  var re = eval("/[^"+ch+"]/g"); 
//  return this.replace(re, "").length; 
  return this.split(ch).length-1; 
} 

/*** 检查是否由数字组成 ***/ 
String.prototype.isDigit = function() { 
  var s = this.Trim(); 
  return (s.replace(/\d/g, "").length == 0); 
} 

/*** 检查是否由数字字母和下划线组成 ***/ 
String.prototype.isAlpha = function() { 
  return (this.replace(/\w/g, "").length == 0); 
} 

/*** 检查是否为数 ***/ 
String.prototype.isNumber = function() { 
  var s = this.Trim(); 
  return (s.search(/^[+-]?[0-9.]*$/) >= 0); 
} 

/*** 返回字节数 ***/ 
String.prototype.lenb = function() { 
  return this.replace(/[^\x00-\xff]/g,"**").length; 
} 

/*** 检查是否包含汉字 ***/ 
String.prototype.isInChinese = function() { 
  return (this.length != this.replace(/[^\x00-\xff]/g,"**").length); 
} 

/*** 简单的email检查 ***/ 
String.prototype.isEmail = function() { 
　var strr; 
  var mail = this; 
　var re = /(\w+@\w+\.\w+)(\.{0,1}\w*)(\.{0,1}\w*)/i; 
　re.exec(mail); 
　if(RegExp.$3!="" && RegExp.$3!="." && RegExp.$2!=".") 
    strr = RegExp.$1+RegExp.$2+RegExp.$3; 
　else 
　　if(RegExp.$2!="" && RegExp.$2!=".") 
      strr = RegExp.$1+RegExp.$2; 
　　else 
    　strr = RegExp.$1; 
　return (strr==mail); 
} 

/*** 简单的日期检查，成功返回日期对象 ***/ 
String.prototype.isDate = function() { 
  var p; 
  var re1 = /(\d{4})[年./-](\d{1,2})[月./-](\d{1,2})[日]?$/; 
  var re2 = /(\d{1,2})[月./-](\d{1,2})[日./-](\d{2})[年]?$/; 
  var re3 = /(\d{1,2})[月./-](\d{1,2})[日./-](\d{4})[年]?$/; 
  if(re1.test(this)) { 
    p = re1.exec(this); 
    return new Date(p[1],p[2],p[3]); 
  } 
  if(re2.test(this)) { 
    p = re2.exec(this); 
    return new Date(p[3],p[1],p[2]); 
  } 
  if(re3.test(this)) { 
    p = re3.exec(this); 
    return new Date(p[3],p[1],p[2]); 
  } 
  return false; 
} 

/*** 检查是否有列表中的字符字符 ***/ 
String.prototype.isInList = function(list) { 
  var re = eval("/["+list+"]/"); 
  return re.test(this); 
}



    /* 
    * 系统中JS的扩展函数 
    * 
    * 
    */  
      
    // 清除两边的空格  
    String.prototype.trim = function() {  
        return this.replace(/(^\s*)|(\s*$)/g, '');  
    };  
    // 合并多个空白为一个空白  
    String.prototype.ResetBlank = function() {  
        var regEx = /\s+/g;  
        return this.replace(regEx, ' ');  
    };  
      
    // 保留数字  
    String.prototype.GetNum = function() {  
        var regEx = /[^\d]/g;  
        return this.replace(regEx, '');  
    };  
      
    // 保留中文  
    String.prototype.GetCN = function() {  
        var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;  
        return this.replace(regEx, '');  
    };  
      
    // String转化为Number  
    String.prototype.ToInt = function() {  
        return isNaN(parseInt(this)) ? this.toString() : parseInt(this);  
    };  
      
    // 得到字节长度  
    String.prototype.GetLen = function() {  
        var regEx = /^[\u4e00-\u9fa5\uf900-\ufa2d]+$/;  
        if (regEx.test(this)) {  
            return this.length * 2;  
        } else {  
            var oMatches = this.match(/[\x00-\xff]/g);  
            var oLength = this.length * 2 - oMatches.length;  
            return oLength;  
        }  
    };  
      
    // 获取文件全名  
    String.prototype.GetFileName = function() {  
        var regEx = /^.*\/([^\/\?]*).*$/;  
        return this.replace(regEx, '$1');  
    };  
      
    // 获取文件扩展名  
    String.prototype.GetExtensionName = function() {  
        var regEx = /^.*\/[^\/]*(\.[^\.\?]*).*$/;  
        return this.replace(regEx, '$1');  
    };  
      
    /******add By 刘景宁 2010-12-09 *******/  
    String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {  
        if (!RegExp.prototype.isPrototypeOf(reallyDo)) {  
            return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);  
        } else {  
            return this.replace(reallyDo, replaceWith);  
        }  
    };  
    //格式化字符串 add By 刘景宁 2010-12-09   
    String.Format = function() {  
        if (arguments.length == 0) {  
            return '';  
        }  
      
        if (arguments.length == 1) {  
            return arguments[0];  
        }  
      
        var reg = /{(\d+)?}/g;  
        var args = arguments;  
        var result = arguments[0].replace(reg, function($0, $1) {  
            return args[parseInt($1) + 1];  
        });  
        return result;  
    };  
      
    // 数字补零  
    Number.prototype.LenWithZero = function(oCount) {  
        var strText = this.toString();  
        while (strText.length < oCount) {  
            strText = '0' + strText;  
        }  
        return strText;  
    };  
      
    // Unicode还原  
    Number.prototype.ChrW = function() {  
        return String.fromCharCode(this);  
    };  
      
    // 数字数组由小到大排序  
    Array.prototype.Min2Max = function() {  
        var oValue;  
        for (var i = 0; i < this.length; i++) {  
            for (var j = 0; j <= i; j++) {  
                if (this[i] < this[j]) {  
                    oValue = this[i];  
                    this[i] = this[j];  
                    this[j] = oValue;  
                }  
            }  
        }  
        return this;  
    };  
      
    // 数字数组由大到小排序  
    Array.prototype.Max2Min = function() {  
        var oValue;  
        for (var i = 0; i < this.length; i++) {  
            for (var j = 0; j <= i; j++) {  
                if (this[i] > this[j]) {  
                    oValue = this[i];  
                    this[i] = this[j];  
                    this[j] = oValue;  
                }  
            }  
        }  
        return this;  
    };  
      
    // 获得数字数组中最大项  
    Array.prototype.GetMax = function() {  
        var oValue = 0;  
        for (var i = 0; i < this.length; i++) {  
            if (this[i] > oValue) {  
                oValue = this[i];  
            }  
        }  
        return oValue;  
    };  
      
    // 获得数字数组中最小项  
    Array.prototype.GetMin = function() {  
        var oValue = 0;  
        for (var i = 0; i < this.length; i++) {  
            if (this[i] < oValue) {  
                oValue = this[i];  
            }  
        }  
        return oValue;  
    };  
      
    // 获取当前时间的中文形式  
    Date.prototype.GetCNDate = function() {  
        var oDateText = '';  
        oDateText += this.getFullYear().LenWithZero(4) + new Number(24180).ChrW();  
        oDateText += this.getMonth().LenWithZero(2) + new Number(26376).ChrW();  
        oDateText += this.getDate().LenWithZero(2) + new Number(26085).ChrW();  
        oDateText += this.getHours().LenWithZero(2) + new Number(26102).ChrW();  
        oDateText += this.getMinutes().LenWithZero(2) + new Number(20998).ChrW();  
        oDateText += this.getSeconds().LenWithZero(2) + new Number(31186).ChrW();  
        oDateText += new Number(32).ChrW() + new Number(32).ChrW() + new Number(26143).ChrW() + new Number(26399).ChrW() + new String('26085199682010819977222352011620845').substr(this.getDay() * 5, 5).ToInt().ChrW();  
        return oDateText;  
    };  
    //扩展Date格式化  
    Date.prototype.Format = function(format) {  
        var o = {  
            "M+": this.getMonth() + 1, //月份           
            "d+": this.getDate(), //日           
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
            "H+": this.getHours(), //小时           
            "m+": this.getMinutes(), //分           
            "s+": this.getSeconds(), //秒           
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度           
            "S": this.getMilliseconds() //毫秒           
        };  
        var week = {  
            "0": "\u65e5",  
            "1": "\u4e00",  
            "2": "\u4e8c",  
            "3": "\u4e09",  
            "4": "\u56db",  
            "5": "\u4e94",  
            "6": "\u516d"  
        };  
        if (/(y+)/.test(format)) {  
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
        }  
        if (/(E+)/.test(format)) {  
            format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);  
        }  
        for (var k in o) {  
            if (new RegExp("(" + k + ")").test(format)) {  
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
            }  
        }  
        return format;  
    }  
    Date.prototype.Diff = function(interval, objDate) {  
        //若参数不足或 objDate 不是日期类型則回传 undefined  
        if (arguments.length < 2 || objDate.constructor != Date) { return undefined; }  
        switch (interval) {  
            //计算秒差                                                          
            case 's': return parseInt((objDate - this) / 1000);  
                //计算分差  
            case 'n': return parseInt((objDate - this) / 60000);  
                //计算時差  
            case 'h': return parseInt((objDate - this) / 3600000);  
                //计算日差  
            case 'd': return parseInt((objDate - this) / 86400000);  
                //计算周差  
            case 'w': return parseInt((objDate - this) / (86400000 * 7));  
                //计算月差  
            case 'm': return (objDate.getMonth() + 1) + ((objDate.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);  
                //计算年差  
            case 'y': return objDate.getFullYear() - this.getFullYear();  
                //输入有误  
            default: return undefined;  
        }  
    };  
      
    //检测是否为空  
    Object.prototype.IsNullOrEmpty = function() {  
        var obj = this;  
        var flag = false;  
        if (obj == null || obj == undefined || typeof (obj) == 'undefined' || obj == '') {  
            flag = true;  
        } else if (typeof (obj) == 'string') {  
            obj = obj.trim();  
            if (obj == '') {//为空  
                flag = true;  
            } else {//不为空  
                obj = obj.toUpperCase();  
                if (obj == 'NULL' || obj == 'UNDEFINED' || obj == '{}') {  
                    flag = true;  
                }  
            }  
        }  
        else {  
            flag = false;  
        }  
        return flag;  
    };
