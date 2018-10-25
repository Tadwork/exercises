function swap(arr,left,right){
    if(left === right) return
    const temp = arr[left]
    arr[left] = arr[right]
    arr[right] = temp
}
function partition(arr,start,end){
    const pivot = end
    const pivotValue = arr[pivot]
    end-- // move the pivot to the left once
    let stillPartitioning = true
    while(stillPartitioning){
        while(arr[start] < pivotValue){
            start++
        }
        while(arr[end] > pivotValue){
            end--
        }
        if(start >= end){
            stillPartitioning = false
        }else{
            swap(arr,start,end)
        }
    }
    swap(arr,start,pivot)
    return start
}
function quick_sort(arr,start,end){
    const length  = end - start
    
    if(length > 0){
        const pivot = partition(arr,start,end)
        quick_sort(arr,start,pivot -1)
        quick_sort(arr,pivot+1 ,end)
    }
    return arr
}

function sort(arr){
    return quick_sort(arr,0,arr.length - 1)
}
module.exports = sort