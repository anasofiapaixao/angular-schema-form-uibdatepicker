/* global require */

var gulp = require('gulp');

var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-htmlmin');
var concat = require('gulp-concat');
var terser = require('gulp-terser');
var streamqueue = require('streamqueue');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');

gulp.task('minify', function(done) {
  var stream = streamqueue({objectMode: true});
  stream.queue(
              gulp.src('./src/*.html')
                  .pipe(minifyHtml())
                  .pipe(templateCache({
                    module: 'schemaForm',
                    root: 'directives/decorators/bootstrap/uibdatepicker/'
                  }))
    );
  stream.queue(gulp.src('./src/*.js'));

  stream.done()
        .pipe(concat('angular-schema-form-datepicker.min.js'))
        .pipe(terser())
        .pipe(gulp.dest('./dist'));

  done();

});

gulp.task('non-minified-dist', gulp.series(function(done) {
  var stream = streamqueue({objectMode: true});
  stream.queue(
              gulp.src('./src/*.html')
                  .pipe(templateCache({
                    module: 'schemaForm',
                    root: 'directives/decorators/bootstrap/uibdatepicker/'
                  }))
    );
  stream.queue(gulp.src('./src/*.js'));

  stream.done()
        .pipe(concat('angular-schema-form-uibdatepicker.js'))
        .pipe(gulp.dest('./dist'));

  done();

}));

gulp.task('jshint', gulp.series(function(done) {
  gulp.src('./src/**/*.js')
      .pipe(plumber())
      .pipe(jshint());

  done();
}));

gulp.task('default', gulp.series([
  'minify',
  'non-minified-dist',
  'jshint'
]));

gulp.task('watch', gulp.series(function(done) {
  gulp.watch('./src/**/*', ['default']);

  done();
}));
