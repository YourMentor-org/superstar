'use strict'

var gulp = require('gulp')
var pug = require('gulp-pug')
var del = require('del')
var browserSync = require('browser-sync').create()

var path = {
    templates: 'src/templates/',
    pages: 'dist/'
}

gulp.task('templates', function() {
    return  gulp.src(path.templates + 'pages/*.pug')
    .pipe(pug({
		pretty: true
	}))
    .pipe(gulp.dest(path.pages))
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
        reloadDelay: 3000
    })
})

gulp.task('removedist', function() {
    return del.sync(path.pages)
})

gulp.task('watch', ['templates', 'server'], function() {
    gulp.watch(path.templates + '*.pug', ['templates'])
    browserSync.reload()
})

gulp.task('prod', ['templates'])

gulp.task('default', ['watch'])
