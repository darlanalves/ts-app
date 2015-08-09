'use strict';
var gulp = require('gulp');

gulp.task('copy-assets', function() {
	gulp.src('app/assets/**')
		.pipe(gulp.dest('public'));
});

gulp.task('sass', function() {
	var sass = require('gulp-sass');

	return gulp.src('app/styles/**/*.scss')
		.pipe(sass({
			includePaths: [
				'public/vendor/bootstrap-sass/assets/stylesheets/',
				'app/styles'
			]
		}).on('error', sass.logError))
		.pipe(gulp.dest('app/assets/css/app'));
});

gulp.task('include-source', function() {
	var wiredep = require('wiredep').stream;
	var inject = require('gulp-inject');

	var paths = {
		scripts: {
			src: ['**/module.js', '**/!(*module).js'],
			cwd: 'app/src/'
		},
		css: {
			src: 'css/app/**/*.css',
			cwd: 'app/assets/'
		}
	};

	return gulp.src('app/index.html')
		.pipe(wiredep({
			directory: 'public/vendor',
			exclude: ['bootstrap-sass']
		}))

		.pipe(injectFiles(paths.scripts))
		.pipe(injectFiles(paths.css))

		.pipe(gulp.dest('public'));

	function injectFiles(options) {
		return inject(
			gulp.src(options.src, {
				read: false,
				cwd: options.cwd
			})
		);
	}
});

gulp.task('watch', function() {
	var livereload = require('gulp-livereload');

	livereload.listen();

	function handleChanges(stream) {
		stream.on('change', livereload.changed);
	}

	handleChanges(gulp.watch(['app/styles/**', 'app/assets/css/**', 'app/src/**'], ['build-assets']));
});

gulp.task('build', function() {
	var runSequence = require('run-sequence');

	runSequence(
		'sass',
		'copy-assets',
		'include-source'
	);
});
