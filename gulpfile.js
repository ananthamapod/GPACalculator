/*********************** IMPORTS ***********************/

// include plugins
const gulp = require('gulp')
const react = require('gulp-react')

const jshint = require("gulp-jshint")

const changed = require("gulp-changed")
const imagemin = require("gulp-imagemin")

const minifyHTML = require("gulp-minify-html")

const concat = require("gulp-concat")
const stripDebug = require("gulp-strip-debug")
const uglify = require("gulp-uglify")

const autoprefix = require("gulp-autoprefixer")
const minifyCSS = require("gulp-minify-css")

const pump = require('pump')

/******************************************************/

/*********************** TASKS ************************/
/* Path objects for convenience */
var srcs = {
  JSX: 'src/jsx/*.jsx',
  JS:  ['src/js'],
  CSS: ['src/css/*.css'],
  HTML: ['src/*.html']
}

var dests = {
  JS:  'build/js',
  CSS: 'build/css',
  HTML: 'build'
}


gulp.task('transform', function(cb) {
  pump(
    [
      gulp.src(srcs.JSX),
      react(),
      gulp.dest(dests.JS)
    ],
    cb
  )
})

// CSS concat, auto-prefix and minify
gulp.task('styles', function(cb) {
  pump(
    [
      gulp.src(srcs.CSS),
        concat('style.css'),
        autoprefix('last 2 versions'),
        minifyCSS(),
        gulp.dest(dests.CSS)
    ],
    cb
  )
})

// minify new and changed HTML pages
gulp.task('html', function(cb){
  pump(
    [
      gulp.src(srcs.HTML),
      changed(dests.HTML),
      minifyHTML(),
      gulp.dest(dests.HTML)
    ],
    cb
  )
})

gulp.task('watch', function(){
  gulp.watch(srcs.JSX, ['transform'])
  gulp.watch(srcs.CSS, ['styles'])
  gulp.watch(srcs.HTML, ['html'])
})


gulp.task('default', ['watch'])
/*
// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// image minifying task
gulp.task('imagemin', function() {*/
//  var imgSrc = './src/img/**/*';
/*  var imgDst = './build/img';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./src/js/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
})

/******************************************************

// Bundle tasks
// default gulp task
gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles'], function() {
  // watch for HTML changes
  gulp.watch('./src/*.html', function() {
    gulp.run('htmlpage');
  });

  // watch for JS changes
  gulp.watch('./src/js/*.js', function() {
    gulp.run('jshint', 'scripts');
  });

  // watch for CSS changes
  gulp.watch('./src/css/*.css', function() {
    gulp.run('styles');
  });
});
*/
