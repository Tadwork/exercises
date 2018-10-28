
module.exports = function(func) {
    let done
    const {
        desc,
        setup,
        test
    } = func()
    const doneFunc = ()=>done = true
    it(desc, function() {
        runs(()=>setup(doneFunc));
      
        waitsFor(function() {
          return done;
        }, 750);
      
        runs(test);
      });
}
