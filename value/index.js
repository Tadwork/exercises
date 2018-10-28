
module.exports = function value(val){
    if(typeof val === 'function'){
        return value(val())
    }else{
        return val
    }
}