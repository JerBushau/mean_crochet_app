'use strict'

const path = require('path');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const webpack = require('gulp-webpack');

// webpack tasks
gulp.task('webpackIt', function() {
  return gulp.src(__dirname)
  .pipe(webpack( require('./webpack.config.js') ))
  .pipe(gulp.dest('./public/scripts'));
});

// css tasks
gulp.task('autoprefixer', ['compileSass'], function () {
  return gulp.src('./stylesheets/css/main.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer({ browsers: ['last 3 versions'] }) ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./stylesheets/css'));
});

gulp.task('compileSass', function() {
  return gulp.src('./public/stylesheets/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/stylesheets/css'));
});

gulp.task('prepCss', ['compileSass', 'autoprefixer']);

// watch stuff
gulp.task('watchStuff', function() {
  gulp.watch('./public/stylesheets/sass/**/*.scss', ['prepCss']);
  gulp.watch('./app/**/*.js', ['webpackIt']);
});
