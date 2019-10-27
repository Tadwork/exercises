function jasmineAsync(func){
  let flag;
  const {
    desc,
    setup,
    test
  } = func()
  it(desc, function() {
    runs(()=>{
      setup.call(null,()=>flag = true)
    });

    waitsFor(function() {
      return flag;
    }, 750);

    runs(test);
  });
}

module.exports = jasmineAsync
