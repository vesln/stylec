/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 * Min length of object key.
 */

var MaxLen = Rule.create({
  error: 'The object key is too short',

  option: {
    type: 'number',
    key: 'okeymax',
  },

  on: {
    'ObjectExpression': 'check',
    'AssignmentExpression': 'checkAssign'
  },
});

/**
 * Perform the check.
 *
 * @param {Object} token
 * @api public
 */

MaxLen.prototype.check = function(token) {
  var max = this.option();

  token.properties.forEach(function(prop) {
    if (prop.key.name.length > max) {
      this.badToken(prop.key);
    }
  }, this);
};

/**
 * Check assignment.
 *
 * @param {Object} token
 * @api public
 */

MaxLen.prototype.checkAssign = function(token) {
  if (!token.left.object) return;
  var max = this.option();
  if (token.left.property.name.length > max) {
    this.badToken(token.left.property);
  }
};

/**
 * Primary export.
 */

module.exports = MaxLen;
