/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var Unary = Rule.create({
  error: 'Wrong number of spaces after unary operator',

  option: {
    key: 'unary',
    type: 'number'
  },

  on: {
    UnaryExpression: 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Object} node
 * @api public
 */

Unary.prototype.check = function(node) {
  var code = this.source.range(node.range);
  var match = code.match(/^\!(\s*)/) || [null, ''];

  if (node.loc.start.line !== node.loc.end.line) {
    return this.badToken(node);
  }

  if (match[1].length !== this.option()) {
    this.badToken(node);
  }
};

/**
 * Primary export.
 */

module.exports = Unary;
