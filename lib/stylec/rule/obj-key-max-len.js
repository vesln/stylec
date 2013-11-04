/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var MaxLen = Rule.create({
  error: 'The object key is too long',

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
    if ((prop.key.name || prop.key.value).length > max) {
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
  if (!node.left.property.name) return;

  if (node.left.property.name.length > this.option()) {
    this.badToken(node.left.property);
  }
};

/**
 * Primary export.
 */

module.exports = MaxLen;
