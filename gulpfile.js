'use strict'

var gulp = require('gulp')
var pug = require('gulp-pug')
var stylus = require('gulp-stylus')
var postcss = require('gulp-postcss')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('autoprefixer')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var babel = require('gulp-babel')
var del = require('del')
var environments = require('gulp-environments')
var browserSync = require('browser-sync').create()

var path = {
    templates: 'src/templates/',
    styles: 'src/styles/',
    js: 'src/js/',
    dist: {
        pages: 'dist/',
        styles: 'dist/styles/',
        js: 'dist/js/'
    }
}
var dev = environments.development
var prod = environments.production

gulp.task('templates', function() {
    return  gulp.src(path.templates + 'pages/*.pug')
    .pipe(pug({
		pretty: true
	}))
    .pipe(gulp.dest(path.dist.pages))
    .pipe(browserSync.stream())
})

gulp.task('styles', function() {
    return gulp.src(path.styles + 'app.styl')
    .pipe(dev(sourcemaps.init()))
    .pipe(stylus())
    .pipe(postcss([
        autoprefixer()
    ]))
    .pipe(dev(sourcemaps.write('.')))
    .pipe(gulp.dest(path.dist.styles))
    .pipe(browserSync.stream())
})

gulp.task('js', function() {
    return gulp.src(path.js + '**/*.js')
    .pipe(dev(sourcemaps.init()))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('app.js'))
    .pipe(prod(uglify()))
    .pipe(dev(sourcemaps.write('.')))
    .pipe(gulp.dest(path.dist.js))
    .pipe(browserSync.stream())
})

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        port: 3001,
        host: 'localhost',
        logPrefix: 'frontend',
        open: false
        // reloadDelay: 3000
    })
})

gulp.task('clear', function() {
    return del.sync(path.dist.pages)
})

gulp.task('watch', function() {
    gulp.watch(path.templates + '**/*.pug', ['templates'])
    gulp.watch(path.styles + '**/*.styl', ['styles'])
    gulp.watch(path.js + '**/*.js', ['js'])
    browserSync.reload()
})

gulp.task('build', ['clear', 'templates', 'styles', 'js'])

gulp.task('default', ['templates', 'styles', 'js', 'server', 'watch'])
