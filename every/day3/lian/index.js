

const Koa = require('koa');
let bodyparser = require("koa-bodyparser")

const app = new Koa();

//配置中间件 

app.use(async (ctx,next) => {
   let startTime = new Date().getTime()
   console.log("第一层开始")
   await next()
   let endTime = new Date().getTime()
   let timer = endTime - startTime
   ctx.body = timer
   console.log("第一层结束")
})

app.use(async (ctx,next)=>{
    console.log("第二层开始")
    await next()
   
    console.log("第二层结束")
})

function delay(){
    return new Promise((resolve,reject)=>{
         setTimeout(()=>{
            resolve("===")
            },1000)
    })
}

app.use(async (ctx,next)=>{
    console.log("第三层开始")
    await delay()
    console.log("第三层结束")
})

app.listen(3000,()=>{
    console.log("服务启动成功，port:3000")
})