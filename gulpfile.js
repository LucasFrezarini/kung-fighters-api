var gulp        = require('gulp');
var babel       = require('gulp-babel');
var clean       = require('gulp-clean');
var nodemon     = require('gulp-nodemon');

gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('compile', ['clean'] , function() {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  return gulp.watch('src/**/*.js', ['compile']);
});

gulp.task('nodemon', ['compile'], function() {
  return nodemon({
    tasks: ['compile'],
    script: "dist/index.js",
    watch: [
      'src'
    ]
  })
});