'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'), 
  browserify = require('browserify'),
  source = require('vinyl-source-stream');

//lint js files
gulp.task('lint', function() {
    gulp.src(['*.js','routes/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
 
gulp.task('buildjs', function () {
 
    return browserify({ entries:['./jsx/app.jsx'], debug: true })
        .transform('reactify', { 'es6': true}) 
        .bundle()
        .on('error', function (e) {
            console.log('browserify error');
            console.log(arguments);
            throw e;
        })
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/js')) 
        .on('end', function () {
            console.log('ended');
        });
});

gulp.task('build', ['buildjs']);

gulp.task('default', [ 'build' ]);