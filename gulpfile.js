var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
const autoprefixer = require('gulp-autoprefixer');


sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('./assets/css/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(livereload());;
});

gulp.task('sass:watch', async function () {
    gulp.watch('./assets/css/scss/**/*.scss', gulp.series('sass', 'minify-css'));
});

gulp.task('minify-css', function() {
    return gulp.src('./assets/css/style.css')
        .pipe(cleanCSS())
        .pipe(rename('dist.min.css'))
        .pipe(gulp.dest('./assets/css/dist'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./assets/*.scss', ['sass']);
});

gulp.task('default', gulp.series('sass', 'minify-css', 'sass:watch'));