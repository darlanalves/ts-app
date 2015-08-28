(function (module) {
	/**
	 * @controller
	 */
	function HomeController(PeopleRepository) {
		this.name = 'John';
		PeopleRepository.where('a', 1).exec();
	}

	module.controller('HomeController', HomeController);

})(angular.module('main'));