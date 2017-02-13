"use strict";

// -------------------------------------
//   Dependencies
// -------------------------------------
/** 
  * @plugins
**/

// base
/* empty block */

// services
/* empty block */

// directives
/* empty block */

// components
/* empty block */

// controllers
/* empty block */

// config
var CONFIG = require("./config");
console.log("CONFIG options are:");
console.log(CONFIG);

// -------------------------------------
//   App
// -------------------------------------
/** 
  * @name app
  * @desc The main js file that contains the 
          run options and functions for the app.
**/

(function() {
  console.log("app.js loaded.");

  /** 
    * @name App
    * @desc the main class for the app
    * @return {Object} - the instance of the app class
    **/
    function App() {
      // ---------------------------------------------
      //   Private members
      // ---------------------------------------------
      /* empty block */
      // ---------------------------------------------
      //   Public members
      // ---------------------------------------------
      /* empty block */

      // ---------------------------------------------
      //   Private methods
      // ---------------------------------------------
      /* empty block */

      // ---------------------------------------------
      //   Public methods
      // ---------------------------------------------
      // @name init
      // @desc init function to initialize the app
      function init() { }

      // @name destory
      // @desc destory function to destroy the app
      function destroy() { }

      // ---------------------------------------------
      //   Constructor block
      // ---------------------------------------------
      /* empty block */

      // ---------------------------------------------
      //   Instance block
      // ---------------------------------------------
      return {
        init: init, // init function for the controller
        destroy: destroy // destory function for the controller
      };
    }

  // ---------------------------------------------
  //   Run block
  // ---------------------------------------------
  var app = new App(); // create a new app
  app.init(); // initiate the created app

})();