var assert = require('assert');
var subways = require('./');
const StreetEasyCoordinates = {
  lat:40.738812,
  long: -73.992063
}
describe('subways', function() {

  it('returns an array that has 5 entries', function() {
    const closestSubways = subways.getClosest(StreetEasyCoordinates.lat,StreetEasyCoordinates.long)
    assert.deepEqual(Array.isArray(closestSubways), true);
    assert.deepEqual(closestSubways.length, 5);
  });

  it('returns the first 5 entrances to the StreetEasy offices', function() {

    const closestSubways = subways.getClosest(StreetEasyCoordinates.lat,StreetEasyCoordinates.long)
    assert.deepEqual(closestSubways[0].location_name,"6th Ave & 16th St");
    assert.deepEqual(closestSubways[1].location_name,"Broadway & 16th St");
    assert.deepEqual(closestSubways[2].location_name,"Broadway & 22nd St");
    assert.deepEqual(closestSubways[3].location_name,"5th Ave & 22nd St");
    assert.deepEqual(closestSubways[4].location_name,"Broadway & 23rd St");

  });

  it('adds the location name', function() {
    const entrances = [
      {
        name: "Broadway & 16th St at NE corner"
      }
    ]
    const cleanedUp = subways.cleanUpSubwayEntranceData(entrances)
    assert.deepEqual(cleanedUp[0].location_name,"Broadway & 16th St");

  });

  it('is grouped by location name', function() {
    const entrances = [
      {
        name: "Broadway & 16th St at NE corner"
      },
      {
        name: "Broadway & 16th St at SE corner"
      }
    ]
    const cleanedUp = subways.cleanUpSubwayEntranceData(entrances)
    assert.deepEqual(cleanedUp.length,1);
    assert.deepEqual(cleanedUp[0].other_entrances.length,1);

  });
  it('has exits removed', function() {
    const entrances = [
      {
        name: "Broadway & 16th St at NE corner (exit only)"
      },
      {
        name: "Broadway & 16th St at SE corner"
      }
    ]
    const cleanedUp = subways.cleanUpSubwayEntranceData(entrances)
    assert.deepEqual(cleanedUp.length,1);
    assert.deepEqual(cleanedUp[0].other_entrances.length,0);

  });
});
