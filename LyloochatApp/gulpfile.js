var gulp = require('gulp');


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
var watchify = require("watchify");
var gutil = require("gulp-util");



//*** MAIN TASKS
// I - Default task
gulp.task('default', ['serve']);

// II - Local html server during desktop developement
gulp.task('serve', ['handlebars', 'sass'], function() {
    compileTypescript(false);

    gulp.watch(['*.html', 'js/**/*.js'], reload);
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('lib/materialize/sass/**/*.scss', ['materialize-sass']);
    gulp.watch('templates/**/*.hbs', ['handlebars']);


    return browserSync({
        server: {
            baseDir: 'www'
        }
    });
});

// III - Deploy and start phonegap deploy
gulp.task('deploy', function(callback) {
    compileTypescript(true);

    runSequence(
        'clean', ['handlebars', 'sass'],
        'build-phonegap',
        'run',
        callback);
});



//*** SUB TASKS
//Delete computed files in prod
gulp.task('clean', function(callback) {
    return del([prodDir + 'js/bundle*.js', prodDir + 'js/templates.js', prodDir + 'css/styles.css'], callback);
});
//Scss to css
gulp.task('sass', function() {
    gulp.src('www/scss/**/*.scss')
        .pipe(sass.sync({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('www/css'))
        .pipe(browserSync.stream());
});
//Materialize Scss to css
gulp.task('materialize-sass', function() {
    gulp.src('www/lib/materialize/sass/**/*.scss')
        .pipe(sass.sync({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('www/css'))
        .pipe(browserSync.stream());
});

//generate view templates for client
gulp.task('handlebars', function() {

    return gulp.src('www/templates/**/*.hbs')
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
        .pipe(gulp.dest('www/js/'));
});

// Lance le déploiement du android
gulp.task('build-phonegap', function(cb) {
    exec('phonegap build android', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});
// Lance le déploiement du android
gulp.task('run', function(cb) {
    exec('phonegap run android', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

var watchedDevTsify = watchify(browserify({
        basedir: '.',
        debug: true,
        entries: ['www/ts/dev/index.ts'],
        cache: {},
        packageCache: {}
    }))
    .plugin(tsify)
    .on('error', function(e) {
        console.log(e);
    });
watchedDevTsify.on("update", compileTypescript);
watchedDevTsify.on("log", gutil.log);
var watchedProdTsify = watchify(browserify({
        basedir: '.',
        debug: true,
        entries: ['www/ts/prod/index.ts'],
        cache: {},
        packageCache: {}
    }))
    .plugin(tsify)
    .on('error', function(e) {
        console.log(e);
    });
watchedProdTsify.on("update", compileTypescript);
watchedProdTsify.on("log", gutil.log);

function compileTypescript(deployOnPhone) {
    var sourceTs = watchedDevTsify;
    if (deployOnPhone) {
        sourceTs = watchedProdTsify;
    }
    return sourceTs
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        // .pipe(uglify())
        .pipe(sourcemaps.write('.', {
            sourceRoot: function(file) {
                return file.cwd;
            }
        }))
        .pipe(gulp.dest("www/js"));
}
