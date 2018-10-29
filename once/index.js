
module.exports = function(func){
    let called,
        result
    return function(){
        if(!called){
            result = func.apply(this,arguments)
            called = true
        }
        return result
    }
}