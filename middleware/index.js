function Middleware(){
  const tasks = []
  let doneFunc
  this.use = (task)=>{
    tasks.push(task)
  }
  function nextTask(){
    if(tasks.length > 0){
      const task = tasks.shift()
      task.call(null,nextTask)
    }else{
      doneFunc.call(null)
    }
  }
  this.go = (done)=>{
    nextTask()
    doneFunc = done
  }
}

module.exports = Middleware
