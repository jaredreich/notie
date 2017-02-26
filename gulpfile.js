const gulp = require('gulp')
const babel = require('gulp-babel')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const del = require('del')
const run = require('run-sequence')

gulp.task('clean', () => del(['./dist']))

gulp.task('script', () => {
  gulp.src('./src/notie.js')
    .pipe(babel({
      plugins: [
        'transform-es2015-modules-umd'
      ],
      presets: [
        'es2015', 'stage-3'
      ]
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('notie.min.js'))
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

gulp.task('watch', () => {
  gulp.watch('./src/notie.scss', ['style'])
  gulp.watch('./src/notie.js', ['script'])
})
