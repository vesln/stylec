/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 * Function name - max length.
 *
 * Specify the max length of a function name.
 *
 * ## Example number: 10
 *
 *     // Good
 *
 *     function foo() {}
 *
 *     // Bad
 *
 *     function thisIsOneVeryVeryLongName() {}
 *
 * @key fnmax
 * @type number
 * @recommended 15
 * @constructor
 */

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
