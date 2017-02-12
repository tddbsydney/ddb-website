'use strict';

// -------------------------------------
//   Gulp - Site
// -------------------------------------
/** 
  * @name site
  * @desc The js file that contains the functions 
          for compiling files for the site.
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
// SITE - MAIN TASK
// ----------------------------------------
gulp.task('site', function(callback) {
  // run the default task first, 
  // and then the watch task, and
  // finally the callback on complete
  return runSequence(
    'site:default',
    'site:watch', 
    callback
  );
});

// 0. SITE - DEFAULT TASK
gulp.task('site:default', function(callback) {
  // run all tasks in sequence
  // and the callback on complete
  return runSequence(
    'site:clean',
    'site:copy',
    callback
  );
});

// 1. SITE - CLEAN
gulp.task('site:clean', function () {
  // only clean files when
  // in deployment mode
  if(!config.mode.isDeploy) {
    return false;
  }

  // source folders / files for the task
  var source = [
    config.files.root.site + config.files.styles.css, // app files
    config.files.root.site + config.files.scripts.js, // app files
    config.files.root.site + config.files.styles.dependencies,  // dependency files
    config.files.root.site + config.files.scripts.dependencies, // dependency files

    config.files.root.site + config.files.assets.fonts,  // font files
    config.files.root.site + config.files.assets.icons,  // icon files
    config.files.root.site + config.files.assets.images, // image files
    config.files.root.site + config.files.assets.videos  // video files
  ];

  //  return task stream
  return gulp.src(source, { read: false })

    // clean the folders / files
    .pipe(rimraf({ force: true }));
});

// 2. SITE - COPY
gulp.task('site:copy', function() {
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
  var destination = config.files.root.site;

  // return task stream
  return gulp.src(source)

    // the delay is to ensure
    // that no tasks are pending
    .pipe(wait(config.wait))

    // copy files to new folder ( in deployment mode )
    .pipe(gulpif(config.mode.isDeploy, gulp.dest(destination)));
});

// 3. SITE - WATCH
gulp.task('site:watch', function() {
  // source folders / files for the task
  var source = [
    config.files.root.site + '**/*.html' // app files
  ];

  // push watcher into the main
  // array, and return the new size
  return watchers.push(gulp.watch(
    source,  // files to watch for
    ['site:default'] // tasks to run on change
  ));
});

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------