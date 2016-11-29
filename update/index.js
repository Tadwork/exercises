
var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : [].slice.call(arr);
};
var _spread =  function (context, command,val){
	context[command].apply(context,_toArray(val));
}
module.exports = function update(state,commands){
	var newState = {};
	if(Array.isArray(state)){
		newState= state.slice(0);
		if(commands['$push']){
			_spread(newState,'push',commands['$push'])
		}
		if(commands['$unshift']){
			_spread(newState,'unshift',commands['$unshift'])
		}
		if(commands['$splice']){
			_spread(newState,'splice',commands['$splice'][0])
		}
	}else{
		var stateProps = Object.getOwnPropertyNames(state);
		for(var s = 0; s< stateProps.length; ++s){
			var prop = stateProps[s]
			if(commands[prop] === undefined){
				newState[prop] = state[prop];
			}else{
				newState[prop] = update(state[prop],commands[prop])
			}
		}	
		if(commands['$set']){
			newState = commands['$set'];
		}
		if(commands['$merge']){
			var merge = commands['$merge'];
			var mergeProps = Object.getOwnPropertyNames(merge);
			for(var s = 0; s< mergeProps.length; ++s){
				var prop = mergeProps[s];
				newState[prop] = merge[prop]
			}	
		}
		if(commands['$apply']){
			newState = commands['$apply'].apply(newState,[state]);
		}
	}
	return newState;
}