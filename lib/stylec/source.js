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
}

/**
 * Return the options local options.
 *
 * @returns {Object}
 * @api public
 */

Source.prototype.options = function() {
  var ret = {};
  var regExp = /^\sstylec/;

  this.syntax.comments.forEach(function(comment) {
    if (!comment.value.match(regExp)) return;
    var body = comment.value.replace(regExp, '');

    body.split(',').forEach(function(pair) {
      var split = pair.split(':');
      ret[split[0].trim()] = split[1].trim();
    });
  });

  return ret;
};

Source.prototype.eachLine = function(fn, ctx) {
  this.lines.forEach(function(line, i) {
    fn.call(ctx, line, i + 1);
  });
};

Source.prototype.line = function(i) {
  return this.lines[i - 1];
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

Source.prototype.error = function(error) {
  this.errors.push(error);
};

/**
 * Primary export.
 */

module.exports = Source;
