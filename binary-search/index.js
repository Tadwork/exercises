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

module.exports= searchB;