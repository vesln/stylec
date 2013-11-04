/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var MaxLen = Rule.create({
  error: 'The variable name is too long',

  option: {
    key: 'varmax',
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

MaxLen.prototype.check = function(node) {
  var max = this.option();

  node.declarations.forEach(function(node) {
    if (node.id.name.length > max) {
      this.badToken(node.id);
    }
  }, this);
};

/**
 * Primary export.
 */

module.exports = MaxLen;
