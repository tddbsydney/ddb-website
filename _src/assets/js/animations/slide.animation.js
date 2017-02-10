"use strict";

// -------------------------------------
//   Dependencies
// -------------------------------------
/** 
  * @plugins
**/

// -------------------------------------
//   Angular Animation Configuration
// -------------------------------------
(function() {
    console.log("animations/slide.animation.js loaded.");

    /** 
      * @name animateSlideUpIn
      * @desc Function for the slide up in animation.
      * @param {Constant} CONFIG - The app config constant
      * @param {Service} AnimationService - The custom animation service
      * @return {Object} - The instance of the animation function
    **/
    function animateSlideUpIn(CONFIG, Animation, AnimationService) {
        "ngInject"; // tag this function for dependancy injection

        // object with animation 
        // properties and options
        var animation = {
            name: "transition.slideUpIn", easing: "easeInOutQuad",
            delay: CONFIG.animation.delay, duration: CONFIG.animation.duration
        };

        // create and return the animation
        return new Animation("in", animation, AnimationService);
    }

    /** 
      * @name animateSlideDownIn
      * @desc Function for the slide down in animation.
      * @param {Constant} CONFIG - The app config constant
      * @param {Factory} Animation - The custom animation factory
      * @param {Service} AnimationService - The custom animation service
      * @return {Object} - The instance of the animation function
    **/
    function animateSlideDownIn(CONFIG, Animation, AnimationService) {
        "ngInject"; // tag this function for dependancy injection

        // object with animation 
        // properties and options
        var animation = {
            name: "transition.slideDownIn", easing: "easeInOutQuad",
            delay: CONFIG.animation.delay, duration: CONFIG.animation.duration
        };

        // create and return the animation
        return new Animation("in", animation, AnimationService);
    }

    /** 
      * @name animateSlideUpOut
      * @desc Function for the slide up out animation.
      * @param {Constant} CONFIG - The app config constant
      * @param {Service} AnimationService - The custom animation service
      * @return {Object} - The instance of the animation function
    **/
    function animateSlideUpOut(CONFIG, Animation, AnimationService) {
        "ngInject"; // tag this function for dependancy injection

        // object with animation 
        // properties and options
        var animation = {
            name: "transition.slideUpOut", easing: "easeOutQuad",
            delay: CONFIG.animation.delay, duration: CONFIG.animation.duration
        };

        // ---------------------------------------------
        //   Instance block
        // ---------------------------------------------
        // create and return the animation
        return new Animation("out", animation, AnimationService);
    }

    /** 
      * @name animateSlideDownOut
      * @desc Function for the slide down out animation.
      * @param {Constant} CONFIG - The app config constant
      * @param {Factory} Animation - The custom animation factory
      * @param {Service} AnimationService - The custom animation service
      * @return {Object} - The instance of the animation function
    **/
    function animateSlideDownOut(CONFIG, Animation, AnimationService) {
        "ngInject"; // tag this function for dependancy injection

        // object with animation 
        // properties and options
        var animation = {
            name: "transition.slideDownOut", easing: "easeOutQuad",
            delay: CONFIG.animation.delay, duration: CONFIG.animation.duration
        };

        // ---------------------------------------------
        //   Instance block
        // ---------------------------------------------
        // create and return the animation
        return new Animation("out", animation, AnimationService);
    }

    // ---------------------------------------------
    //   Module export block
    // ---------------------------------------------
    // get the app module
    angular.module("vw.pricing")
        .directive("animateSlideUpIn", animateSlideUpIn)     // set in directive
        .directive("animateSlideDownIn", animateSlideDownIn) // set in directive

        .directive("animateSlideUpOut", animateSlideUpOut)     // set out directive
        .directive("animateSlideDownOut", animateSlideDownOut) // set out directive

        .animation(".animate-slide-up-in", animateSlideUpIn)     // set in animation
        .animation(".animate-slide-down-in", animateSlideDownIn) // set in animation

        .animation(".animate-slide-up-out", animateSlideUpOut)     // set out animation
        .animation(".animate-slide-down-out", animateSlideDownOut) // set out animation
})();