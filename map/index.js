
module.exports = function(arr,func,ctx = null){
    const mapped = [];
    for(let i = 0;i < arr.length;i++){
        mapped.push(func.call(ctx,arr[i],i,arr))
    }
    return mapped
}