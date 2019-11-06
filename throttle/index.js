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
      if(called === 0){
        func.apply(this,args)
        setTimeout(()=>{
          called = 0
        },duration)
      }
      // else if (called === 1){
      //   setTimeout(()=>{
      //     // will execute at least once more to make up for swallowed calls
      //     throttled_func.apply(this,args)
      //   },duration)
      // }
      called++
    }
}
module.exports = throttle
