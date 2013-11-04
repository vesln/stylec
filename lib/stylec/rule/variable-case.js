/**
 * Internal dependencies.
 */

var Rule = require('../rule');
var util = require('../util');

var VariableCase = Rule.create({
  error: 'Bad variable case',

  option: {
    key: 'varcase',
    type: 'enum',
    values: ['camel case', 'snake case']
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

VariableCase.prototype.check = function(node) {
  var vcase = this.option();

  node.declarations.forEach(function(dec) {
    if (util.invalidCase(vcase, dec.id.name)) {
      this.badToken(dec.id);
    }
  }, this);
};

/**
 * Primary export.
 */

module.exports = VariableCase;
