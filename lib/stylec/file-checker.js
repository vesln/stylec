/**
 * Core dependencies.
 */

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

/**
 * Internal dependencies.
 */

var rules = require('./rules');

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
  var notifier = new EventEmitter;
  rules(this.source, notifier, this.options);

  this.source.traverse(function(obj) {
    notifier.emit(obj.type, obj);
  });

  notifier.emit('source', this.source);

  return this.source.errors;
};

function merge(first, second) {
  var ret = {};

  Object.keys(first).forEach(function(key) {
    ret[key] = first[key];
  });

  Object.keys(second).forEach(function(key) {
    ret[key] = second[key];
  });

  return ret;
}

module.exports = FileChecker;
