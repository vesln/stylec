/* stylec noincdec: true */

var bad = 0;
bad++; //! column: 0
bad--; //! column: 0
++bad; //! column: 0

if (bad--) { //! column: 4
}

var i = --bad; //! column: 8

switch (i--) { //! column: 8

  case (i--): //! column: 8
    break;
}

(function() {})(i--); //! column: 16

for (var i = b--, len = c--; i < len; i--) { //! column: 13, 24, 38
  //var b = i--; //! column: 2
}


--(i); //! column: 0

try {
  --i; //! column: 2
} catch(e) {
  --i; //! column: 2
} finally {
  --i; //! column: 2
}

var i = --a ? b-- : c--; //! column: 8, 14, 20

while(i--) { //! column: 6
  continue;
}

do {
  i--; //! column: 2
} while (i--); //! column: 9

for (key in foo) {
  i++; //! column: 2
}

foo:

for (var i = 0; i < 0; i++) {}

node[(function() { i--; })()] = 3; //! column: 19

new Foo(i--); //! column: 8

function foo() {
  return i--; //! column: 9
};

throw i--; //! column: 6
