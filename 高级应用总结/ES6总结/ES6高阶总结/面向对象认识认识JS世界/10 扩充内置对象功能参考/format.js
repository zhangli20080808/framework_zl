String.prototype.format = function () {  
    var str = this;   
    for(var i = 0, j = arguments.length; i < j; i++){  
        str = str.replace(new RegExp('\\{' + i +'\\}', 'g'), arguments[i]);  
    }  
  
    return str;  
}  