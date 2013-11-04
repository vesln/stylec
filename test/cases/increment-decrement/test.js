/* stylec noincdec: on */

var bad = 0;
bad++; //! column: 0
bad--; //! column: 0
++bad; //! column: 0

if (bad--) { //! column: 4
}
