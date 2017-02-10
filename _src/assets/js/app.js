"use strict";

// -------------------------------------
//   Dependencies
// -------------------------------------
/**
  * @plugins
  * require("mobile-detect");
  * require("Velocity");
  * require("nanobar");
  * require("ng-fastclick");
  * require("angular-scroll");
  * require("angular-youtube-mb");
  * require("moment");
**/

// base
require("./base/raf");
require("./base/query");
require("./base/event");
require("./base/print");
require("./base/promise");
require("./base/debounce");
require("./base/template");

// config
var CONFIG = require("./config");
console.log("CONFIG options are:");
console.log(CONFIG);

// -------------------------------------
//   App
// -------------------------------------
/**
  * @name app
  * @desc The main js file that contains the run
          options and config options for the app.
**/
(function() {
  console.log("app.js loaded.");
})();

// animations
require("./animations/fade.animation");
require("./animations/slide.animation");
require("./animations/height.animation");
require("./animations/expand.animation");
require("./animations/translate.animation");
