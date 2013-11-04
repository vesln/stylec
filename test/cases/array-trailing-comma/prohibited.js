/* stylec arrcomma: prohibited, commaspace: off */

var good = [
  1,
  2,
  3
];

var good = [1, 2, 3];

var good = [1, 2,
    3, 4,
    5
];

var bad = [1, 2, 3,]; //! column: 10

var bad = [1, //! column: 10
  2, 3,
];

var bad = [1, 2, 3, /* bad */]; //! column: 10

var good = [];
