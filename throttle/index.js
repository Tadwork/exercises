/**
 *
 *
 * @param {Function} func to throttle
 * @param {number} duration how long to wait before we should fire if called again
 * @returns
 */
function throttle(func,duration){
    let called = 0,
        args
    return function throttled_func(){
      //gets called with the later arguments
      args = arguments
      called++
      if(called === 1){
        func.apply(this,args)
      }
      else if (called === 2){
        setTimeout(()=>{
          called = 0
          throttled_func.apply(this,args)
        },duration)
      }
    }
}
module.exports = throttle
