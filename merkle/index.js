
function getStart(level){
  return Math.pow(2,level) -1
}
function getParent(node){
  return Math.floor((node-1) /2)
}

/**
 *
 *
 * @param {Array} array
 * @param {Function} hasher
 * @returns
 */
function merkle(array, hasher){
  const merkle_tree = []

  // function getRightChild(node){
  //   return ((2*(node)) + 2)
  // }
  // function getLeftChild(node){
  //   return  ((2*(node)) + 1)
  // }
  function getHash(node){
    let right_sibling = node+1
    return hasher(merkle_tree[node] + merkle_tree[right_sibling])
  }
  function getEnd(level){
    return getStart(level+1)
  }
  function buildVerificationForLevel(level){
    const start = getStart(level)
    for(let node = start; node < getEnd(level);node+=2){
      merkle_tree[getParent(node)] = getHash(node)
    }
    if(level - 1 > 0){
      buildVerificationForLevel(level -1)
    }
  }

  const leafLevel = Math.ceil(Math.log2(array.length))
  const leaf_start = getStart(leafLevel)
  const tree_size = ((leaf_start * 2) + 1)
  for(let i = leaf_start;i< tree_size ;i++) {
    let array_index = i - leaf_start
    // fill the values left in the array with those from the last available value
    if(array_index +1 > array.length){
      array_index = array.length -1
    }
    merkle_tree[i] = array[array_index]
  }
  buildVerificationForLevel(leafLevel)
  return {
    getVerification,
    root:merkle_tree[0]
  }
   /**
   *
   *
   * @param {Number} value
   * @returns {verificationObj || -1}
   */
  function getVerification(value){
    const index = array.indexOf(value),
          breadcrumbs =[]

    if(index === -1) return index

    let parent = leaf_start + index
    for(let level = leafLevel ; level >0;level--){
      if(parent % 2 === 1 /* odd, so this is on the left*/){
        breadcrumbs.push(merkle_tree[parent + 1])
      }else{
        breadcrumbs.push(merkle_tree[parent - 1])
      }
      parent = getParent(parent)
    }
    return {
      index,
      breadcrumbs
    }
  }
}
// { index: 3, breadcrumbs: [ 'a', '-1790830488' ] }
merkle.verify = function(value, root, verificationObj, hasher){

  const maxLevels =  verificationObj.breadcrumbs.length
  const leaf_start = getStart(maxLevels)
  let verificationValue = value
  let node = leaf_start + verificationObj.index
  for(let l = 0;l < maxLevels;l++){
    let combinedNodes
    if(node % 2 === 1 /* odd, so this is on the left*/){
      combinedNodes = verificationValue + verificationObj.breadcrumbs[l]
    }else{
      combinedNodes = verificationObj.breadcrumbs[l] + verificationValue
    }
    verificationValue = hasher(combinedNodes)
    node = getParent(node)
  }
  return verificationValue === root
}

module.exports = merkle
