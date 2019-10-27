/**
 *
 *
 * @param {Array} array
 * @param {Function} func
 */
function map(array,func,ctx){
  const mappedArray = []
  for(let i= 0;i<array.length;i++){
    mappedArray[i] = func.call(ctx,array[i],i,array)
  }
  return mappedArray
}

module.exports = map
