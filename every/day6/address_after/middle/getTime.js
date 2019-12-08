const fs = require("fs")
const path = require("path")
module.exports = ()=>{
    return async (ctx,next)=>{
        let startTime = new Date().getTime()
        await next()
        let endTime = new Date().getTime()
        let time = endTime - startTime

        let url = ctx.request.path
        let method = ctx.request.method
        let status = ctx.request.status

        fs.appendFileSync(path.join(__dirname,"日志.log"),`${url}-${method}-${status}-${time}`)
    }
    

}