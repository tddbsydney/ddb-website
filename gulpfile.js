'use strict';

// -------------------------------------
//   Gulpfile
// -------------------------------------
/** 
  * @name gulpfile
  * @desc The main js file that contains the 
          gulp run options for the app.
          **/

// -------------
// DEPENDENCIES
// -------------
// BASE
var gulp = require('gulp');
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');

var rimraf = require('gulp-rimraf');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var gutil  = require('gulp-util');

// MAIN
var wait = require('gulp-wait');
var exit = require('gulp-exit');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');

// -------------------
// GET CONFIG OPTIONS
// -------------------
var config = require('./_gulp/config.js').getConfig();
var watchers = require('./_gulp/config.js').getWatchers();

// ------------------------
// GULP - IMPORT ALL TASKS
// ------------------------
var requireDir = require('require-dir');
requireDir('./_gulp/tasks', {recurse: true});

// ------------------------
// ERROR HANDLING FUNCTION
// ------------------------
// error handling object
var errorObj = {
  error: null, // the error
  timer: null, // the error timer
  timeout: 5000 // the error timeout 
};

// error handing function
var errorHandler = function (error) {
  // output a error message
  notify({
    title: 'Gulp Task Error',
    message: '(' + error.plugin + '): ' + error.message
  }).write(error);

  // clear previous error handling timers
  if(errorObj.timer != null) { errorObj.timer = null; }

  // set error handling object
  errorObj.error = error;
  errorObj.timer = setTimeout(function(){
      // reset the error handling object
      errorObj.error = null; errorObj.timer = null;
  }, errorObj.timeout);

  // emit the end event 
  // to properly end the task
  this.emit('end');
};

// ----------------------------------
// GULP SRC - INCLUDE ERROR HANDLING
// ----------------------------------
var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)

    // use plumber to handle errors
    .pipe(plumber({
      errorHandler: errorHandler
    }));
};

// -----------------------------
// FUNCTION TO END ALL WATCHERS
// -----------------------------
var endWatchers = function() {
  // loop through each watcher 
  watchers.forEach(function(watcher, index) {
    // end the watcher
    watcher.end();
  });
};

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ---------------------------------
// GULP - DEFAULT
// ---------------------------------
gulp.task('default', function(callback) {
  // run all tasks in squence
  // and the callback on complete
  return runSequence(
    'assets:icons',  // compile icons
    'assets:fonts',  // compile fonts
    'assets:images', // compile images
    'assets:videos', // compile videos

    /*'data',*/ // compile data
    /*'html',*/ // compile html
    'styles',   // compile styles
    'scripts',  // compile scripts

    /*'index',*/ // index files
    /*'serve',*/ // serve files

    /*'jekyll',*/ // jekyll files
    'complete',   // run complete
    callback      // run callback
  );
});

// FOR DEVELOPMENT MODE
gulp.task('dev', function(callback) {
  // set config mode options
  config.mode.isProd = false; // dev mode
  config.mode.isMapped = true; // create source maps
  config.mode.isStripped = false; // leave comments, logs

  // run the default gulp
  return runSequence('default', callback);
});

// FOR PRODUCTION MODE
gulp.task('prod', function(callback) {
  // set config mode options
  config.mode.isProd = true; // prod mode
  config.mode.isStripped = true; // remove comments, logs

  // create source maps only in non deployment mode
  config.mode.isDeploy ? 
  config.mode.isMapped = false:
  config.mode.isMapped = true;

  // run the default gulp
  return runSequence('default', callback);
});

// FOR DEPLOYMENT MODE
gulp.task('deploy', function(callback) {
  // set config mode options
  config.mode.isWatched = false; // remove watchers

  // deploy is the same as deploy:prod
  return runSequence('deploy:prod', callback);
});

// FOR DEPLOYMENT MODE - DEV
gulp.task('deploy:dev', function(callback) {
  // set config mode options
  config.mode.isDeploy = true; // deploy mode

  // run the dev gulp
  return runSequence('dev', callback);
});

// FOR DEPLOYMENT MODE - PROD
gulp.task('deploy:prod', function(callback) {
  // set config mode options
  config.mode.isDeploy = true; // deploy mode

  // run the prod gulp
  return runSequence('prod', callback);
});

// ---------------------------------
// GULP - COMPLETE
// ---------------------------------
// task to output a complete 
// notication message to the user
// ( with the current mode config )
gulp.task('complete', function() {

  // title, message for the notification
  var title = 'Gulp Tasks Complete';
  var message = 'All gulp tasks have completed in' + 
  (config.mode.isProd ? ' production' : ' development') + ' mode' +
  (config.mode.isDeploy ? ' and complied files have been deployed.' : '.') + 
  (config.mode.isDeploy ? '' : ' Now watching for source file changes.');

  // return task stream
  return gulp.src([config.files.root.prod])

    // the delay is to ensure
    // that no tasks are pending
    .pipe(wait(config.wait.complete))

    // output the complete notification message
    // if no error occurred in any of the tasks
    .pipe(gulpif(errorObj.error == null, notify({
      title: title, message: message
    })))

    .pipe(gulpif(!config.mode.isWatched, exit()));
});


// ----------------------------------------------------------------------
// ----------------------------------------------------------------------