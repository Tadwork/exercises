function setZeros(matrix){
  if(matrix.length === 0) return matrix
  const rows = matrix.length ,
        cols = matrix[0].length
  for(let r = 0; r < rows; r++){
    for(let c = 0; c < cols; c++){
      if(matrix[r][c] === 0){
        matrix[r][0] = null
        matrix[0][c] = null
      }
    }
  }
  for(let r = 0; r < rows; r++){
    if(matrix[r][0] === null){
      for(let c = 0; c < cols; c++){
        matrix[r][c] = 0
      }
    }
  }
  for(let c = 0; c < cols; c++){
    if(matrix[0][c] === null){
      for(let r = 0; r < rows; r++){
        matrix[r][c] = 0
      }
    }
  }
  return matrix
}


module.exports = setZeros
