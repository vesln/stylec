var fs = require('fs');

var cases = __dirname + '/cases/';
var root = fs.readdirSync(cases);

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
          var expected = require(dirname + file.replace(/.js$/, '.result'));
          var actual = stylec.runFile(dirname + file).map(function(err) {
            return { line: err.line, column: err.column };
          });

          actual.should.deep.equal(expected);
        });
      });
    });
  });
});
