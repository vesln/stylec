/**
 * Core dependencies.
 */

var inherits = require('util').inherits;
var fs = require('fs');
var nodeChildren = require('./util').nodeChildren;

/**
 * Internal dependencies.
 */

function Dispatcher() {
  this.rules = [];
  this.loadRules();
}

Dispatcher.prototype.loadRules = function() {
  var path = __dirname + '/rule/';
  var dir = fs.readdirSync(path);

  dir.forEach(function(file) {
    if (file.charAt(0) === '.') return;
    this.rules.push(require(path + file));
  }, this);
};

Dispatcher.prototype.run = function(source) {
  this.rules.forEach(function(Rule) {
    var rule = new Rule(source);
    rule.listen();
  });

  source.allTokens.forEach(function(token) {
    source.emit(token.type, token);
  });

  (function iterate(node) {
    if (!node) return;
    source.emit(node.type, node);
    nodeChildren(node).forEach(function(child) {
      if (!Array.isArray(child)) return iterate(child);
      child.forEach(function(c) { iterate(c); });
    });
  })(source.syntax);

  source.emit('after');
  source.removeAllListeners();

  return source.errors;
};

module.exports = Dispatcher;
