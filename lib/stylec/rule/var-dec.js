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
 * @param {Object} node
 * @api public
 */

VarDec.prototype.check = function(node) {
  switch (this.option()) {
    case 'one-liner': return this.oneliner(node);
    case 'one per declaration': return this.onePerDec(node);
    case 'standard': return this.standard(node);
    case 'comma-first': return this.commaFirst(node);
  }
};

VarDec.prototype.onePerDec = function(node) {
  var error = this.diffLines(node.declarations[0]) || node.declarations.length > 1;
  this.assertError(error, node);
};

VarDec.prototype.oneliner = function(node) {
  var line = null;
  var error = false;
  var tok = null;

  for (var i = 0, len = node.declarations.length; i < len; i++) {
    tok = node.declarations[i];
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

  this.assertError(error, node);
};

VarDec.prototype.standard = function(node) {
  this.multiLine(node, [',', ';'], function(line, node) {
    return line.substr(tok.loc.end.column).trim();
  });
};

VarDec.prototype.commaFirst = function(node) {
  this.multiLine(node, [','], function(line, node) {
    return line.substring(0, tok.loc.start.column).trim();
  });
};

VarDec.prototype.multiLine = function(node, allowed, fn) {
  if (node.declarations.length === 1) {
    return this.onePerDec(node);
  }

  var prevLine = null;
  var error = false;
  var line = null;

  for (var i = 0, len = node.declarations.length; i < len; i++) {
    tok = node.declarations[i];

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

  this.assertError(error, node);
};

VarDec.prototype.diffLines = function(tok) {
  return tok.loc.start.line !== tok.loc.end.line;
};

VarDec.prototype.assertError = function(err, node) {
  if (err) this.badToken(node);
};

/**
 * Primary export.
 */

module.exports = VarDec;
