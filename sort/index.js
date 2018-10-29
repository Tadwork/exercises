function swap(arr,a,b){
    const temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
}

function partition(arr,start,end){
    let pivot = end,
        pivotVal = arr[pivot]
    while(start < end){
        while(arr[start] < pivotVal){
            start++
        }
        while(arr[end] > pivotVal){
            end--
        }
        if(start < end){
            swap(arr,start,end)
        }
    }
    return end
}
function quick_sort(arr,start,end){
    if(start < end){
        const pivot = partition(arr,start,end)
        quick_sort(arr,start,pivot-1)
        quick_sort(arr,pivot+1,end)
    }
    return arr
}

function sort(arr){
    return quick_sort(arr,0,arr.length-1)
}
module.exports = sort