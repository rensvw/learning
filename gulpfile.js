/* File: gulpfile.js */

// grab our packages
var gulp   = require('gulp'),
    babel = require('gulp-babel'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    filesize = require('gulp-filesize')
    plumber = require('gulp-plumber');



// define the default task and add the watch task to it
gulp.task('default', ['watch']);

gulp.task('clean', function () {
    return gulp.src('public/javascript/**/*.js', {read: false})
        .pipe(clean());
});


gulp.task('build-js', function() {
    return gulp.src('source/javascript/**/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('bundle.js'))
        .pipe(filesize())
        //only uglify if gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/javascript'))
        .pipe(filesize())

        .on('error', gutil.log);
});

/*gulp.task('build-css', function() {
    return gulp.src('source/scss/!**!/!*.scss')
        .pipe(sourcemaps.init())  // Process the original sources
        .pipe(sass())
        .pipe(sourcemaps.write()) // Add the map to modified source.
        .pipe(gulp.dest('public/assets/stylesheets'));
});*/

// configure the jshint task
gulp.task('jshint', function() {
    return gulp.src('source/javascript/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('source/javascript/**/*.js', ['jshint','build-js']);
    //gulp.watch('source/scss/**/*.scss', ['build-css']);
});