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

/**
 * Return all tokens.
 *
 * @returns {Object}
 * @api public
 */

Source.prototype.tokens = function() {
  return this.syntax.tokens;
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
  function traverse(object) {
    var key, child;

    if (object.type) {
      visitor.call(ctx, object);
    }

    for (key in object) {
      if (object.hasOwnProperty(key)) {
        child = object[key];
        if (typeof child === 'object' && child !== null) {
          traverse(child, visitor);
        }
      }
    }
  }

  traverse(this.syntax);
};

/**
 * Primary export.
 */

module.exports = Source;
