var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('watch', ['build'], function () {
    //start the server at the beginning of the task
    // connect.server({
    //   root: ['dist'],
    //   port: 5000,
    //   livereload: true
    // });
        // Watch .scss files
    gulp.watch('app/styles/**/*.scss', ['styles']);

    // Watch .jade files
    gulp.watch('app/**/*.jade', ['jade']);

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);

});
