var gulp = require('gulp');
var rubySass = require('gulp-ruby-sass');
var size = require('gulp-size');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var handleErrors = require('../util/handleErrors');


gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe(rubySass({
        style: 'expanded',
        precision: 10,
        loadPath: ['bower_components']
    }))
    .on('error', handleErrors)
    .pipe(autoprefixer('last 1 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(size())
    .pipe(livereload());
});
