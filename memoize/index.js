module.exports = function memoize(func){
	var memoizeMap = {};
	return function(a){
		var key = JSON.stringify(arguments);
		if(memoizeMap[key]){
			return memoizeMap[key];
		}
		memoizeMap[key] = func.apply(null,arguments);
		return memoizeMap[key];
	};
}