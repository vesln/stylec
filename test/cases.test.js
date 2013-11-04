var fs = require('fs');

var cases = __dirname + '/cases/';
var root = fs.readdirSync(cases);
var esprima = require('esprima');

suite('Cases', function() {
  root.forEach(function(dir) {
    if (dir.charAt(0) === '.') return;
    var files = fs.readdirSync(cases + dir);
    var name = dir.replace(/-/g, ' ');

    suite(name, function() {
      files.forEach(function(file) {
        if (file.match(/\.result\.js$/)) return;

        var name = file.replace(/-/g, ' ').replace(/\.js$/, '');

        test(name, function() {
          var dirname = cases + dir + '/';
          var expected = [];
          var test = fs.readFileSync(dirname + file, 'utf8');
          var comments = esprima.parse(test, { comment: true, loc: true }).comments;

          comments.forEach(function(comment) {
            if (comment.type !== 'Line') return;
            var match = comment.value.match(/^! column: (.*)/);
            if (!match) return;

            var parts = match[1].split(';');
            var line = parts.length === 2
              ? +parts[1].match(/^ line: ([0-9]+)$/)[1]
              : comment.loc.start.line;

            parts[0].split(',').forEach(function(column) {
              expected.push({ line: line, column: +column.trim() });
            });
          });

          var actual = stylec.runFile(dirname + file).map(function(err) {
            return { line: err.line, column: err.column };
          });

          actual.should.deep.equal(expected);
        });
      });
    });
  });
});
