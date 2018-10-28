
module.exports = function flatten(arr){
    newArr = []
    function makeFlat(arrayOrScalar){
        if(Array.isArray(arrayOrScalar)){
            for(let i = 0;i < arrayOrScalar.length; i++){
                makeFlat(arrayOrScalar[i])
            }
        }else{
            newArr.push(arrayOrScalar)
        }
    }
    makeFlat(arr)
    return newArr
}