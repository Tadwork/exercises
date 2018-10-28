function search(array,start,end,val){
    const length = end-start
    if(length >= 0){
        const mid = start + Math.floor(length / 2)
        if(array[mid] === val){
            return mid
        }else if(array[mid] > val){
            return search(array,start,mid-1,val)
        }else if(array[mid] < val){
            return search(array,mid+1,end,val)
        }
    }
    return -1
}
const simple = function(array,toFind){
    return search(array,0,array.length-1,toFind)
}

module.exports = simple;