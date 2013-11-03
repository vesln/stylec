var fs = require('fs');

module.exports = function(source, notifier, errors, options) {
  var dir = fs.readdirSync(__dirname + '/rule');

  dir.forEach(function(file) {
    if (file.charAt(0) === '.') return;
    var Rule = require(__dirname + '/rule/' + file);
    var rule = new Rule(source, errors, options);
    rule.subscribe(notifier);
  });
};
