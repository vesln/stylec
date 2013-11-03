/**
 * Core dependencies.
 */

var inherits = require('util').inherits;
var fs = require('fs');

/**
 * Internal dependencies.
 */

function FileChecker() {
  var path = __dirname + '/rule/';
  var dir = fs.readdirSync(path);
  this.rules = [];

  dir.forEach(function(file) {
    if (file.charAt(0) === '.') return;
    this.rules.push(require(path + file));
  }, this);
}

FileChecker.prototype.check = function(source) {
  this.rules.forEach(function(Rule) {
    var rule = new Rule(source);
    rule.listen();
  });

  source.iterate();
  source.removeAllListeners();

  return source.errors;
};

module.exports = FileChecker;
