const merkle = function(arr,hasher){
    let level = Math.ceil(Math.log2(arr.length))
    let amountOfLeaves = Math.pow(2,level)
    // create an array of the right size
    const verificationTree = new Array(amountOfLeaves *2)
    // place the array into the 'leaves' of the merkle tree
    const start = amountOfLeaves -1
    verificationTree.splice(start ,amountOfLeaves,...arr)

    function computeVerification(start,end,level){
        const length = end - start
        if(length <= 2 ){
            const first = verificationTree[start]
            let second = verificationTree[start +1]
            if(!first && !second){
                return 
            }
            if(first && !second){
                second = first
            }
            const hash = hasher(first + second)
            verificationTree[Math.floor(start / 2) ] = hash
            return hash
        }
        const mid = start + Math.round(length / 2)
        computeVerification(start,mid,level)
        computeVerification(mid,end,level)
    }
    let root;
    while(level > 0){
        amountOfLeaves = Math.pow(2,level)
        root = computeVerification(amountOfLeaves -1 ,amountOfLeaves -1 + amountOfLeaves,level)
        level--
    }

    return {
        root,
        getVerification:function(item){
            const verificationChain = [];
            for(var index = start; index < verificationTree.length; index++){
                if(verificationTree[index]=== item){
                    let nodeIndex = index /* start at the 'item' node */
                    function getSibling(){
                        let sibling
                        if(nodeIndex % 2 === 1){ /*odd nodes*/ 
                            /* take the sibling @ right*/
                            sibling  = verificationTree[nodeIndex + 1]
                            if(sibling === undefined){
                                sibling = item
                            }
                            return (link)=>link + sibling
                        }else{
                            /* take the sibling @ left*/
                            sibling  = verificationTree[nodeIndex - 1]
                            return (link)=>sibling + link
                        }
                    }
                    while(nodeIndex !== 0){
                        verificationChain.push(
                            getSibling()
                        )
                        /* get this nodes parent so we go up the chain*/
                        nodeIndex = Math.floor((nodeIndex - 1) / 2)
                    }
                    break
                }
            }
            return verificationChain
        }
    }
}
merkle.verify = function(leafToVerify,root,verificationChain,hasher){
    const derivedRoot = verificationChain.reduce((hash,linkFunc)=>{
        return hasher(linkFunc(hash))
    },leafToVerify)
    return derivedRoot === root
}
module.exports = merkle