/**
 *
 *
 * @param {Function} func
 * @returns {Function} memoized function
 */
function memoize(func){
  const memoizeMap = new Map()
  return function(){
    const argKey = Array.from(arguments).reduce((prev,arg)=>prev+"-"+arg)
    if(memoizeMap.has(argKey)){
      return memoizeMap.get(argKey)
    }else{
      const value = func.apply(this,arguments)
      memoizeMap.set(argKey,value)
      return value
    }
  }
}

module.exports  = memoize
