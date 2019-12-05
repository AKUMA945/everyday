#!/usr/bin/env node

const program = require('commander');
const package = require('./package.json');
const inquirer = require('inquirer');
const fs = require('fs');
const data = require('./userlist.json');

const promptList = [
    {
        type: 'input',
        message: '设置一个用户名:',
        name: 'name',
        default: "test_user" // 默认值
    },
    {
        type: "password", // 密码为密文输入
        message: "请输入密码：",
        name: "pwd"
    },
    {
        type: 'input',
        message: '输入你的身份证号:',
        name: 'number',
    },
    {
        type: 'list',
        message: '请选择你的性别:',
        name: 'sex',
        choices: [
            "男",
            "女"
        ]
    },
];

program
    .version(package.version)
    .action(()=>{
        inquirer.prompt(promptList).then(answers => {
            console.log(answers); 
            let reg = /^\d{18}$/
            if(reg.test(answers.number)){
                let arr = [...data]
                arr.push(answers)
                fs.writeFileSync("./userlist.json",JSON.stringify(arr))
            }else{
                return console.log("身份证格式不正确")
            }
        })
    })


program.parse(process.argv);