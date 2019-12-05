const Koa = require("koa")

const path = require("path")

const router = require("koa-router")()

const query = require("./db/mysql")

const bodyparser = require("koa-bodyparser")

const static = require("koa-static")

const app = new Koa()

app.use(static(path.join(__dirname,"public")))

app.use(bodyparser())

app.use(router.routes())
app.use(router.allowedMethods())



router.get('/api/list',async (ctx)=>{
    // await connection.query("select * from list",(error,results)=>{
    //     if(error){
    //         ctx.body = "error"
    //     }else{
    //         ctx.body=results
    //     }
    // })
    // let list = await query("select * from list")
    // ctx.body={
    //     code:1,
    //     data:list
    // }
    let {pagenum=1,limit=3} = ctx.query
    try{
        let startIndex = (pagenum-1)*limit
        let total = await query("select count(*) from list")
        console.log(total)
        let list = await query(`select * from list limit ${startIndex},${limit}`)
        ctx.body={
            code:1,
            data:list,
            total:total[0]['count(*)']
        }
    }catch(e){
        ctx.body={
            code:0,
            msg:e
        }
    }
})

router.post("/api/add",async (ctx)=>{
    // console.log(ctx.request.body)
    // ctx.body={
    //     code:1,
    //     mas:"添加成功"
    // }
    let {username,pwdname} = ctx.request.body;
    if(username && pwdname){
        let user = await query("select * from list where username=?",[username])
        if(user.length){
            ctx.body = {
                code:3,
                msg:"此用户名已被注册"
            }
        }else{
            try{
                await query("insert into list (username,pwdname) values (?,?)",[username,pwdname])
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

    }else{
        ctx.body = {
            code:2,
            msg:"缺失参数"
        }
    }
})

router.get("/api/del",async (ctx)=>{
    let {id} = ctx.query
    if(id){
        await query("delete from list where id=?",[id])
        ctx.body = {
            code:1,
            msg:"删除成功"
        }
    }else{
        ctx.body = {
            code:2,
            msg:"缺失参数"
        }
    }
})

router.post("/api/change",async (ctx)=>{
    let {username,pwdname,id} = ctx.request.body
    if(username && pwdname && id){
        try{
            await query("update list set username=?,pwdname=? where id=?",[username,pwdname,id])
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
            code:2,
            msg:"缺失参数"
        }
    }
})

app.listen(3000,()=>{
    console.log("启动成功")
})