module.exports = function(func){
    return function curried(){
        const args = Array.from(arguments);
        if(args.length >= func.length){
            return func.apply(null,args)
        }else{
            return curried.bind(null,...args)
        }
    }
}