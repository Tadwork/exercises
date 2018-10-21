
module.exports = function(thunk){
    return function(cb){
        const flatten =(err,result)=>{
            if(typeof result === 'function'){
                result(flatten)
            }else{
                cb.call(null,err,result)
            }
        }
        thunk(flatten)
    }
}