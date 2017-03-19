var gulp       = require('gulp');
var compass    = require('gulp-compass');
var concat     = require('gulp-concat');
var minify     = require('gulp-minify');

gulp.task('compass', function () {
  gulp
    .src('./sass/**/*.sass')
    .pipe(compass({
      config_file: './config.rb',
      css: 'public/styles',
      sass: 'sass'
    }))
    .pipe(gulp.dest('./public/styles'))
    .on('error', function (err) {
      console.log(err.message);
    });
});

gulp.task('concat', function () {
  var files = [
    'bower_components/particles.js/particles.js',
    'public/scripts/page-scripts.js'
  ];

  gulp
    .src(files)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('public/scripts'));
});

// TODO - finish
/*
gulp.task('minify', function () {
  gulp
    .src('public/scripts/scripts.js')
    .pipe(minify({

    }))
    .pipe(gulp.dest('public/scripts'));
});
*/

gulp.task('default', ['compass', 'concat']);

