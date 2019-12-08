const Koa = require("koa")

const static = require("koa-static")

const router = require("koa-router")()

const bodyparser = require("koa-bodyparser")

const query = require("./db/index")

const path = require("path")

const fs = require("fs")

let app = new Koa()

app.use(static(path.join(__dirname,"public")))

app.use(bodyparser())

app.use(router.routes())
app.use(router.allowedMethods())

router.get("/api/list",async (ctx)=>{
    try{

        let list = await  query("select * from week")
        ctx.body = {
            code:1,
            data:list
        }

    }catch(e){

        ctx.body = {
            code:0,
            msg:e
        }
    }
})

router.get("/api/login",async (ctx)=>{
    let {username,password} = ctx.query
    if(username.trim() && password.trim()){
        try{

            await query("select * from week where username=? and password=?",[username,password])
            ctx.body = {
                code:1,
                msg:"登陆成功"
            }
        }catch(e){

            ctx.body = {
                code:0,
                msg:e
            }
        }
    }else{
        ctx.body = {
            code:0,
            msg:"缺失参数"
        }
    }
})

router.post("/api/add",async (ctx)=>{
    let {username,password,years} = ctx.request.body
    if(username.trim() && password.trim() && years.trim()){
        let user = await query("select * from week where username=?",[username])
        if(user.length){
            ctx.body = {
                code:2,
                msg:"该用户名已被注册"
            }
        }else{
            try{

                await query("insert into week (username,password,years) values (?,?,?)",[username,password,years])

                ctx.body = {
                    code:1,
                    msg:"添加成功"
                }

            }catch(e){
                ctx.body = {
                    code:0,
                    msg:e
                }
            }
        }
    }
})

router.get("/api/del",async (ctx)=>{
    let {id} = ctx.query
    try{

        await query("delete from week where id=?",[id])
        ctx.body = {
            code:1,
            msg:"删除成功"
        }

    }catch(e){
        ctx.body = {
            code:0,
            msg:e
        }
    }
})

router.post("/api/update",async (ctx)=>{
    let {newword,password,id} = ctx.request.body
    if(newword.trim() && password.trim()){
        await query("update week set password=? where id=? and password=?",[newword,id,password])
        try{

            ctx.body = {
                code:1,
                msg:"修改成功"
            }

        }catch(e){

            ctx.body = {
                code:0,
                msg:e
            }
        }
    }else{
        ctx.body = {
            code:0,
            msg:"缺失参数"
        }
    }
})

app.listen(3000,()=>{
    console.log("服务启动成功")
})