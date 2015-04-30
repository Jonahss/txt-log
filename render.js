// render is a pipe which takes objects and spits them out as html snippets

// render uses jade templates

var jade = require('jade');
var through = require('through2');
var path = require('path');

var TEMPLATE_LOCATION = path.resolve('templates');

var message_template = path.resolve(TEMPLATE_LOCATION, 'message.jade');

var renderMessage = jade.compileFile(message_template);

var renderStream = through.ctor({objectMode: true}, function(chunk, enc, cb) {
  var self = this;
  self.push(render(chunk));
  cb();
});

function render(chunk) {
  return renderMessage(chunk);
}

module.exports = renderStream;
