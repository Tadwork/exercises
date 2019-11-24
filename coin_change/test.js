var assert = require('assert');
var coinChange = require('./');


describe('coin change', function() {

  it('can find the minimum number of coins for 12 and denominations of [1,4,5]', function() {
    const denominations = [1,4,5],
      amount = 12

    var smallest = coinChange(denominations, amount);
    assert.equal(smallest, 3);
  });


  it('returns -1 where no answer possible', function() {
    const denominations = [2],
      amount = 3

    var smallest = coinChange(denominations, amount);
    assert.equal(smallest, -1);
  });

  it('returns 4 for [1,2,5,10] for the amonut 18', function() {
    const denominations = [1,2,5,10],
      amount = 18

    var smallest = coinChange(denominations, amount);
    assert.equal(smallest, 4);
  });
  it('returns 2 for [4,5] for the amount 8', function() {
    const denominations = [4,5],
      amount = 8

    var smallest = coinChange(denominations, amount);
    assert.equal(smallest, 2);
  });
  it('returns 20 for [186,419,83,408] for the amonut 6249', function() {
    const denominations = [186,419,83,408],
      amount = 6249

    var smallest = coinChange(denominations, amount);
    assert.equal(smallest, 20);
  });

});
