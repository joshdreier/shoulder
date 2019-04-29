/* global require */
var gulp = require('gulp');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var sassLint = require('gulp-sass-lint');
var autoprefixer = require('gulp-autoprefixer');
var modernizr = require('gulp-modernizr');

var paths = {
  scripts: [
    'app/js/**/*.js',
    'app/!js/**/*.min.js'
  ],
  sass: {
    main: 'app/scss/styles.scss',
    watch: 'app/scss/**/*'
  },
  css: {
    root: 'dist/css'
  },
  clean: [
    'dist/css/styles.css',
    'dist/css/**/*.css.map',
    'dist/js/**/*.min.js'
  ]
};

gulp.task('modernizr', function () {
  'use strict';
  return gulp.src('app/js/*.js')
    .pipe(modernizr('modernizr.min.js', {
      options: [
        'setClasses',
        'addTest',
        'testProp'
      ],
      tests: [
        'pointerevents',
        'flexbox'
      ],
      crawl: false
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/vendor'));
});

gulp.task('clean', function () {
  'use strict';
  return del(paths.clean);
});

gulp.task('js-lint', function () {
  'use strict';
  return gulp.src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('sass-lint', function () {
  'use strict';
  return gulp.src(paths.sass.watch)
    .pipe(sassLint({
      files: {
        ignore: [
          'bower_components/**/*.scss',
          'apps/css/normalize/**',
          'apps/css/styles.scss'
        ]
      },
      rules: {
        'no-ids': 0,
        'nesting-depth': [1, {'max-depth': 4}],
        'no-qualifying-elements': [1, {'allow-element-with-class': true}],
        'force-element-nesting': 0,
        'force-pseudo-nesting': 0,
        'property-sort-order': 0,
        'no-vendor-prefixes': 0,
        'mixins-before-declarations': [1, {exclude: ['media']}],
        'placeholder-in-extend': 0,
        'single-line-per-selector': 0,
        'no-misspelled-properties': [1, {'extra-properties': ['-webkit-overflow-scrolling']}],
        'class-name-format': 0
      }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('lint', ['js-lint', 'sass-lint']);

gulp.task('compress', function () {
  'use strict';
  return gulp.src(paths.scripts)
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/dist'));
});

gulp.task('sass', function () {
  'use strict';
  return gulp.src(paths.sass.main)
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        'node_modules/support-for/sass'
      ]
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'IE >= 11']
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.css.root))
    .pipe(livereload());
});

gulp.task('sourcemaps', function () {
  'use strict';
  return gulp.src(paths.sass.main)
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css.root));
});


gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('build', ['sass', 'compress', 'modernizr', 'html', 'images']);

gulp.task('watch', ['build'], function () {
  'use strict';
  livereload.listen();
  gulp.watch(paths.sass.watch, ['sass']);
  gulp.watch(paths.scripts, ['compress']);
});

gulp.task('default', ['build']);
