function once(func){
  let memoized,called
  // const ctx = this
  return function(){
    if(!called){
      called = true
      memoized = func.apply(this,arguments)
    }
    return memoized
  }
}

module.exports = once
