/**
 *
 *
 * @param {Array<number>} coins
 * @param {number} amount
 */
function coin_change(coins,amount){
  const coins_needed = [0]
  const sorted_denominations = coins.sort((a,b)=>a-b)

  for(let coin of sorted_denominations){
    for(let a = coin;a <= amount;++a){
      let coins_for_amount  =  0;
      for(let build_up = coin;build_up<=a;build_up+=coin){
        coins_for_amount++
        const remainder = a-build_up
        if(coins_for_amount + coins_needed[remainder] < coins_needed[a] || !coins_needed[a]){
          coins_needed[a] = coins_for_amount + coins_needed[remainder]
        }
      }
    }
  }

  // check for a number (not undefined or null)
  return Number.isInteger(coins_needed[amount]) ? coins_needed[amount] : -1
  
}
/*
 simple approach is to get every possible combination of coins
 for [4,5] to get 8 that would be [4], [4,4], [4,5], [5],[5,4],[5,5]

*/
function brute_force_coin_change(coins,amount){
  const sorted_denominations = coins.sort((a,b)=>a-b)

  const base_case = new Array(sorted_denominations.length).fill(0)
  const combinations = [
    base_case
  ]
  const final_combinations = []
  function get_sum(combination){
    return combination.reduce((sum,cur,i)=>{
      return sum + (sorted_denominations[i] * cur)
    },0)
  }
  for(let a = 0;a < sorted_denominations.length;a++){
    const comb_len = combinations.length
    for(let comb = 0;comb < comb_len;comb++){
      let new_combination = combinations[comb]
      do{
        new_combination = new_combination.slice()
        new_combination[a] +=1
        combinations.push(new_combination)
      }while(get_sum(new_combination) < amount)

      if(get_sum(new_combination) === amount){
        final_combinations.push(new_combination)
      }
    }
  }
  const val = final_combinations.reduce((min,possible_solution)=>{
    const total_coins = possible_solution.reduce((a,b)=>a+b,0)
    if(total_coins < min || min === -1){
      console.log(possible_solution)
      return total_coins
    }else{
      return min
    }
  },-1)
  return val
}
module.exports = coin_change

function debug(coins_needed,amount)
{

  console.log(`{`)

  for(let a = 0;a <= amount;++a){
    if(coins_needed[a]){
      console.log(`   ${a}:${coins_needed[a]}`)
    }
  }
  console.log(`}`)
}
