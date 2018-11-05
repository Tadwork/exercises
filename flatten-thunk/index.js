module.exports = function(thunk){
    return function (doneFunc){
        function flatten(thisThunk){
            thisThunk((err,val)=>{
                if(err){
                    doneFunc(err)
                }else{
                    if(typeof val === 'function'){
                        flatten(val)
                    }else{
                        doneFunc(null,val)
                    }
                }
            })
        }
        flatten(thunk)
    }
}