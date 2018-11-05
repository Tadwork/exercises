module.exports = function(pairs){
    let right =0,
            left = 0,
            count = 0
        for(let i = 0;i<pairs.length;i++){
            if(pairs[i] === 'R') right++
            if(pairs[i] === 'L') left++
            if(right === left ) count++
        }
        return count
}