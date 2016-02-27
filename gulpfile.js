// load modules
var gulp = require('gulp');
var uncss = require('gulp-uncss');
var cssNano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var gzip = require('gulp-gzip');
var spawn = require('child_process').spawn;
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

// paths to be used in the project
var paths = {
  bootstrap: {
    sass: {
      in: 'node_modules/bootstrap-sass/assets/stylesheets/**/*.scss',
      out: '_sass/bootstrap'
    },
    scripts: {
      in: 'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
      out: 'assets/scripts'
    },
    fonts: {
      in: 'node_modules/bootstrap-sass/assets/fonts/bootstrap/*.*',
      out: 'fonts'
    }
  },
  jquery: {
    in: 'node_modules/jquery/dist/jquery.js',
    out: 'assets/scripts'
  },
  scripts: {
    in: ['assets/scripts/jquery.js', 'assets/scripts/bootstrap.js'],
    out: 'scripts.js'
  },
  styles: {
    out: 'style.css'
  },
  assets: {
    out: '_site/assets'
  },
  site: {
    out: '_site'
  },
  watch: {
    pages: ['**/*.+(html|md|markdown|xml|yml|scss)', '!_site/**/*', '!_sass/bootstrap/**/*'],
    scripts: ['assets/scripts/**/*.js', '!_assets/scripts/jquery.js', '!_assets/scripts/bootstrap.js']
  }
};

// default task (start development task)
gulp.task('default', ['development']);

// development task
gulp.task('development', ['jekyll', 'autoprefixer', 'scripts', 'serve'], function() {
  // reload browser as the files have been changed recently
  browserSync.reload();

  // and watch files for changes
  gulp.watch(paths.watch.pages, ['jekyll-reload']);
  gulp.watch(paths.watch.scripts, ['scripts-reload']);
});

// copy bootstrap to project
gulp.task('bootstrap-styles', function() {
  return gulp.src(paths.bootstrap.sass.in).pipe(gulp.dest(paths.bootstrap.sass.out));
});
gulp.task('bootstrap-scripts', function() {
  return gulp.src(paths.bootstrap.scripts.in).pipe(gulp.dest(paths.bootstrap.scripts.out));
});
gulp.task('bootstrap-fonts', function() {
  return gulp.src(paths.bootstrap.fonts.in).pipe(gulp.dest(paths.bootstrap.fonts.out));
});

// copy jQuery to project
gulp.task('jquery', function() {
  return gulp.src(paths.jquery.in).
    pipe(gulp.dest(paths.jquery.out));
});

// start jekyll to rebuild web site
gulp.task('jekyll', ['bootstrap-styles', 'bootstrap-fonts'], function(gulpCallBack) {
  // start jekyll task
  var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});

  // and wait for task to be finished
  jekyll.on('exit', function(code) {
    gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
  });
});

// execute tasks depending on jekyll result
gulp.task('autoprefixer', ['jekyll'], function() {
  return gulp.src(paths.assets.out + '/' + paths.styles.out)
    .pipe(autoprefixer({
      browsers: ['> 5%'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.assets.out));
});

// task to recreate site and reload browser on changes
gulp.task('jekyll-reload', ['jekyll', 'autoprefixer'], function() {
  browserSync.reload();
});

// Combine JS script files
gulp.task('scripts', ['jquery', 'bootstrap-scripts'], function() {
  return gulp.src(paths.scripts.in)
    .pipe(concat(paths.scripts.out))
    .pipe(gulp.dest(paths.assets.out));
});

// task to recreate scripts and reload browser on changes
gulp.task('scripts-reload', ['scripts'], function() {
  browserSync.reload();
});

// release task
gulp.task('release', ['html-release', 'styles-release', 'scripts-release']);

// task to optimize scripts for release
gulp.task('scripts-release', ['jekyll', 'scripts'], function() {
  return gulp.src(paths.assets.out + '/' + paths.scripts.out)
    .pipe(uglify({preserveComments: 'license'}))
    .pipe(gulp.dest(paths.assets.out))
    .pipe(gzip())
    .pipe(gulp.dest(paths.assets.out));
});

// task to optimize styles
gulp.task('styles-release', ['jekyll', 'autoprefixer', 'html-release'], function() {
  return gulp.src(paths.assets.out + '/' + paths.styles.out)
    .pipe(uncss({
      html: [paths.site.out + '/**/*.html']
    }))
    .pipe(cssNano())
    .pipe(gulp.dest(paths.assets.out))
    .pipe(gzip())
    .pipe(gulp.dest(paths.assets.out));
});

// task to optimize HTML
gulp.task('html-release', ['jekyll'], function() {
  return gulp.src(paths.site.out + '/**/*.html')
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(paths.site.out));
});

// task to serve site to browsers
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: paths.site.out
    }
  });
});
