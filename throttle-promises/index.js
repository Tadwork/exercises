

module.exports = function(max, arr){
    let running = 0,
            upTo = 0,
            results = []
    return new Promise(function(resolve,reject){
        function runNext(){
            let promiseInd = upTo
            if(promiseInd < arr.length){
                arr[promiseInd]().then((val)=>{
                    results[promiseInd] = val
                    running--
                    runNext()
                    if(running === 0){
                        resolve(results)
                    }
                })
                upTo++
                running++
            }
        }
        while(running < max){
            runNext()
        }
    })
}