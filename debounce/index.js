
module.exports = function(func,time){
    let canCall = true;
    let context;
    let lastArgs;
    function debounced(...args){
        context = this;
        lastArgs = args;
        if(canCall){
            canCall = false
            setTimeout(function(){
                canCall = true;
                func.apply(context,lastArgs)
            },time)
        }
    }
    return debounced;
}