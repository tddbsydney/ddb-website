'use strict';

// -------------------------------------
//   Gulp - Jekyll
// -------------------------------------
/** 
  * @name jekyll
  * @desc The js file that contains the functions 
          for compiling files for the jekyll site.
**/

// -------------
// DEPENDENCIES
// -------------
// BASE
var gulp = require('gulp');
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');

var replace = require('gulp-replace');
var rimraf = require('gulp-rimraf');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var gutil  = require('gulp-util');
var wait = require('gulp-wait');

// -------------------
// GET CONFIG OPTIONS
// -------------------
var config = require('../config.js').getConfig();
var watchers = require('../config.js').getWatchers();

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------
// JEKYLL - MAIN TASK
// ----------------------------------------
gulp.task('jekyll', function(callback) {
  // run the default task first, 
  // and then the watch task, and
  // finally the callback on complete
  return runSequence(
    'jekyll:default',
    'jekyll:watch', 
    callback
  );
});

// 0. JEKYLL - DEFAULT TASK
gulp.task('jekyll:default', function(callback) {
  // run all tasks in sequence
  // and the callback on complete
  return runSequence(
    'jekyll:clean',
    'jekyll:copy',
    callback
  );
});

// 1. JEKYLL - CLEAN
gulp.task('jekyll:clean', function () {
  // only clean files when
  // in deployment mode
  if(!config.mode.isDeploy) {
    return false;
  }

  // source folders / files for the task
  var source = [
    config.files.root.jekyll + config.files.styles.dependencies,  // dependency files
    config.files.root.jekyll + config.files.scripts.dependencies, // dependency files
    config.files.root.jekyll + config.files.styles.css, // app files
    config.files.root.jekyll + config.files.scripts.js, // app files

    config.files.root.jekyll + config.files.assets.fonts,  // font files
    config.files.root.jekyll + config.files.assets.icons,  // icon files
    config.files.root.jekyll + config.files.assets.images, // image files
    config.files.root.jekyll + config.files.assets.videos  // video files
  ];

  //  return task stream
  return gulp.src(source, { read: false })

    // the delay is to ensure
    // that no tasks are pending
    .pipe(wait(config.wait.jekyll))

    // clean the folders / files
    .pipe(rimraf({ force: true }));
});

// 2. JEKYLL - COPY
gulp.task('jekyll:copy', function() {
  // only copy files when
  // in deployment mode
  if(!config.mode.isDeploy) {
    return false;
  }

  // source folders / files for the task
  var source = [
    config.files.root.deploy + '**/*.*' , // all files
  ];

  // destination folder for the task
  var destination = config.files.root.jekyll;

  // return task stream
  return gulp.src(source)

    // copy files to new folder ( in deployment mode )
    .pipe(gulpif(config.mode.isDeploy, gulp.dest(destination)));
});

// 3. JEKYLL - WATCH
gulp.task('jekyll:watch', function() {
  // source folders / files for the task
  var source = [
    config.files.root.dev + config.files.styles.sass + '**/*.*', // app sass files
    config.files.root.dev + config.files.scripts.js + '**/*.*', // app js files
    config.files.root.jekyll + '**/*.html' // jekyll html files
  ];

  // push watcher into the main
  // array, and return the new size
  return watchers.push(gulp.watch(
    source,  // files to watch for
    ['jekyll:default'] // tasks to run on change
  ));
});

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------