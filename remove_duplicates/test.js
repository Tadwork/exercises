var assert = require('assert');
var removeDuplicates = require('.');


describe('removeDuplicates', function() {

  it('remove duplicate numbers', function() {
    const nums = [1,1,2]

    var res = removeDuplicates(nums);
    assert.equal(res, 2);
  });

  it('remove duplicate numbers advanced case', function() {
    const nums = [0,0,1,1,1,2,2,3,3,4]

    var res = removeDuplicates(nums);
    assert.equal(res, 5);
  });



});
