module.exports = function(func,interval){
    let called,
        lastArgs,
        ctxt
    return function(){
        lastArgs = arguments
        ctxt = this
        if(!called){
            setTimeout(()=>{
                called = false
                func.apply(ctxt,lastArgs)
            },interval)
            called = true
        }
    }
}