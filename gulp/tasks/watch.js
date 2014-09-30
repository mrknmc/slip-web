var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('watch', ['build'], function () {
    //start the server at the beginning of the task
    //server.run({
    //    env: 'development',
    //    file: 'web.js'
    //});

        // Watch .scss files
    gulp.watch('app/styles/**/*.scss', ['styles', server.notify]);

    // Watch .jade files
    gulp.watch('app/**/*.jade', ['jade', server.notify]);

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts', server.notify]);

    // Watch image files
    gulp.watch('app/images/**/*', ['images', server.run]);

});
