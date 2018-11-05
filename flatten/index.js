module.exports = function(array){
    const flat =[]
    function flatten(subArray){
        for(let a of subArray){
            if(Array.isArray(a)){
                flatten(a)
            }else{
                flat.push(a)
            }
        }
    }
    flatten(array)
    return flat
}