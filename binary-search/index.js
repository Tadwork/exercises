

function binarySearch(list, toFind){
    function binarySearchPart(beg,end){
        const length = (end - beg)
        if(length === 0 ){
            if(toFind === list[beg] ){
                return beg
            }
            return -1
        } 
        const mid = beg + Math.floor(length / 2)
        const midValue = list[mid]
        if(toFind <= midValue){
            return binarySearchPart(beg,mid)
        }else if(toFind > midValue){
            return binarySearchPart(mid +1, end)
        }
    }
    return binarySearchPart(0,list.length)
}

module.exports = binarySearch