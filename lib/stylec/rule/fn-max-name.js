/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var MaxLen = Rule.create({
  error: 'The function name is too long',

  option: {
    key: 'fnmax',
    type: 'number'
  },

  on: {
    FunctionDeclaration: 'check',
    FunctionExpression: 'check',
  },
});

/**
 * Perform the check.
 *
 * @param {Object} node
 * @api public
 */

MaxLen.prototype.check = function(node) {
  if (!node.id) return;

  if (node.id.name.length > this.option()) {
    this.badToken(node);
  }
};

/**
 * Primary export.
 */

module.exports = MaxLen;
