module.exports = function flatten(thunk){
	return function (cb){
		var proxy = function(err,result){
			if(typeof result === 'function'){
				flatten(result)(proxy)
			}else{
				cb(err,result)
			}	
		}
		thunk(proxy)
	}
}
