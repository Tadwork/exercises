var assert = require('assert');
var set_zeros = require('.');


describe('set zeros', function() {
  it('transforms the matrix in place to set zeros (base case)', function() {
    const matrix = [
        [1,1,1],
        [1,0,1],
        [1,1,1]
    ]
    const result = set_zeros(matrix);
    const expected = [
      [1,0,1],
      [0,0,0],
      [1,0,1]
  ]
    assert.deepEqual(result,expected);
    // in place
    assert.deepEqual(matrix,expected);
  });


  it('more columns than rows', function() {
    const matrix = [
        [1,1,1,1],
        [1,0,1,1],
        [1,1,1,1]
    ]
    const result = set_zeros(matrix);
    const expected = [
      [1,0,1,1],
      [0,0,0,0],
      [1,0,1,1]
  ]
    assert.deepEqual(result,expected);
  });
  it('more rows than columns', function() {
    const matrix = [
        [1,1,1],
        [1,0,1],
        [1,1,1],
        [1,1,1]
    ]
    const result = set_zeros(matrix);
    const expected = [
      [1,0,1],
      [0,0,0],
      [1,0,1],
      [1,0,1]
  ]
    assert.deepEqual(result,expected);
  });

  it('row and column same line', function() {
    const matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
    const result = set_zeros(matrix);
    const expected = [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
    assert.deepEqual(result,expected);
  });

  it('zero and bottom left', function() {
    const matrix = [[1,1,1],[0,1,2]]
    const result = set_zeros(matrix);
    const expected = [[0,1,1],[0,0,0]]
    assert.deepEqual(result,expected);
  });

  it('only two top rows', function() {
    const matrix = [[-4,-2147483648,6,-7,0],[-8,6,-8,-6,0],[2147483647,2,-9,-6,-10]]
    const result = set_zeros(matrix);
    const expected = [[0,0,0,0,0],[0,0,0,0,0],[2147483647,2,-9,-6,0]]
    assert.deepEqual(result,expected);
  });
});
