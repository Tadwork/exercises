module.exports = function flatten(arr){
	if(Array.isArray(arr)){
		var newArr = [];
		for(var i =0;i<arr.length; ++i){
			newArr = newArr.concat(flatten(arr[i]))
		}
		return newArr;
	}else{
		return arr;
	}
}