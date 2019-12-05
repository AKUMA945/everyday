function sort (arr){
     arr.sort((a,b)=>{
        return a-b
    })
}

let array = [1,3,5,6,8,9,4,6,78,12,36,81]
sort(array)
console.log(array)