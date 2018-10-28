class MerkleTree{
    
    constructor(arr,hasher){
        this.hasher = hasher
        this.levels = Math.ceil(Math.log2(arr.length))
        const maxLeaves = Math.pow(2,this.levels)
        this.tree = new Array( (maxLeaves * 2) -1 )
        this.startOfLeaves = this.getStartOfLevel(this.levels)
        this.tree.splice(this.startOfLeaves ,maxLeaves,...arr)
        this.computeVerificationChain()
        this.root = this.tree[0]
        this.getVerification = this.getVerification.bind(this)
    }
    getStartOfLevel(level){
        return Math.pow(2,level) - 1
    }
    getNode(i){
        if(i > this.tree.length - 1){
            return this.tree[this.tree.length - 1]
        }else{
            return  this.tree[i]
        }
    }
    getParent(i){
        return Math.floor( ((i -1)  /2))
    }
    computeVerificationChain(){
        for(let l = this.levels; l > 0; l--){
            this.computeVerificationChainFromLevel(l)
        }
    }
    computeVerificationChainFromLevel(level,start = this.getStartOfLevel(level) , end = (start *2) +1){
        const length = end - start
        if(length === 2){
            const left = this.getNode(start)
            const right = this.getNode(start + 1)
            const hash = this.hasher(left+right)
            const parent = this.getParent(start)
            this.tree[parent] = hash
        }else if(length > 2){
            const mid = start + (length / 2)
            this.computeVerificationChainFromLevel(level,start,mid)
            this.computeVerificationChainFromLevel(level,mid,end)
        }
    }
    getVerification(leaf){
        const chain =[]
        const getVerificationPairAtLevel = (i,level)=>{
            if(i % 2 === 1){ // odd indices are on the left
                chain.push((left)=> left + this.getNode(i+1))
            }else{ // a right node
                chain.push((right)=> this.getNode(i-1) + right)
            }
            if(level > 1){
                const parent = this.getParent(i)
                getVerificationPairAtLevel(parent,level -1)
            }
        }
        for(let i = this.startOfLeaves; i< this.tree.length;i++){
            if(leaf === this.tree[i]){
                getVerificationPairAtLevel(i,this.levels)
                return chain
            }
        }
    }
    
}
const merkle = function(arr,hasher){
    return new MerkleTree(arr,hasher)
}
merkle.verify = function(leafToVerify,root,verificationChain,hasher){
    const computedRoot = verificationChain.reduce((prev,func)=>{
        const pair = func(prev)
        return hasher(pair)
    },leafToVerify)
    return computedRoot === root
}
module.exports = merkle