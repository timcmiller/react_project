//inspired from Ryan and Dan with permission

var gulp = require('gulp');
var webpack = require('webpack-stream');
var babel = require('gulp-babel');

gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});


gulp.task('webpack:dev', function() {
  return gulp.src('app/js/app.js')
  .pipe(webpack({
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
    },
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('build', ['webpack:dev', 'static:dev']);
