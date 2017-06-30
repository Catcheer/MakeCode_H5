var gulp = require('gulp')
var px2rem = require('gulp-pxrem')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var autoprefixer = require('gulp-autoprefixer')
var cssmin = require('gulp-clean-css');



//编译Sass，Autoprefix及缩小化
gulp.task('sass', () => gulp.src('./src/style.scss')
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['> 1%', 'Firefox <= 20', 'last 10 versions', 'IE 8'],
    cascade: false
  }))
  .pipe(px2rem({
    baseDpr: 2, // base device pixel ratio (default: 2)
    threeVersion: false, // whether to generate @1x, @2x and @3x version (default: false)
    remVersion: true, // whether to generate rem version (default: true)
    remUnit: 75, // rem unit value (default: 75)
    remPrecision: 6
  }))
  .pipe(rename('style.css'))
  .pipe(cssmin('style.css'))
  .pipe(gulp.dest('./src/')))


gulp.task('dev', ['sass'], () => {
  gulp.watch(`./src/**/*.scss`, ['sass']);
});


gulp.task('default', ['dev'])