// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-01-28 using
// generator-karma 0.8.3


module.exports = function(config) {
	'use strict';

	var setBaseConfig = require('./karma.conf.js');
	setBaseConfig(config);

	config.set({
		autoWatch: true,
		reporters: (config.reporters||[]).concat('coverage'),
		plugins: (config.plugins||[]).concat('karma-coverage'),

		preprocessors: {
			'app/src/**/!(*spec).js': ['coverage']
		},

		coverageReporter: {
			type: 'html',
			dir: 'test/coverage/'
		}
	});
};
