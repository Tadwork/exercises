/**
 *
 *
 * @param {Function} func function to curry
 * @returns {Function} curried function
 */
function curry(func){
  function curried_func (){
    const args = Array.isArray(this.args) ? this.args.slice() : []
    args.push(...arguments)
    if(args.length >= func.length ){
      return func.apply(null,args)
    }else{
      return curried_func.bind({args})
    }
  }
  return curried_func
}

module.exports = curry
