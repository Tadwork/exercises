/**
 * O(m * n) + c
 * @param {string} word1
 * @param {string} word2
 * @return {number} of chars that need to be removed to get
 */
function adjacencyList(word1,word2) {
  const edges = {}
  const nodes = {}
  function map_neighbors(word){
    const arr = ['^',...Array.from(word),'$']
    for(let i=0;i<arr.length - 1;i++){
      const key = arr[i] + arr[i+1]
      if(neighborMap[key]){
        neighborMap[key]++
      }else{
        neighborMap[key] = 1
      }
    }
  }
  map_neighbors(word1)
  map_neighbors(word2)

  // "test"
  // a = ['t','e','s','t']
  // b = ['t','e','s','t','y']
/*
                    '^t'
            /  /   /    \   \   \
        '^t' 'te' 'es' 'st' 'ty' 'y$'


*/
}

/**
 * O(m^2 * n^2)
 * this function will compare chars from w2 against w1 and
 * then shift one char to compare starting from the second char of w1
 * i.e.
 *
 * Round 1:
 * test
 * testy
 *
 * Round 2:
 * test
 * -testy
 *
 * keeping track of the longest common sequence of characters
 *
 * it then flips the order and compares the other way around
 * and takes the minimum distance required when comparing in either order
 *
 * @param {string} w1
 * @param {string} w2
 * @return {number}
 */
function simpleMinDistance(w1,w2) {
  function getLongestCommon(w1,w2){
    // longest common subsection when comparing w2 against w1
    let longestCommon = 0
    for(let c1 = 0;c1<w1.length;c1++){  // O(m)
      let common = 0 // common characters in this pass
      for( // O(n)
        let c2 = 0;
        c2<w2.length && (c2 + c1 < w1.length); // don't go past the end of the first string
        c2++
        ){
        let distance = 0 // length of common subsection
        while(w2[c2] === w1[c1 + c2]){
          distance++
          c2++
        }
        common+=distance
      }
      longestCommon = Math.max(common,longestCommon)
    }
    return w2.length - longestCommon + w1.length - longestCommon
  }
  return Math.min(
    getLongestCommon(w1,w2),// O(m*n)
    getLongestCommon(w2,w1)// O(m*n)
  )
}
module.exports = simpleMinDistance

