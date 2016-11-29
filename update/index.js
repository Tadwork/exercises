
var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : [].slice.call(arr);
};
var _spread =  function (context, command,val){
	context[command].apply(context,_toArray(val));
}
var hasOwnProperty = {}.hasOwnProperty;
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
		for(var prop in state){
			if(hasOwnProperty.call(state,prop)){
				newState[prop] = state[prop];
			}
		}
		for(var prop in commands){
			if(prop === '$set'){
				newState = commands['$set'];
			}else 
			if(prop === '$merge'){
				var merge = commands['$merge'];
				for(var mergeProp in merge){
					if(hasOwnProperty.call(merge,mergeProp)){
						newState[mergeProp] = merge[mergeProp]
					}
				}	
			}else 
			if(prop === '$apply'){
				newState = commands['$apply'].apply(newState,[state]);
			}else{
				if(hasOwnProperty.call(commands,prop)){
					newState[prop] = update(state[prop],commands[prop])
				}
			}
		}	
	}
	return newState;
}