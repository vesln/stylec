/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 */

var Unary = Rule.create({
  error: 'Wrong number of spaces required after unary operator',

  option: {
    key: 'unary',
    type: 'number',
    value: 'on',
  },

  on: {
    'UnaryExpression': 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Object} token
 * @api public
 */

Unary.prototype.check = function(token) {
  var code = this.source.range(token.range);
  var spaces = code.match(/^\!(\s*)/)[1];

  if (spaces.length !== this.option()) {
    this.badToken(token);
  }
};

/**
 * Primary export.
 */

module.exports = Unary;
