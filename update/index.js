
module.exports = function(state,mutations){
    function mutate(source,mutation){
        let copy
        if(Array.isArray(source)){
            copy = source.slice()
        }else if(typeof source === 'object'){
            copy = Object.assign({},source)
        }else{
            copy = source
        }
        for(let prop in mutation){
            const newValue = mutation[prop]
            switch(prop){
                case'$set':
                    return newValue
                case '$push':
                    for(let a of newValue)
                        copy.push(a)
                    return copy
                case '$unshift':
                    for(let a of newValue)
                        copy.unshift(a)
                    return copy
                case '$splice':
                    for(let a of newValue)
                        copy.splice.apply(copy,a)
                    return copy
                case '$merge':
                    Object.assign(copy,newValue)
                    return copy
                case '$apply':
                    return newValue.call(null,copy)
                default:
                    copy[prop] = mutate(copy[prop],newValue)
            }
        }
        return copy;
    }
    return mutate(state,mutations)
}