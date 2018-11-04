var assert = require('assert');
var matches = require('./');

describe('find number of matches', function() {

  it('returns 4 when it can be divided', function() {
    assert.equal(matches("RLRRLLRLRRLL"),4);
  });

  it('returns 1 when there is only 1 match', function() {
    assert.equal(matches("LLRLRLRLRLRLRR"),1 );
  });
});
