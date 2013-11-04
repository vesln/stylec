/**
 * Core dependencies.
 */

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

/**
 * Source.
 *
 * @param {String} data
 * @param {Object} syntax
 * @constructor
 */

function Source(data, syntax) {
  this.data = data;
  this.lines = this.data.split('\n');
  this.syntax = syntax;
  this.errors = [];
  this.inlineConfig = /^\sstylec/;
  this.loadOptions();
  this.prepareTokens();
}

/**
 * Inherit from `EventEmitter`.
 */

inherits(Source, EventEmitter);

Source.prototype.prepareTokens = function() {
  var ret = this.syntax.tokens.concat(this.syntax.comments || []);

  this.allTokens = ret.sort(function(a, b) {
    if (a.range[0] < b.range[0]) {
      return -1;
    }

    if (a.range[0] > b.range[0]) {
      return 1;
    }

    return 0;
  });

  this.tokens = this.syntax.tokens;
};

Source.prototype.loadOptions = function() {
  var ret = {};

  this.syntax.comments.forEach(function(comment) {
    if (!comment.value.match(this.inlineConfig)) return;
    var body = comment.value.replace(this.inlineConfig, '');

    body.split(',').forEach(function(pair) {
      var split = pair.split(':');
      ret[split[0].trim()] = split[1].trim();
    });
  }, this);

  this._options = ret;
};

Source.prototype.option = function(key, defaults) {
  return this._options[key] || defaults;
};

Source.prototype.eachLine = function(fn, ctx) {
  this.lines.forEach(function(line, i) {
    fn.call(ctx, line, i + 1);
  });
};

Source.prototype.line = function(i) {
  return this.lines[i - 1];
};

Source.prototype.iterate = function() {
  this.emit('before');

  this.traverse(function(token) {
    this.emit(token.type, token);
  }, this);

  this.emit('after', this);
};

Source.prototype.traverse = function(visitor, ctx) {
  (function traverse(object) {
    var key = null;
    var child = null;

    if (object.type) visitor.call(ctx, object);

    Object.keys(object).forEach(function(key) {
      child = object[key];
      if (Object(child) === child) traverse(child, visitor);
    });
  })(this.syntax);
};

Source.prototype.range = function(range) {
  return this.data.substring(range[0], range[1]);
};

Source.prototype.tokenRange = function(range, opts) {
  opts = opts || {};
  var from = range[0];
  var to = range[1];
  var ret = [];
  var list = opts.comments === true ? this.allTokens : this.tokens;

  list.forEach(function(token) {
    if (token.range[0] >= from && token.range[1] <= to) {
      ret.push(token);
    }
  });

  return ret;
};

Source.prototype.error = function(error) {
  this.errors.push(error);
};

/**
 * Primary export.
 */

module.exports = Source;
