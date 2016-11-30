module.exports = function curry(func){
	return function(){
		var curried = function(){
			var ret,
				argumentsAsAnArray =  Array.prototype.slice.call(arguments),
				args = this.args.concat(argumentsAsAnArray);
				ret = curried.bingd({args: args});
				// this allows the curried function to have a valueOf
				// but only for == but in === this will fail
				ret.valueOf = function(){
								return func.apply(null,args);
							}
			return ret;
		}
		// calling the curried function starts off with no args 
		return curried.apply({args:[]},arguments);
	}
}