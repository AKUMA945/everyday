#!/usr/bin/env node

const fs = require("fs")
let file = process.argv[2].slice(1)
const path = require("path")

function readFile(ownpath){
    let filepath = path.join(process.cwd(),ownpath);
    if(fs.existsSync(filepath)){
        if(fs.statSync(filepath).isDirectory()){
             let list = fs.readdirSync(filepath);
                list.forEach(item=>{
                    readFile(path.join(ownpath,item))
                })
        }else{
            let size = fs.statSync(filepath).size
            let extname = path.extname(filepath).slice(1)
            console.log(`${ownpath}-${extname}-${size}`)
        }
       
    }else{
        console.log("此路径不存在")
    }
}
readFile(file)

