
module.exports = function(func){
    let saved = new Map()
    return function(){
        const key = Array.from(arguments).join('-')
        if(!saved[key]){
            saved[key] = func.apply(null,arguments)
        }
        return saved[key]
    }
}