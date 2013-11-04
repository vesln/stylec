/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var MaxLen = Rule.create({
  error: 'The object key is too short',

  option: {
    key: 'okeymax',
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
 * @param {Object} node
 * @api public
 */

MaxLen.prototype.check = function(node) {
  var max = this.option();

  node.properties.forEach(function(prop) {
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

MaxLen.prototype.checkAssign = function(node) {
  if (!node.left.object) return;
  var max = this.option();
  if (node.left.property.name.length > max) {
    this.badToken(node.left.property);
  }
};

/**
 * Primary export.
 */

module.exports = MaxLen;
