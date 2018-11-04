function findGrantsCap(grantsArray, newBudget) {
    const grants = [];
    let mostEfficient
    for(let grant = 0; grant < grantsArray.length;grant++){
      for(let amount = 0;amount < newBudget;amount++){
          if(!grants[grant]){
            grants[grant] = []
          }
          const specificGrant = grantsArray[grant]
          let howMuchWeCanFitWithThisCap;
          if(specificGrant > amount){
            howMuchWeCanFitWithThisCap = amount
          }else{
            // cap it at this amount
            howMuchWeCanFitWithThisCap = specificGrant
          }
          const numberIsReduced = (specificGrant > amount ? 1 : 0) 
          if(grants[grant-1] ){
            if(grants[grant-1][amount].total + howMuchWeCanFitWithThisCap <= newBudget){
              const newList = grants[grant-1][amount].list.slice()
              newList.push(howMuchWeCanFitWithThisCap)
              grants[grant][amount] = {
                total: grants[grant-1][amount].total + howMuchWeCanFitWithThisCap,
                list: newList,
                countOfNumbersThatWereReduced : grants[grant-1][amount].countOfNumbersThatWereReduced +  numberIsReduced
              }
            }else{
              // keep the previous best
              grants[grant][amount] = grants[grant-1][amount]
            }
          }else{
            grants[grant][amount] = {
              total: howMuchWeCanFitWithThisCap,
              list: [howMuchWeCanFitWithThisCap],
              countOfNumbersThatWereReduced : numberIsReduced
            }
          }
          // final row
          if(grant === grantsArray.length -1){
            if(grants[grant][amount].list.length === grantsArray.length)         { // has all of the grants in it
              if(mostEfficient){
                if(mostEfficient.total < grants[grant][amount].total){
                  mostEfficient = grants[grant][amount]
                }
              }else{
                  mostEfficient = grants[grant][amount]
              }
            }
          }
        }
        
      }
    const leftAfterMostEfficientWholeFound = newBudget - mostEfficient.total
    const mostEfficientWholeNumber = mostEfficient.list.reduce((prev,next)=> (next > prev) ? next : prev)
    
    return mostEfficientWholeNumber + (leftAfterMostEfficientWholeFound / mostEfficient.countOfNumbersThatWereReduced )
  }
const reverse = (a,b)=>{
    if(a < b) return 1
    else if(a === b) return 0
    else return -1
}
const sum = (a,b)=>a+b
function findGrantsCapGreedy(grantsArray, newBudget){
    const length = grantsArray.length
    let totalWithoutSurplus = grantsArray.reduce(sum,0)
    const sorted = grantsArray.sort(reverse)
    sorted.push(0)
    // loop throught the array from largest to
    // smallest and see if that can be the cap
    let grant
    for(grant = 0; grant< grantsArray.length; grant++){
        if(totalWithoutSurplus + (grantsArray[grant] * grant) > newBudget){
          totalWithoutSurplus -= grantsArray[grant]
        }else{
          break
        }
    }
    return (newBudget - totalWithoutSurplus) / grant
}
  module.exports = findGrantsCapGreedy