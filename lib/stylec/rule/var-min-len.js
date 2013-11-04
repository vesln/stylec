/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var MinLen = Rule.create({
  error: 'The variable name is too short',

  option: {
    key: 'varmin',
    type: 'number'
  },

  on: {
    VariableDeclaration: 'check'
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

  node.declarations.forEach(function(node) {
    if (node.id.name.length < min) {
      this.badToken(node.id);
    }
  }, this);
};

/**
 * Primary export.
 */

module.exports = MinLen;
