var assert = require('assert');
var competing = require('.');


describe('competing houses', function() {
  it('no days', function() {
    const numbers = []
    var result = competing([0,1,0,0,1,0,1,0],0);
    assert.deepEqual(result, [0,1,0,0,1,0,1,0]);
  });

  it('one days', function() {
    const numbers = []
    var result = competing([0,1,0,0,1,0,1,0],3);
    assert.deepEqual(result, [0,1,0,0,1,0,1,0]);
  });
});
