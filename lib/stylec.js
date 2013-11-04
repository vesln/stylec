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

exports.runFile = function(file) {
  var data = fs.readFileSync(file, 'utf8');
  return this.run(data);
};

/**
 * Check `data` for problems.
 *
 * @api public
 */

exports.run = function(data) {
  var source = new Source(data, parse(data));
  var dispatcher = new Dispatcher;
  var errors = dispatcher.run(source);

  return errors.sort(function(a, b) {
    if (a.line < b.line) return -1;
    if (a.line > b.line) return 1;

    if (a.column < b.column) return -1;
    return 1;
  });
};
