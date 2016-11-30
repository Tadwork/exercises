module.exports = function curry(func){
	return function(){
		var curried = function(){
			var ret,
				argumentsAsAnArray =  Array.prototype.slice.call(arguments),
				args = this.args.concat(argumentsAsAnArray);
				ret = curried.bind({args: args});
				ret.valueOf = function(){
								return func.apply(null,args);
							}
			return ret;
		}
		// calling the curried function starts off with no args 
		return curried.apply({args:[]},arguments);
	}
}