angular.module('userService', [])

	.factory('User', function ($http) {

		// create a new object
		var userFactory = {};

		// get a user profile
		userFactory.get = function (id) {
			return $http.get('/api/users/profile/' + id);
		};

		// create a user
		userFactory.create = function (userData) {
			return $http.post('/api/register/', userData);
		};

		// update a user
		//	userFactory.update = function(id, userData) {
		//		return $http.put('/api/users/profile/' + id, userData);
		//	};

		// delete a user
		userFactory.delete = function (id) {
			return $http.delete('/api/users/setting/' + id);
		};

		// return the entire userFactory object
		return userFactory;

	})

	.factory('Student', function ($http) {

		var studentFactory = {};

		// get all student
		studentFactory.all = function () {
			return $http.get('/api/users/');
		};

		// get only student names
		studentFactory.all = function () {
			return $http.get('/api/result/');
		};

		// get a single student
		studentFactory.get = function (id) {
			return $http.get('/api/users/' + id);
		};

		// create a student
		studentFactory.create = function (studentData) {
			return $http.post('/api/users/create/student/', studentData);
		};

		// delete a student
		studentFactory.delete = function (id) {
			return $http.delete('/api/users/' + id);
		};

		return studentFactory;
	});