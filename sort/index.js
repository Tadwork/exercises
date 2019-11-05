
/**
 *
 *
 * @param {Array<*>} array
 */
function quick_sort(array){
  /**
   * check to see if the values need to and then swap the values in the array at the index positions
   *
   * @param {number} right_index
   * @param {number} left_index
   */
  function check_and_swap(left_index,right_index){
    if( array[left_index] > array[right_index]){
      const temp = array[right_index]
      array[right_index] = array[left_index]
      array[left_index] = temp
    }
  }
  /**
   * sort
   *
   * @param {number} start_index
   * @param {number} end_index this is inclusive ("6" for the end of an array containing 7 items )
   */
  function sort_section(start_index,end_index){
    // add one because the end_index is inclusive so 5-6 is really two items
    const length = (end_index - start_index) + 1
    if(length === 2){ //only 2 items
        check_and_swap(start_index,end_index)
    } else if(length > 2 ){
      let left_index = start_index,
          right_index = end_index - 1
      while(left_index <= right_index){
        if(array[left_index] < array[end_index]){
          // try moving left first
          left_index++
        }else if(array[right_index] >= array[end_index]){
          // if we can't move the left pointer, move the right pointer until we find the pivot
          right_index--
        }else{
          // swap at the pivot!
          check_and_swap(left_index,right_index)
        }
      }
      check_and_swap(left_index,end_index)
      sort_section(start_index,left_index - 1)
      sort_section(left_index + 1,end_index)
    }
  }
  sort_section(0,array.length - 1)
  return array
}

module.exports = quick_sort
