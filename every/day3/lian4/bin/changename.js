#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

let oldname = process.argv[2].slice(1)
let newname = process.argv[3].slice(1)
let com = process.cwd()
let list = path.join(com,oldname)

if(fs.existsSync(list)){
    if(fs.statSync(list).isDirectory()){
        let filelist = fs.readdirSync(list)
        let par = /html$/
        filelist.forEach((item,index)=>{
            if(par.test(item)){
                fs.renameSync(path.join(list,oldname),path.join(list,newname+index+".html"))
            }

        })
    }else{
        fs.renameSync(path.join(oldname,newname))
    }

}else{
    console.log("不存在")
}

