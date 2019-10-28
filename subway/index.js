/**
 * A subway entrance
 * @typedef  GeometryPoint
 * @property {string} type - will always be "Point" for this data set
 * @property {[number, number]} coordinates - always 2 points, Long first and then Lat
*/

/**
 * A subway entrance
 * @typedef  SubwayEntrance
 * @property {number} objectid - The ID
 * @property {string} url - URL
 * @property {string} name - name
 * @property {GeometryPoint} the_geom - entrance
 * @property {string} line - subway lines that stop at this station
 * @property {Array<SubwayEntrance>} other_entrances - subway lines that stop at this station
 * @property {string} location_name - name without "at X corner"

 */

/**
 *
 *
 * @param {number} degrees
 * @returns {number} radians
 */
function toRadians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

/**
 *
 * https://www.movable-type.co.uk/scripts/latlong.html
 *
 * @param {GeometryPoint} point1
 * @param {GeometryPoint} point2
 * @returns {number} the distance in meters
 */
function distance_between_two_points(point1,point2){

      var radius_of_the_earth = 6371e3; // in meters
      var latitude_of_1 = Number(point1.coordinates[1]);
      var latitude_of_2 = Number(point2.coordinates[1]);
      var delta_of_latitude = toRadians(latitude_of_2-latitude_of_1);
      var longitude_of_1 = Number(point1.coordinates[0]);
      var longitude_of_2 = Number(point2.coordinates[0]);
      var delta_of_longitude = toRadians(longitude_of_2-longitude_of_1);

      var square_of_half_the_cord_length = Math.sin(delta_of_latitude/2) * Math.sin(delta_of_latitude/2) +
              Math.cos(toRadians(latitude_of_1)) * Math.cos(toRadians(latitude_of_2)) *
              Math.sin(delta_of_longitude/2) * Math.sin(delta_of_longitude/2);
      var angular_distance = 2 * Math.atan2(Math.sqrt(square_of_half_the_cord_length), Math.sqrt(1-square_of_half_the_cord_length));

      return radius_of_the_earth * angular_distance;
}
/**
 * @type {Array<SubwayEntrance>}
 */

function cleanUpSubwayEntranceData(nycSubwayLocations){

    // remove all the "exit only" subway "entrances"
    const nycSubwayEntrances = nycSubwayLocations.filter((subway)=>{
      return subway.name && subway.name.indexOf("exit only") === -1
    })

    // add location_name data (removing "at X Corner")
    nycSubwayEntrances.forEach((subway)=>{
      if(subway.name){
        const location_of_direction_information = subway.name.indexOf(" at ")
        if(location_of_direction_information !== -1){
          subway.location_name = subway.name.slice(0,location_of_direction_information)
        }else{
          subway.location_name = subway.name
        }
      }
    })
    // group by location name
     const groupedEntrances = nycSubwayEntrances.reduce((subway_entrances,current_entrance)=>{
        if(subway_entrances.has(current_entrance.location_name)){
          subway_entrances.get(current_entrance.location_name).other_entrances.push(current_entrance)
        }else{
          subway_entrances.set(current_entrance.location_name,current_entrance)
          current_entrance.other_entrances = []
        }
        return subway_entrances
    },new Map())
    return Array.from(groupedEntrances.values())
}
const groupedSubwayEntrances = cleanUpSubwayEntranceData(require('./subwayEntrances.json'))
/**
 *
 *
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Array} 5 closest subways
 */
function getClosest(latitude, longitude){
  /**
   * @type {GeometryPoint}
   */
  const location = {
    coordinates:[longitude,latitude]
  }
  const sorted_by_distance = groupedSubwayEntrances.sort((a,b)=>{
      return distance_between_two_points(location,a.the_geom) -distance_between_two_points(location,b.the_geom)
  })

  return sorted_by_distance.slice(0,5)
}

module.exports = {
  cleanUpSubwayEntranceData,
  getClosest
}
