/**
 * Internal dependencies.
 */

var Rule = require('../rule');
var util = require('../util');

/**
 * Function case.
 */

var FunctionCase = Rule.create({
  error: 'Bad function case',

  option: {
    key: 'fncase',
    type: 'enum',
    values: ['camel case', 'snake case']
  },

  on: {
    FunctionDeclaration: 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Object} function declaration
 * @api public
 */

FunctionCase.prototype.check = function(token) {
  var fnCase = this.option();

  if (util.invalidCase(this.option(), token.id.name)) {
    this.badToken(token.id);
  }
};

/**
 * Primary export.
 */

module.exports = FunctionCase;
