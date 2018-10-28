
module.exports = function(func,time){
    let called,
        ctxt,
        lastArgs
    return function(){
        ctxt = this
        lastArgs = arguments
        if(!called){
            setTimeout(()=>{
                func.apply(ctxt,lastArgs)
                called = false
            },time)
        }
        called = true
    }
}