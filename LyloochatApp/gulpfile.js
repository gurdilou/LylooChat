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
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var cache = require('gulp-cached');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var typescript = require('typescript');
var tsify = require("tsify");
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');



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
  gulp.watch('lib/materialize/sass/**/*.scss', {cwd: workDir}, ['materialize-sass']);
  gulp.watch('templates/**/*.hbs', {cwd: workDir}, ['handlebars']);
  gulp.watch('ts/**/*.ts', {cwd: workDir}, ['ts-compile']);
});

// III - Deploy and start phonegap deploy
gulp.task('full-deploy', function(callback) {
  runSequence(
              'build-clean',
              'handlebars',
              ['build-lib', 'build-js', 'build-styles', 'build-templates'],
              'build-phonegap',
              'run',
              callback);
});
// III - Deploy and start phonegap deploy
gulp.task('quick-deploy', function(callback) {
  runSequence(
              'build-clean',
              ['build-lib', 'build-js-clear', 'build-styles', 'build-templates'],
              'run',
              callback);
});

// IV - Deploy and start phonegap serve
gulp.task('phone-serve', function(callback) {
  runSequence(
              'build-clean',
              ['build-lib', 'build-js', 'build-styles', 'build-templates'],
              'serve-phonegap',
              callback);
});



//*** SUB TASKS
//Delete computed files in prod
gulp.task('build-clean', function(callback) {
    return del([prodDir+'js/**/app.js', prodDir+'js/templates.js', prodDir+'css/*.css', prodDir+'bower_components/**/*'], callback);
});
//Scss to css
gulp.task('sass', function() {
  gulp.src('./scss/**/*.scss', {cwd: workDir})
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('css', {cwd: workDir}))
    .pipe(browserSync.stream());
});
//Materialize Scss to css
gulp.task('materialize-sass', function() {
  gulp.src('./lib/materialize/sass/**/*.scss', {cwd: workDir})
    .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('css', {cwd: workDir}))
    .pipe(browserSync.stream());
});

//generate view templates for client
gulp.task('handlebars', function() {

  return gulp.src(workDir+'templates/**/*.hbs')
    //ecrase le fichier template js
    //.pipe(cache('handlebars')) //cache files, doesn't recompile unchanged templates ;)
    .pipe(handlebars({
      handlebars: require('handlebars'),
      knownHelpers: ['if_eq'],
    }))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Lyloochat.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest(workDir+'js/'));
});

//JS uglify
gulp.task('build-js', function () {
   return gulp.src(['js/**/*.js', '!js/index.js', '!js/templates.js', '!js/lib/*'], {cwd: workDir})
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(gulp.dest(prodDir+'/js/'));
});
//JS concat
gulp.task('build-js-clear', function () {
   return gulp.src(['js/**/*.js', '!js/index.js', '!js/templates.js', '!js/lib/*'], {cwd: workDir})
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(concat('app.js'))
      .pipe(gulp.dest(prodDir+'/js/'));
});



//Copie les templates
gulp.task('build-templates', function () {
   return gulp.src(['js/templates.js'], {cwd: workDir})
      .pipe(gulp.dest(prodDir+'/js/'));
});
// Copie toutes les libraires dans le dossier de prod
gulp.task('build-lib',function(cb){
  gulp.src(['js/lib/**/*'], {cwd: workDir})
    .pipe(gulp.dest(prodDir+'/js/lib/'));
  gulp.src(['lib/**/*'], {cwd: workDir})
    .pipe(gulp.dest(prodDir+'/js/lib/'));

  return gulp.src(['bower_components/**'], {cwd: workDir})
    .pipe(gulp.dest(prodDir+'/css/bower_components/'));
});

//Compute CSS and deploy
gulp.task('build-styles', ['sass', 'materialize-sass'], function(){
  return gulp.src(['css/**/*.css', 'css/**/*.woff', 'css/**/*.woff2', 'css/**/*.ttf'], {cwd: workDir})
    .pipe(gulp.dest(prodDir+'/css'));
});
// Lance le déploiement du android
gulp.task('build-phonegap', function(cb){
  exec('phonegap build android', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
// Lance le déploiement du android
gulp.task('run', function(cb){
    exec('phonegap run android', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// Lance le déploiement du android
gulp.task('serve-phonegap', function(cb){
  exec('phonegap serve --port 4000', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});


gulp.task("ts-compile", function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: [workDir+'ts/dev/index.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
	.on('error', function (error) { console.error(error.toString()); })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(uglify())
	.pipe(sourcemaps.write('.', {
		   sourceRoot: function(file){ return file.cwd; }
	  }))
    .pipe(gulp.dest(workDir+"/js"));
});
