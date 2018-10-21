
module.exports = function flatten(arr){
    const flattened = []
    for(item of arr){
        if(Array.isArray(item)){
            flattened.push(...flatten(item))
        }else{
            flattened.push(item)
        }
    }
    return flattened;
}