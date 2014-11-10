var through = require('through2');
var mapping = require('./simpleMapping.js');
var _ = require('underscore');

var classifyStream = through.ctor(function(chunk, enc, cb) {
  var self = this;
  classify(mapping, chunk, function(classified) {
    self.push(classified);
    cb();
  });
});


function classify(mapping, entry, cb) {
entry = entry.toString().slice(0, -1); //remove trailing newline
//console.log('classify', entry)

  function recurse(mapping, entry, classificationData, cb) {
    entry = entry.toString();

    Object.keys(mapping).some( function (key) {
      var clazz = mapping[key];
      var split = entry.split(clazz.separator);
      var first = split[0];
      if (first.match(clazz.regex)) {
        var classificationDatum = {
          name: key,
          raw: first,
          meta_data: clazz.parse(first)
        }
        classificationData.push(classificationDatum);
        //console.log('fisrt', first)
        var remainingEntry = split.slice(1).join(clazz.separator);
        if (clazz.children) {
          recurse(clazz.children, remainingEntry, classificationData, cb);
        } else {
          classificationData.push(remainingEntry);
          cb(classificationData);
        }
        return true;
      }
    });

  };

  recurse(mapping, entry, [], exit);

  function exit(classificationData) {
    var classified = classificationData.reduce(function (a, b) {
      //the remaining log entry, after prefixes, is the last entry and is a string
      if (typeof b == "string") {
        return {
          classes: a.classes,
          meta_data: a.meta_data,
          data: b
        }
      }

      return {
        classes: a.classes.concat(b.name),
        meta_data: _.extend(a.meta_data,b.meta_data)
      }
    }, {classes: [], meta_data: {}});

    cb(JSON.stringify(classified)+'\n');
  }

}


module.exports = classifyStream;
