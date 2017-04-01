'use strict'

var gulp = require('gulp')
var pug = require('gulp-pug')
var stylus = require('gulp-stylus')
var postcss = require('gulp-postcss')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('autoprefixer')
var del = require('del')
var browserSync = require('browser-sync').create()

var path = {
    templates: 'src/templates/',
    styles: 'src/styles/',
    dist: {
        pages: 'dist/',
        styles: 'dist/styles/',
    }
}

gulp.task('templates', function() {
    return  gulp.src(path.templates + 'pages/*.pug')
    .pipe(pug({
		pretty: true
	}))
    .pipe(gulp.dest(path.dist.pages))
    .pipe(browserSync.stream())
})

gulp.task('styles', function() {
    return gulp.src(path.styles + 'main.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(postcss([
        autoprefixer()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.styles))
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

gulp.task('removedist', function() {
    return del.sync(path.dist.pages)
})

gulp.task('watch', function() {
    gulp.watch(path.templates + '**/*.pug', ['templates'])
    gulp.watch(path.styles + '**/*.styl', ['styles'])
    browserSync.reload()
})

gulp.task('build', ['removedist', 'templates', 'styles'])

gulp.task('default', ['templates', 'styles', 'server', 'watch'])
