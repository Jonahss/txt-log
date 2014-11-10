var sf = require('slice-file');
var log = sf('simple.log');
var classifyStream = require('./classify.js');


log.slice(0).pipe(new classifyStream()).pipe(process.stdout);
