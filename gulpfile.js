'use strict'

const gulp         = require('gulp');
const postcss      = require('gulp-postcss');
const sourcemaps   = require('gulp-sourcemaps');
const sass         = require('gulp-sass');
const autoprefixer = require('autoprefixer');



// css tasks

gulp.task('autoprefixer', ['compileSass'], function () {
  return gulp.src('./stylesheets/css/main.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions'] }) ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./stylesheets/css'));
});

gulp.task('compileSass', function() {
  return gulp.src('./stylesheets/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./stylesheets/css'));
});

gulp.task('html/css', ['compileSass', 'autoprefixer']);

gulp.task('watchSass', function() {
  gulp.watch('./stylesheets/sass/**/*.scss', ['html/css']);
});
