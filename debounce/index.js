/**
 *
 * returns a debounced function, preserves the context and argument from the last call
 *
 * @param {Function} func
 * @param {Number} milliseconds
 * @returns
 */
function debounce(func,milliseconds){
  let waiting = false,
      args,
      ctx
  return function(){
    if(waiting === false){
      waiting = true
      setTimeout(()=>{
          waiting = false
          func.apply(ctx,args)
      },milliseconds)
    }
    args = Array.from(arguments)
    ctx = this
  }
}
module.exports = debounce
