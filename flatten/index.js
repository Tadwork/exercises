/**
 *
 *
 * @param {Array} array
 * @returns {Array} a flattened array
 */
function flatten(array){
  const flattened = []
  array.forEach((item)=>{
    if(Array.isArray(item)){
      flattened.push(...flatten(item))
    }else{
      flattened.push(item)
    }
  })
  return flattened
}
module.exports = flatten
