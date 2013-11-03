/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var VarDec = Rule.create({
  error: 'Bad variable declaration style',

  option: {
    key: 'vardec',
    type: 'enum',
    values: ['one-liner', 'one per declaration', 'standard', 'comma-first']
  },

  on: {
    VariableDeclaration: 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Object} token
 * @api public
 */

VarDec.prototype.check = function(token) {
  switch (this.option()) {
    case 'one-liner': return this.oneliner(token);
    case 'one per declaration': return this.onePerDec(token);
    case 'standard': return this.standard(token);
    case 'comma-first': return this.commaFirst(token);
  }
};

VarDec.prototype.onePerDec = function(token) {
  var error = this.diffLines(token.declarations[0]) || token.declarations.length > 1;
  this.assertError(error, token);
};

VarDec.prototype.oneliner = function(token) {
  var line = null;
  var error = false;
  var tok = null;

  for (var i = 0, len = token.declarations.length; i < len; i++) {
    tok = token.declarations[i];
    var start = tok.loc.start.line;
    var end = tok.loc.end.line;

    if (line === null) {
      line = start;
    }

    if (start !== line || end !== line) {
      error = true;
      break;
    }
  }

  this.assertError(error, token);
};

VarDec.prototype.standard = function(token) {
  this.multiLine(token, [',', ';'], function(line, token) {
    return line.substr(tok.loc.end.column).trim();
  });
};

VarDec.prototype.commaFirst = function(token) {
  this.multiLine(token, [','], function(line, token) {
    return line.substring(0, tok.loc.start.column).trim();
  });
};

VarDec.prototype.multiLine = function(token, allowed, fn) {
  if (token.declarations.length === 1) {
    return this.onePerDec(token);
  }

  var prevLine = null;
  var error = false;
  var line = null;

  for (var i = 0, len = token.declarations.length; i < len; i++) {
    tok = token.declarations[i];

    if (prevLine === null) {
      prevLine = tok.loc.start.line;
    } else if (prevLine + 1 !== tok.loc.start.line) {
      error = true;
      break;
    }

    if (this.diffLines(tok)) {
      error = true;
      break;
    }

    if (i === 0) {
      continue;
    }

    line = this.source.line(tok.loc.start.line);

    if (!~allowed.indexOf(fn(line, tok))) {
      error = true;
      break;
    }

    prevLine = tok.loc.start.line;
  }

  this.assertError(error, token);
};

VarDec.prototype.diffLines = function(tok) {
  return tok.loc.start.line !== tok.loc.end.line;
};

VarDec.prototype.assertError = function(err, token) {
  if (err) this.badToken(token);
};

/**
 * Primary export.
 */

module.exports = VarDec;
