var gulp = require('gulp');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var handleErrors = require('../util/handleErrors');


gulp.task('jade', function () {
  return gulp.src('app/*.jade')
    .pipe(jade())
    .on('error', handleErrors)
    .pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

