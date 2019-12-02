var assert = require('assert');
var three_sum = require('.');


describe('3sum', function() {
  it('returns an empty array when given one', function() {
    const numbers = []
    var result = three_sum(numbers);
    assert.deepEqual(result, []);
  });
  it('returns a simple triplicate', function() {
    const numbers = [0,1,-1]
    var result = three_sum(numbers);
    assert.deepEqual(result, [[-1,0,1]]);
  });
  it('will not reuse a value', function() {
    const numbers = [-2,1,2]

    var result = three_sum(numbers);
    assert.deepEqual(result, []);
  });
  it('[-1, 0, 1, 2, -1, -4] return [[-1, 0, 1],[-1, -1, 2]]', function() {
    const numbers = [-1, 0, 1, 2, -1, -4]

    var result = three_sum(numbers);
    assert.deepEqual(result, [[-1, -1, 2],[-1, 0, 1]]);
  });
  it('[0,0,0] return that as the solution', function() {
    const numbers = [0,0,0]

    var result = three_sum(numbers);
    assert.deepEqual(result, [[0,0,0]]);
  });

  it('[0,0,0,0] return that as the solution', function() {
    const numbers = [0,0,0,0]

    var result = three_sum(numbers);
    assert.deepEqual(result, [[0,0,0]]);
  });
  it('all negative values return []', function() {
    const numbers = [-1,-2,-3]

    var result = three_sum(numbers);
    assert.deepEqual(result, []);
  });
  it('returns all combinations fo 3 sum', function() {
    const numbers = [-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]

    var result = three_sum(numbers);
    assert.deepEqual(result, [[-4,-2,6],[-4,0,4],[-4,1,3],[-4,2,2],[-2,-2,4],[-2,0,2]]);
  });
  it('[0,-4,-1,-4,-2,-3,2] returns correct value ', function() {
    const numbers = [0,-4,-1,-4,-2,-3,2]

    var result = three_sum(numbers);
    assert.deepEqual(result, [[-2,0,2]]);
  });

});
