
module.exports = function(func){
    const {
        desc,
        setup,
        test
    } = func()
    it(desc, function() {
        let next = false;
      
        runs(function() {  
          setup(()=>{
            next = true
          })
        });
      
        waitsFor(function() {
          return next;
        }, 750);
      
        runs(function() {
          test()
        });
      });
}
