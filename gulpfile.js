let preprocessor = 'sass'; // Preprocessor (sass, scss)
let fileswatch   = 'html,htm,txt,json,md'; // List of files extensions for watching & hard reload (comma separated)
//let imageswatch  = 'jpg,jpeg,png,webp,svg,woff2'; // List of files extensions for watching & hard reload (comma separated)

const { src, dest, parallel, series, watch } = require('gulp');
const sass           = require('gulp-sass');
const cleancss       = require('gulp-clean-css');
const concat         = require('gulp-concat');
const browserSync    = require('browser-sync').create();
const uglify         = require('gulp-uglify-es').default;
const autoprefixer   = require('gulp-autoprefixer');
//const imagemin       = require('gulp-imagemin');
const newer          = require('gulp-newer');
const rsync          = require('gulp-rsync');
const del            = require('del');

// Local Server

function browsersync() {
	browserSync.init({
		server: { baseDir: 'app' },
		notify: false,
		// online: false, // Work offline without internet connection
	})
}

// Custom Styles

function styles() {
	return src('app/sass/main.' + preprocessor + '')
	.pipe(sass())
	.pipe(concat('main.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
	.pipe(dest('app/css'))
	.pipe(browserSync.stream())
}

// Scripts & JS Libraries

function scripts() {
	return src([
		// 'node_modules/jquery/dist/jquery.min.js', // npm vendor example (npm i --save-dev jquery)
		//'app/js/app.js' // app.js. Always at the end
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/fancybox/dist/jquery.fancybox.min.js',
		'app/libs/required_fields/jquery.maskedinput.min.js',
		'app/libs/required_fields/required_fields.js',
		'app/libs/slick-carousel/slick/slick.min.js',
		//'app/libs/matchHeight/dist/jquery.matchHeight.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Minify JS (opt.)
	.pipe(dest('app/js'))
	.pipe(browserSync.stream())
}

// Images

//function images() {
//	return src('app/images/src/**/*')
//	.pipe(newer('app/images/dest'))
//	.pipe(imagemin())
//	.pipe(dest('app/images/dest'))
//}

//function cleanimg() {
//	return del('app/images/dest/**/*', { force: true })
//}

// Deploy

function deploy() {
	return src('app/')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Included files
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excluded files
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
}

// Watching

function startwatch() {
	watch('app/sass/*.' + preprocessor + '', parallel('styles'));
	watch(['app/**/*.js', '!app/js/*.min.js'], parallel('scripts'));
//	watch(['app/**/*.{' + imageswatch + '}'], parallel('images'));
	watch(['app/**/*.{' + fileswatch + '}']).on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.assets      = series(/*cleanimg, */styles, scripts/*, images*/);
exports.styles      = styles;
exports.scripts     = scripts;
//exports.images      = images;
//exports.cleanimg    = cleanimg;
exports.deploy      = deploy;
exports.default     = parallel(/*images, */styles, scripts, browsersync, startwatch);
