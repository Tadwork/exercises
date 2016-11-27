module.exports = function(func,time){
	var called,
		args,
		context;
	var debounced = function(){
		context = this;
		args = arguments;
		//only gets called once
		if(called === undefined 
		   || called === true/* resets the function if called after the threshold*/){
			called = false;
			setTimeout(function(){
					called = true;
					func.apply(context,args);
			},time);
		}
	}
	return debounced;
}