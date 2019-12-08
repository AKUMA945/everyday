const Koa = require("koa")

const static = require("koa-static")

const router = require("koa-router")()

const path = require("path")

const qs = require("querystring")

const query = require("./db/mysql")

const time = require("./middle/getTime")

let app = new Koa

app.use(time())

app.use(static(path.join(__dirname,"public")))

function postParams(ctx){
    return new Promise((resolve,reject)=>{
        let str = "";
        ctx.req.on("data",(chunk)=>{
            str += chunk
        })
        ctx.req.on("end",()=>{
            resolve(qs.parser(str))
        })
    })
}

app.use(async (ctx,next)=>{
    let params = await postParams(ctx)
    console.log(params)
    await next
})

app.use(router.routes())
app.use(router.allowedMethods())


router.get("/api/list",(ctx)=>{
    ctx.body = "123"
})


app.listen(3000,()=>{
    console.log("启动成功")
})