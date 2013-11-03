exports.invalidCase = function(opt, val) {
  return opt === 'snake case'
    ? /[A-Z]/.test(val)
    : val.replace(/^_+|_+$/g, '').indexOf('_') > -1;
};

exports.blank = function(str) {
  return str.trim().length === 0;
};

exports.merge = function(first, second) {
  var ret = {};

  Object.keys(first).forEach(function(key) {
    ret[key] = first[key];
  });

  Object.keys(second).forEach(function(key) {
    ret[key] = second[key];
  });

  return ret;
};
