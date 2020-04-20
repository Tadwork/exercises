/**
 *
 *
 * @param {number[]} numbers
 */
function competes(states,days){
    const tempStates = []
  for(let i = 0;i < days;i++){
    for(let j = 0;j < states.length;j++){
      if(!!states[j-1]=== !!states[j+1]){
        tempStates[j] = 0
      }else{
        tempStates[j] = 1
      }
    }
    states = tempStates
  }
    return states
}

module.exports = competes
