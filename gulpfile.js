// https://github.com/tnktp/jquery-flash-webcam

var babel = require('gulp-babel');
var concat = require('gulp-concat');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var dependencies = require('./dependencies.json');

var PATH = 'dist';

gulp.task('default', ['build']);
gulp.task('build', ['app', 'libs']);
gulp.task('app', ['app.js', 'app.css']);
gulp.task('libs', ['libs.js', 'libs.css']);
gulp.task('watch', ['build', 'app.js:watch', 'app.css:watch']);

gulp.task('libs.css', function() {
  return gulp.src(dependencies.libs.css)
      .pipe(concat('libs.css'))
      .pipe(gulp.dest(PATH));
});

gulp.task('libs.js', function() {
  return gulp.src(dependencies.libs.js)
      .pipe(concat('libs.js'))
      .pipe(gulp.dest(PATH));
});

gulp.task('app.js', function() {
  return gulp.src(dependencies.app.js)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATH));
});

gulp.task('app.js:watch', function() {
  return gulp.watch(dependencies.app.js, ['app.js']);
});

gulp.task('app.css', function() {
  return gulp.src(dependencies.app.css)
    .pipe(sourcemaps.init())
    .pipe(concat('app.scss'))
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(PATH));
});

gulp.task('app.css:watch', function() {
  return gulp.watch(dependencies.app.css, ['app.css']);
});
