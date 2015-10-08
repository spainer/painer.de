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
  scripts: ['assets/scripts/jQuery/*.js', 'assets/scripts/bootstrap/js/*.js']
};

// define outputs
var output = {
  assetsFolder: '_site/assets',
  scripts: 'scripts.js',
  styles: 'style.css'
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
gulp.task('scripts', function() {
  return gulp.src(input.scripts)
    .pipe(concat(output.scripts))
    .pipe(gulp.dest(output.assetsFolder));
});

// task to recreate scripts and reload browser on changes
gulp.task('scripts-reload', ['scripts'], function() {
  browserSync.reload();
});

// release task
gulp.task('release', ['html-release', 'styles-release', 'scripts-release']);

// task to optimize scripts for release
gulp.task('scripts-release', ['jekyll', 'scripts'], function() {
  return gulp.src(output.assetsFolder + '/' + output.scripts)
    .pipe(uglify({preserveComments: 'license'}))
    .pipe(gulp.dest(output.assetsFolder))
    .pipe(gzip())
    .pipe(gulp.dest(output.assetsFolder));
});

// task to optimize styles
gulp.task('styles-release', ['jekyll', 'html-release'], function() {
  return gulp.src(output.assetsFolder + '/' + output.styles)
    //.pipe(uncss({
    //  html: '_site/**/*.html'
    //}))
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
