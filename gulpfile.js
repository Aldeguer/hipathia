var gulp = require('gulp'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    concat = require('gulp-concat');

gulp.task('default', function() {
    gulp.start('scripts', 'less', 'watch', 'lint');

});

gulp.task('scripts', function() {
    return gulp.src([
            'public/assets/bower_components/jquery/dist/jquery.min.js',
            'public/assets/bower_components/angular/angular.js',
            'public/assets/bower_components/angular-ui-router/release/angular-ui-router.js',
            'public/assets/bower_components/ngmap/build/scripts/ng-map.min.js',
            'public/assets/bower_components/angular-sanitize/angular-sanitize.js',
            'public/assets/bower_components/bootstrap/dist/js/bootstrap.js',
            'public/code/app.js',
            'public/code/**/*.js',
            'public/code/**/**/*.js'

        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/dist/'));
});

gulp.task('less', function() {
    return gulp.src('public/assets/less/style.less')
        .pipe(less())
        .pipe(gulp.dest('public/dist/'));

});

gulp.task('watch', function() {
    gulp.watch('public/assets/less/*.less', ['less']);
    gulp.watch(['public/code/**/*.js', 'public/code/**/**/*.js'], ['scripts']);
    gulp.watch(['public/code/**/*.js', 'public/code/**/**/*.js'], ['lint']);
});

gulp.task('lint', function() {
    return gulp.src([
            'public/code/**/*.js',
            'public/code/**/**/*.js',
            'routes/api/**/*.js',
            'model/*.js',
            'config/*.js',
            'server.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))

});

