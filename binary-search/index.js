
const simple = function(array,toFind){
    function partition(start,end){
        const length = (end - start)
        // base case
        if(length < 0 ){
            return -1
        }
        let mid = start + Math.floor( length / 2)
        // check this value
        if(toFind === array[mid]){
            return mid;
        }else if(toFind < array[mid]){
            return partition(start,mid -1)
        }else if(toFind > array[mid]){
            return partition(mid + 1,end)
        }
    }
    return partition(0,array.length -1)
}

module.exports = simple;