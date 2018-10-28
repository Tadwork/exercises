
module.exports = function(state,mutations){
    function change(obj,mutationAtLevel){
        let copy;
        if(Array.isArray(obj)){
            copy = obj.slice()
        }else if(typeof obj === 'object'){
            copy = Object.assign({},obj)
        }else{
            copy = obj
        }
        for(let prop in mutationAtLevel){
            if(prop === '$set'){
                copy[prop] = copy =  mutationAtLevel[prop]
            }else if(prop === '$push'){
                copy.push.apply(copy,mutationAtLevel[prop])
            }else if(prop === '$unshift'){
                copy.unshift.apply(copy,mutationAtLevel[prop])
            }else if(prop === '$splice'){
                for(let i = 0; i< mutationAtLevel[prop].length; i++){
                    copy.splice.apply(copy,mutationAtLevel[prop][i])
                }
            }else if(prop === '$merge'){
                Object.assign(copy,mutationAtLevel[prop])
            }else if(prop === '$apply'){
                copy = mutationAtLevel[prop].call(null,copy)
            }else{
                copy[prop] = change(obj[prop],mutationAtLevel[prop])
            }
        }
        return copy
    }
    return change(state,mutations)
}