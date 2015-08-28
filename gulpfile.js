'use strict';
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var bowerPath = JSON.parse(fs.readFileSync('./.bowerrc')).directory;

gulp.task('copy-assets', function() {
	return gulp.src('app/assets/**')
		.pipe(gulp.dest('public'));
});

gulp.task('copy-app', function() {
	return gulp.src('app/src/**')
		.pipe(gulp.dest('public'));
});

gulp.task('templates', function() {
	var templateCache = require('gulp-templatecache');

	var options = {
		output: 'templates.js',
		strip: 'app/src/',
		prepend: '',
		moduleName: 'main',
		minify: {}
	};

	gulp.src('app/src/**/*.html')
		.pipe(templateCache(options))
		.pipe(gulp.dest('public'));
});

gulp.task('sass', function() {
	var sass = require('gulp-sass');

	return gulp.src('app/styles/**/*.scss')
		.pipe(sass({
			includePaths: [
				path.join(bowerPath, 'bootstrap-sass/assets/stylesheets/'),
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
			src: ['**/module.js', '**/!(*spec).js'],
			cwd: 'app/src/'
		},
		css: {
			src: 'css/app/**/*.css',
			cwd: 'app/assets/'
		}
	};

	return gulp.src('app/index.html')
		.pipe(wiredep({
			exclude: ['bootstrap-sass', 'angular-mocks'],
			fileTypes: {
				html: {
					replace: {
						js: function(path) {
							path = path.replace('../public/', '');
							return '<script src="' + path + '"></script>';
						},
						css: function(path) {
							path = path.replace('../public/', '');
							return '<link rel="stylesheet" href="' + path + '" />';
						}
					}
				}
			}
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
		stream.on('change', function () {
			console.log('>> RELOAD >>');
			livereload.changed('*');
		});
	}

	handleChanges(gulp.watch(['app/styles/**', 'app/assets/css/**', 'app/src/**/!(*spec).js'], ['build']));
	handleChanges(gulp.watch(['app/index.html', 'bower.json'], ['include-source']));
});

gulp.task('build', function() {
	var runSequence = require('run-sequence');

	runSequence(
		'sass',
		'copy-assets',
		'copy-app',
		'include-source',
		'templates'
	);
});
