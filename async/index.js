
function sequence(arrayOfAsyncFunctions){
    let error,finalData;
    let toCallAtEnd;
    const callFunction = (funcIndex)=> {
        if(funcIndex === arrayOfAsyncFunctions.length || error){
            toCallAtEnd(error,finalData)
        }else{
            arrayOfAsyncFunctions[funcIndex].call(null,(err,data)=>{
                error = err
                finalData = data
                callFunction(funcIndex+1)
            },finalData)
        }
    }
    return (cb)=>{
        toCallAtEnd = cb;
        if(arrayOfAsyncFunctions.length > 0){
            callFunction(0);
        }
    };
}
function parallel(arrayOfAsyncFunctions){
    let error=[],finalData=[];
    let toCallAtEnd;
    let callCount = 0;
    function callFunction(){
        for (let funcIndex = 0; funcIndex<arrayOfAsyncFunctions.length ;funcIndex++){
            arrayOfAsyncFunctions[funcIndex].call(null,(err,data)=>{
                error[funcIndex] = err
                finalData[funcIndex] = data
                callCount++
                if(callCount === arrayOfAsyncFunctions.length){
                    toCallAtEnd(error,finalData)
                }
            },finalData)
        }
    }
    return (cb)=>{
        toCallAtEnd = cb;
        if(arrayOfAsyncFunctions.length > 0){
            callFunction();
        }
    };
}
function race(arrayOfAsyncFunctions){
    let error,finalData;
    let toCallAtEnd;
    let raceOver;
    function callFunction(){
        for (let funcIndex = 0; funcIndex<arrayOfAsyncFunctions.length ;funcIndex++){
            arrayOfAsyncFunctions[funcIndex].call(null,(err,data)=>{
                error = err
                finalData = data
                if(!raceOver){
                    raceOver = true;
                    toCallAtEnd(error,finalData)
                }
            },finalData)
        }
    }
    return (cb)=>{
        toCallAtEnd = cb;
        if(arrayOfAsyncFunctions.length > 0){
            callFunction();
        }
    };
}

module.exports = {
    sequence,
    parallel,
    race
}