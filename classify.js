var through = require('through2');
var mapping = require('./simpleMapping.js')

var classifyStream = through.ctor(function(chunk, enc, cb) {
  var self = this;
  classify(mapping, chunk, function(classified) {
    self.push(classified);
    cb();
  });
});


function classify(mapping, entry, cb) {
entry = entry.toString();
//console.log('classify', entry)

  function recurse(mapping, entry, classes, cb) {
    entry = entry.toString();

    Object.keys(mapping).some( function (key) {
      var clazz = mapping[key];
      var split = entry.split(clazz.separator);
      var first = split[0];
      if (first.match(clazz.regex)) {
        // cleanse, remove the "children" and "parse". i guess thats serialize or something
        classes.push(clazz);
        //console.log('fisrt', first)
        var remainingEntry = split.slice(1).join(clazz.separator);
        if (clazz.children) {
          recurse(clazz.children, remainingEntry, classes, cb);
        } else {
          classes.push(remainingEntry);
          cb(classes);
        }
        return true;
      }
    });

  };

  recurse(mapping, entry, [], function(classes) {
    //console.log('done recursing. classes for this line: ', classes.length)
    cb(JSON.stringify(classes)+'\n');
  });

}


module.exports = classifyStream;
