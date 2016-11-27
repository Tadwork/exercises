module.exports = function search(arr,elem
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
		if(elem < arr[middle]){
			index = search(arr,elem,start,middle);
		}else{
			index = search(arr,elem,middle,end);
		}
	}
	return index;
}