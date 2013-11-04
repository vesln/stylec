/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var IncrementDecrement = Rule.create({
  error: 'Prohibt usage of increment/decrement',

  option: {
    key: 'noincdec',
    type: 'boolean'
  },

  on: {
    UpdateExpression: 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Source} source
 * @api public
 */

IncrementDecrement.prototype.check = function(node) {
  if (~['++', '--'].indexOf(node.operator)) {
    this.badToken(node);
  }
};

/**
 * Primary export.
 */

module.exports = IncrementDecrement;
