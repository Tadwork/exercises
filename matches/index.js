function matches(pairs){
  let right = 0,
      left = 0,
      count = 0
      for(let s of pairs){
        if(s === "R") right++
        else if(s === "L") left++
        if(right === left) {
          count++
        }
      }
      return count
}
function matchesWithStack(pairs){
  let stack = [],
      count = 0,
      toMatch = {
        R: 'L',
        L: 'R'
      }
      for(let shoe of pairs){
        if(stack[stack.length -1] === toMatch[shoe]){
          stack.pop()
        }else{
          stack.push(shoe)
        }
        if(stack.length === 0) {
          count++
          stack = []
        }
      }
      return count
}
module.exports = matches