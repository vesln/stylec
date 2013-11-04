/**
 * Internal dependencies.
 */

var Rule = require('../rule');

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
 * @param {Object} node
 * @api public
 */

MinLen.prototype.check = function(node) {
  var min = this.option();

  node.properties.forEach(function(prop) {
    if (prop.key.name.length < min) {
      this.badToken(prop.key);
    }
  }, this);
};

/**
 * Check assignment.
 *
 * @param {Object} node
 * @api public
 */

MinLen.prototype.checkAssign = function(node) {
  if (!node.left.object) return;
  var min = this.option();
  if (node.left.property.name.length < min) {
    this.badToken(node.left.property);
  }
};

/**
 * Primary export.
 */

module.exports = MinLen;
