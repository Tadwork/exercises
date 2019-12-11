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
});
