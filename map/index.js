module.exports = function(arr,func,ctxt){
    const mapped = []
    for(let i=0;i< arr.length; i++){
        mapped[i] = func.call(ctxt,arr[i],i,arr)
    }
    return mapped
}