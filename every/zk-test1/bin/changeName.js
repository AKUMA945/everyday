#! /usr/bin/env node

const fs = require('fs');

const path = require('path');

// let oldName = process.argv[2].slice(1);
// let newName = process.argv[3].slice(1);

// fs.renameSync(oldName,newName);

 //-dist  html index

let filepath = path.join(process.cwd(),process.argv[2].slice(1));

let list = fs.readdirSync(filepath);

let ind = 0;

list.forEach(item => {
    if(/html$/.test(item)){
        fs.renameSync(path.join(filepath,item),path.join(filepath,`index${ind}.html`));
        ind++;
    }
})




