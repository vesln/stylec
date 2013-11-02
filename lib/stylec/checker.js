/**
 * Core dependencies.
 */

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

/**
 * Internal dependencies.
 */

var rules = require('./rules');

function Checker(source) {
  var defaults = {
    quotes: 'single',
    icase: 'camel case',
    line: 120,
    notabs: 'off',
    comparison: 'strict',
  };

  this.source = source;
  this.options = merge(defaults, this.source.options());
}

Checker.prototype.check = function(data) {
  var notifier = new EventEmitter;
  var errors = [];

  rules(notifier, errors, this.options);

  this.source.traverse(function(obj) {
    notifier.emit(obj.type, obj);
  });

  notifier.emit('source', this.source);

  return errors;
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

module.exports = Checker;
