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
var FileChecker = require('./stylec/file-checker');

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
  var checker = new FileChecker(source);
  return checker.check();
};
