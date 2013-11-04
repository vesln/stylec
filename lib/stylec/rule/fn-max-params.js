/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var MaxParams = Rule.create({
  error: 'Too many function parameters',

  option: {
    key: 'fnparams',
    type: 'number'
  },

  on: {
    FunctionDeclaration: 'check',
    FunctionExpression: 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Object} node
 * @api public
 */

MaxParams.prototype.check = function(node) {
  if (node.params.length > this.option()) {
    this.badToken(node);
  }
};

/**
 * Primary export.
 */

module.exports = MaxParams;
