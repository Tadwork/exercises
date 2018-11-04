const fs = require('fs'),
        path = require('path')

var files=fs.readdirSync(__dirname);
for(var i=0;i<files.length;i++){
    var filename=path.join(startPath,files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()){
        const index =path.resolve(dir, '/index.js');
        index.unlink()
    }
};
