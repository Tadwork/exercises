
module.exports = function(func){
    let alreadyCalled = false
    let result
    return function(...args){
        if(!alreadyCalled){
            alreadyCalled = true
            result = func.apply(this,args)
        }
        return result
    }
}