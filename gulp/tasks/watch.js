var gulp = require('gulp');
var connect = require('gulp-connect');


gulp.task('watch', ['setWatch', 'build'], function () {
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/**/*.jade', ['jade']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
});
