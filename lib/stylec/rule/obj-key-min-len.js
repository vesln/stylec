/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 * Min length of object key.
 */

var MinLen = Rule.create({
  error: 'The object key is too short',

  option: {
    key: 'okeymin',
    type: 'number'
  },

  on: {
    ObjectExpression: 'check',
    AssignmentExpression: 'checkAssign'
  },
});

/**
 * Perform the check.
 *
 * @param {Object} token
 * @api public
 */

MinLen.prototype.check = function(token) {
  var min = this.option();

  token.properties.forEach(function(prop) {
    if (prop.key.name.length < min) {
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

MinLen.prototype.checkAssign = function(token) {
  if (!token.left.object) return;
  var min = this.option();
  if (token.left.property.name.length < min) {
    this.badToken(token.left.property);
  }
};

/**
 * Primary export.
 */

module.exports = MinLen;
