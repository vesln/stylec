/* stylec arrcomma: required */

var good = [
  '1',
  2,
  true,
];

var good = [1, 2, 3,];

var good = [1, 2,
    3, 4,
    5,
];

var bad = [1, 2, 3]; //! column: 10

var bad = [ //! column: 10
  1, 2,
  3
];

var good = [];
var good = [1, 2, 3, /* this would be stupid but should work */];
