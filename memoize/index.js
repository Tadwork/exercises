
module.exports = function(func){
    const memMap = new Map()
    memMap.set()
    return function(...args){
        const key = args.join('-')
        if(memMap.has(key)){
            return memMap.get(key)
        }else{
            const val = func.apply(null,args)
            memMap.set(key,val)
            return val
        }
    }
}