class Middleware{
    constructor(){
        this.go = this.go.bind(this)
        this.use = this.use.bind(this)
        this.middlewares = []
    }
    use(func){
        this.middlewares.push(func)
    }
    runMiddleware(current,doneFunc){
        if(current < this.middlewares.length){
            this.middlewares[current].call(this,()=>{
                this.runMiddleware(current+1,doneFunc)
            })
        }else{
            doneFunc.call(this)
        }
    }
    go(func){
        this.runMiddleware(0,func)
    }
}

module.exports = Middleware