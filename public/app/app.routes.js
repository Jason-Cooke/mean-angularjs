angular.module('app.routes', ['ngRoute'])

	.config(function ($routeProvider, $locationProvider) {

		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl: 'app/views/pages/home.html',

			})

			// login page
			.when('/login', {
				templateUrl: 'app/views/pages/login.html',
				controller: 'mainController',
				controllerAs: 'login'
			})

			// Check result page
			.when('/result', {
				templateUrl: 'app/views/pages/student/studenth.html',
				controller: 'studentController',
				controllerAs: 'result'
			})

			// show all students on dashboard
			.when('/users', {
				templateUrl: 'app/views/pages/student/dashboard.html',
				controller: 'studentController',
				controllerAs: 'student'
			})

			// form to create a new staff
			.when('/register', {
				templateUrl: 'app/views/pages/register.html',
				controller: 'userCreateController',
				controllerAs: 'user'
			})

			// create new student
			.when('/users/create/student', {
				templateUrl: 'app/views/pages/student/studentn.html',
				controller: 'studentCreateController',
				controllerAs: 'student'
			})

			// same view as edit page
			//		.when('/users/profile', {
			//			templateUrl: 'app/views/pages/users/profile.html',
			//			controller: 'userCreateController',
			//			controllerAs: 'user'
			//		})

			// page to edit a user
			//	.when('/users/profile/:user_id', {
			//		templateUrl: 'app/views/pages/users/profile.html',
			//		controller: 'userEditController',
			//		controllerAs: 'user'
			//	});

			// user account delete
			.when('/users/setting/', {
				templateUrl: 'app/views/pages/users/setting.html',
				controller: 'userController',
				controllerAs: 'user'
			})

			// page to view profile of a particular student
			.when('/users/:student_id', {
				templateUrl: 'app/views/pages/users/studpro.html',
				controller: 'studentDataController',
				controllerAs: 'student'
			})

			// page to view profile of a particular user
			.when('/users/profile/:user_id', {
				templateUrl: 'app/views/pages/users/profile.html',
				controller: 'userDataController',
				controllerAs: 'user'
			});

		$locationProvider.html5Mode(true);

	});
