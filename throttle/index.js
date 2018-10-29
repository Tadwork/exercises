
module.exports = function(func,time){
    let calledOnce,
        calledASecondTime,
        lastArgs
    return function throttle(){
        if(!calledOnce){
            calledOnce = true
            func.apply(this,arguments)
        }else if(!calledASecondTime){
            calledASecondTime = true 
            setTimeout(()=>{
                calledOnce = false 
                calledASecondTime = false
                throttle.apply(this,lastArgs)
            },time)
        }
        lastArgs = arguments
    }
}