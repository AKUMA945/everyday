#! /usr/bin/env node

const fs = require('fs');

let file = process.argv[2].slice(1);  //dist


// console.log(process.cwd())

const path = require('path');

function readFile(ownPath){
    let filePath = path.join(process.cwd(),ownPath);
    if(fs.existsSync(filePath)){
        if(fs.statSync(filePath).isDirectory()){
            //是否是文件夹
            let list = fs.readdirSync(filePath); //[index.html,style.css]
            list.forEach(item => {
                readFile(path.join(ownPath,item))     
            })
        }else{
            let size = fs.statSync(filePath).size;
            let extname = path.extname(filePath).slice(1);
            console.log(`${ownPath}-${extname}-${size}`)
        }
    }else{
        console.log("此路径不存在")
    }
}

readFile(file);


