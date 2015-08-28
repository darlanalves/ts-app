(function (module) {
	'use strict';
	/**
	 * @factory
	 */
	function PeopleRepository(RepositoryConfig, RepositoryManager) {
		var config = new RepositoryConfig({
			name: 'People',
			dataProvider: 'RESTProvider'
		});

		return RepositoryManager.addRepository(config);
	}

	module.factory('PeopleRepository', PeopleRepository);

})(angular.module('people'));