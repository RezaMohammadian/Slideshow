var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require("gulp-rename");
var autoprefixer   = require('gulp-autoprefixer');
var gcmq = require('gulp-group-css-media-queries');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var deploy = require('gulp-deploy-git');

// var gutil  = require('gulp-util');
// var argv   = require('minimist')(process.argv);
// var gulpif = require('gulp-if');
// var prompt = require('gulp-prompt');
// var rsync  = require('gulp-rsync');

// var ghPages = require('gulp-gh-pages');

//Gulp deploy (GIT)

gulp.task('deploy', function() {
  return gulp.src('dist/**/*')
    .pipe(deploy({
      repository: 'https://github.com/zhevron/gulp-deploy-git.git'
    }));
});

// Static Server + watching scss/html files
gulp.task('serve' , ['sass','scripts'] , function() {

    browserSync.init({
        port : 1369,
        server: "./"
    });

    gulp.watch("styles/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("scripts/*.js", ['js-watch']);
});

//Static Build (Not watching)
gulp.task('build' , ['sass','scripts'] , function() {

    browserSync.init({
        port : 1369,
        server: "./"
    });
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("styles/*.scss")
        .pipe(sass())
        .pipe(gcmq())
        .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          remove: false
        }))
        .pipe(cssnano())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest("Content/css/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

//script
gulp.task('scripts', function () {
    return gulp.src('scripts/**/*.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('./Content/JS/'));
});

gulp.task('js-watch', ['scripts'], function (done) {
    browserSync.reload();
    done();
});

//imgcompresser
gulp.task('imagemin', function() {
  gulp.src('Content/images/*')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('Content/images'));
});