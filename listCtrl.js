var toDoApp = angular.module('toDoApp', []);

toDoApp.controller('listCtrl', ['$scope', '$http',

function listCtrl($scope, $http) {

	// USE ARRAY:
	/*
	//$scope.toDoList = ["Learn AngularJS","Learn Node.js","Learn Git"];
	//$scope.completedList = ["Go to work","Shave a cat","Pee pants (not mine)"];

	$scope.toDoList = [];
	$scope.completedList = [];

	$scope.itemAdd = function (item) {
		$scope.toDoList.push(item);
		$scope.toDoItem = "";
	}

	$scope.itemRemove = function (item) {
		$scope.completedList.push(item);
		$scope.toDoList.splice($scope.toDoList.indexOf(item), 1);
	}
	*/

	// USE MONGODB:

	$scope.formData = {};
	$scope.completedList = [];

	//retrieve existing to-dos upon landing on page
	$http.get('/api/items')
		.success(function(data) {
			$scope.toDoList = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
	});

	$scope.itemAdd = function() {
		$http.post('api/items', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.items = data;
			});
	};

	$scope.itemRemove = function(id) {

		$scope.completedList.push(id); //display completed items for this session

		$http.delete('/api/items/' + id)
			.success(function(data) {
				$scope.items = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}

]);