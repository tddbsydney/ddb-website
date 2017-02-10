'use strict';

// -------------------------------------
//   Gulp - Data
// -------------------------------------
/** 
  * @name data
  * @desc The js file that contains the functions 
          for compiling data for the app.
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

// DATA
var prettyData = require('gulp-pretty-data');

// -------------------
// GET CONFIG OPTIONS
// -------------------
var config = require('../config.js').getConfig();
var watchers = require('../config.js').getWatchers();

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// ----------------------------------------
// DATA - MAIN TASK
// ----------------------------------------
gulp.task('data', function(callback) {
    // run the default task first, 
    // and then the watch task, and
    // finally the callback on complete
    return runSequence(
        'data:default',
        'data:watch', 
        callback
    );
});

// 0. DATA - DEFAULT TASK
gulp.task('data:default', function(callback) {
    // run all tasks in sequence
    // and the callback on complete
    return runSequence(
        'data:clean', 
        'data:custom',
        'data:files',
        'data:copy', 
        callback
    );
});

// 1. DATA - CLEAN
gulp.task('data:clean', function () {
    // source folders / files for the task
    var source = [
        config.files.root.prod + config.files.data // all files
    ];

    // add deploy folders / files into 
    // source in deployment mode
    if(config.mode.isDeploy) {
        source.push(config.files.root.deploy + config.files.data); // all files
    }

    //  return task stream
    return gulp.src(source, { read: false })

        // clean the folders / files
        .pipe(rimraf({ force: true }));
});

// 2. DATA - CUSTOM
gulp.task('data:custom', function () {
    // source folders / files for the task
    var source = [
      config.files.root.dev + config.files.data + '**/*.xml', // xml files
      config.files.root.dev + config.files.data + '**/*.json' // json files
    ];

    // destination folder for the task
    var destination = config.files.root.prod + config.files.data;

    //  return task stream
    return gulp.src(source)
         // minify the json, xml files
        .pipe(gulpif(config.mode.isProd, prettyData({ type: 'minify' })))

        // output the json, xml files
        .pipe(gulp.dest(destination));
});

// 3. DATA - FILES
gulp.task('data:files', function () {
    // source folders / files for the task
    var source = [
      config.files.root.dev + config.files.data + 'files/*.*' // all files
    ];

    // destination folder for the task
    var destination = config.files.root.prod + config.files.data + 'files/';

    //  return task stream
    return gulp.src(source)

        // output the other files
        .pipe(gulp.dest(destination));
});

// 4. DATA - COPY
gulp.task('data:copy', function() {
    // only copy files when in deployment mode
    if(!config.mode.isDeploy) { return false; }

    // source folders / files for the task
    var source = [
        config.files.root.prod + config.files.data + '**/*.*' // all files
    ];

    // destination folder for the task
    var destination = config.files.root.deploy + config.files.data;

    // return task stream
    return gulp.src(source)

        // copy files to new folder ( in deployment mode )
        .pipe(gulpif(config.mode.isDeploy, gulp.dest(destination)));
});


// 5. DATA - WATCH
gulp.task('data:watch', function() {
    // source folders / files for the task
    var source = [
        config.files.root.dev + config.files.data + '**/*.*' // all files
    ];

    // push watcher into the main
    // array, and return the new size
    return watchers.push(gulp.watch(
        source,  // files to watch for
        ['data:default'] // tasks to run on change
    ));
});

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------