angular.module('people').config(['$stateProvider', function($stateProvider) {
	'use strict';

	var states = {
		'index': {
			url: '',
			templateUrl: 'main/home.html',
			controller: 'HomeController as home'
		}
	};

	angular.forEach(states, function(config, name) {
		$stateProvider.state(name, config);
	});
}]);
