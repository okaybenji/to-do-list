var toDoApp = angular.module('toDoApp', []);

toDoApp.controller('listCtrl', ['$scope', '$http',

function listCtrl($scope, $http) {

	$scope.formData = {};
	$scope.toDoList = [];
	$scope.completedList = [];

	//retrieve existing to-dos upon landing on page
	$http.get('/api/items')
		.success(function(data) {
			angular.forEach(data, function(value, key){
				//console.log(key + ' ' ,value);
				$scope.toDoList.push(value.item);
			});
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