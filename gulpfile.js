// @ts-nocheck
const gulp = require('gulp');

const Webpack = require('webpack');
const webpack = require('webpack-stream');
const TerserPlugin = require("terser-webpack-plugin");
const _banner = `Notie v.${require('./package.json').version}`

const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');

gulp.task('clean', function(done) {
    gulp.src('./dist/**/*.*', { read: false, allowEmpty: true })
    .pipe(clean());
    done();
});

const webpackConfig = minimize => ({
    mode: 'production',
    devtool: minimize ? 'source-map' : false,
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
    plugins: [
        new Webpack.BannerPlugin({
            banner: _banner
          })
    ],
    optimization: {
        minimize: minimize ? true : false,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                        preamble: `/*! ${_banner} */`
                    }
                },
                extractComments: false
            })
        ]
    }
});

gulp.task('script', (done) => {
    gulp.src('./src/notie.js')
          .pipe(webpack(webpackConfig(false), Webpack))
          .pipe(gulp.dest('./dist'))
          .pipe(webpack(webpackConfig(true), Webpack))
          .pipe(gulp.dest('./dist'));
    done();
});

gulp.task('style', (done) => {
    gulp.src(['./src/notie.scss'])
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./dist'))
          .pipe(cleancss())
          .pipe(rename('notie.min.css'))
          .pipe(gulp.dest('./dist'));
    done();
});

gulp.task('watch', (done) => {
    gulp.watch('./src/notie.scss', gulp.series('style'));
    gulp.watch('./src/notie.js', gulp.series('script'));
    done();
});

gulp.task('default', (done) => {
    gulp.series('clean',
                gulp.parallel('script', 'style'),
                'watch')(done);
});