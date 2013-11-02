/**
 * Internal dependencies.
 */

var Rule = require('../rule');
var util = require('../util');

/**
 * Variable case.
 */

var VariableCase = Rule.create({
  error: 'Bad variable case',

  option: {
    key: 'varcase',
    type: 'enum',
    values: ['camel case', 'snake case'],
  },

  on: {
    VariableDeclaration: 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Object} variable declaration
 * @api public
 */

VariableCase.prototype.check = function(vard) {
  var varCase = this.option();

  vard.declarations.forEach(function(dec) {
    if (util.invalidCase(varCase, dec.id.name)) {
      this.badToken(dec.id);
    }
  }, this);
};

/**
 * Primary export.
 */

module.exports = VariableCase;
