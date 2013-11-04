/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 * Comparison operators.
 *
 * Preferred style of comparison operators.
 *
 * ### standard
 *
 *     // Good
 *
 *     if (a == b) {}
 *     if (a != b) {}
 *
 *     // Bad
 *
 *     if (a === b) {}
 *     if (a !== b) {}
 *
 * ### strict
 *
 *     // Good
 *
 *     if (a === b) {}
 *     if (a !== b) {}
 *
 *     // Bad
 *
 *     if (a == b) {}
 *     if (a != b) {}
 *
 * @key comparison
 * @type enum
 * @recommended strict
 * @values [standard, strict]
 * @constructor
 */

var Comparison = Rule.create({
  error: 'Bad comparison operator',

  option: {
    key: 'comparison',
    type: 'enum',
    values: ['standard', 'strict']
  },

  on: {
    BinaryExpression: 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Object} node
 * @api public
 */

Comparison.prototype.check = function(node) {
  var val = this.option();

  if (val === 'strict' && ['==', '!='].indexOf(node.operator) > -1) {
    this.badToken(node);
  }

  if (val === 'standard' && ['===', '!=='].indexOf(node.operator) > -1) {
    this.badToken(node);
  }
};

/**
 * Primary export.
 */

module.exports = Comparison;
