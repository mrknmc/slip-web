var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var connect = require('gulp-connect');
var handleErrors = require('../util/handleErrors');


gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    // .pipe(browserify({
    //     insertGlobals: true
    // }))
    .pipe(uglify())
    .on('error', handleErrors)
    .pipe(gulp.dest('dist/scripts'))
    .pipe(size())
  	.pipe(connect.reload());
});
