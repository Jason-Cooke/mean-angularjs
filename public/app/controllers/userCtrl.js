angular.module('userCtrl', ['userService'])

	.controller('userController', function ($location, User, Auth) {

		var vm = this;


		// function to delete a user
		vm.deleteUser = function (id) {

			User.delete(id)
				.then(function (data) {
					Auth.logout();
					vm.user = '';
					$location.path('/login');

				});
		};

	})

	// controller applied to user creation page
	.controller('userCreateController', function ($location, User) {

		var vm = this;

		// variable to hide/show elements of the view
		// differentiates between create or edit pages
		vm.type = 'create';

		// function to create a user
		vm.saveUser = function () {
			vm.processing = true;
			vm.message = '';

			// use the create function in the userService
			User.create(vm.userData)
				.then(function (data) {
					vm.processing = false;
					vm.userData = {};
					vm.message = data.message;
					$location.path('/login');
				});

		};

	})

	// controller applied to user edit page
	.controller('userEditController', function ($routeParams, User) {

		var vm = this;

		// variable to hide/show elements of the view
		// differentiates between create or edit pages
		vm.type = 'edit';

		// get the user data for the user you want to edit
		// $routeParams is the way we grab data from the URL
		User.get($routeParams.user_id)
			.then(function (data) {
				vm.userData = data;
			});

		// function to save the user
		vm.saveUser = function () {
			vm.processing = true;
			vm.message = '';

			// call the userService function to update 
			User.update($routeParams.user_id, vm.userData)
				.then(function (data) {
					vm.processing = false;

					// clear the form
					vm.userData = {};

					// bind the message from the API to vm.message
					vm.message = data.message;
				});
		};

	})

	// controller applied to user profile page
	.controller('userDataController', function ($routeParams, User) {

		var vm = this;


		// get the user data for the user you want to edit
		// $routeParams is the way to grab data from the URL
		User.get($routeParams.user_id)
			.then(function (data) {
				vm.users = data.data;
			});

	})

	// ********************************************
	// controller applied to student creation page
	.controller('studentCreateController', function ($location, Student) {

		var vm = this;

		// variable to hide/show elements of the view
		// differentiates between create or edit pages
		vm.type = 'create';

		// function to create a student
		vm.saveStudent = function () {
			vm.processing = true;
			vm.message = '';

			// use the create function in the userService
			Student.create(vm.studentData)
				.then(function (data) {
					vm.processing = false;
					vm.studentData = {};
					vm.message = data.message;
					$location.path('/users');
				});

		};

	})

	.controller('studentController', function (Student) {

		var vm = this;

		// set a processing variable to show loading things
		vm.processing = true;

		// grab all the students at page load
		Student.all()
			.then(function (data) {

				// when all the students come back, remove the processing variable
				vm.processing = false;

				// bind the students that come back to vm.students
				vm.students = data.data;
			});

		// function to delete a student
		vm.deleteStudent = function (id) {
			vm.processing = true;

			Student.delete(id)
				.then(function (data) {

					// get all students to update the table
					// you can also set up your api 
					// to return the list of students with the delete call
					Student.all()
						.then(function (data) {
							vm.processing = false;
							vm.students = data.data;
						});

				});
		};

	})

	// controller applied to student edit page
	.controller('studentEditController', function ($routeParams, Student) {

		var vm = this;

		// variable to hide/show elements of the view
		// differentiates between create or edit pages
		vm.type = 'edit';

		// get the student data for the student you want to edit
		// $routeParams is the way we grab data from the URL
		Student.get($routeParams.student_id)
			.then(function (data) {
				vm.studentData = data;
			});

		// function to save the student
		vm.saveStudent = function () {
			vm.processing = true;
			vm.message = '';

			// call the userService function to update 
			Student.update($routeParams.student_id, vm.studentData)
				.then(function (data) {
					vm.processing = false;

					// clear the form
					vm.studentData = {};

					// bind the message from the API to vm.message
					vm.message = data.message;
				});
		};

	})

	// controller applied to student data page
	.controller('studentDataController', function ($routeParams, Student) {

		var vm = this;


		// get the student data
		// $routeParams is the way to grab data from the URL
		Student.get($routeParams.student_id)
			.then(function (data) {
				vm.students = data.data;
			});


	});