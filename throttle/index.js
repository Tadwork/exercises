/**
 *
 *
 * @param {Function} func to throttle
 * @param {number} duration how long to wait before we should fire if called again
 * @returns
 */
function throttle(func,duration){
    let lastCalled,
        args,
        timeout
    return function throttled_func(){
      //gets called with the later arguments
      args = arguments
      const time = new Date()
      const elapsedTime = time - lastCalled
      if(!lastCalled || (elapsedTime > duration && !timeout)){
        lastCalled = time
        func.apply(this,args)
      }else if(!timeout){
        // execute at least once more to make up for swallowed calls
        timeout = setTimeout(()=>{
          lastCalled = time
          func.apply(this,args)
          timeout = null
        },duration )
      }
    }
}
module.exports = throttle
