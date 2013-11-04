/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var MinLen = Rule.create({
  error: 'The function name is too short',

  option: {
    key: 'fnmin',
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

MinLen.prototype.check = function(node) {
  if (!node.id) return;

  if (node.id.name.length < this.option()) {
    this.badToken(node);
  }
};

/**
 * Primary export.
 */

module.exports = MinLen;
