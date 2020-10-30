let data = {
    name: "kkb",
    age: 8
};
// ……
let {age,name} = data;

function fn(){
    console.log(age+name);
}
class React {
    
}
/*
    模块导出
        export {}
        export default 
*/
//export default age; 
// 一个模块中只能有一个 default 导出
// export default name; 
export {name as aName} // as 别名   原来的名字 as 别名
export {age}

export default fn;

