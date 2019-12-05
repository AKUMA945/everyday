let connection = require("./mysql")

function query(sql){
    return new Promise((resolve,reject)=>{
        connection.query(sql,(error,results)=>{
            if(error){
                reject(error)
            }else{
                resolve(results)
        }
        })

    })
}

module.exports = query