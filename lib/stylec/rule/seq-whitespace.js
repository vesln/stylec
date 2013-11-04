/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var SeqWhitespace = Rule.create({
  error: 'Bad number of sequential whitespace',

  option: {
    key: 'seqws',
    type: 'number'
  },

  on: {
    after: 'check'
  },
});

/**
 * Perform the check.
 *
 * @api public
 */

SeqWhitespace.prototype.check = function() {
  var num = this.option() - 1;
  // TODO: fix me
  var tokens = this.source.allTokens;
  var prev = null;

  tokens.forEach(function(curr) {
    if (!prev || prev.loc.end.line !== curr.loc.start.line) {
      prev = curr;
      return;
    }

    if (curr.loc.start.column - prev.loc.end.column > num) {
      this.addError({ column: prev.loc.end.column, line: prev.loc.end.line });
    }

    prev = curr;

  }, this);
};

/**
 * Primary export.
 */

module.exports = SeqWhitespace;
