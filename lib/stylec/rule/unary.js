/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 */

var Unary = Rule.create({
  error: 'Wrong number of spaces after unary operator',

  option: {
    key: 'unary',
    type: 'number',
    value: 'on'
  },

  on: {
    UnaryExpression: 'check'
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
  var match = code.match(/^\!(\s*)/) || [null, ''];

  if (match[1].length !== this.option()) {
    this.badToken(token);
  }
};

/**
 * Primary export.
 */

module.exports = Unary;
