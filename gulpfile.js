// load modules
var gulp = require('gulp');
var uncss = require('gulp-uncss');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var gzip = require('gulp-gzip');
var spawn = require('child_process').spawn;
var browserSync = require('browser-sync').create();

// define inputs
var input = {
  pages: ['**/*.+(html|md|markdown|xml|yml|scss)', '!_site/*'],
  scripts_head: ['assets/scripts/vendor/modernizr.js'],
  scripts_main: ['assets/scripts/vendor/jquery.js', 'assets/scripts/vendor/fastclick.js', 'assets/scripts/foundation.min.js']
};

// define outputs
var output = {
  assetsFolder: '_site/assets',
  scripts_head: 'scripts_head.js',
  scripts_main: 'scripts_main.js',
  styles: 'styles.css'
};

// default task (start development task)
gulp.task('default', ['development']);

// development task
gulp.task('development', ['jekyll', 'scripts', 'serve'], function() {
  // reload browser as the files have been changed recently
  browserSync.reload();

  // and watch files for changes
  gulp.watch(input.pages, ['jekyll-reload']);
  gulp.watch(input.scripts, ['scripts-reload']);
});

// start jekyll to rebuild web site
gulp.task('jekyll', function(gulpCallBack) {
  // start jekyll task
  var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});

  // and wait for task to be finished
  jekyll.on('exit', function(code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
  });
});

// task to recreate site and reload browser on changes
gulp.task('jekyll-reload', ['jekyll'], function() {
  browserSync.reload();
});

// Combine JS script files
gulp.task('scripts', ['scripts-head', 'scripts-main']);

gulp.task('scripts-head', function() {
  return gulp.src(input.scripts_head)
    .pipe(concat(output.scripts_head))
    .pipe(gulp.dest(output.assetsFolder));
});

gulp.task('scripts-main', function() {
  return gulp.src(input.scripts_main)
    .pipe(concat(output.scripts_main))
    .pipe(gulp.dest(output.assetsFolder));
});

// task to recreate scripts and reload browser on changes
gulp.task('scripts-reload', ['scripts'], function() {
  browserSync.reload();
});

// release task
gulp.task('release', ['html-release', 'styles-release', 'scripts-release']);

// task to optimize scripts for release
gulp.task('scripts-release', ['scripts-release-head', 'scripts-release-main']);

gulp.task('scripts-release-head', ['jekyll', 'scripts-head'], function() {
  return gulp.src(output.assetsFolder + '/' + output.scripts_head)
    .pipe(uglify({preserveComments: 'license'}))
    .pipe(gulp.dest(output.assetsFolder))
    .pipe(gzip())
    .pipe(gulp.dest(output.assetsFolder));
});

gulp.task('scripts-release-main', ['jekyll', 'scripts-main'], function() {
  return gulp.src(output.assetsFolder + '/' + output.scripts_main)
    .pipe(uglify({preserveComments: 'license'}))
    .pipe(gulp.dest(output.assetsFolder))
    .pipe(gzip())
    .pipe(gulp.dest(output.assetsFolder));
});

// task to optimize styles
gulp.task('styles-release', ['jekyll', 'html-release'], function() {
  return gulp.src(output.assetsFolder + '/' + output.styles)
    .pipe(uncss({
      html: ['_site/**/*.html']
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(output.assetsFolder))
    .pipe(gzip())
    .pipe(gulp.dest(output.assetsFolder));
});

// task to optimize HTML
gulp.task('html-release', ['jekyll'], function() {
  return gulp.src('_site/**/*.html')
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('_site'));
});

// task to serve site to browsers
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "_site/"
    }
  });
});
