/*********************** IMPORTS ***********************/

// include gulp
var gulp = require("gulp");

// include plugins
var jshint = require("gulp-jshint");

var changed = require("gulp-changed");
var imagemin = require("gulp-imagemin");

var minifyHTML = require("gulp-minify-html");

var concat = require("gulp-concat");
var stripDebug = require("gulp-strip-debug");
var uglify = require("gulp-uglify");

var autoprefix = require("gulp-autoprefixer");
var minifyCSS = require("gulp-minify-css");

/*******************************************************/

/*********************** TASKS *************************/
// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// image minifying task
gulp.task('imagemin', function() {
  var imgSrc = './src/img/**/*';
  var imgDst = './build/img';

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
  gulp.src(['./src/js/lib.js','./build/js/'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
})

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./src/stylesheets/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/stylesheets/'));
})

/*******************************************************/

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
  gulp.watch('./src/stylesheets/*.css', function() {
    gulp.run('styles');
  });
});
