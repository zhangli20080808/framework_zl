/**
 * 多语言 国际化
 * 1. 前段实现
 * 2. 通过请求 携带header
 * 3. 通过路劲
 */
let http = require('http');
let uuid = require('uuid');
let fs = require('fs');
let path = require('path');
let languages = {
    en:{
        message:'hello'
    },
    'zh-CN':{
        message:'你好'
    },
    ja:{
        message:'こんにちは'
    }
}
let languageDefault = 'en';
http.createServer((req,res)=>{
    let lan = req.headers['accept-language']
    if(lan){ // zh-CN, zh;q=0.9  ,en;q=0.8  => [{name:'zh-CN',q:1},{name:'zh-CN',q:1},{name:'zh-CN',q:1}]
        let languagelist = lan.split(',').map(l=>{
            let [name,q='q=1'] = l.split(';');
            return {
                name,
                q:q.split('=')[1]
            }
        }).sort((a,b)=>b.q-a.q);
        let keys = Object.keys(languages);
        for(let i = 0 ; i< languagelist.length;i++){
            let lanName = languagelist[i].name;
            let exitsLan = keys.includes(lanName);
            if(exitsLan){
                return res.end(languages[lanName].message);
            }
        }
       ; // [en,zh-cn,ja]
       res.end(languages[languageDefault].message);
    }else{
        res.end(languages[languageDefault].message);
    }
}).listen(3000);