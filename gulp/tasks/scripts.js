var gulp = require('gulp');
var bundleLogger = require('../util/bundleLogger');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var connect = require('gulp-connect');
var handleErrors = require('../util/handleErrors');


gulp.task('scripts', function () {
  var bundler = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Specify the entry point of your app
    entries: './app/scripts/app.js',
  });

  var bundle = function () {
    bundler
      .bundle()
      .on('error', handleErrors)
      .pipe(source('app.js'))
      .pipe(gulp.dest('dist/scripts'));
  };

  // bundler.on('update', function(){
  //   bundle();
  // });

  return bundle();
});
