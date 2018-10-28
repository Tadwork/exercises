
module.exports = function(arr,func,ctx = null){
    const newArr =[]
    for(let i = 0;i< arr.length;i++){
        newArr[i] = func.call(ctx,arr[i],i,arr)
    }
    return newArr
}