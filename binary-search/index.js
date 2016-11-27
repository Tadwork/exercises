function searchB(arr,elem
				, start /*optional start position*/
				, end /*optional end position*/){
	var index = -1;
	start = start || 0;
	end = end || arr.length,
	length = end-start;
	if(length === 1 && elem === arr[start]){
		index = start;
	}else if(length > 1){
		var half = Math.round(length / 2),
			middle = start+half;
		if(arr[middle] === elem){
			return middle;
		}else if(elem < arr[middle]){
			index = searchB(arr,elem,start,middle);
		}else{
			index = searchB(arr,elem,middle,end);
		}
	}
	return index;
}
function search(arr, ele) {
  var len = arr.length;
  if (len === 0) {
    return -1;
  }

  function _search(startIdx, endIdx) {
    if (startIdx === endIdx && arr[startIdx] !== ele) {
      return -1;
    }
    var middleIdx = startIdx + Math.floor((endIdx - startIdx) / 2);
    if (arr[middleIdx] > ele) {
      return _search(startIdx, middleIdx);
    } else if (arr[middleIdx] < ele) {
      return _search(middleIdx + 1, endIdx);
    } else {
      return middleIdx;
    }
  }

  return _search(0, len);
}
module.exports= searchB;