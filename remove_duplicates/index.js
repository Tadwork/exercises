/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let end = 0, // end of the deduplicated array
      start_ptr = 0
  // use a pointer to track the beg. and end of a section of duplicates
  for(let end_ptr=0; end_ptr<nums.length; ++end_ptr){
    const item = nums[start_ptr]
    // when we have found the end of a section of duplicates
    if(item !== nums[end_ptr+1]){
      // place the item from the duplicated section at the end of the deduped array
      nums[end]= item
      end++
      // begin searching for duplicates after the new section
      start_ptr = end_ptr+1
    }
  }
  // to actually shorten the array to the de-duped size remove everything after the "end" index
  // nums.splice(end,nums.length-end)
  return end
};
module.exports = removeDuplicates

