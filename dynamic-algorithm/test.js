var assert = require('assert');
var dynamic = require('./');

describe('dynamic algorithm (knapsack problem)', function() {

  it('finds the most efficient grant cap that still funds all the grants', function() {
  
    const grantsArray = [2, 100, 50, 120, 1000], 
          newBudget = 190
    assert.deepEqual(dynamic(grantsArray,newBudget),47 );
  });
  it('divides the fractional amount between reduced values', function() {
  
    const grantsArray = [2, 4], 
          newBudget = 3
    assert.deepEqual(dynamic(grantsArray,newBudget),1.5 );
  });
  it('uses the whole budget even when all are greater than the budget', function() {
  
    const grantsArray = [2, 4, 6], 
          newBudget = 3
    assert.deepEqual(dynamic(grantsArray,newBudget),1 );
  });
  it('finds the most efficient use of funds with large numbers', function() {
  
    const grantsArray = [2, 100,50,120,167], 
          newBudget = 400
    assert.deepEqual(dynamic(grantsArray,newBudget),128 );
  });
  it('adds a fraction even when only some are fractional', function() {
  
    const grantsArray = [21, 100,50,120,130,110], 
          newBudget = 140
    assert.deepEqual(dynamic(grantsArray,newBudget),23.8 );
  });
  it('can divide a larger array and still find the most efficient in O(n * max) time', function() {
  
    const grantsArray = [210,200,150,193,130,110,209,342,117], 
          newBudget = 1530
    assert.deepEqual(dynamic(grantsArray,newBudget),211 );
  });
});
