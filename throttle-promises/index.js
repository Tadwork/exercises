
module.exports = function(max, arr){
    let upTo = 0,
        running = 0,
        resolved = []
    return new Promise((resolve,reject)=>{
        function runBatch(){
            while(running < max && upTo < arr.length){
                running++
                const resolveIndex = upTo;
                arr[upTo]().then((result)=>{
                    running--
                    runBatch()
                    resolved[resolveIndex] = result
                    if(running === 0){
                        resolve(resolved)
                    }
                })
                upTo++
            }
        }
        runBatch()
    })
}