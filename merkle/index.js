const merkle = function(arr,hasher){
    
    function computeVerification(start,end,level){
        const length = end - start
        if(length <= 0 )return
        if(length <= 2 ){
            const first = verificationTree[start]
            let second = start+1 > end ? first : verificationTree[start +1]
            if(!first && !second){
                return 
            }
            if(first && !second){
                second = first
            }
            // console.log(first,second)
            const hash = hasher(first + second)
            verificationTree[Math.floor(start / 2) ] = hash
            return hash
        }
        let mid = start + Math.round(length / 2)
        if(mid % 2 === 1){
            mid++
        }
        computeVerification(start,mid,level)
        computeVerification(mid,end,level)
        // const treeLevelStart = Math.pow(level - 1,2) 
// console.log(treeLevelStart,(treeLevelStart * 2) + 1)
        // return computeVerification(treeLevelStart,(treeLevelStart * 2)  ,level - 1)
    }
    const level = Math.ceil(Math.log2(arr.length))
    const start = Math.pow(level,2)
    // create an array of the right size
    const verificationTree = new Array(start *2)
    // place the array into the 'leaves' of the merkle tree
    verificationTree.splice(start,start,...arr)

    const root = computeVerification(start,start+ arr.length,level)
    console.log(verificationTree)

    return {
        root,
        getVerification:function(item){
            // const verificationChain = [];
            // for(var index in merkleArray){
            //     if(merkleArray[index]=== item){
            //         if(index % 2 === 0){
            //             verificationChain.push
            //         }
            //         break
            //     }
            // }
        }
    }
}
merkle.verify = function(leafToVerify,root,verificationChain,hasher){

}
module.exports = merkle