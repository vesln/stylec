/**
 * Core dependencies.
 */

var inherits = require('util').inherits;
var fs = require('fs');

/**
 * Internal dependencies.
 */

var merge = require('./util').merge;

function FileChecker(source) {
  var defaults = {
    quotes: 'single',
    line: 120,
    notabs: 'off',
    comparison: 'strict',
    noincdec: 'off',
    fnparams: 'off',
    fnmin: 'off',
    fnmax: 'off',
    varmin: 'off',
    varmax: 'off',
    okeymin: 'off',
    okeymax: 'off',
    nodec: 'on',
    unary: '0',
  };

  this.source = source;
  this.options = merge(defaults, this.source.options());
}

FileChecker.prototype.check = function(data) {
  this.loadRules();
  this.source.iterate();
  return this.source.errors;
};

FileChecker.prototype.loadRules = function() {
  var dir = fs.readdirSync(__dirname + '/rule');

  dir.forEach(function(file) {
    if (file.charAt(0) === '.') return;
    var Rule = require(__dirname + '/rule/' + file);
    var rule = new Rule(this.source, this.options);
  }, this);
};

module.exports = FileChecker;
