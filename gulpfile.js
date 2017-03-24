'use strict'

var gulp = require('gulp'),
		pug = require('gulp-pug'),
		stylus = require('gulp-stylus'),
		rupture = require('rupture'),
		autoprefixer = require('gulp-autoprefixer'),
		gcmq = require('gulp-group-css-media-queries'),
		notifier = require('node-notifier'),
		notify = require('gulp-notify'),
		watch = require('gulp-watch'),
		del = require('del'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		browserSync = require('browser-sync').create();

gulp.task('pages', function() {
	return gulp.src('src/pug/pages/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('src/'))
		.pipe(browserSync.stream());
});

gulp.task('styles', function() {
	return gulp.src('src/stylus/main.styl')
		.pipe(stylus({
			use: [rupture()]
		}))
		.pipe(autoprefixer({browsers: ['last 15 versions']}))
		.pipe(gulp.dest('src/css/'))
		.pipe(browserSync.stream());
});

gulp.task('javascriptLibs', function() {
	return gulp.src([
		''
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'));
});

gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: './src'
		},
		port: 3000,
		host: 'localhost',
		logPrefix: 'frontend',
		reloadDelay: 3000
	});
});

gulp.task('removedist', function() {
	return del.sync('dist');
});

gulp.task('watch', ['pages', 'styles', 'javascriptLibs', 'server'], function() {
	gulp.watch('src/pug/**/*.pug', ['pages']);
	gulp.watch('src/stylus/**/*.styl', ['styles']);
	gulp.watch('src/js/**/*.js', browserSync.reload);
	browserSync.reload();
	notifier.notify('Watching!');
});

gulp.task('production', ['pages', 'styles', 'javascriptLibs'], function() {

	var buildHTML =  gulp.src('src/*.html').pipe(gulp.dest('dist/')); 
	var buildCSS =  gulp.src('src/css/main.css').pipe(gulp.dest('dist/css'));
	var buildJS =  gulp.src('src/js/*.js').pipe(gulp.dest('dist/js'));
	var buildFonts = gulp.src('src/fonts/*.*').pipe(gulp.dest('dist/fonts'));
	var buildImages = gulp.src('src/images/*.*').pipe(gulp.dest('dist/images'));
	notifier.notify({ title: 'Production Build', message: 'Done' });

});

gulp.task('default', ['watch']);
