
module.exports = function(func,time){
    let lastArgs =[],
        waiting = false,
        calledWhileThrottled = false
    return function throttled(...args){
        if(!waiting){
            func.apply(this,args)
        }else{
            if(!calledWhileThrottled){
                setTimeout(()=>{
                    if(waiting && calledWhileThrottled){
                        waiting  = false
                        calledWhileThrottled = false
                        throttled.apply(this,lastArgs)
                    }
                },time)
                calledWhileThrottled = true
            }
            lastArgs = args
        }
        waiting = true
    }
}