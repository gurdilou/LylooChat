var gulp = require('gulp');
var workDir='wwwWork/';
var prodDir='www/';


//variables
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var debug = require('gulp-debug');
var del = require('del');
var exec = require('child_process').exec;
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');


//*** MAIN TASKS
// I - Default task
gulp.task('default', ['serve']);
// II - Local html server during desktop developement
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: workDir
    }
  });
  gulp.watch(['*.html', 'js/**/*.js'], {cwd: workDir}, reload);
  gulp.watch('scss/**/*.scss', {cwd: workDir}, ['sass']);
});
// III - Deploy and start phonegap deploy
gulp.task('deploy', function(callback) {
  runSequence(
              'build-clean',
              ['build-lib', 'build-js', 'build-styles'],
              'build-phonegap',
              callback);
});



//*** SUB TASKS
//Delete computed files in prod
gulp.task('build-clean', function(callback) {
    return del([prodDir+'js/**/*.js', prodDir+'!js/index.js', prodDir+'css/*.css', prodDir+'bower_components'], callback);
});
//Scss to css
gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss', {cwd: workDir})
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('css', {cwd: workDir}))
    .pipe(reload({ stream:true }));
});

//JS uglify
gulp.task('build-js', function () {
   return gulp.src(['js/**/*.js', '!js/index.js'], {cwd: workDir})
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(gulp.dest(prodDir+'/js/'));
});
//Compute CSS and deploy
gulp.task('build-styles', ['sass'], function(){
  return gulp.src(['css/**/*.css'], {cwd: workDir})
    .pipe(gulp.dest(prodDir+'/css'));
});
// Lance le déploiement du android
gulp.task('build-phonegap', function(cb){
  exec('phonegap run android --device', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
// Copie toutes les libraires dans le dossier de prod
gulp.task('build-lib',function(cb){
  return gulp.src(['bower_components'], {cwd: workDir})
    .pipe(gulp.dest(prodDir));
});
