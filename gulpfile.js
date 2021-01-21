var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var data = require('gulp-data');



function debuger() {
	return gulp
	.src('gulpfile.js')
	        .pipe(debug({title: 'unicorn:'}))
	        .pipe(gulp.dest('dist'))
}

function build() {
	return gulp
		.src('app/templates/*.pug')
		.pipe(data(function(file) {
				return JSON.parse(
					fs.readFileSync('app/data/data.json')
					);
			}))

		.pipe(gulp.dest('dist/'));
}


function style() {
	return gulp
		.src('app/sass/**/*.sass') // Gets all files ending with .scss in app/scss
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
}


function watch() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	});
	gulp.watch('app/sass/**/*.sass', style);
	gulp.watch('app/**/*.pug', build);
	gulp.watch('dist/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
	gulp.watch('app/data/**/*.json').on('change', build);
	gulp.watch('gulpfile.js').on('change', build);
}


// exports.build = build;
exports.style = style;
exports.assets = assets;
exports.watch = watch;
exports.debuger = debuger;









