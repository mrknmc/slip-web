var gulp = require('gulp');
var rimraf = require('gulp-rimraf');


gulp.task('rimraf', function () {
    return gulp.src('dist/*', {read: false})
        .pipe(rimraf());
});
