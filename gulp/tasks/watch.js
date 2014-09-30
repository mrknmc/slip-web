var gulp = require('gulp');


gulp.task('watch', ['rimraf', 'build'], function () {

    // Watch .scss files
    gulp.watch('app/styles/**/*.scss', ['styles']);

    // Watch .jade files
    gulp.watch(['app/template/**/*.jade', 'app/index.jade'], ['jade']);

    // Watch .coffeescript files
    gulp.watch('app/scripts/**/*.coffee', ['coffee', 'scripts']);

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);
});
