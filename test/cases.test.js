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

          var actual = stylec.runFile(dirname + file);
          var expected = require(dirname + file.replace(/.js$/, '.result'));

          actual.should.have.lengthOf(expected.length);

          for (var i = 0, len = expected.length; i < len; i++) {
            expected[i].line.should.eq(actual[i].line);
            expected[i].column.should.eq(actual[i].column);
          }
        });
      });
    });
  });
});
