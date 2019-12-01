var assert = require('assert');
var minDistance = require('.');


describe('minDistance', function() {

  it('"sea", "eat" returns 2', function() {
    const w1 = "sea", w2 = "eat"

    var res = minDistance(w1,w2);
    assert.equal(res, 2);
  });
  it('"testy", "test" returns 1', function() {
    const w1 = "testy", w2 = "test"

    var res = minDistance(w1,w2);
    assert.equal(res, 1);
  });
  it('"tasty", "test" returns 3', function() {
    const w1 = "tasty", w2 = "test"

    var res = minDistance(w1,w2);
    assert.equal(res, 3);
  });
  it('order shouldnt matter ', function() {
    const w1 = "xyz123", w2 = "abcxyz"

    var res = minDistance(w1,w2);
    assert.equal(res, 6);
    var res = minDistance(w2,w1);
    assert.equal(res, 6);
  });
  it('order shouldnt matter when flipped ', function() {
    const w1 = "xyzabc", w2 = "abcxyz"

    var res = minDistance(w1,w2);
    assert.equal(res, 6);
    var res = minDistance(w2,w1);
    assert.equal(res, 6);
  });
  it('repeat letters should still work', function() {
    const w1 = "xyz123xy", w2 = "abcxyzxy"

    var res = minDistance(w1,w2);
    assert.equal(res, 6);
    var res = minDistance(w2,w1);
    assert.equal(res, 6);
  });
  it('no commonalities returns 0', function() {
    const w1 = "12345", w2 = "abcxyz"

    var res = minDistance(w2,w1);
    assert.equal(res, w1.length+w2.length);
  });
});
