
module.exports = function(func) {
    const options = func()
    let done = false;
    function finish(){done = true}
    it(options.desc, function() {
        runs(function(){
            options.setup.call(null,finish)
        });

        waitsFor(function() {
            return done;
        }, 750);

        runs(function(){
            options.test.call(null,finish)
        });

    });
  }
