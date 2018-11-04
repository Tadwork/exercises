function promisify(func,val){
    return new Promise((resolve,reject)=>{
        func((err,res)=>{
            if(err){
                reject(err)
            }else{
                resolve(res)
            }
        },val)
    })
}
function sequence(functions){
    return function(doneFunc){
        function runNext(funcIndex,val){
            return promisify(functions[funcIndex],val)
            .then((nextVal)=>{
                if(functions[funcIndex + 1]){
                    runNext(funcIndex+1,nextVal)
                }else{
                    doneFunc(null,nextVal)
                }
            }).catch((err)=>{
                doneFunc(err)
            })
        }
        runNext(0)
    }
}

function parallel(functions){
    return function(doneFunc){    
        const promises = functions.map(func=>promisify(func))
        Promise.all(promises).then(values=>{
            doneFunc(null,values)
        }).catch((err)=>{
            doneFunc(err)
        })
    }
}

function race(functions){
    return function(doneFunc){    
        const promises = functions.map(func=>promisify(func))
        Promise.race(promises).then(value=>{
            doneFunc(null,value)
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