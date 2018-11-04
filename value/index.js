
module.exports = function value(val){
    function resolve(valOrFunc){
        let resolved = valOrFunc
        if(typeof resolved === 'function'){
            resolved = resolve(valOrFunc()) 
        }
        return resolved
    }
    return resolve(val)
}