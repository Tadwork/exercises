class Middleware{
    constructor(){
        this.middlewares = []
    }
    use(middleware){
        this.middlewares.push(middleware)
    }
    go(doneFunc){
        const runMiddleware = (index)=>{
            if(index < this.middlewares.length){
                this.middlewares[index].call(this,()=>{
                    runMiddleware(index+1)
                })
            }else{
                doneFunc.call(this)
            }
        }
        runMiddleware(0)
    }
}

module.exports = Middleware