const mysql = require("mysql")

module.exports = (sql,params=[])=>{
    let connection = mysql.createConnection({
        host:"localhost",
        port:3306,
        user:"root",
        password:"root",
        database:"userlist"
    })
    
    connection.connect((error)=>{
        if(error){
            console.log(error)
            console.log("数据连接失败")
        }else{
            console.log("数据库连接成功")
        }
    })

    return new Promise((resolve,reject)=>{
        connection.query(sql,params,(error,results)=>{
            if(error){
                reject(error)
            }else{
                resolve(results)
                
        }
        connection.end()
        })
        
    })

}

