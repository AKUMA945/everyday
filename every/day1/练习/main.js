function sort (arr){
    var num = 0;
    for(var i=0;i<arr.length-1;i++){
        for(var t=0;t<arr.length-1;t++){
            if(arr[t]>arr[t+1]){
                num=arr[t]
                arr[t]=arr[t+1]
                arr[t+1]=num
            }
        }
    }
}

module.exports=sort