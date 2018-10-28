function promisify(func){
        return new Promise((resolve,reject)=>{
            func((err,result)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
}
module.exports = function(thunk){
    function getPromise(func){
        return promisify(func).then((result)=>{
            if(typeof result === 'function'){
                return getPromise(result)
            }else{
                // base case
                return Promise.resolve(result)
            }
        })
    }
    return function(doneFunc){
        getPromise(thunk)
        .then((result)=>{
            doneFunc(null,result)
        })
    }
}