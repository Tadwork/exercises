module.exports = function (arr,func,ctx){
	var newArr = [],
		context = ctx || this;
	for(var i = 0; i<arr.length; ++i ){
		newArr.push(func.call(context,arr[i],i,arr))
	}
	return newArr;
}