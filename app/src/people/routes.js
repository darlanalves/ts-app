angular.module('people').config(['$stateProvider', function($stateProvider) {
	'use strict';

	var states = {
		'people': {
			url: '/people',
			abstract: true
		},

		'people.directory': {
			url: '/all',
			templateUrl: 'people/all.html'
		}
	};

	angular.forEach(states, function(config, name) {
		$stateProvider.state(name, config);
	});
}]);
