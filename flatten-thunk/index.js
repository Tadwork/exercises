/**
 *
 *
 * @param {Function} thunk
 * @returns a function that will flatten all subsequent thunks
 */
function flattenThunk(thunk){
    return (callback)=>{
        const next = (err,data_or_thunk)=>{
          if(typeof data_or_thunk === 'function' && !err){
            data_or_thunk.call(this,next)
          }else{
            callback(err,data_or_thunk)
          }

        }
        thunk.call(this,next)
    }
}
module.exports = flattenThunk
