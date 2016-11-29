function sequence(arr){
	var response;
	var error;
	return function(cb){
		function call(i){
			arr[i].call(null,function(err,res){
				if(i+1 < arr.length){
					response = res;
					error = err;
					call(i+1)
				}else{
					cb(err,res);
				}
			},response);
		}
		call(0);
	}
}
function race(arr){
	var completed = false;
	return function(cb){
		function call(i){
			arr[i].call(null,function(err,res){
				if(completed === false ) cb(err,res);
				completed =true;
			});
		}
		for(var i = 0; i< arr.length; ++i){
			call(i)
		}
	}
}
function parallel(arr){
	var responses = [];
	var errors = [],
		completed = 0;
	return function(cb){
		function call(i){
			arr[i].call(null,function(err,res){
				responses[i] = res;
				errors[i] = err;
				if(completed < arr.length -1){
					completed++;
				}else{
					cb(errors,responses);
				}
			});
		}
		for(var i = 0; i< arr.length; ++i){
			call(i)
		}
	}
}
module.exports = {
	sequence:sequence,
	race:race,
	parallel:parallel
}