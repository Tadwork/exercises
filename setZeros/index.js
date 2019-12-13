/**
 *
 *
 * @param {Array<Array<number>>} matrix
 * @returns
 */
function setZeros(matrix){
  if(matrix.length === 0) return matrix
  const rows = matrix.length ,
        cols = matrix[0].length
  let zero_on_first_row = false
  for(let r = 0; r < rows; r++){
    for(let c = 0; c < cols; c++){
      if(matrix[r][c] === 0){
        matrix[0][c] = matrix[r][0] = null
        if(r === 0)zero_on_first_row = true
      }
    }
  }
  for(let r = 1; r < rows; r++){
    if(matrix[r][0] === null ){
      matrix[r].fill(0)
    }
  }
  for(let c = 0; c < cols; c++){
    if(matrix[0][c] === null ){
      for(let r = 0; r < rows; r++) matrix[r][c] = 0
    }
  }
  if(zero_on_first_row ){
    matrix[0].fill(0)
  }
  return matrix
}


module.exports = setZeros
