var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var size = require('gulp-size');


gulp.task('images', ['rimraf'], function () {
    return gulp.src('app/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(size());
});
