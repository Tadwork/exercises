module.exports = function(func){
    const memoizedMap = new Map()
    return function(){
        const key = Array.from(arguments).join('-')
        if(memoizedMap.has(key)){
            return memoizedMap.get(key)
        }else{
            const val = func.apply(null,arguments)
            memoizedMap.set(key,val)
            return val
        }
    }
}