"use strict";

// -------------------------------------
//   Dependencies
// -------------------------------------
/** 
  * @plugins
  * require("jquery");
  * require("velocity");
**/

// base
require("../base/query");
require("../base/promise");

// config
var CONFIG = require("../config");

// -------------------------------------
//   Component - Header
// -------------------------------------
/** 
  * @name header.component
  * @desc The header component for the app.
**/

(function($){
  console.log("components/header.component.js loaded.");

  /** 
    * @name Header
    * @desc the main class for the component
    * @param {Object} options - options for the component
    * @return {Object} - the instance of the component class
  **/
  function Header(options) {
    // ---------------------------------------------
    //   Private members
    // ---------------------------------------------
    var _el = { // reference to the DOM elements for
      main: null // the main parent DOM element
    };

    var _class = { // the classes that are contained in
      main: "header", // the main parent DOM element
      nav:  "header__nav", // the header nav DOM element
      back: "header__back", // the header back DOM element
      menu: "header__menu--mobile", // the header menu DOM element

      modifier: { // applied modifier classes
        open: "header--open", // when the menu is open
        closed: "header--closed" // when the menu is closed
      }
    };

    // ---------------------------------------------
    //   Public members
    // ---------------------------------------------
    /* empy block */

    // ---------------------------------------------
    //   Private methods
    // ---------------------------------------------
    /* empy block */

    // ---------------------------------------------
    //   Public methods
    // ---------------------------------------------
    /* empy block */

    // ---------------------------------------------
    //   Constructor block
    // ---------------------------------------------
    // check if the header has valid options
    // element - should be a valid DOM element
    if(!options || !options.element 
      || !options.element.nodeName || !options.element.nodeType) {
      console.log("header.component.js: Cannot create header with invalid options.");
      return null;  // return null if invalid
    }

    // get the main parent element
    _el.main = options.element;

    // get all the child elements
    _el.nav  = query("." + _class.nav, _el.main)[0];
    _el.back = query("." + _class.back, _el.main)[0];
    _el.manu = query("." + _class.menu, _el.main)[0];
    console.log(_el);

    // ---------------------------------------------
    //   Instance block
    // ---------------------------------------------
    return { };
  }

  // ---------------------------------------------
  //   Export block
  // ---------------------------------------------
  module.exports = Header;

})(jQuery);

