var sf = require('slice-file');
var objectify = require('through2-objectify');
var through = require('through2');
var log = sf('simple.log');
var classifyStream = require('./classify.js');
var renderStream = require('./render.js');

var stringify = function(chunk, enc, cb) {
  this.push(JSON.stringify(chunk))
  cb();
}

var newLineify = function(chunk, enc, cb) {
  this.push(chunk+'\n');
  cb()
}

log.slice(0)
  .pipe(new classifyStream())
  .pipe(new renderStream())
  .pipe(objectify.deobj(stringify))
  .pipe(through(newLineify))
  .pipe(process.stdout);
