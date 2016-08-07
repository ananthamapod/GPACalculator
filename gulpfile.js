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
/* Path object for convenience */
var paths = {
  JSX: 'src/jsx/*.jsx',
  JS:  ['src/js']
}


gulp.task('transform', function(cb) {
  pump(
    [
      gulp.src(paths.JSX),
      react(),
      gulp.dest('build/js')
    ],
    cb
  )
})



gulp.task('watch', function(){
  gulp.watch(paths.JSX, ['transform'])
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

// minify new and changed HTML pages
gulp.task('htmlpage', function(){
  var htmlSrc = './src/*.html';
  var htmlDst = './build';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./src/js/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
})

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./src/css/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions') )
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css/'));
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
