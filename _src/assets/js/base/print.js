"use strict";

// -------------------------------------
//   Dependencies
// -------------------------------------
/** 
  * @plugins
**/

// -------------------------------------
//   Base - Print
// -------------------------------------
/** 
  * @name print
  * @desc A base module to abstract console.log done
          to ensure that gulp tasks cannot strip 
          them out on compile. print is attached 
          to the window object.
**/
(function() {
    console.log("base/print.js loaded.");

    // @name print
    // @desc the main function for the base
    // @param {String} selector
    // @param {String} value
    // @return {Boolean}
    function print(value) {
        // assign to local var 
        var print = console;

        // find the key log
        for(var key in print) {
            if(key == "log"){
                // log the value and return true
                print[key](value); return true;
            }
        }

        // default return 
        // value is false
        return false;
    }

    // ---------------------------------------------
    //   Attach base to the global namespace
    // ---------------------------------------------
    window.print = print;
    
})();