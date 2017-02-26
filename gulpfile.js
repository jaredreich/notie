const Webpack = require('webpack')
const gulp = require('gulp')
const webpack = require('gulp-webpack')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const del = require('del')
const run = require('run-sequence')

gulp.task('clean', () => del(['./dist']))

const webpackConfig = minimize => ({
  output: {
    filename: minimize ? 'notie.min.js' : 'notie.js',
    library: 'notie',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: minimize
    ? [
      new Webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        mangle: true,
        sourcemap: false
      })
    ]
    : []
})

gulp.task('script', () => {
  gulp.src('./src/notie.js')
  .pipe(webpack(webpackConfig(false), Webpack))
  .pipe(gulp.dest('./dist'))
  .pipe(webpack(webpackConfig(true), Webpack))
  .pipe(gulp.dest('./dist'))
})

gulp.task('style', () => {
  gulp.src(['./src/notie.scss'])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./dist'))
  .pipe(cssnano())
  .pipe(rename('notie.min.css'))
  .pipe(gulp.dest('./dist'))
})

gulp.task('default', ['clean'], () => {
  run('script', 'style')
  gulp.watch('./src/notie.scss', ['style'])
  gulp.watch('./src/notie.js', ['script'])
})
