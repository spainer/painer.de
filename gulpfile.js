// load modules
var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var spawn = require('child_process').spawn;

// define inputs
var input = {
  pages: ['**/*.+(html|md|markdown|xml|yml)', '!_site/*'],
  styles: ['assets/styles/style.less'],
  scripts: ['assets/scripts/jQuery/*.js', 'assets/scripts/bootstrap/js/*.js']
};

// define outputs
var output = {
  assetsFolder: '_site/assets',
  styles: 'style.css',
  scripts: 'scripts.js'
};

// default task (start development task)
gulp.task('default', ['development']);

// development task
gulp.task('development', ['jekyll', 'styles', 'scripts', 'serve'], function() {
  gulp.watch(input.pages, ['jekyll']);
  gulp.watch(input.styles, ['styles']);
  gulp.watch(input.scripts, ['scripts']);
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

// compile LESS styles to CSS
gulp.task('styles', function() {
  return gulp.src(input.styles)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(rename(output.styles))
    .pipe(gulp.dest(output.assetsFolder));
});

// Combine JS script files
gulp.task('scripts', function() {
  return gulp.src(input.scripts)
    .pipe(concat(output.scripts))
    .pipe(uglify())
    .pipe(gulp.dest(output.assetsFolder));
});

// serve jekyll web site
gulp.task('serve', ['jekyll', 'styles', 'scripts'], function(gulpCallBack) {
  // start jekyll server
  var jekyll = spawn('jekyll', ['serve', '--detach', '--skip-initial-build'], {stdio: 'inherit'});

  // and wait for task to be finished
  jekyll.on('exit', function(code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
  });
});
