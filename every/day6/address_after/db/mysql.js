const mysql = require("mysql")

module.exports = (sql,params=[])=>{
    const connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"list"
})

    connection.connect((error)=>{
        if(error){
            console.log("数据连接失败")
        }else{
            console.log("数据连接成功")
        }
    })

    return new Promise((resolve,reject)=>{
        connection.query(sql,params,(error,results)=>{
            if(error){
                resolve(error)
            }else{
                resolve(results)
            }
        })
        connection.end()
    })
}
