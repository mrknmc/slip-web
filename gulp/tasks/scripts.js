var gulp = require('gulp');
var browserify = require('gulp-browserify');
var size = require('gulp-size');
var handleErrors = require('../util/handleErrors');


gulp.task('scripts', ['rimraf'], function () {
    return gulp.src('app/scripts/app.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .on('error', handleErrors)
        .pipe(gulp.dest('dist/scripts'))
        .pipe(size());
});
