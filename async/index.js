/* utility functions */
function promisify(func,val){
    return new Promise((resolve,reject)=>{
            const cb = (err,response)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(response)
                }
            }
            func(cb,val)
        })
}
function runInSeq(arrayOfAsyncFunctions,upTo,val){
    if(upTo < arrayOfAsyncFunctions.length){
        return promisify(arrayOfAsyncFunctions[upTo],val).then((newVal)=>{
            return runInSeq(arrayOfAsyncFunctions,upTo+1,newVal)
        })
    }else{
        return Promise.resolve(val)
    }
}

/* public functions */

function sequence(arrayOfAsyncFunctions){
    return (doneFunc)=>{
        runInSeq(arrayOfAsyncFunctions,0)
        .then((val)=>{
            doneFunc(null,val)
        }).catch((err)=>{
            doneFunc(err)
        })
    }
}
function parallel(arrayOfAsyncFunctions){
    const results = []
    return (doneFunc)=>{
        const promises = arrayOfAsyncFunctions.map((func,i)=>{
            return promisify(func).then((val)=>{
                results[i] = val
            })
        })
        Promise.all(promises).then(()=>{
            doneFunc(null,results)
        }).catch((err)=>{
            doneFunc(err)
        })
    }
}
function race(arrayOfAsyncFunctions){
    return (doneFunc)=>{
        const promises = arrayOfAsyncFunctions.map((func,i)=>{
            return promisify(func)
        })
        Promise.race(promises).then((val)=>{
            doneFunc(null,val)
        }).catch((err)=>{
            doneFunc(err)
        })
    }
}

module.exports = {
    sequence,
    parallel,
    race
}