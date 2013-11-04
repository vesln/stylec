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
 */

var Comparison = Rule.create({
  error: 'Bad comparison operator',

  option: {
    type: 'enum',
    key: 'comparison',
    values: ['standard', 'strict']
  },

  on: {
    BinaryExpression: 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Object} token
 * @api public
 */

Comparison.prototype.check = function(token) {
  var val = this.option();

  if (val === 'strict' && ['==', '!='].indexOf(token.operator) > -1) {
    this.badToken(token);
  }

  if (val === 'standard' && ['===', '!=='].indexOf(token.operator) > -1) {
    this.badToken(token);
  }
};

/**
 * Primary export.
 */

module.exports = Comparison;
