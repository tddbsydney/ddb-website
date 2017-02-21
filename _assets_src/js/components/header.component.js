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
      main: null, // the main parent DOM element
      nav:  null, // the header nav  DOM element
      back: null, // the header back DOM element
      menu: null  // the header menu DOM element
    };

    var _class = { // the classes that are contained in
      main: "header", // the main parent DOM element
      nav:  "header__nav", // the header nav DOM element
      back: "header__back", // the header back DOM element
      menu: "header__menu--mobile", // the header menu DOM element

      modifier: { // applied modifier classes
        open: "header--open", // when the menu is open
        active: "link--active", // when the link is active
        closed: "header--closed" // when the menu is closed
      }
    };

    var _elHtml = null; // reference to the html DOM element
    var _elBody = null; // reference to the body DOM element
    var _isMenuOpen = false; // flag to indicate if the menu is open

    // ---------------------------------------------
    //   Public members
    // ---------------------------------------------
    /* empy block */

    // ---------------------------------------------
    //   Private methods
    // ---------------------------------------------
    // @name _addOpenClickListener
    // @desc function to add click event listener for the menu open
    function _addOpenClickListener() {
       query("a:first-child", _el.menu)[0].addEventListener("click", open);
    }

    // @name _addCloseClickListener
    // @desc function to add click event listener for the menu close
    function _addCloseClickListener() {
      query("a:last-child", _el.menu)[0].addEventListener("click", close);
    }

    // @name _removeOpenClickListener
    // @desc function to remove click event listener for the menu open
    function _removeOpenClickListener() {
      query("a:first-child", _el.menu)[0].removeEventListener("click", open);
    }

    // @name _removeCloseClickListener
    // @desc function to remove click event listener for the menu close
    function _removeCloseClickListener() {
      query("a:last-child", _el.menu)[0].removeEventListener("click", close);
    }

    // @name _addWindowResizeListener
    // @desc function to add the window resize event listener
    function _addWindowResizeListener() {
      window.addEventListener("resize", _windowResizeListener);
    }

    // @name _removeWindowResizeListener
    // @desc function to remove the window resize event listener
    function _removeWindowResizeListener() {
      window.removeEventListener("resize", _windowResizeListener);
    }

    // @name __windowResizeListener
    // @desc the listener function for the window resize event
    function _windowResizeListener(event) {
      // check if the viewport has been resized beyond the mobile breakpoint
      if(_isMenuOpen && !(CONFIG.breakpoint.isMobile || CONFIG.breakpoint.isMobileSmall)) {
        close(); // close the header menu if it is not longer relevant
      }
    }

    // @name _isLinkActive
    // @desc function to check if the given link is active
    // @param {DOM} link - the link DOM object to be checked for active
    // @return {Boolean} - the boolean result of the active status check
    function _isLinkActive(link) { try {
      var pathName = window.location.pathname;
      var hrefName = link.getAttribute("href");

      if(hrefName && hrefName.length > 1 
        && pathName.indexOf(hrefName) != -1) {
        return true; } 

      else { return false; }} 
      catch(error) { return false; }
    }

    // @name __setLinkAsActive
    // @desc function to set the given link as active
    function _setLinkAsActive(link) {
      link.classList.add(_class.modifier.active);
    }

    // @name __setLinkAsInActive
    // @desc function to set the given link as inactive
    function _setLinkAsInactive(link) {
      link.classList.remove(_class.modifier.active);
    }

    // ---------------------------------------------
    //   Public methods
    // ---------------------------------------------
    // @name open
    // @desc function to open the header menu
    function open(event) {
      if(_isMenuOpen) {
        console.log("header.component.js: The header menu is already open.");
        return false;
      }

      // prevent default events
      if(event) {
        event.preventDefault();
        event.stopPropagation();
      }

      // set the menu open flag
      _isMenuOpen = true;

      // disable scroll on the html and body
      _elHtml.setAttribute("data-scroll", "disabled");
      _elBody.setAttribute("data-scroll", "disabled");

      // make sure the nav is hidden
      // add add, remove the modifiers
      _el.nav.style.opacity = 0;
      _el.main.classList.add(_class.modifier.open);
      _el.main.classList.remove(_class.modifier.closed);

      requestAnimationFrame(function() {
        // finish any animations currently
        // being performed on header nav
        $(_el.nav).velocity("finish");

        // perform the new animation
        $(_el.nav).velocity("transition.slideUpIn", {
          easing: "easeInOutQuad", 
          delay: CONFIG.animation.delay,
          duration: CONFIG.animation.duration,
          complete: function() { /* empty block */ }
        });
      }); 

      // add the window resize listener
      _addWindowResizeListener();
    }

    // @name close
    // @desc function to close the header menu
    function close(event) {
      if(!_isMenuOpen) {
        console.log("header.component.js: The header menu is already closed.");
        return false;
      }

      // prevent default events
      if(event) {
        event.preventDefault();
        event.stopPropagation();
      }

      // reset the menu open flag
      _isMenuOpen = false;

      // enable scroll on the html and body
      _elHtml.removeAttribute("data-scroll");
      _elBody.removeAttribute("data-scroll");

      // make sure the nav is visible
      // add add, remove the modifiers
      _el.nav.style.opacity = 1;
      requestAnimationFrame(function() {
        setTimeout(function() {
        _el.main.classList.add(_class.modifier.closed);
        _el.main.classList.remove(_class.modifier.open);
        }, CONFIG.animation.delay);
      });

      requestAnimationFrame(function() {
        // finish any animations currently
        // being performed on header nav
        $(_el.nav).velocity("finish");

        // perform the new animation
        $(_el.nav).velocity("transition.slideDownOut", {
          easing: "easeInOutQuad", delay: 0,
          duration: CONFIG.animation.duration,
          complete: function() { /* empty block */ }
        });
      });

      // remove the window resize listener
      _removeWindowResizeListener();
    }

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
    _el.menu = query("." + _class.menu, _el.main)[0];

    // get the html and body DOM elements
    _elHtml = query("html")[0];
    _elBody = query("body")[0];

    // loop through all the nav link and check if any of them are active
    query("a", _el.nav).forEach(function(link, index) {
      if(_isLinkActive(link)) { _setLinkAsActive(link); } 
      else { _setLinkAsInactive(link); }
    });

    // add click event listeners for 
    // the menu open and close links
    _addOpenClickListener();
    _addCloseClickListener();

    // ---------------------------------------------
    //   Instance block
    // ---------------------------------------------
    return {
      open: open,   // function to open the header menu
      close: close  // function to close the header menu
    };
  }

  // ---------------------------------------------
  //   Export block
  // ---------------------------------------------
  module.exports = Header;

})(jQuery);

