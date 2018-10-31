
module.exports = function(state,mutations){
    function mutate(obj,mutation){
        if(typeof mutation === 'object'){
            for(let prop in mutation){
                obj[prop] = mutate(obj[prop],)
            }
        }else{
            let copy
            if(Array.isArray(obj)){
                copy = obj.slice()
            }else if(typeof obj === 'object'){
                copy = Object.assign({},obj)
            }else{
                copy = obj
            }
            switch(mutation){

            }
        }
    }
    return mutate(state,mutations)
}