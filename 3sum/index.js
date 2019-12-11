/**
 *
 *
 * @param {number[]} numbers
 */
function three_sum_fast(numbers){
    const length = numbers.length,
          result = []
    // must have at least 3 numbers for 3sum
    if(length < 3) return result
    // sort in place O(n log n)
    numbers.sort((a,b)=>a-b)

    let left = 0,
        right = length -1,
        mid = left +1
    const move_right = ()=>{
      while(numbers[right] === numbers[right-1])right--
      right--
    }
    const move_mid = ()=>{
      while(numbers[mid] === numbers[mid+1])mid++
      mid++
    }
    while(
      // at least 2 more numbers to sum until the end
      left < length-2
      // at least one number must be negative to sum to 0
      && numbers[left] <= 0
      ){
        const sum = numbers[left] + numbers[mid] + numbers[right]
        if(sum === 0){
              result.push([numbers[left], numbers[mid], numbers[right]])
              move_right()
              move_mid()
        }else if(sum > 0) move_right()
        else if(sum < 0) move_mid()
        // finished checking all the middle numbers, move the left one number over
        if(mid >= right){
          while(numbers[left] === numbers[left+1])left++
          left++
          mid=left + 1
          right = length - 1
        }
    }
    return result
}

function binary_search(arr, start, end, val) {
  if (end >= start) {
    const mid = start + Math.floor((end - start) / 2);
    if (arr[mid] === val) {
      return mid;
    } else if (val < arr[mid]) {
      return binary_search(arr, start, mid - 1, val);
    } else {
      return binary_search(arr, mid + 1, end, val);
    }
  }
  return null;
}
/**
 *
 *
 * @param {number[]} arr
 */
function threeSum(arr) {
  const ret = [];
  // sort this smallest -> largest O(n log(n))
  arr.sort((a, b) => a - b);
  // start at the first negative number

  // loop until we run out of negative numbers (or 0) to begin with (a negative number is required)
  for (
    let first_ptr = 0;
    // always make sure there are at least 2 more values to add
    first_ptr < arr.length - 2 && arr[first_ptr] <= 0;
    first_ptr++
  ) {
    if (
      // make sure we loop past any duplicate negative values
      arr[first_ptr] !== arr[first_ptr - 1]
    ) {
      // the second value must at least be greater than the first
      for (let sec_ptr = first_ptr + 1; sec_ptr < arr.length - 1; sec_ptr++) {
        // make sure we loop past any duplicate second values (after the first one because we can duplicate the first at least once)
        if (sec_ptr === first_ptr + 1 || arr[sec_ptr] !== arr[sec_ptr - 1]) {
          // compute the value needed to zero out the value
          const complement = -(arr[first_ptr] + arr[sec_ptr]);
          // only look for that value if it is greater or equal than the second value
          if (complement >= arr[sec_ptr]) {
            // if the value exists (start looking from the second pointer until the end of the sorted array)
            if (
              binary_search(arr, sec_ptr + 1, arr.length - 1, complement) !== null
            ) {
              // add it to the top of the return values
              ret.push([arr[first_ptr], arr[sec_ptr], complement]);
            }
          }
        }
      }
    }
  }

  return ret;
}
module.exports = three_sum_fast;
