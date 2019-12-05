function play(timer,key,callback){
    setTimeout(()=>{
        let nextKey = key + 1
        callback(nextKey)
    },timer)
}

play(1000,1)
play(2000,nextKey)