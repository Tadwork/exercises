
/**
 *
 *
 * @param {Array<Function>} thunks functions that take a callback and call it when done
 * @returns
 */
function sequence(thunks){
  const thunks_to_call = [...thunks]
  return (callback)=>{
    function next_thunk(err,data){
      if(thunks_to_call.length){
        const thunk = thunks_to_call.shift()
        if(err) throw new Error(err)
        thunk.call(null,next_thunk,data)
      }else{
        callback.call(null,err,data)
      }
    }
    next_thunk()
  }
}
/**
 *
 *
 * @param {Array<Function>} thunks functions that take a callback and call it when done
 * @returns
 */
function parallel(thunks){
  const thunks_results = []
  let thunks_finished = 0,
      thunk_error
  return (callback)=>{
    thunks.forEach((thunk,thunk_number)=>{
      thunk.call(null,(err,data)=>{
          if(err) thunk_error = err
          thunks_results[thunk_number] = data
          thunks_finished++
          if(thunks_finished === thunks.length){
            callback(thunk_error,thunks_results)
          }
      })
    })
  }
}
/**
 *
 *
 * @param {Array<Function>} thunks functions that take a callback and call it when done
 * @returns
 */
function race(thunks){
  let thunks_finished
  return (callback)=>{
    thunks.forEach((thunk,thunk_number)=>{
      thunk.call(null,(err,data)=>{
          if(!thunks_finished){
            callback(err,data)
          }
      })
    })
  }
}
module.exports = {
  sequence,
  parallel,
  race
}
