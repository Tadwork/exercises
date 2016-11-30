module.exports = function curry(func){
	return function(){
		var curried = function(){
			var ret,
				argsArray =  Array.prototype.slice.call(arguments),
				args = this.args.concat(argsArray);
			// reset if we have all the arguments 
			// and just return the computed value instead
			if(args.length >= func.length ){
				ret = func.apply(null,args);
			}else{
				ret = curried.bind({args: args});
			}
			return ret;
		}
		return curried.apply({args:[]},arguments);
	}
}