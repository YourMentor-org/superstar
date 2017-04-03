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
var imagemin = require('gulp-imagemin')
var svg2png = require('gulp-svg2png') // Convert SVGs to PNGs
var svgmin = require('gulp-svgmin') // Minify SVG with SVGO
var svgspritesheet = require('gulp-svg-spritesheet')
var del = require('del')
var environments = require('gulp-environments')
var browserSync = require('browser-sync').create()

var path = {
    templates: 'src/templates/',
    styles: 'src/styles/',
    js: 'src/js/',
    img: 'src/images/',
    sprite: 'src/images/sprite/',
    dist: {
        pages: 'dist/',
        styles: 'dist/styles/',
        js: 'dist/js/',
        img: 'dist/images/',
		sprite: 'dist/images/sprite/'
    }
}
var dev = environments.development
var prod = environments.production

gulp.task('svg-sprite', function () {
	return gulp.src(path.sprite + '**/*.svg')
	.pipe(svgspritesheet({
		cssPathNoSvg: '../images/sprite/svg-sprite.png',
        cssPathSvg: '../images/sprite/svg-sprite.svg',
        padding: 0,
        pixelBase: 16,
        positioning: 'packed',
        templateSrc: path.styles + 'templates/_sprite-template.styl',
        templateDest: path.styles + '_svg-sprite.styl',
        units: 'em'
    }))
    .pipe(svgmin())
    .pipe(gulp.dest(path.dist.sprite + 'svg-sprite.svg'))
    .pipe(svg2png())
    .pipe(gulp.dest(path.dist.sprite + 'svg-sprite.png'))
	.pipe(browserSync.stream())
})

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
    .pipe(stylus({
        'include css': false
    }))
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

gulp.task('images', function() {
    return gulp.src(path.img + '/**/*')
    .pipe(imagemin({
        progressive: true, // сжатие jpg
        // svgoPlugins: [{removeViewBox: false}], // сжатие svg
        interlanced: true, // сжатие gif
        optimizationLevel: 3 // степень сжатия
    }))
    .pipe(gulp.dest(path.dist.img))
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
	gulp.watch(path.sprite + '**/*.svg', ['svg-sprite'])
	gulp.watch(path.styles + '**/*.styl', ['styles'])
	gulp.watch(path.images + '**/*.jpg', ['images'])
    gulp.watch(path.js + '**/*.js', ['js'])
    browserSync.reload()
})

gulp.task('build', ['clear', 'templates', 'svg-sprite', 'styles', 'js', 'images'])

gulp.task('default', ['templates', 'svg-sprite', 'styles', 'js', 'server', 'watch'])
