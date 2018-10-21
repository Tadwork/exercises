
module.exports = function(func){
    const curried = function(...val){
        const args = this.args.slice()
        args.push(...val)
        if(args.length >= func.length){
            return func.apply(null,args)
        }else{
            return curried.bind({args});
        }
    }
    return curried.bind({args:[]});
}