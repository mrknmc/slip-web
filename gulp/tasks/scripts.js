var gulp = require('gulp');
var browserify = require('gulp-browserify');
var size = require('gulp-size');
var connect = require('gulp-connect');
var handleErrors = require('../util/handleErrors');


gulp.task('scripts', function () {
  return gulp.src('app/scripts/app.js')
    .pipe(browserify({
        insertGlobals: true
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest('dist/scripts'))
    .pipe(size())
  	.pipe(connect.reload());
});
