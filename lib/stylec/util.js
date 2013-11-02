exports.invalidCase = function(opt, val) {
  return opt === 'snake case'
    ? val.match(/[A-Z]/)
    : val.replace(/^_+|_+$/g, '').indexOf('_') > -1;
};
