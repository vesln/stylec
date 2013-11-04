/**
 * Core dependencies.
 */

var fs = require('fs');

/**
 * Internal dependencies.
 */

var esprima = require('esprima');

/**
 * Internal dependencies.
 */

var Source = require('./stylec/source');
var Dispatcher = require('./stylec/dispatcher');

/**
 * Parse given `data`.
 */

function parse(data) {
  var syntax = esprima.parse(data, {
    tokens: true,
    comment: true,
    range: true,
    loc: true,
  });

  return syntax;
}

/**
 * Check the given `file`.
 *
 * @api public
 */

exports.runFile = function(file, options) {
  var data = fs.readFileSync(file, 'utf8');
  return this.run(data, options, file);
};

/**
 * Check `data` for problems.
 *
 * @api public
 */

exports.run = function(data, options, file) {
  var source = new Source(data, parse(data), file, options);
  var dispatcher = new Dispatcher;
  dispatcher.run(source);
  return source;
};
