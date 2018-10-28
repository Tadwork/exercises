
module.exports = function(func){
    const curried = function(...args){
        let finalArgs = this.args ? [...this.args] : []
        finalArgs.push(...args)
        if(finalArgs.length >= func.length){
            return func.apply(null,finalArgs)
        }else{
            return curried.bind({args: finalArgs})
        }
    }
    return curried
}