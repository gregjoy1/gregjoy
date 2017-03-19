var gulp       = require('gulp');
var compass    = require('gulp-compass');

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

gulp.task('default', ['compass']);

