// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-01-28 using
// generator-karma 0.8.3

module.exports = function(config) {
	'use strict';

	var bowerPath = require('./.bowerrc').directory;
	var path = require('path');

	function bowerFiles() {
		return [
			path.join(bowerPath, '/jquery/dist/jquery.js'),
			path.join(bowerPath, '/angular/angular.js'),
			path.join(bowerPath, '/angular-mocks/angular-mocks.js')
		];
	}

	config.set({
		autoWatch: true,
		reporters: ['progress'],

		frameworks: ['jasmine'],

		files: bowerFiles().concat([
			'app/src/**/module.js',
			'app/src/**/*.js',
			'app/src/**/*.spec.js',

			{
				pattern: 'test/fixtures/**/*.json',
				watched: true,
				served: true,
				included: false
			}
		]),

		// list of files / patterns to exclude
		exclude: [],

		// web server port
		port: 8500,

		// spot slow tests (in ms)
		reportSlowerThan: 130,

		browsers: ['PhantomJS'],

		plugins: [
			'karma-phantomjs-launcher',
			'karma-jasmine'
		],

		singleRun: false,
		colors: true,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,
	});
};
