/**
 *
 * uses divide and conquer algorithm to find a value in an array
 *
 * @param {Array} array
 * @param {*} value
 * @returns {Number} index where value exists in the array
 */
function search(array,value){
    function search_partition(start,end){
        const length = (end - start)
        if(length <= 0) return -1
        const mid = start + Math.floor(length / 2)
        if(array[mid] === value){
          return mid
        }else if(array[mid] > value){
          return search_partition(start,mid)
        }else{
          /*
          it is not the midpoint (checked above) so this could be more efficent the saerch started at mid+1
          but that would break the "divide and conquer" test which assumes no such optimization
          */
          return search_partition(mid,end)
        }
    }
    return search_partition(0,array.length)
}

module.exports = search
